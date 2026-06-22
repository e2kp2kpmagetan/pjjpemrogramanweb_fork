const usersModel = require('../models/usersModel');
const { validateId } = require('../validation/usersValidation');

class usersController {
    constructor() {
        // Mengikat (binding) konteks 'this' agar aman saat dipanggil oleh Express Router
        this.index = this.index.bind(this);
        this.show = this.show.bind(this);
    }

    // Menampilkan seluruh data tabel users
    async index(req, res) {
        try {
            const data = await usersModel.findAll();
            res.json({ success: true, total: data.length, data });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    // Menampilkan data users berdasarkan ID
    async show(req, res) {
        try {
            const { id } = req.params;
            const error = validateId(id);
            if (error) return res.status(400).json({ success: false, message: error });

            const data = await usersModel.findById(id);
            if (!data) return res.status(404).json({ success: false, message: "Kegiatan tidak ditemukan" });
            
            res.json({ success: true, data });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    store(req, res) {
        res.send("Menambahkan data users");
    }

    update(req, res) {
        const { id } = req.params;
        res.send(`Mengupdate data users id ${id}`);
    }

    delete(req, res) {
        const { id } = req.params;
        res.send(`Menghapus data users id ${id}`);
    }
}

// Instansiasi objek kontroler
const object = new usersController();

// Ekspor objek siap pakai
module.exports = object;