// File models yang berguna untuk menerjemahkan isi tabel activities
const db = require('../config/database');

// Menampilkan seluruh data tabel activities
const findAll = async () => {
    const [rows] = await db.query(
    `SELECT a.id, a.type, a.description, a.activity_date, a.created_by,
            c.id    AS customer_id,
            c.name  AS customer_name
     FROM   activities a
     LEFT JOIN customers c ON a.customer_id = c.id
     ORDER BY a.activity_date DESC`
    );
    return rows;
};

// Menampilkan by id dari tabel
const findById = async (id) => {
    const [rows] = await db.query(
    `SELECT a.id, a.type, a.description, a.activity_date, a.created_by,
            c.id    AS customer_id,
            c.name  AS customer_name
     FROM   activities a
     LEFT JOIN customers c ON a.customer_id = c.id
     ORDER BY a.activity_date DESC
     WHERE id = ?`, [id]
    );
    return rows[0] ?? null;
};


const store = async ({
   customer_id,
   type,
   description,
   activity_date,
   created_by,
}) => {
   const [{ insertId }] = await db.query(
      `INSERT INTO activities (customer_id, type, description, activity_date, created_by)
       VALUES (?, ?, ?, ?, ?)`,
      [
         customer_id,
         type ?? null,
         description ?? null,
         activity_date ?? null,
         created_by ?? null,
      ],
   );
   return insertId;
};

const update = async (
   id,
   { customer_id, type, description, activity_date, created_by },
) => {
   const [{ affectedRows }] = await db.query(
      `UPDATE activities SET customer_id=?, type=?, description=?, activity_date=?,created_by=? WHERE id=?`,
      [
         customer_id,
         type ?? null,
         description ?? null,
         activity_date ?? null,
         created_by ?? null,
         id,
      ],
   );

   return affectedRows;
};

const destroy = async (id) => {
   const [{ affectedRows }] = await db.query(
      `DELETE FROM activities WHERE id=?`,
      [id],
   );

   return affectedRows;
};

//menambahkan data
const createFormCust = async (
   customer_id,
   type,
   description,
   activity_date,
   created_by,
) => {
   // parameter sesuaikan dengan kolom yang ada di table
   const [{ insertId }] = await db.query(
      `INSERT INTO activities (customer_id, type, description, activity_date, created_by)
    VALUES (?, ?, ?, ?, ?)`,
      [
         customer_id,
         type ?? null,
         description ?? null,
         activity_date ?? null,
         created_by ?? null,
      ],
   );
   return insertId;
};

module.exports = { findAll, findById, store, update, destroy, createFormCust};
