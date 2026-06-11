import { validateProductUrl, detectPlatform } from './validators'

export interface ScrapedProduct {
  title: string
  description: string | null
  price: number | null
  currency: string
  imageUrls: string[]
  sourcePlatform: 'shopify' | 'amazon' | 'trendyol' | 'other'
}

export async function fetchProductData(url: string): Promise<ScrapedProduct> {
  if (!validateProductUrl(url)) {
    throw new Error('INVALID_URL')
  }

  const platform = detectPlatform(url)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; AdFlowBot/1.0; +https://adflow.ai)',
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) {
      throw new Error('SCRAPE_FAILED')
    }

    const html = await response.text()
    return parseProductFromHtml(html, platform, url)
  } catch (error) {
    clearTimeout(timeout)
    if (error instanceof Error && error.message === 'INVALID_URL') throw error
    throw new Error('SCRAPE_FAILED')
  }
}

function parseProductFromHtml(
  html: string,
  platform: ScrapedProduct['sourcePlatform'],
  url: string
): ScrapedProduct {
  const titleMatch =
    html.match(/<meta property="og:title" content="([^"]+)"/) ||
    html.match(/<title>([^<]+)<\/title>/)
  const title = titleMatch
    ? decodeHtmlEntities(titleMatch[1].split('|')[0].trim())
    : extractDomainTitle(url)

  const descriptionMatch = html.match(
    /<meta property="og:description" content="([^"]+)"/
  )
  const description = descriptionMatch
    ? decodeHtmlEntities(descriptionMatch[1])
    : null

  const imageMatches = html.matchAll(
    /<meta property="og:image" content="([^"]+)"/g
  )
  const imageUrls: string[] = []
  for (const match of imageMatches) {
    const imgUrl = match[1]
    if (imgUrl.startsWith('http')) imageUrls.push(imgUrl)
  }

  if (imageUrls.length === 0) {
    const srcMatch = html.match(/<img[^>]+src="(https?:\/\/[^"]+\.(jpg|jpeg|png|webp)[^"]*)"/)
    if (srcMatch) imageUrls.push(srcMatch[1])
  }

  const priceData = extractPrice(html, platform)

  return {
    title: title.slice(0, 200),
    description: description ? description.slice(0, 500) : null,
    price: priceData.price,
    currency: priceData.currency,
    imageUrls: imageUrls.slice(0, 5),
    sourcePlatform: platform,
  }
}

function extractPrice(
  html: string,
  platform: string
): { price: number | null; currency: string } {
  if (platform === 'trendyol') {
    const match = html.match(/["']price["']:\s*["']?([\d.,]+)["']?/)
    if (match) {
      const price = parseFloat(match[1].replace(',', '.'))
      if (!isNaN(price)) return { price, currency: 'TRY' }
    }
  }

  const jsonPriceMatch = html.match(
    /"price":\s*["']?([\d.]+)["']?[^}]*"currency":\s*"([A-Z]{3})"/
  )
  if (jsonPriceMatch) {
    const price = parseFloat(jsonPriceMatch[1])
    if (!isNaN(price)) return { price, currency: jsonPriceMatch[2] }
  }

  const metaPrice = html.match(
    /<meta property="product:price:amount" content="([^"]+)"/
  )
  const metaCurrency = html.match(
    /<meta property="product:price:currency" content="([^"]+)"/
  )
  if (metaPrice) {
    const price = parseFloat(metaPrice[1])
    const currency = metaCurrency ? metaCurrency[1] : 'USD'
    if (!isNaN(price)) return { price, currency }
  }

  return { price: null, currency: 'TRY' }
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function extractDomainTitle(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return 'Ürün'
  }
}
