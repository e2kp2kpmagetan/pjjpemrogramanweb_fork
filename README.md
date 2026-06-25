# CRM Latihan PJJ Pemrograman Web

## 📌 Deskripsi Proyek

CRM Latihan PJJ Pemrograman Web adalah aplikasi **Customer Relationship Management (CRM)** berbasis web yang dikembangkan sebagai proyek PJJ Pemrograman Web. Sistem ini membantu perusahaan dalam mengelola data pelanggan, prospek bisnis, peluang penjualan, aktivitas, kontak pelanggan, dan pengguna secara terpusat.

Aplikasi ini menerapkan **Role-Based Access Control (RBAC)** sehingga setiap pengguna memiliki hak akses sesuai dengan perannya, seperti Admin, Sales, dan Staff.

Frontend aplikasi dibangun menggunakan **Angular** dengan antarmuka berbasis template **SB Admin** (tema gelap/black sidebar) sehingga memberikan tampilan dashboard yang modern, responsif, dan mudah digunakan.

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

### 3. Manajemen Deals

* Mengelola peluang penjualan (sales opportunities)
* Menghubungkan deal dengan customer dan lead
* Memantau progress deal
* Mengelola nilai transaksi dan status deal

### 4. Manajemen Activities

* Mencatat aktivitas harian
* Jenis aktivitas:

  * Call
  * Meeting
  * Email
  * Follow Up

### 5. Manajemen Contacts

* Menyimpan kontak pelanggan
* Menghubungkan kontak dengan customer terkait

### 6. Manajemen Users

* Khusus Admin
* Menambah pengguna baru
* Mengubah role pengguna
* Menghapus akun pengguna

### 7. Role-Based Access Control (RBAC)

| Role  | Hak Akses                                                  |
| ----- | ---------------------------------------------------------- |
| Admin | Akses penuh ke seluruh sistem                              |
| Sales | Mengelola customer, leads, deals, activities, dan contacts |
| Staff | Akses terbatas sesuai tugas yang diberikan                 |

### 8. JWT Authentication

* Login menggunakan JSON Web Token (JWT)
* Identitas pengguna disimpan secara aman
* Data creator otomatis tercatat berdasarkan token login

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
│   │   ├── public/
│   │   ├── angular.json
│   │   ├── package.json
│   │   └── ...
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
* **frontend-angular/** → Frontend aplikasi berbasis Angular dan SB Admin Template.

  * **src/** → Source code Angular.
  * **public/** → Asset publik aplikasi.
  * **angular.json** → Konfigurasi Angular.
* **app.js** → Entry point aplikasi backend.
* **.env** → Konfigurasi environment dan database.

```
```


---

## 🎨 Tampilan Aplikasi

Aplikasi menggunakan template **SB Admin** dengan desain dashboard profesional yang terdiri dari:

* Sidebar navigasi berwarna hitam (dark theme)
* Dashboard responsif
* Tabel data terintegrasi
* Form CRUD modern
* Navigasi berbasis role pengguna

---

## 📊 Modul Sistem

### Dashboard

Menampilkan ringkasan data CRM dan statistik utama.

### Customers

Mengelola data pelanggan dan perusahaan.

### Leads

Mengelola prospek bisnis serta penugasan PIC.

### Deals

Mengelola peluang penjualan, nilai transaksi, dan status closing.

### Activities

Mencatat seluruh aktivitas yang dilakukan oleh pengguna.

### Contacts

Mengelola daftar kontak yang terhubung dengan customer.

### Users

Mengelola akun pengguna dalam sistem (Admin Only).

---

## 🎯 Tujuan Proyek

Proyek ini dibuat untuk:

* Memenuhi tugas PJJ Pemrograman Web.
* Menerapkan konsep CRUD pada aplikasi web.
* Mengimplementasikan autentikasi JWT.
* Mengimplementasikan Role-Based Access Control (RBAC).
* Mengembangkan frontend modern menggunakan Angular.
* Mengintegrasikan frontend, backend, dan database dalam satu sistem CRM.
* Menerapkan konsep pengelolaan customer relationship dalam lingkungan bisnis.

```
```
