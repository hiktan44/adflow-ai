const ALLOWED_DOMAINS = [
  /^([a-z0-9-]+\.)?myshopify\.com$/,
  /^([a-z0-9-]+\.)?shopify\.com$/,
  /^([a-z0-9-]+\.)?amazon\.com(\.tr)?$/,
  /^([a-z0-9-]+\.)?trendyol\.com$/,
]

export function validateProductUrl(url: string): boolean {
  if (url.length > 2048) return false

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return false
  }

  if (parsed.protocol !== 'https:') return false

  const hostname = parsed.hostname.toLowerCase()
  return ALLOWED_DOMAINS.some((pattern) => pattern.test(hostname))
}

export function detectPlatform(
  url: string
): 'shopify' | 'amazon' | 'trendyol' | 'other' {
  try {
    const { hostname } = new URL(url)
    if (hostname.includes('myshopify') || hostname.includes('shopify')) return 'shopify'
    if (hostname.includes('amazon')) return 'amazon'
    if (hostname.includes('trendyol')) return 'trendyol'
  } catch {
    // invalid url
  }
  return 'other'
}

export function sanitizeUserInput(input: string, maxLength = 500): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength)
}

export function isValidHexColor(hex: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(hex)
}
