import 'server-only';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const storeUrl = process.env.NEXT_PUBLIC_WC_STORE_URL;
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Build phase detection - prevent API calls during next build
 */
const IS_BUILD_PHASE = process.env.NEXT_PHASE === 'phase-production-build';

/**
 * Custom User-Agent to identify requests and avoid Cloudflare bot challenges
 */
const USER_AGENT = 'HomeDecorIndonesia/1.0 (Next.js Server; +https://homedecorindonesia.com)';

// Helper to check if environment variable exists
function hasEnv(variableName) {
	return !!process.env[variableName];
}

// Helper to validate environment variables with better error messages
function validateEnv(variableName, context = '') {
	if (!hasEnv(variableName)) {
		const message = `Missing environment variable: ${variableName}`;
		if (isDevelopment) {
			console.warn(`⚠️  ${message} ${context ? context : ''}`);
			console.log('💡 To fix this, add the following to your .env.local file:');
			console.log(`   ${variableName}=your_actual_value_here`);
			return false;
		} else {
			throw new Error(message);
		}
	}
	return true;
}

export function createWooClientRead() {
	if (!validateEnv("WC_READ_KEY", "(Read access for browsing products)")) {
		return null;
	}
	if (!validateEnv("WC_READ_SECRET")) {
		return null;
	}
	if (!storeUrl) {
		console.error('Missing NEXT_PUBLIC_WC_STORE_URL');
		return null;
	}

	try {
		return new WooCommerceRestApi({
			url: storeUrl,
			consumerKey: process.env.WC_READ_KEY,
			consumerSecret: process.env.WC_READ_SECRET,
			version: "wc/v3",
			queryStringAuth: false, // Use Basic Auth header instead of query string
			axiosConfig: {
				headers: {
					'User-Agent': USER_AGENT
				}
			}
		});
	} catch (error) {
		console.error('Failed to create WooCommerce read client:', error);
		return null;
	}
}

export function createWooClientWrite() {
	if (!validateEnv("WC_WRITE_KEY", "(Write access for creating orders and customers)")) {
		return null;
	}
	if (!validateEnv("WC_WRITE_SECRET")) {
		return null;
	}
	if (!storeUrl) {
		console.error('Missing NEXT_PUBLIC_WC_STORE_URL');
		return null;
	}

	try {
		return new WooCommerceRestApi({
			url: storeUrl,
			consumerKey: process.env.WC_WRITE_KEY,
			consumerSecret: process.env.WC_WRITE_SECRET,
			version: "wc/v3",
			queryStringAuth: false, // Use Basic Auth header instead of query string
			axiosConfig: {
				headers: {
					'User-Agent': USER_AGENT
				}
			}
		});
	} catch (error) {
		console.error('Failed to create WooCommerce write client:', error);
		return null;
	}
}

export function createWooClientFull() {
	if (!validateEnv("WC_FULL_KEY", "(Full access for administrative operations)")) {
		return null;
	}
	if (!validateEnv("WC_FULL_SECRET")) {
		return null;
	}
	if (!storeUrl) {
		console.error('Missing NEXT_PUBLIC_WC_STORE_URL');
		return null;
	}

	try {
		return new WooCommerceRestApi({
			url: storeUrl,
			consumerKey: process.env.WC_FULL_KEY,
			consumerSecret: process.env.WC_FULL_SECRET,
			version: "wc/v3",
			queryStringAuth: false, // Use Basic Auth header instead of query string
			axiosConfig: {
				headers: {
					'User-Agent': USER_AGENT
				}
			}
		});
	} catch (error) {
		console.error('Failed to create WooCommerce full client:', error);
		return null;
	}
}

// Helper to check if WooCommerce API is properly configured
export function isWooCommerceConfigured(type = 'read') {
	switch (type) {
		case 'write':
			return hasEnv('WC_WRITE_KEY') && hasEnv('WC_WRITE_SECRET');
		case 'full':
			return hasEnv('WC_FULL_KEY') && hasEnv('WC_FULL_SECRET');
		case 'read':
		default:
			return hasEnv('WC_READ_KEY') && hasEnv('WC_READ_SECRET');
	}
}

// Helper to get setup instructions
export function getWooCommerceSetupInstructions() {
	return {
		missing: [
			'NEXT_PUBLIC_WC_STORE_URL=https://your-store.com',
			'WC_READ_KEY=ck_your_read_key_here',
			'WC_READ_SECRET=cs_your_read_secret_here',
			'WC_WRITE_KEY=ck_your_write_key_here',
			'WC_WRITE_SECRET=cs_your_write_secret_here'
		],
		instructions: [
			'1. Go to your WordPress admin → WooCommerce → Settings → Advanced → API',
			'2. Add a new API key with "Read/Write" permissions',
			'3. Copy the Consumer Key and Consumer Secret to your .env.local file',
			'4. Set your store URL in NEXT_PUBLIC_WC_STORE_URL'
		],
		testApi: () => {
			if (typeof window !== 'undefined') {
				window.open('/api/test-woo', '_blank');
			}
		}
	};
}

// Additional API functions for product fetching
export async function getProductBySlug(slug) {
	try {
		// Try Store API first (no auth required)
		const response = await fetch(
			`${storeUrl}/wp-json/wc/store/products?slug=${encodeURIComponent(slug)}`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
				next: { revalidate: 3600 } // Cache for 1 hour
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch product: ${response.statusText}`);
		}

		const products = await response.json();
		return products.length > 0 ? products[0] : null;
	} catch (error) {
		console.error('Error fetching product by slug:', error);

		// Fallback to REST API v3 with auth
		try {
			const client = createWooClientRead();
			const result = await client.get('products', { slug: slug });
			return result.data.length > 0 ? result.data[0] : null;
		} catch (fallbackError) {
			console.error('Fallback API also failed:', fallbackError);
			throw error;
		}
	}
}

export async function getProductById(id) {
	try {
		// Try Store API first (no auth required)
		const response = await fetch(
			`${storeUrl}/wp-json/wc/store/products/${id}`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
				next: { revalidate: 3600 } // Cache for 1 hour
			}
		);

		if (response.ok) {
			return await response.json();
		}
	} catch (error) {
		console.error('Store API failed, trying REST API:', error);
	}

	// Fallback to REST API v3 with auth
	try {
		const client = createWooClientRead();
		const result = await client.get(`products/${id}`);
		return result.data;
	} catch (error) {
		console.error('Error fetching product by ID:', error);
		throw error;
	}
}

export async function getRelatedProducts(productId, categoryId, limit = 6) {
	try {
		// Try Store API first
		let url = `${storeUrl}/wp-json/wc/store/products?category=${categoryId}&per_page=${limit}`;

		let response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json'
			},
			next: { revalidate: 3600 }
		});

		let products = [];

		if (response.ok) {
			products = await response.json();
		} else {
			// Fallback to REST API v3 with auth
			const client = createWooClientRead();
			const result = await client.get('products', {
				category: categoryId,
				per_page: limit,
				exclude: productId
			});
			products = result.data;
		}

		// Filter out the current product
		return products.filter(product => product.id !== productId);
	} catch (error) {
		console.error('Error fetching related products:', error);
		return [];
	}
}

export async function getProductsByCategory(categorySlug, page = 1, perPage = 12) {
	try {
		const response = await fetch(
			`${storeUrl}/wp-json/wc/store/products?category=${encodeURIComponent(categorySlug)}&page=${page}&per_page=${perPage}`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
				next: { revalidate: 600 } // Cache for 10 minutes
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch products by category: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching products by category:', error);

		// Fallback to REST API v3
		try {
			const client = createWooClientRead();
			const result = await client.get('products', {
				category: categorySlug,
				page: page,
				per_page: perPage
			});
			return result.data;
		} catch (fallbackError) {
			console.error('Fallback API also failed:', fallbackError);
			throw error;
		}
	}
}

export async function getCategories() {
	try {
		const response = await fetch(
			`${storeUrl}/wp-json/wc/store/products/categories`,
			{
				headers: {
					'Content-Type': 'application/json'
				},
				next: { revalidate: 3600 } // Cache for 1 hour
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch categories: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching categories:', error);

		// Fallback to REST API v3
		try {
			const client = createWooClientRead();
			const result = await client.get('products/categories');
			return result.data;
		} catch (fallbackError) {
			console.error('Fallback API also failed:', fallbackError);
			throw error;
		}
	}
}

