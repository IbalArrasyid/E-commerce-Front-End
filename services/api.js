import 'server-only';

export const dynamic = 'force-dynamic';

const base = process.env.NEXT_PUBLIC_WC_STORE_URL;
const key = process.env.WC_READ_KEY;
const secret = process.env.WC_READ_SECRET;

const BASE_URL = `${base}/wp-json/wc/v3`;

/**
 * Build phase detection
 * During `next build`, we return empty data to prevent external API calls
 */
const IS_BUILD_PHASE = process.env.NEXT_PHASE === 'phase-production-build';

/**
 * Custom User-Agent to identify requests and avoid Cloudflare bot challenges
 */
const USER_AGENT = 'HomeDecorIndonesia/1.0 (Next.js Server; +https://homedecorindonesia.com)';

/**
 * Maximum products per page to prevent excessive API requests
 */
const MAX_PER_PAGE = 24;

/**
 * Guard function to block external fetch during build
 * Returns true if we should skip the fetch (during build phase)
 */
function guardBuildPhase(operation) {
  if (IS_BUILD_PHASE) {
    console.warn(`[BUILD PHASE] Skipping external API call: ${operation}`);
    return true;
  }
  return false;
}

/**
 * In-memory cache for categories
 * Uses Promise singleton pattern to ensure only 1 fetch per request lifecycle
 */
let categoriesCache = null;
let categoriesCachePromise = null;

/**
 * Reset the cache (useful for testing or when categories need refresh)
 */
export function resetCategoriesCache() {
  categoriesCache = null;
  categoriesCachePromise = null;
}

/**
 * Fetch JSON from WooCommerce API with Basic Auth
 * - Uses Authorization header (not query string) to hide credentials from logs
 * - Includes custom User-Agent to avoid Cloudflare challenges
 * - Blocked during build phase (returns empty array)
 */
export async function fetchJson(path) {
  // Guard: Skip during build phase
  if (guardBuildPhase(`fetchJson: ${path}`)) {
    return [];
  }

  const auth = Buffer.from(`${key}:${secret}`).toString('base64');

  const res = await fetch(`${BASE_URL}${path}&stock_status=instock&status=publish`, {
    headers: {
      'Authorization': `Basic ${auth}`,
      'User-Agent': USER_AGENT,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status}`);
  }

  return res.json();
}

/**
 * Get all categories from cache or fetch once
 * Uses Promise singleton to prevent concurrent duplicate requests
 */
async function getAllCategories() {
  // Return from cache if available
  if (categoriesCache) {
    return categoriesCache;
  }

  // If a fetch is already in progress, wait for it
  if (categoriesCachePromise) {
    return categoriesCachePromise;
  }

  // Start a new fetch and cache the promise
  categoriesCachePromise = fetchJson('/products/categories?per_page=100')
    .then((cats) => {
      categoriesCache = Array.isArray(cats) ? cats : [];
      return categoriesCache;
    })
    .catch((error) => {
      // Reset promise on error so next call can retry
      categoriesCachePromise = null;
      throw error;
    });

  return categoriesCachePromise;
}

/**
 * Get category ID from slug or name
 * Uses cached categories - only 1 API call per request lifecycle
 * 
 * @param {string} categorySlug - Category slug to search for
 * @param {string[]} categoryName - Array of category names to search for as fallback
 * @returns {number|null} - Category ID or null if not found
 */
export async function getCategoryId(categorySlug, categoryName) {
  const categories = await getAllCategories();

  if (!categories || categories.length === 0) {
    return null;
  }

  // First: Try exact slug match
  const slugMatch = categories.find(
    (c) => (c?.slug || '').toLowerCase() === categorySlug.toLowerCase()
  );
  if (slugMatch) return slugMatch.id;

  // Second: Try name match from categoryName array
  for (const name of categoryName) {
    const nameMatch = categories.find(
      (c) => (c?.name || '').toLowerCase().includes(name.toLowerCase())
    );
    if (nameMatch) return nameMatch.id;
  }

  return null;
}

/**
 * Get products by category
 * Optimized: Only 2 API calls total (1 for categories, 1 for products)
 * 
 * @param {string} categorySlug - Category slug
 * @param {string[]} categoryName - Category name alternatives
 * @param {number} numberPerPage - Products per page (max 24)
 */
export async function getProducts(categorySlug, categoryName, numberPerPage) {
  try {
    const categoryId = await getCategoryId(categorySlug, categoryName);

    // Validation: Don't request products without a valid category
    if (!categoryId) {
      console.warn(`Category not found: ${categorySlug}`);
      return {
        categoryId: null,
        products: [],
      };
    }

    // Limit per_page to MAX_PER_PAGE to prevent excessive fetching
    const perPage = Math.min(numberPerPage || MAX_PER_PAGE, MAX_PER_PAGE);

    const data = await fetchJson(`/products?category=${categoryId}&per_page=${perPage}`);

    return {
      categoryId,
      products: Array.isArray(data) ? data : [],
    };
  } catch (error) {
    throw new Error(`Failed to get products: ${error.message}`);
  }
}
