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

// [TAMBAHAN WAJIB] Mencari user berdasarkan email untuk proses Login
const findByEmail = async (email) => {
    const [rows] = await db.query(
        `SELECT * FROM users WHERE email = ?`, [email]
    );
    return rows[0] ?? null;
};

// [TAMBAHAN WAJIB] Menyimpan user baru (Pastikan password sudah di-hash di controller sebelum masuk ke sini)
const store = async ({ name, email, password, role }) => {
    const [{ insertId }] = await db.query(
        `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
        [name, email, password, role ?? 'staff']
    );
    return insertId;
};

// UPDATE Data User
const update = async (id, { name, email, password, role }) => {
    let query = `UPDATE users SET name=?, email=?, role=?`;
    let values = [name, email, role || 'staff'];

    // Jika password ikut diubah
    if (password !== undefined) {
        query += `, password=?`;
        values.push(password);
    }
    
    query += ` WHERE id=?`;
    values.push(id);

    const [{ affectedRows }] = await db.query(query, values);
    return affectedRows;
};

// DELETE Data User
const destroy = async (id) => {
    const [{ affectedRows }] = await db.query(`DELETE FROM users WHERE id=?`, [id]);
    return affectedRows;
};

// Jangan lupa tambahkan update dan destroy di module.exports
module.exports = { findAll, findById, findByEmail, store, update, destroy };