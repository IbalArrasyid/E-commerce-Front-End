/**
 * Client-safe WooCommerce utilities
 * These functions do NOT access API secrets and are safe for client components
 */

/**
 * Get WooCommerce setup instructions (static data, no secrets)
 */
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

/**
 * Check if WooCommerce is configured by calling a server API
 * This is safe for client components - it doesn't access env vars directly
 */
export async function checkWooCommerceConfigured() {
    try {
        const response = await fetch('/api/test-woo');
        if (response.ok) {
            const data = await response.json();
            return data.success === true;
        }
        return false;
    } catch {
        return false;
    }
}

/**
 * Static check for public store URL (NEXT_PUBLIC_ vars are safe for client)
 */
export function hasStoreUrl() {
    return !!process.env.NEXT_PUBLIC_WC_STORE_URL;
}

/**
 * Get the store URL (NEXT_PUBLIC_ vars are safe for client)
 */
export function getStoreUrl() {
    return process.env.NEXT_PUBLIC_WC_STORE_URL || '';
}
