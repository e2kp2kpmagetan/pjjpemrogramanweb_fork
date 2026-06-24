# CRM Latihan PJJ Pemrograman Web

## 📌 Deskripsi Proyek

CRM Latihan PJJ Pemrograman Web adalah aplikasi **Customer Relationship Management (CRM)** berbasis web yang dikembangkan sebagai proyek PJJ Pemrograman Web. Sistem ini dapat membantu perusahaan dalam mengelola data pelanggan, prospek bisnis, aktivitas penjualan, dan kontak pelanggan secara terpusat.

Aplikasi ini menerapkan **Role-Based Access Control (RBAC)** sehingga setiap pengguna memiliki hak akses sesuai dengan perannya, seperti Admin, Sales, dan Staff.

---

## 🚀 Fitur Utama

### 1. Manajemen Customer

* Menambah data customer baru
* Melihat daftar customer
* Mengubah informasi customer
* Menghapus data customer

### 2. Manajemen Leads

* Mengelola prospek bisnis
* Menentukan PIC (Person In Charge)
* Memantau status prospek

### 3. Manajemen Activities

* Mencatat aktivitas harian
* Jenis aktivitas:

  * Call
  * Meeting
  * Email
  * Follow Up

### 4. Manajemen Contacts

* Menyimpan kontak pelanggan
* Menghubungkan kontak dengan customer terkait

### 5. Manajemen Users

* Khusus Admin
* Menambah pengguna baru
* Mengubah role pengguna
* Menghapus akun pengguna

### 6. Role-Based Access Control

Sistem membedakan hak akses berdasarkan role:

| Role  | Hak Akses                                           |
| ----- | --------------------------------------------------- |
| Admin | Akses penuh ke seluruh sistem                       |
| Sales | Mengelola customer, leads, activities, dan contacts |
| Staff | Akses terbatas sesuai tugas yang diberikan          |

### 7. JWT Authentication

* Login menggunakan JSON Web Token (JWT)
* Identitas pengguna disimpan secara aman
* Data creator otomatis tercatat berdasarkan token login

---

## 🏗️ Teknologi yang Digunakan

### Backend

* Node.js
* MySQL
* JWT Authentication

### Frontend

* HTML5
* CSS3
* JavaScript

### Database

* MySQL

---

## 📂 Struktur Proyek

```
pjjpemrogramanweb/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── frontend/
│   │   ├── css/
│   │   ├── js/
│   │   ├── index.html
│   │   └── login.html
│   │
│   ├── .env
│   ├── package.json
│   └── app.js
│
└── README.md
```

### Keterangan

* **config/** → Konfigurasi database dan aplikasi.
* **controllers/** → Logika bisnis untuk setiap endpoint.
* **middleware/** → Middleware autentikasi dan otorisasi.
* **models/** → Interaksi dengan database.
* **routes/** → Routing API backend.
* **frontend/** → Tampilan aplikasi berbasis HTML, CSS, dan JavaScript.

  * **css/** → File stylesheet.
  * **js/** → File JavaScript frontend.
  * **index.html** → Dashboard utama aplikasi.
  * **login.html** → Halaman login pengguna.
* **app.js** → Entry point aplikasi backend.
* **.env** → Konfigurasi environment dan database.

---

## ⚙️ Instalasi dan Menjalankan Proyek

### 1. Clone Repository

```bash
git clone https://github.com/dorkray/pjjpemrogramanweb.git
```

### 2. Masuk ke Folder Project

```bash
cd pjjpemrogramanweb
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Konfigurasi Environment

Buat file `.env` di folder backend CONTOH:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=crm_db

JWT_SECRET=your_secret_key
PORT=5000
```

### 5. Jalankan Backend

```bash
npm start
```

atau

```bash
node server.js
```

### 6. Jalankan Frontend

Buka file:

```text
frontend/index.html
```

menggunakan browser atau Live Server.

---

## 🔐 Akun Pengguna

CONTOH akun untuk pengujian:

### Admin

```text
Email    : admin@example.com
Password : admin123
```

### Sales

```text
Email    : sales@example.com
Password : sales123
```

### Staff

```text
Email    : staff@example.com
Password : staff123
```

> Sesuaikan dengan data yang tersedia pada database Anda.

---

## 📊 Modul Sistem

### Customers

Mengelola data pelanggan dan perusahaan.

### Leads

Mengelola prospek bisnis serta penugasan PIC.

### Activities

Mencatat seluruh aktivitas yang dilakukan oleh pengguna.

### Contacts

Mengelola daftar kontak yang terhubung dengan customer.

### Users

Mengelola akun pengguna dalam sistem (Admin Only).

---

## 👨‍💻 Kelompok 5 PJJ Pemrograman Web

* Aditya Setya Ramadhani
* Dodik Pratama
* Leonardus Dian Christian
* Rajasa Narottama
* Tatas Saputra
* Yulia Islamiati
* Muhammadiluddin Akbar

---

## 🎯 Tujuan Proyek

Proyek ini dibuat untuk:

* Memenuhi tugas PJJ Pemrograman Web.
* Menerapkan konsep CRUD pada aplikasi web.
* Mengimplementasikan autentikasi JWT.
* Menggunakan Role-Based Access Control (RBAC).
* Mengintegrasikan frontend, backend, dan database dalam satu sistem.

---

## 📄 Lisensi

Proyek ini dibuat untuk kebutuhan akademik dan pembelajaran.
