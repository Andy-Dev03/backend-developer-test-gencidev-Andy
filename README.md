# Backend Developer Test – Gencidev

## Deskripsi

Proyek ini adalah REST API sederhana untuk manajemen Notes, dilengkapi autentikasi JWT. Dibuat sebagai bagian dari tes Backend Developer Gencidev.

## Fitur Utama

- Register & Login User dengan JWT Authentication
- CRUD Notes (Create, Read, Update, Delete)
- Dokumentasi API (Postman Collection)

## Tech Stack

- **Node.js** + **Express.js**
- **Sequelize ORM** - **PostgreSQL**
- **JWT (JSON Web Token)**
- **Bcrypt.js** untuk hashing password
- **dotenv** untuk environment config

&nbsp;

## Struktur Folder

```
express/
│── config/
│ └── config.js
│── controllers/
│── middlewares/
│── migrations/
│── models/
│── routers/
│── utils/
│── .env.example
│── .env.example
│── API Documentation (Postman Collection) - Andy.json
│── app.js
│── package.json
│── README.md
```

&nbsp;

## Instalasi & Setup

1. **Clone repository**

   ```bash
   git clone https://github.com/Andy-Dev03/backend-developer-test-gencidev-Andy.git
   cd backend-developer-test-gencidev-Andy/express
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Konfigurasi database (PostgreSQL)**

   - Buat file .env (Salin dari example)

     ```bash
     cp .env.example .env
     ```

   - Pastikan PostgreSQL sudah terinstall dan berjalan.
   - Default konfigurasi di .env:

     ```
     DB_USERNAME=your_db_username
     DB_PASSWORD=your_db_password
     DB_NAME=your_database_name
     DB_HOST=127.0.0.1
     DB_DIALECT=postgres
     ```

   - Buat database jika belum ada:

     ```bash
     npx sequelize db:create
     ```

   - Jalankan migrasi:

     ```bash
     npx sequelize db:migrate
     ```

4. **Jalankan server**

   ```bash
   npm start
   ```

&nbsp;

## Endpoint Utama

### **Auth**

> Base URL: `/api/auth`

| Method | Endpoint             | Keterangan           |
| ------ | -------------------- | -------------------- |
| POST   | `/api/auth/register` | Registrasi user baru |
| POST   | `/api/auth/login`    | Login & dapatkan JWT |

---

### **Notes** (Protected – perlu JWT)

> Base URL: `/api/notes`  
> Semua request notes harus menyertakan header:  
> `Authorization: Bearer <your_token>`

| Method | Endpoint         | Keterangan                 |
| ------ | ---------------- | -------------------------- |
| GET    | `/api/notes/`    | Ambil semua notes user     |
| POST   | `/api/notes/`    | Tambah note baru           |
| GET    | `/api/notes/:id` | Ambil note berdasarkan ID  |
| PUT    | `/api/notes/:id` | Update note berdasarkan ID |
| DELETE | `/api/notes/:id` | Hapus note berdasarkan ID  |

&nbsp;

## Error Handling

| Status | Keterangan                                    |
| ------ | --------------------------------------------- |
| 400    | Bad Request – field kosong / validation       |
| 401    | Unauthorized – invalid token / login required |
| 403    | Forbidden – akses note milik user lain        |
| 404    | Not Found – note tidak ditemukan              |
| 500    | Internal Server Error                         |

&nbsp;

## Validasi & Catatan

### User

- `username`, `email`, `password` wajib di-register.
- `password` minimal 5 karakter.
- `email` harus valid dan unik.

### Notes

- Endpoint `/notes` hanya bisa diakses oleh user yang login.
- Field `title` dan `content` wajib diisi saat membuat atau mengupdate note.
- Hanya user yang memiliki note tersebut yang bisa melakukan update atau delete.
