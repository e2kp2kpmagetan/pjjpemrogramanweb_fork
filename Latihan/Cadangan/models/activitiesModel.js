// File models yang berguna untuk menerjemahkan isi tabel activities
const db = require('../config/database');

// Menampilkan seluruh data tabel activities
const findAll = async () => {
    const [rows] = await db.query(
        `SELECT * FROM activities`
    );
    return rows;
};

// Menampilkan by id dari tabel
const findById = async (id) => {
    const [rows] = await db.query(
        `SELECT * FROM activities WHERE id = ?`, [id]
    );
    return rows[0] ?? null;
};

//menambahkan data 
const store = async ({customer_id, type, description, activity_date, created_by}) => {// parameter sesuaikan dengan kolom yang ada di table
const [{insertId}] = await db.query(
    `INSERT INTO activities (customer_id, type, description, activity_date, created_by)
    VALUES (?, ?, ?, ?, ?)`,
    [customer_id ?? null, type ?? null, description ?? null, activity_date ?? null, created_by ?? null]  
  ); 
  return insertId;
}

//mengupdate data
const update = async (id, {customer_id, type, description, activity_date, created_by}) => {
    const [{affectedRows}] = await db.query(
        `UPDATE activities SET customer_id = ?, type=?, description=?, activity_date=?, created_by=? WHERE id=?`,
        [customer_id ?? null, type ?? null, description ?? null, activity_date ?? null, created_by ?? null, id]
    );
    return affectedRows;
}

//delete data
const destroy = async (id) =>{
    const [{affectedRows}] = await db.query(
        `DELETE FROM activities WHERE id=?`,
        [id]
    );
    return affectedRows;
}

module.exports = { findAll, findById, store, update, destroy};
