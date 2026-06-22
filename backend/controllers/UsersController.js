const usersModel = require('../models/usersModel'); // Sesuaikan besar kecil huruf nama file Anda
const { validateId } = require('../validation/usersValidation'); // Pastikan file validasi ini ada
const bcrypt = require('bcryptjs');

class usersController {
    // READ: Menampilkan semua data
    async index(req, res, next) {
        try {
            const data = await usersModel.findAll();
            // Jangan kembalikan field password ke frontend demi keamanan
            const sanitizedData = data.map(user => {
                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;
            });
            res.json({ success: true, total: sanitizedData.length, data: sanitizedData });
        } catch (err) {
            next(err);
        }
    }

    // READ BY ID
    async show(req, res, next) {
        try {
            const { id } = req.params;
            const error = validateId(id);
            if (error) return res.status(400).json({ success: false, message: error });

            const data = await usersModel.findById(id);
            if (!data) return res.status(404).json({ success: false, message: "User tidak ditemukan" });
            
            const { password, ...userWithoutPassword } = data;
            res.json({ success: true, data: userWithoutPassword });
        } catch (err) {
            next(err);
        }
    }

    // CREATE: Tambah user baru oleh Admin
    async store(req, res, next) {
        try {
            const { name, email, password, role } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ success: false, message: "Nama, email, dan password wajib diisi" });
            }

            const existingUser = await usersModel.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ success: false, message: "Email sudah digunakan" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const insertId = await usersModel.store({
                name, email, password: hashedPassword, role: role || 'staff'
            });

            res.status(201).json({ success: true, message: "User berhasil ditambahkan", data: { id: insertId } });
        } catch (err) {
            next(err);
        }
    }

    // UPDATE: Edit data user
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const error = validateId(id);
            if (error) return res.status(400).json({ success: false, message: error });

            const { name, email, password, role } = req.body;
            let hashedPassword = undefined;

            // Jika admin mengisi password baru, enkripsi. Jika kosong, biarkan undefined.
            if (password && password.trim() !== '') {
                const salt = await bcrypt.genSalt(10);
                hashedPassword = await bcrypt.hash(password, salt);
            }

            const affected = await usersModel.update(id, { name, email, password: hashedPassword, role });
            if (!affected) return res.status(404).json({ success: false, message: "User tidak ditemukan" });

            res.json({ success: true, message: "User berhasil diperbarui" });
        } catch (err) {
            next(err);
        }
    }

    // DELETE: Hapus user
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const error = validateId(id);
            if (error) return res.status(400).json({ success: false, message: error });

            const affected = await usersModel.destroy(id);
            if (!affected) return res.status(404).json({ success: false, message: "User tidak ditemukan" });

            res.json({ success: true, message: "User berhasil dihapus" });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new usersController();