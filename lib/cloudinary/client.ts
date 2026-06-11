export interface UploadResult {
  url: string
  publicId: string
  width: number
  height: number
}

async function getCloudinary() {
  const { v2 } = await import('cloudinary')
  v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })
  return v2
}

export async function uploadImageFromUrl(
  url: string,
  folder = 'adflow-ai/products'
): Promise<UploadResult> {
  const cloudinary = await getCloudinary()
  const result = await cloudinary.uploader.upload(url, {
    folder,
    resource_type: 'image',
  })

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  }
}

export async function removeBackground(publicId: string): Promise<string> {
  const cloudinary = await getCloudinary()
  const result = await cloudinary.uploader.upload(
    `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`,
    {
      folder: 'adflow-ai/processed',
      background_removal: 'cloudinary_ai',
      resource_type: 'image',
    }
  )
  return result.secure_url
}

export async function buildCreativeUrl(
  publicId: string,
  templateType: 'instagram_post' | 'story' | 'square',
  backgroundUrl?: string
): Promise<string> {
  const cloudinary = await getCloudinary()

  const dimensions = {
    instagram_post: { width: 1080, height: 1080 },
    story: { width: 1080, height: 1920 },
    square: { width: 800, height: 800 },
  }

  const { width, height } = dimensions[templateType]
  const transformations: string[] = [`w_${width},h_${height},c_fill`]

  if (backgroundUrl) {
    const encodedBg = Buffer.from(backgroundUrl).toString('base64')
    transformations.unshift(`l_fetch:${encodedBg},w_${width},h_${height},c_fill`)
  }

  return cloudinary.url(publicId, {
    transformation: transformations,
    secure: true,
  })
}

export async function deleteImage(publicId: string): Promise<void> {
  const cloudinary = await getCloudinary()
  await cloudinary.uploader.destroy(publicId)
}
