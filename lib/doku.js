import crypto from 'crypto';

// Setup Konfigurasi
const DOKU_CLIENT_ID = process.env.DOKU_CLIENT_ID;
const DOKU_SECRET_KEY = process.env.DOKU_SECRET_KEY;
const DOKU_URL = process.env.DOKU_API_URL;

function generateSignatureOrders({
  clientId,
  requestId,
  timestamp,
  requestTarget,
  jsonBody,
  secretKey
}) {
  // 1. Digest SHA256 Base64 dari BODY (WAJIB STRING JSON)
  const digest = crypto
    .createHash("sha256")
    .update(jsonBody)
    .digest("base64");

  // 2. Component String (HARUS PERSIS, newline = \n)
  const component =
    `Client-Id:${clientId}\n` +
    `Request-Id:${requestId}\n` +
    `Request-Timestamp:${timestamp}\n` +
    `Request-Target:${requestTarget}\n` +
    `Digest:${digest}`;

  // 3. HMAC SHA256 Base64
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(component)
    .digest("base64");

  return `HMACSHA256=${signature}`;
}

export default generateSignature;



/**
 * Helper: Generate DOKU Signature (Jokul / Doku V2 Standard)
 * Logic updated to use Hex for Digest and Base64 for HMAC
 */
function generateSignature({ clientId, requestId, timestamp, requestTarget, secretKey }) {
    const component =
        `Client-Id:${clientId}\n` +
        `Request-Id:${requestId}\n` +
        `Request-Timestamp:${timestamp}\n` +
        `Request-Target:${requestTarget}`;

    const signature = crypto.createHmac('sha256', secretKey)
        .update(component, 'utf8')
        .digest('base64');

    return `HMACSHA256=${signature}`;
}


/**
 * Fungsi Utama: Generate Payment URL
 */
export async function generateDokuPaymentUrl({ orderId, amount, customerEmail, customerName, products }) {
    if (!DOKU_CLIENT_ID || !DOKU_SECRET_KEY) {
        throw new Error("DOKU Credentials belum disetting di .env.local");
    }

    try {
        const requestId = `REQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const timestamp = new Date().toISOString().slice(0, 19) + "Z";
        const requestTarget = '/checkout/v1/payment';
        // Note: Jika URL endpoint berubah (misal ada query params), requestTarget harus ikut berubah.

        // Format Invoice Unik
        // Kita gunakan invoice number dari orderId jika memungkinkan, atau generate baru
        const uniqueInvoiceNumber = orderId.toString().startsWith('INV') ? orderId : `INV-${orderId}-${Math.floor(Date.now() / 1000)}`;

        const paymentBody = {
            order: {
                invoice_number: uniqueInvoiceNumber,
                amount: Math.round(amount),
                callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/finish`,
                auto_redirect: true
            },
            payment: {
                payment_due_date: 120 // menit
            },
            customer: {
                name: customerName,
                email: customerEmail
            }
        };

        // Opsional: Tambahkan Line Items jika data products tersedia dan valid
        // DOKU kadang strict soal total amount vs sum of line items. 
        // Aman-nya jika total amount sudah dihitung di backend, kirim global amount saja.
        // Jika ingin mengirim basket, pastikan perhitungannya 100% akurat down to rupiah.

        const jsonBody = JSON.stringify(paymentBody);

        const signature = generateSignatureOrders({
            clientId: DOKU_CLIENT_ID,
            requestId,
            timestamp,
            requestTarget,
            jsonBody,
            secretKey: DOKU_SECRET_KEY
        });

        console.log('🚀 Sending DOKU Request:', {
            url: `${DOKU_URL}${requestTarget}`,
            invoice: uniqueInvoiceNumber,
            amount: amount,
            requestId
        });

        const response = await fetch(`${DOKU_URL}${requestTarget}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Client-Id': DOKU_CLIENT_ID,
                'Request-Id': requestId,
                'Request-Timestamp': timestamp,
                'Signature': signature
            },
            body: jsonBody
        });

        const data = await response.json();

        // Handle Non-200 Responses
        if (!response.ok) {
            const errorMessage =
                data.error?.message ||
                data.message ||
                (data.error ? JSON.stringify(data.error) : "Unknown Error");

            console.error('❌ DOKU API ERROR:', {
                status: response.status,
                message: errorMessage,
                details: data
            });

            throw new Error(`DOKU Payment Failed: ${errorMessage}`);
        }

        console.log('✅ DOKU Success:', data.response.order.invoice_number);

        return {
            payment_url: data.response.payment.url,
            invoice_number: data.response.order.invoice_number,
            session_id: data.response.order.session_id || data.response.payment_session_id,  // Fallback key
            payment_due_minutes: paymentBody.payment.payment_due_date
        };


    } catch (error) {
        console.error("🚨 DOKU Library Exception:", error.message);
        throw error;
    }
}

/**
 * Cek Status Pembayaran ke DOKU
 */
export async function checkDokuPaymentStatus(invoiceNumber) {
    const requestTarget = `/orders/v1/status/${invoiceNumber}`;
    const requestId = `REQ-${crypto.randomUUID()}`;
    const timestamp = new Date().toISOString().slice(0, 19) + 'Z';

    const signature = generateSignature({
        clientId: DOKU_CLIENT_ID,
        requestId,
        timestamp,
        requestTarget,
        secretKey: DOKU_SECRET_KEY
    });

    console.log("🔍 DOKU GET Status Request:", { invoiceNumber, requestTarget, requestId, timestamp, signature });

    const response = await fetch(`${DOKU_URL}${requestTarget}`, {
        method: 'GET',
        headers: {
            'Client-Id': DOKU_CLIENT_ID,
            'Request-Id': requestId,
            'Request-Timestamp': timestamp,
            'Signature': signature,
        }
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('📥 DOKU GET Response Error:', data);
        throw new Error(data.error?.message || `HTTP ${response.status}`);
    }

    console.log('📥 DOKU GET Response Success:', data);
    return data.response?.transaction?.status || 'PENDING';
}
