✅ TASK PROMPT FINAL (SIAP PASTE KE CLAUDE)
------------------------------------------

> **Judul Task:**Headless WooCommerce + Next.js Integration using Existing DOKU JOKUL Plugin (Redirect Checkout)

### 🎯 Objective

Integrasikan **Next.js App Router (headless frontend)** dengan **WooCommerce yang menggunakan plugin DOKU JOKUL resmi**, tanpa mengubah mekanisme payment internal plugin.

Tujuan:

*   User checkout di Next.js
    
*   Order dibuat di WooCommerce
    
*   Payment menggunakan **DOKU Hosted Checkout (redirect page)**
    
*   Callback ditangani plugin DOKU
    
*   Next.js hanya **mengambil status order**
    

### 🧱 Arsitektur Final (WAJIB)

```
Next.js Checkout Page
↓
WooCommerce REST API (Create Order)
↓
WooCommerce DOKU JOKUL Plugin
↓
DOKU Hosted Checkout Page
↓
DOKU Callback → WooCommerce (jokul/notify)
↓
Update Order Status
↓
Next.js fetch order status
```

### 🧩 Scope Pekerjaan (WAJIB)

#### 1️⃣ Next.js – Checkout Trigger

Implement di Next.js App Router:

*   Create order via WooCommerce REST API
    
*   Redirect user ke:
    
    *   order.payment\_url (jika tersedia)
        
    *   atau order.checkout\_payment\_url
        
*   Jangan handle payment logic di frontend
    

#### 2️⃣ Next.js – Redirect & UX

*   Loading page sebelum redirect
    
*   Success page:
    
    *   /checkout/success
        
    *   Fetch order status dari WooCommerce API
        
*   Failed page:
    
    *   /checkout/failed
        

#### 3️⃣ WooCommerce – Order Status Fetch

Gunakan Woo REST API:

```
GET /wp-json/wc/v3/orders/{id}
```

Gunakan field:

*   status
    
*   payment\_method
    
*   transaction\_id
    

### 🔐 Security Rules (WAJIB)

Claude **DILARANG**:

*   Membuat endpoint callback sendiri
    
*   Mengakses shared key DOKU
    
*   Mengubah Notification URL
    
*   Menggenerate signature manual
    
*   Menaruh secret di Next.js
    

### 🌍 Environment

*   DOKU Sandbox
    
*   Plugin: **DOKU JOKUL WooCommerce**
    
*   Callback: **Default plugin**
    

### 📁 Output yang Diharapkan

Claude HARUS memberikan:

1.  Flow checkout headless yang benar
    
2.  Contoh fetch Woo REST API di Next.js App Router
    
3.  Redirect logic ke payment page
    
4.  Pattern polling order status
    
5.  Error handling (pending, failed, success)
    
6.  UX recommendation (loading / retry)
    

### 🚫 Larangan Keras

*   Jangan embed iframe
    
*   Jangan custom UI DOKU
    
*   Jangan bypass plugin
    
*   Jangan reimplement payment gateway
    

### ✅ Definition of Done

*   Order dibuat di Woo
    
*   User redirect ke DOKU
    
*   Callback update order
    
*   Next.js membaca status
    
*   Checkout sukses end-to-end
    

🧠 Kenapa Versi Ini Aman & Tepat
--------------------------------

*   Tidak bentrok plugin
    
*   Tidak melanggar flow DOKU
    
*   Cocok untuk headless
    
*   Minim risiko gagal callback
    
*   Production-friendly