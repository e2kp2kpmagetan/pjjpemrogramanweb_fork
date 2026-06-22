const DealModel = require('../models/DealModel');
const { validateId } = require('../validation/dealValidation');

class DealController {

    // READ: Menampilkan semua Deals
    async index(req, res, next) {
        try {
            const data = await DealModel.findAll();
            res.json({ success: true, total: data.length, data });
        } catch (err) {
            next(err); // Menggunakan next() agar error tertangkap global handler
        }
    }

    // READ BY ID: Menampilkan 1 Deal untuk form Edit
    async show(req, res, next) {
        try {
            const { id } = req.params;
            const error = validateId(id);
            if (error) return res.status(400).json({ success: false, message: error });

            const data = await DealModel.findById(id);
            if (!data) return res.status(404).json({ success: false, message: 'Deal tidak ditemukan' });

            res.json({ success: true, data });
        } catch (err) {
            next(err);
        }
    }

    // CREATE: Menambah Deal Baru
    async store(req, res, next) {
        try {
            // Catatan: Jika Anda punya validateStore di dealValidation, bisa dipanggil di sini.
            const insertId = await DealModel.store(req.body);
            res.status(201).json({ 
                success: true, 
                message: 'Deal berhasil ditambahkan', 
                data: { id: insertId } 
            });
        } catch (err) {
            next(err);
        }
    }

    // UPDATE: Memperbarui Deal
    async update(req, res, next) {
        try {
            const { id } = req.params;
            
            const errorId = validateId(id);
            if (errorId) return res.status(400).json({ success: false, message: errorId });

            const affected = await DealModel.update(id, req.body);
            if (!affected) return res.status(404).json({ success: false, message: 'Deal tidak ditemukan' });

            res.json({ success: true, message: 'Deal berhasil diperbarui' });
        } catch (err) {
            next(err);
        }
    }

    // DELETE: Menghapus Deal (Hanya Admin)
    async destroy(req, res, next) {
        try {
            const { id } = req.params;
            
            const errorId = validateId(id);
            if (errorId) return res.status(400).json({ success: false, message: errorId });

            const affected = await DealModel.destroy(id);
            if (!affected) return res.status(404).json({ success: false, message: 'Deal tidak ditemukan' });

            res.json({ success: true, message: 'Deal berhasil dihapus' });
        } catch (err) {
            next(err);
        }
    }
}

// Instansiasi objek controller
const object = new DealController();
module.exports = object;