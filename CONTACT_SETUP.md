# Contact Section Setup Guide

## Fitur
✨ **Contact Section** yang telah dibuat memiliki:
- ✅ Form pengiriman email terintegrasi dengan EmailJS
- ✅ Informasi kontak yang lengkap
- ✅ Desain modern dengan gradient dan glassmorphism
- ✅ Responsive design untuk mobile dan desktop
- ✅ Loading state dan success/error messages
- ✅ Social media links
- ✅ Integration dengan navigation menu

## Setup EmailJS

### 1. Daftar di EmailJS
1. Kunjungi [https://www.emailjs.com/](https://www.emailjs.com/)
2. Klik "Sign Up" dan buat akun baru
3. Verifikasi email Anda

### 2. Dapatkan Public Key
1. Login ke dashboard EmailJS
2. Pergi ke **Account** → **API Keys**
3. Copy **Public Key** Anda

### 3. Setup Email Service
1. Pergi ke **Email Services**
2. Klik **Add New Service**
3. Pilih email provider Anda (Gmail, Outlook, Custom, dll)
4. Follow instruksi untuk connect email Anda
5. Copy **Service ID** yang muncul

### 4. Setup Email Template
1. Pergi ke **Email Templates**
2. Klik **Create New Template**
3. Gunakan template berikut:

```
Template Name: Contact Form
Service: [Pilih service yang sudah dibuat]

Subject:
New Message from {{from_name}}

HTML:
<p><strong>From:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Subject:</strong> {{subject}}</p>
<p><strong>Message:</strong></p>
<p>{{message}}</p>
```

4. Copy **Template ID** yang muncul

### 5. Update Contact.jsx
Di file `src/components/Contact.jsx`, ganti:

```javascript
// Line 5 - Replace YOUR_PUBLIC_KEY
emailjs.init('YOUR_PUBLIC_KEY'); // → emailjs.init('paste_your_public_key_here');

// Line 19-21 - Replace credentials
const result = await emailjs.sendForm(
  'YOUR_SERVICE_ID',  // → paste_your_service_id_here
  'YOUR_TEMPLATE_ID', // → paste_your_template_id_here
  formRef.current,
  'YOUR_PUBLIC_KEY'   // → paste_your_public_key_here
);
```

### 6. Test the Form
1. Jalankan development server: `npm run dev`
2. Scroll ke Contact section
3. Isi form dan klik "Send Message"
4. Cek email Anda untuk memastikan email terkirim

## Customization

### Update Contact Information
Edit di `src/components/Contact.jsx`:
```javascript
// Line 119-122 - Email
<a href="mailto:your_email@example.com">your_email@example.com</a>

// Line 131-133 - Phone
<a href="tel:+62XXXX">+62 XXXX</a>

// Line 141-143 - Location
<p>Your City, Country</p>
```

### Update Social Links
Edit social media URLs di Contact.jsx (lines 177-188)

### Customize Colors
Edit di `Contact.css`:
- Ubah `#5227FF` untuk primary color
- Ubah `#9D4EDD` untuk secondary color

## Troubleshooting

### Email tidak terkirim
- ✅ Pastikan Public Key, Service ID, dan Template ID sudah benar
- ✅ Pastikan email service sudah terverifikasi
- ✅ Cek console browser untuk error messages

### Form tidak loading
- ✅ Pastikan @emailjs/browser sudah terinstall
- ✅ Jalankan `npm install` jika diperlukan

### Email masuk spam
- ✅ Ini normal untuk email pertama kali
- ✅ Tandai sebagai "Bukan Spam" di email provider
