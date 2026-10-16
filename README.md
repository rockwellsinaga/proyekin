# PROYEKIN

**PROYEKIN** adalah aplikasi media sosial bertema pembangunan yang menjadi tempat bagi komunitas untuk membagikan proyek, progres pekerjaan, serta inspirasi seputar konstruksi, renovasi, arsitektur, interior, dan infrastruktur.

Pengguna dapat menjelajahi posting proyek, mencari proyek berdasarkan judul, melihat profil anggota komunitas, dan membaca komentar. Setelah masuk ke akun, buyer dapat berinteraksi melalui komentar, sedangkan seller dapat membagikan serta mengelola posting proyek miliknya. Buyer dan seller sama-sama dapat memperbarui profil.

## Fitur Utama

- Registrasi akun dengan pilihan peran `buyer` atau `seller` dan hak akses yang berbeda.
- Login dan logout menggunakan session.
- Password disimpan dalam bentuk hash menggunakan bcrypt.
- Menampilkan posting terbaru pada halaman utama.
- Pencarian posting berdasarkan judul proyek.
- Seller dapat membuat, mengubah, dan menghapus posting miliknya sendiri.
- Buyer dapat mencari proyek dan berinteraksi dengan seller melalui komentar.
- Otorisasi agar posting hanya dapat diubah atau dihapus oleh pemiliknya.
- Mengunggah gambar proyek berformat JPG, PNG, atau WEBP dengan ukuran maksimal 5 MB.
- Menambahkan lokasi dan beberapa tag pada posting.
- Menambahkan komentar pada detail posting.
- Melihat profil pengguna beserta seluruh posting miliknya.
- Mengubah display name, bio, dan foto profil.
- Validasi data pada akun, profil, posting, tag, dan komentar.

## Hak Akses

| Fitur                              | Guest | Buyer | Seller |
| ---------------------------------- | :---: | :---: | :----: |
| Melihat dan mencari posting        |   ✓   |   ✓   |   ✓    |
| Melihat profil pengguna            |   ✓   |   ✓   |   ✓    |
| Mengubah profil sendiri            |   -   |   ✓   |   ✓    |
| Menambahkan komentar               |   -   |   ✓   |   ✓    |
| Membuat posting proyek             |   -   |   -   |   ✓    |
| Mengubah atau menghapus post sendiri |  -  |   -   |   ✓    |

Tidak ada pengguna yang dapat mengubah atau menghapus posting milik pengguna lain.

## Teknologi

- Node.js
- Express.js
- EJS
- PostgreSQL
- Sequelize dan Sequelize CLI
- express-session
- bcryptjs
- Multer
- CSS

## Struktur Database

PROYEKIN menggunakan enam entitas utama:

- `User` memiliki satu `Profile`, banyak `Post`, dan banyak `Comment`.
- `Post` dimiliki oleh satu `User` dan memiliki banyak `Comment`.
- `Post` dan `Tag` memiliki relasi many-to-many melalui `PostTag`.

![Entity Relationship Diagram PROYEKIN](./schema.drawio.png)

## Persyaratan

Pastikan perangkat sudah memiliki:

- Node.js dan npm
- PostgreSQL

## Instalasi

1. Clone atau unduh repository ini, lalu masuk ke direktori proyek.

   ```bash
   cd proyekin
   ```

2. Instal seluruh dependency.

   ```bash
   npm install
   ```

3. Salin `config/config.example.json` menjadi `config/config.json`, lalu sesuaikan koneksi PostgreSQL, khususnya bagian `development`.

   ```bash
   cp config/config.example.json config/config.json
   ```

   ```json
   {
     "development": {
       "username": "YOUR_POSTGRES_USERNAME",
       "password": "YOUR_POSTGRES_PASSWORD",
       "database": "proyekin-db",
       "host": "127.0.0.1",
       "dialect": "postgres"
     }
   }
   ```

4. Buat database dan jalankan seluruh migration.

   ```bash
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   ```

5. Isi database dengan data awal.

   ```bash
   npx sequelize-cli db:seed:all
   ```

6. Jalankan aplikasi.

   ```bash
   npm start
   ```

7. Buka aplikasi melalui browser.

   ```text
   http://localhost:3000
   ```

## Cara Menggunakan

1. Buka halaman **Register** untuk membuat akun baru.
2. Login menggunakan email dan password yang sudah didaftarkan.
3. Seller dapat memilih **Create Post** untuk membagikan proyek pembangunan.
4. Seller mengisi judul, deskripsi, lokasi, tag, dan gambar proyek jika diperlukan.
5. Buyer dan seller dapat membuka detail posting dan menambahkan komentar.
6. Gunakan halaman **Profile** untuk melihat profil atau memperbarui profil sendiri.
7. Seller dapat mengubah atau menghapus posting miliknya melalui halaman detail.

## Route Utama

| Method | Route                     | Keterangan                              |
| ------ | ------------------------- | --------------------------------------- |
| `GET`  | `/`                       | Menampilkan dan mencari posting proyek  |
| `GET`  | `/register`               | Menampilkan formulir registrasi         |
| `POST` | `/register`               | Membuat akun dan profil baru            |
| `GET`  | `/login`                  | Menampilkan formulir login              |
| `POST` | `/login`                  | Memproses login                         |
| `POST` | `/logout`                 | Keluar dari akun                        |
| `GET`  | `/users/:id`              | Menampilkan profil pengguna             |
| `GET`  | `/profile/edit`           | Menampilkan formulir edit profil        |
| `POST` | `/profile/edit`           | Memperbarui profil pengguna             |
| `GET`  | `/posts/add`              | Menampilkan formulir posting baru untuk seller |
| `POST` | `/posts/add`              | Membuat posting baru sebagai seller     |
| `GET`  | `/posts/:id`              | Menampilkan detail posting dan komentar |
| `GET`  | `/posts/:id/edit`         | Menampilkan formulir edit untuk seller pemilik post |
| `POST` | `/posts/:id/edit`         | Memperbarui post milik seller           |
| `POST` | `/posts/:id/delete`       | Menghapus post milik seller             |
| `POST` | `/posts/:id/comments/add` | Menambahkan komentar setelah login      |

## Pengembang

PROYEKIN dikembangkan oleh:

- [rockwellsinaga](https://github.com/rockwellsinaga)
- [MuhammadFardianBilqisthi](https://github.com/MuhammadFardianBilqisthi)
