const db = require('../config/database');
const CustomerModel = require('../models/CustomerModel'); // Pastikan besar kecil huruf sesuai nama file asli Anda
const activitiesModel = require('../models/activitiesModel');
const { validateId, validateStore, validateUpdate } = require('../validation/customerValidation');

class CustomerController {
    // READ: Menampilkan semua data customers
    async index(req, res) {
        try {
            const data = await CustomerModel.findAll();
            res.json({ success: true, total: data.length, data });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    // READ BY ID: Menampilkan 1 data customer (Diperlukan saat tombol Edit diklik)
    async show(req, res) {
        try {
            const { id } = req.params;
            const error = validateId(id);
            if (error) return res.status(400).json({ success: false, message: error });

            const data = await CustomerModel.findById(id);
            if (!data) return res.status(404).json({ success: false, message: "Customer tidak ditemukan" });
            
            res.json({ success: true, data });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    // CREATE: Menambahkan data customer dan otomatis mencatat aktivitas
    async store(req, res, next) {
        try {
            const errors = validateStore(req.body);
            if (errors) return res.status(400).json({ success: false, errors });

            // Mulai Transaksi Database atomik
            await db.beginTransaction();

            // OTOMATISASI: Ambil ID dari user yang sedang login (dari JWT)
            // Menangani req.user.id atau req.userId sesuai konfigurasi middleware Anda
            const loggedInUserId = req.user ? req.user.id : (req.userId || null);

            // Gabungkan data form dengan ID pembuat otomatis
            const customerData = {
                ...req.body,
                created_by: loggedInUserId
            };

            // 1. Simpan data customer (Hanya dipanggil SEKALI)
            const custId = await CustomerModel.store(req.body);
            
            // 2. Catat aktivitas customer (Pastikan model ini ada dan berfungsi)
            let activitiesId = null;
            if (activitiesModel && typeof activitiesModel.createFormCust === 'function') {
                activitiesId = await activitiesModel.createFormCust(custId);
            }

            // Komit transaksi jika semua operasi berhasil
            await db.commit();

            res.status(201).json({
                success: true,
                message: 'Customer dan Activity berhasil ditambahkan',
                data: {
                    customer: { id: custId },
                    activity: { id: activitiesId }
                },
            });
        } catch (err) {
            // Batalkan semua perubahan jika di tengah jalan terjadi error
            await db.rollback();
            next(err);
        }
    }

    // UPDATE: Memperbarui data customer berdasarkan ID
    async update(req, res, next) {
        try {
            const { id } = req.params;
            
            // PERBAIKAN: Menggunakan .status(400)
            const idError = validateId(id);
            if (idError) return res.status(400).json({ success: false, message: idError });

            const errors = validateUpdate(req.body);
            if (errors) return res.status(400).json({ success: false, errors });

            // Eksekusi update ke model
            const affected = await CustomerModel.update(id, req.body);
            if (!affected) return res.status(404).json({ success: false, message: 'Customer Tidak ditemukan' });

            res.json({ success: true, message: 'Customer Berhasil diupdate' });
        } catch (err) {
            next(err);
        }
    }

    // DELETE: Menghapus data customer dari database
    async destroy(req, res, next) {
        try {
            const { id } = req.params;
            
            // PERBAIKAN: Menggunakan .status(400)
            const idError = validateId(id);
            if (idError) return res.status(400).json({ success: false, message: idError });

            const affected = await CustomerModel.destroy(id);
            if (!affected) return res.status(404).json({ success: false, message: 'Customer Tidak ditemukan' });
            
            // PERBAIKAN: Pesan sukses diubah menjadi dihapus
            res.json({ success: true, message: 'Customer Berhasil dihapus' });
        } catch (err) {
            next(err);
        }
    }
}

const object = new CustomerController();
module.exports = object;