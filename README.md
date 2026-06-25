# CRM Latihan PJJ Pemrograman Web

## 📌 Deskripsi Proyek

CRM Latihan PJJ Pemrograman Web adalah aplikasi **Customer Relationship Management (CRM)** berbasis web yang dikembangkan sebagai proyek PJJ Pemrograman Web.

Sistem ini membantu perusahaan dalam mengelola data pelanggan, prospek bisnis, peluang penjualan, aktivitas, kontak pelanggan, dan pengguna secara terpusat.

Aplikasi menerapkan **Role-Based Access Control (RBAC)** sehingga setiap pengguna memiliki hak akses sesuai dengan perannya.

Frontend dibangun menggunakan **Angular** dengan antarmuka berbasis **SB Admin Template** yang responsif dan modern, sedangkan backend menggunakan **Node.js**, **Express.js**, dan **MySQL**.

---

## 🚀 Fitur Utama

### Customer Management

* Menambah data customer
* Melihat daftar customer
* Mengubah data customer
* Menghapus customer

### Leads Management

* Mengelola prospek bisnis
* Menentukan PIC (Person In Charge)
* Memantau status prospek

### Deals Management

* Mengelola peluang penjualan
* Menghubungkan deal dengan customer dan lead
* Memantau progres deal
* Mengelola nilai transaksi dan status deal

### Activities Management

* Mencatat aktivitas pengguna
* Jenis aktivitas:

  * Call
  * Meeting
  * Email
  * Follow Up

### Contacts Management

* Menyimpan kontak pelanggan
* Menghubungkan kontak dengan customer terkait

### Users Management

* Menambah pengguna baru
* Mengubah role pengguna
* Menghapus akun pengguna

### Role-Based Access Control (RBAC)

| Role  | Hak Akses                                                  |
| ----- | ---------------------------------------------------------- |
| Admin | Akses penuh ke seluruh sistem                              |
| Sales | Mengelola customer, leads, deals, activities, dan contacts |
| Staff | Akses terbatas sesuai kebutuhan sistem                     |

### Authentication

* Login menggunakan JWT (JSON Web Token)
* Autentikasi dan otorisasi berbasis token
* Data pengguna tersimpan sesuai sesi login

---

## 🏗️ Teknologi yang Digunakan

### Backend

* Node.js
* Express.js
* MySQL
* JWT Authentication
* Bcrypt

### Frontend

* Angular
* TypeScript
* Bootstrap 5
* SB Admin Template
* Font Awesome

### Database

* MySQL

---

## 📂 Struktur Proyek

```text
pjjpemrogramanweb/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── frontend-angular/
│   │   ├── src/
│   │        ├── app/
│   │        │   ├── guards/
│   │        │   ├── interceptors/
│   │        │   ├── pages/
│   │        │   ├── services/
│   │        │   │   └── api.ts
│   │        │   ├── app.ts
│   │        │   ├── app.html
│   │        │   └── app.config.ts
│   │        │
│   │        └── styles.css
│   │      
│   │   
│   │   
│   │   
│   │   
│   │   
│   ├── angular.json
│   ├── package.json
│   ├── tsconfig.json       
│   │
│   ├── .env
│   ├── package.json
│   └── app.js
│
└── README.md
```

### Keterangan

#### Backend

* **config/** → Konfigurasi aplikasi dan database
* **controllers/** → Logika bisnis aplikasi
* **middleware/** → Middleware autentikasi dan otorisasi
* **models/** → Interaksi dengan database MySQL
* **routes/** → Routing REST API
* **app.js** → Entry point backend

#### Frontend (Angular)

* **guards/** → Route Guard untuk autentikasi dan otorisasi
* **interceptors/** → HTTP Interceptor untuk JWT dan request handling
* **pages/** → Halaman utama aplikasi (Dashboard, Customers, Leads, Deals, Activities, Contacts, Users, Login)
* **services/api.ts** → Service komunikasi API ke backend
* **app.ts** → Root component aplikasi
* **app.html** → Template utama aplikasi
* **app.config.ts** → Konfigurasi Angular application
* **public/** → Asset publik aplikasi


---

## ⚙️ Instalasi dan Menjalankan Proyek

### 1. Clone Repository

```bash
git clone <repository-url>
cd pjjpemrogramanweb
```

### 2. Setup Database

Buat database MySQL sesuai konfigurasi pada file `.env`.

### 3. Menjalankan Backend

```bash
cd backend
npm install
npm start
```

Backend berjalan pada:

```text
http://localhost:3000
```

### 4. Menjalankan Frontend

Buka terminal baru:

```bash
cd backend/frontend-angular
npm install
ng serve -o
```

Frontend berjalan pada:

```text
http://localhost:4200
```

---

## 🎨 Tampilan Aplikasi

Aplikasi menggunakan template SB Admin dengan fitur:

* Sidebar navigasi dark theme
* Dashboard responsif
* Tabel data terintegrasi
* Form CRUD modern
* Navigasi berbasis role pengguna

---

## 📊 Modul Sistem

### Dashboard

Menampilkan ringkasan data dan statistik CRM.

### Customers

Mengelola data pelanggan dan perusahaan.

### Leads

Mengelola prospek bisnis dan penugasan PIC.

### Deals

Mengelola peluang penjualan dan status closing.

### Activities

Mencatat aktivitas pengguna.

### Contacts

Mengelola kontak yang terhubung dengan customer.

### Users

Mengelola akun pengguna (Admin Only).

---

## 🎯 Tujuan Proyek

* Memenuhi tugas PJJ Pemrograman Web
* Menerapkan konsep CRUD pada aplikasi web
* Mengimplementasikan JWT Authentication
* Mengimplementasikan Role-Based Access Control (RBAC)
* Mengembangkan frontend modern menggunakan Angular
* Mengintegrasikan frontend, backend, dan database dalam satu sistem CRM
* Menerapkan konsep Customer Relationship Management dalam lingkungan bisnis

---

## 👨‍💻 Developer

Proyek ini dikembangkan sebagai bagian dari tugas Praktik Pemrograman Web (PJJ) menggunakan teknologi Angular, Node.js, Express.js, dan MySQL.
