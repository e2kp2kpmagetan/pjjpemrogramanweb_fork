// File models yang berguna untuk menerjemahkan isi tabel contacts
const db = require("../config/database");

// Menampilkan seluruh data tabel contacts
const findAll = async () => {
    const [rows] = await db.query(`
        SELECT ct.*, c.name AS customer_name 
        FROM contacts ct
        LEFT JOIN customers c ON ct.customer_id = c.id
        ORDER BY ct.created_at DESC
    `);
    return rows;
};

// Menampilkan by id dari tabel contacts
const findById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM contacts WHERE id = ?`, [id]);
  return rows[0] ?? null;
};

//menambahkan data
const store = async ({customer_id, name, email, phone, position}) => {// parameter sesuaikan dengan kolom yang ada di table
const [{insertId}] = await db.query(
    `INSERT INTO contacts (customer_id, name, email, phone, position)
    VALUES (?, ?, ?, ?, ?)`,
    [customer_id  ?? null, name ?? null, email ?? null, phone ?? null, position ?? null]  
  ); 
  return insertId;
}

// MENGUPDATE DATA (Perhatikan posisinya: id dulu, baru datanya)
const update = async (id, {customer_id, name, email, phone, position}) => {
    const [{affectedRows}] = await db.query(
        `UPDATE contacts SET customer_id = ?, name=?, email=?, phone=?, position=?  WHERE id=?`,
        [customer_id ?? null, name ?? null, email ?? null, phone ?? null, position ?? null, id]
    );
    return affectedRows;
}

//delete data
const destroy = async (id) =>{
    const [{affectedRows}] = await db.query(
        `DELETE FROM contacts WHERE id=?`,
        [id]
    );
    return affectedRows;
}

module.exports = { findAll, findById, store, update, destroy};
