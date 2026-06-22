// File models yang berguna untuk menerjemahkan isi tabel users
const db = require('../config/database');

// Menampilkan seluruh data tabel users
const findAll = async () => {
    const [rows] = await db.query(
        `SELECT * FROM users ORDER BY created_at DESC`
    );
    return rows;
};

// Menampilkan by id dari tabel users
const findById = async (id) => {
    const [rows] = await db.query(
        `SELECT * FROM users WHERE id = ?`, [id]
    );
    return rows[0] ?? null;
};

module.exports = { findAll, findById };