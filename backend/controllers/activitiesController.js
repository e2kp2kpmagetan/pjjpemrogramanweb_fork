const activitiesModel = require('../models/activitiesModel');
const { validateId, validateStore, validateUpdate } = require('../validation/activitiesValidation');

class activitiesController {

    // Menampilkan seluruh data tabel activities
    async index(req, res, next) {
        try {
            const data = await activitiesModel.findAll();
            // Data sudah dalam format { success: true, data: [...] } yang dicari oleh Frontend
            res.json({ success: true, total: data.length, data });
        } catch (err) {
            next(err); // Diseragamkan menggunakan next() agar terpusat
        }
    }

    // Menampilkan data activity berdasarkan ID
    async show(req, res, next) {
        try {
            const { id } = req.params;
            const error = validateId(id);
            if (error) return res.status(400).json({ success: false, message: error });

            const data = await activitiesModel.findById(id);
            if (!data) return res.status(404).json({ success: false, message: "Kegiatan tidak ditemukan" });
            
            res.json({ success: true, data });
        } catch (err) {
            next(err);
        }
    }

   async store(req, res, next) {
        try {
            const errors = validateStore(req.body);
            if (errors) return res.status(400).json({ success: false, errors });
            
            const id = await activitiesModel.store(req.body);
            res.status(201).json({
                success: true,
                message: 'Kegiatan berhasil ditambahkan',
                data: { id },
            });
        } catch (err) {
            next(err);
        }
   }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const idError = validateId(id);
            // PERBAIKAN FATAL: res.json(400).json(...) diubah menjadi res.status(400).json(...)
            if (idError) return res.status(400).json({ success: false, message: idError });
    
            const errors = validateUpdate(req.body);
            if (errors) return res.status(400).json({ success: false, errors });
    
            const affected = await activitiesModel.update(id, req.body);
            if (!affected) return res.status(404).json({ success: false, message: 'Kegiatan Tidak ditemukan' });
            
            res.json({ success: true, message: 'Kegiatan Berhasil diupdate' });
        } catch (err) {
            next(err);
        }
    }

    async destroy(req, res, next) {
         try {
            const { id } = req.params;
            const idError = validateId(id);
            // PERBAIKAN FATAL: res.json(400).json(...) diubah menjadi res.status(400).json(...)
            if (idError) return res.status(400).json({ success: false, message: idError });
 
            // PERBAIKAN: Hapus parameter req.body
            const affected = await activitiesModel.destroy(id);
            if (!affected) return res.status(404).json({ success: false, message: 'Kegiatan Tidak ditemukan' });
             
            res.json({ success: true, message: 'Kegiatan Berhasil Dihapus' });
        } catch (err) {
            next(err);
        }
    }
}

// Instansiasi objek kontroler
const object = new activitiesController();

// Ekspor objek siap pakai
module.exports = object;