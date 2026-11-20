/**
 * WordPress WPGraphQL Client for MVGL Kenya
 * Fetches dynamic content from WordPress via GraphQL with 0-second update delay
 * and instant 0ms cached local rendering (Stale-While-Revalidate).
 */

const RAW_GRAPHQL_URL = (import.meta.env.VITE_WORDPRESS_GRAPHQL_URL || 'https://kenyacms.multivistaprintsolutions.com/graphql').trim()
export const WORDPRESS_GRAPHQL_URL = RAW_GRAPHQL_URL.replace(/\/+$/, '')

// In-memory cache + localStorage persistence for INSTANT (0ms) loads
const memoryCache: Record<string, any> = {}

export function getCachedData<T>(key: string): T[] | null {
  if (memoryCache[key]) {
    return memoryCache[key] as T[]
  }
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(`mvgl_wp_cache_${key}`) || localStorage.getItem(`mvgl_cache_${key}`)
      if (stored) {
        const parsed = JSON.parse(stored)
        memoryCache[key] = parsed
        return parsed as T[]
      }
    } catch {
      // ignore parsing error
    }
  }
  return null
}

export function setCachedData<T>(key: string, data: T[]): void {
  memoryCache[key] = data
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`mvgl_wp_cache_${key}`, JSON.stringify(data))
    } catch {
      // ignore quota error
    }
  }
}

// Backward-compatible aliases
export const getCachedStrapiData = getCachedData
export const setCachedStrapiData = setCachedData

/**
 * Universal media URL resolver for WordPress attachments
 */
export function getMediaUrl(url: string | null | undefined): string {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  const cleanPath = url.startsWith('/') ? url : `/${url}`
  const baseOrigin = new URL(WORDPRESS_GRAPHQL_URL).origin
  return `${baseOrigin}${cleanPath}`
}

export const getStrapiMediaUrl = getMediaUrl

/**
 * Strips HTML tags, decodes common entities, and cleans whitespace
 */
export function stripHtml(input: any): string {
  if (!input) return ''
  const str = String(input)
  return str
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
}

export const extractStrapiText = stripHtml

/**
 * Parses rich text, HTML <li>, newlines, or arrays into clean bullet points
 */
export function parseList(input: any): string[] {
  if (!input) return []

  // If already array of strings
  if (Array.isArray(input)) {
    return input.map(s => (typeof s === 'string' ? s.replace(/^[-*•\d.]+\s*/, '').trim() : '')).filter(Boolean)
  }

  if (typeof input === 'string') {
    // If HTML contains <li>
    if (input.includes('<li>')) {
      const matches = input.match(/<li>(.*?)<\/li>/gis)
      if (matches) {
        return matches
          .map(m => stripHtml(m).replace(/^[-*•\d.]+\s*/, '').trim())
          .filter(Boolean)
      }
    }
    // Newline-separated
    return input
      .split('\n')
      .map(line => stripHtml(line).replace(/^[-*•\d.]+\s*/, '').trim())
      .filter(Boolean)
  }

  return []
}

export const parseStrapiList = parseList

/**
 * Executes a GraphQL query against WordPress
 * HTTP POST requests bypass browser GET caching, providing live 0-second freshness.
 */
export async function fetchGraphQL<T>(query: string, variables: Record<string, any> = {}): Promise<T | null> {
  try {
    const res = await fetch(WORDPRESS_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // cache: 'no-cache' ensures 0-second delay without browser caching
      cache: 'no-cache',
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    if (!res.ok) {
      console.warn(`[WPGraphQL] HTTP error ${res.status}: ${res.statusText}`)
      return null
    }

    const json = await res.json()
    if (json.errors) {
      console.warn('[WPGraphQL] Query errors:', json.errors)
      // Even if some fields have errors, json.data might have partial results
      return (json.data as T) || null
    }

    return json.data as T
  } catch (error) {
    console.warn('[WPGraphQL] Connection failed to WordPress GraphQL endpoint:', error)
    return null
  }
}

// -------------------------------------------------------------
// GRAPHQL QUERIES
// -------------------------------------------------------------

export const GET_PRODUCTS_QUERY = `
  query GetProducts {
    products(first: 100) {
      nodes {
        id
        databaseId
        slug
        title
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        # Supports standard WPGraphQL for ACF fields
        acf {
          specs
          partner
          solution
          tag
          category
          exploreUrl
          isFeatured
          brochure {
            mediaItemUrl
          }
        }
      }
    }
  }
`

export const GET_EVENTS_QUERY = `
  query GetEvents {
    events(first: 100) {
      nodes {
        id
        databaseId
        slug
        title
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        acf {
          eventType
          dateDisplay
          startDate
          endDate
          location
          boothNumber
          registrationUrl
          eventStatus
        }
      }
    }
  }
`

export const GET_POSTS_QUERY = `
  query GetPosts {
    posts(first: 100) {
      nodes {
        id
        databaseId
        slug
        title
        content
        excerpt
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        acf {
          readTime
          isFeatured
        }
      }
    }
  }
`

export const GET_CAREERS_QUERY = `
  query GetCareers {
    careers(first: 100) {
      nodes {
        id
        databaseId
        slug
        title
        content
        excerpt
        acf {
          jobCode
          department
          location
          jobType
          experienceLevel
          summary
          responsibilities
          requirements
          deadline
          isActive
        }
      }
    }
  }
`

/**
 * Universal fallback fetch helper for legacy compatibility during transition
 */
export async function fetchFromStrapi<T>(collection: string): Promise<T[]> {
  // Gracefully return empty array so legacy callers fall back to cached/mock data
  return getCachedData<T>(collection) || []
}

