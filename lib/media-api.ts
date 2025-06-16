interface StrapiMediaFile {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats: any
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface StrapiMediaGroup {
  id: number
  documentId: string
  Name: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  Media: StrapiMediaFile[]
}

interface StrapiMediaResponse {
  data: StrapiMediaGroup[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

const STRAPI_BASE_URL = "https://grateful-action-a3c4ebca24.strapiapp.com"

export async function fetchMediaAssets(): Promise<StrapiMediaGroup[]> {
  try {
    // Only populate the fields we actually use for media
    const populateQuery = [
      "populate[Media][fields][0]=url",
      "populate[Media][fields][1]=formats",
      "populate[Media][fields][2]=mime",
      "populate[Media][fields][3]=alternativeText",
      "fields[0]=Name",
    ].join("&")

    const response = await fetch(`${STRAPI_BASE_URL}/api/medias/?${populateQuery}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.status}`)
    }

    const data: StrapiMediaResponse = await response.json()
    return data.data
  } catch (error) {
    console.error("Error fetching media assets:", error)
    return []
  }
}

export function getMediaUrl(media: StrapiMediaFile): string {
  const url = media.url
  return url.startsWith("http") ? url : `${STRAPI_BASE_URL}${url}`
}

export function findMediaGroupByName(mediaGroups: StrapiMediaGroup[], name: string): StrapiMediaGroup | null {
  return (
    mediaGroups.find(
      (group) =>
        group.Name.toLowerCase().includes(name.toLowerCase()) ||
        group.Name.toLowerCase().replace(/[-_]/g, "").includes(name.toLowerCase().replace(/[-_]/g, "")),
    ) || null
  )
}

export function getImageByName(mediaGroups: StrapiMediaGroup[], name: string): string {
  const mediaGroup = findMediaGroupByName(mediaGroups, name)
  if (mediaGroup && mediaGroup.Media && mediaGroup.Media.length > 0) {
    // Find the first image file (not video)
    const imageFile = mediaGroup.Media.find((file) => file.mime.startsWith("image/"))
    if (imageFile) {
      return getMediaUrl(imageFile)
    }
  }
  return "/placeholder.svg?height=600&width=400"
}

export function getVideoByName(mediaGroups: StrapiMediaGroup[], name: string): string {
  const mediaGroup = findMediaGroupByName(mediaGroups, name)
  if (mediaGroup && mediaGroup.Media && mediaGroup.Media.length > 0) {
    // Find the first video file
    const videoFile = mediaGroup.Media.find((file) => file.mime.startsWith("video/"))
    if (videoFile) {
      return getMediaUrl(videoFile)
    }
  }
  return ""
}

// Export types for use in components
export type { StrapiMediaGroup, StrapiMediaFile }
