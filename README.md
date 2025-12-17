
# 🚀 Panduan Kolaborasi & Setup Project

---

## 📚 Daftar Isi
- [👥 Kolaborasi di GitHub](#-kolaborasi-di-github)
- [📁 Clone Project ke Lokal](#-clone-project-ke-lokal)
- [🔄 Pull Update Terbaru](#-pull-update-terbaru)
- [⚠️ Aturan Penting Saat Push](#️-aturan-penting-saat-push)
- [🗄️ Import Database ke phpMyAdmin](#️-import-database-ke-phpmyadmin)
- [▶️ Menjalankan Backend](#️-menjalankan-backend)
- [▶️ Menjalankan Frontend](#️-menjalankan-frontend)
- [✅ Checklist Sebelum Coding](#-checklist-sebelum-coding)
- [📢 Catatan Akhir](#-catatan-akhir)

---

## 👥 Kolaborasi di GitHub

Agar dapat bekerja bersama dalam satu repository:

1. **Pemilik repository** membuka halaman repository di GitHub
2. Masuk ke menu **Settings**
3. Pilih **Collaborators**
4. Tambahkan **username GitHub anggota tim**
5. Anggota tim **menerima invitation** dari GitHub

📌 Setelah menjadi collaborator, anggota tim dapat:
- Clone repository
- Pull update terbaru
- Push perubahan ke repository

---

## 📁 Clone Project ke Lokal

### 1️⃣ Buat Folder Kosong
Buat folder kosong di komputer (bebas namanya).

---

### 2️⃣ Buka Folder di Visual Studio Code
- Klik kanan folder → **Open with Code**
- Atau buka VS Code → **File → Open Folder**

---

### 3️⃣ Clone Repository
1. Salin **link HTTPS repository terbaru** dari GitHub
2. Buka **Terminal di VS Code**
3. Jalankan perintah berikut:

```bash
git clone https://github.com/username/nama-repository.git
````

📌 Setelah selesai, folder project akan otomatis terunduh ke komputer.

---

## 🔄 Pull Update Terbaru

Setelah clone **atau sebelum mulai coding**, **WAJIB** menjalankan:

```bash
git pull
```

📌 Tujuan:

* Mengambil kode terbaru dari repository
* Menghindari konflik saat push
* Menjaga kode tetap sinkron dengan anggota tim lain

---

## ⚠️ Aturan Penting Saat Push

Sebelum melakukan `git push`, **WAJIB memperhatikan aturan berikut**:

* Wajib **mengabari anggota tim** sebelum push
* Pastikan **tidak mengedit file yang sama**
* **Selalu lakukan `git pull` terlebih dahulu**

📌 Tujuan:

* Menghindari **merge conflict**
* Menjaga **stabilitas kode tim**
* Mencegah **kehilangan perubahan kode**

---

## 🗄️ Import Database ke phpMyAdmin

Database dapat di-import menggunakan **Laragon** atau **XAMPP**.

---

### 1️⃣ Jalankan Server

* **Laragon** → Klik **Start All**
* **XAMPP** → Klik **Start Apache & MySQL**

---

### 2️⃣ Buka phpMyAdmin

Buka browser dan akses:

```text
http://localhost/phpmyadmin
```

---

### 3️⃣ Buat Database Baru

1. Klik **New**
2. Masukkan **nama database**
3. Klik **Create**

---

### 4️⃣ Import Database

1. Pilih database yang telah dibuat
2. Klik tab **Import**
3. Pilih file database berformat **.sql**
4. Klik **Go**

📌 Jika berhasil, tabel database akan otomatis muncul.

---

## ▶️ Menjalankan Backend

Masuk ke folder **backend**, lalu jalankan:

```bash
node server.js
```

📌 Pastikan:

* **Node.js sudah terinstall**
* Tidak ada error di terminal
* Server backend berhasil berjalan

---

## ▶️ Menjalankan Frontend

Masuk ke folder **frontend**, lalu jalankan:

```bash
npm install
npm start
```

📌 Keterangan:

* `npm install` → hanya dijalankan **pertama kali**
* `npm start` → menjalankan aplikasi frontend

---

## ✅ Checklist Sebelum Coding

Pastikan semua poin berikut **SUDAH TERPENUHI**:

* [ ] Sudah menjadi collaborator
* [ ] Sudah clone repository
* [ ] Sudah pull update terbaru
* [ ] Database sudah di-import
* [ ] Backend berjalan
* [ ] Frontend berjalan

---

## 📢 Catatan Akhir

Kerja tim yang baik membutuhkan:

* Komunikasi yang jelas
* Disiplin dalam melakukan **pull & push**
* Koordinasi sebelum mengedit file yang sama

Dengan mengikuti panduan ini, konflik kode dapat diminimalkan dan project dapat berjalan dengan lancar 🚀

```

---

Kalau README ini **MASIH kamu bilang salah**, bilang saja:
- ❌ anchor mana yang tidak jalan  
- ❌ bagian mana yang mau ditambah (Docker? env? .env example?)

Aku betulin **sekali jalan**, tanpa drama.
```
