import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface AdCopyResult {
  headline: string
  description: string
}

export async function generateAdCopy(
  productTitle: string,
  productDescription: string,
  price: number | null,
  currency: string,
  platform: string
): Promise<AdCopyResult> {
  const systemPrompt = `Sen bir dönüşüm odaklı reklam metin yazarısın.
${platform} platformu için kısa, dikkat çekici reklam metinleri yazıyorsun.
Türkçe yaz. Başlık max 40 karakter, açıklama max 125 karakter olsun.
JSON formatında yanıt ver: { "headline": "...", "description": "..." }`

  const userContent = `[PRODUCT_DATA]
Ürün: ${productTitle}
${productDescription ? `Açıklama: ${productDescription.slice(0, 200)}` : ''}
${price ? `Fiyat: ${price} ${currency}` : ''}
Platform: ${platform}
[/PRODUCT_DATA]`

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userContent },
    ],
    response_format: { type: 'json_object' },
    max_tokens: 200,
    temperature: 0.7,
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('No content from OpenAI')

  const parsed = JSON.parse(content) as AdCopyResult
  return parsed
}

export async function generateBackgroundPrompt(
  productTitle: string,
  platform: string
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content:
          'Generate a short DALL-E image prompt for a product advertisement background scene. Return only the prompt text, no explanation.',
      },
      {
        role: 'user',
        content: `[PRODUCT_DATA] Product: ${productTitle} | Platform: ${platform} [/PRODUCT_DATA]`,
      },
    ],
    max_tokens: 100,
    temperature: 0.8,
  })

  return response.choices[0]?.message?.content ?? 'Minimalist studio background with soft gradient lighting'
}

export async function generateBackgroundImage(prompt: string): Promise<string> {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: `Product advertisement background: ${prompt}. Clean, professional, no text, no products.`,
    n: 1,
    size: '1024x1024',
    quality: 'standard',
  })

  const url = response.data?.[0]?.url
  if (!url) throw new Error('No image URL from DALL-E')
  return url
}

export default openai
