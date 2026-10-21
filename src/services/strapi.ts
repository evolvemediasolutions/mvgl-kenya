/**
 * Strapi API Client for MVGL Kenya
 * Fetches dynamic content from Strapi CMS on localhost (or Cloud URL in production).
 */

const RAW_STRAPI_BASE_URL = (import.meta.env.VITE_STRAPI_API_URL || '').trim()
const STRAPI_BASE_URL = RAW_STRAPI_BASE_URL.replace(/\/+$/, '')

export function getStrapiMediaUrl(url: string | null | undefined): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  const cleanPath = url.startsWith('/') ? url : `/${url}`
  return STRAPI_BASE_URL ? `${STRAPI_BASE_URL}${cleanPath}` : cleanPath
}

export async function fetchFromStrapi<T>(endpoint: string, queryParams: string = 'populate=*'): Promise<T[]> {
  try {
    const separator = endpoint.includes('?') ? '&' : '?'
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
    const url = STRAPI_BASE_URL 
      ? `${STRAPI_BASE_URL}/api/${cleanEndpoint}${queryParams ? `${separator}${queryParams}` : ''}`
      : `/api/${cleanEndpoint}${queryParams ? `${separator}${queryParams}` : ''}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.warn(`[Strapi] Failed to fetch ${cleanEndpoint} (${response.status})`)
      return []
    }

    const json = await response.json()
    return json.data || []
  } catch (error) {
    console.warn(`[Strapi] Could not connect to CMS endpoint: ${endpoint}`, error)
    return []
  }
}

export async function fetchOneFromStrapi<T>(endpoint: string, queryParams: string = 'populate=*'): Promise<T | null> {
  try {
    const separator = endpoint.includes('?') ? '&' : '?'
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
    const url = STRAPI_BASE_URL
      ? `${STRAPI_BASE_URL}/api/${cleanEndpoint}${queryParams ? `${separator}${queryParams}` : ''}`
      : `/api/${cleanEndpoint}${queryParams ? `${separator}${queryParams}` : ''}`

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) return null
    const json = await response.json()
    return json.data || null
  } catch {
    return null
  }
}

/**
 * Robust parser for rich text, markdown, HTML, or Strapi Blocks format.
 * Returns an array of clean strings for bullet-point lists.
 */
export function parseStrapiList(input: any): string[] {
  if (!input) return []

  // If already array
  if (Array.isArray(input)) {
    // If array of strings
    if (input.every(i => typeof i === 'string')) {
      return input.map(s => s.replace(/^[-*•\d.]+\s*/, '').trim()).filter(Boolean)
    }
    // If Strapi v5 Blocks format (array of block objects)
    const items: string[] = []
    for (const block of input) {
      if (block.type === 'list' && Array.isArray(block.children)) {
        for (const li of block.children) {
          const text = (li.children || []).map((c: any) => c.text || '').join('').trim()
          if (text) items.push(text)
        }
      } else if (block.children && Array.isArray(block.children)) {
        const text = block.children.map((c: any) => c.text || '').join('').trim()
        if (text) items.push(text)
      }
    }
    if (items.length > 0) return items
  }

  // If string
  if (typeof input === 'string') {
    // If HTML (contains <li>)
    if (input.includes('<li>')) {
      const matches = input.match(/<li>(.*?)<\/li>/gis)
      if (matches) {
        return matches
          .map(m => m.replace(/<\/?li>/gi, '').replace(/<[^>]+>/g, '').trim())
          .filter(Boolean)
      }
    }
    // Split by newlines
    return input
      .split('\n')
      .map(line => line.replace(/^[-*•\d.]+\s*/, '').trim())
      .filter(Boolean)
  }

  return []
}

/**
 * Extracts plain text from string or Strapi v5 Blocks format.
 */
export function extractStrapiText(input: any): string {
  if (!input) return ''
  if (typeof input === 'string') return input
  if (Array.isArray(input)) {
    return input
      .map(block => {
        if (block.children && Array.isArray(block.children)) {
          return block.children.map((c: any) => c.text || '').join('')
        }
        return ''
      })
      .filter(Boolean)
      .join('\n')
  }
  return String(input)
}

