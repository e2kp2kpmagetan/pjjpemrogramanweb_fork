const db = require('../config/database');

// =================================================================
// 1. FUNGSI CRUD STANDAR UNTUK HALAMAN DEALS
// =================================================================
const findAll = async () => {
    const [rows] = await db.query(`
        SELECT d.*, l.title AS lead_title 
        FROM deals d
        LEFT JOIN leads l ON d.lead_id = l.id
        ORDER BY d.created_at DESC
    `);
    return rows;
};

const findById = async (id) => {
  const [rows] = await db.query(
    `SELECT d.id, d.title, d.value, d.stage, d.closed_at, d.created_at,
            l.id      AS lead_id,
            l.title   AS lead_title,
            l.status  AS lead_status,
            c.id      AS customer_id,
            c.name    AS customer_name,
            c.company AS customer_company
     FROM   deals d
     LEFT JOIN leads     l ON d.lead_id     = l.id
     LEFT JOIN customers c ON l.customer_id = c.id
     WHERE  d.id = ?`,
    [id]
  );
  return rows[0] ?? null;
};

const store = async ({ lead_id, title, value, stage, closed_at }) => {
    const dateClosed = closed_at ? closed_at : null; 
    const [{ insertId }] = await db.query(
        `INSERT INTO deals (lead_id, title, value, stage, closed_at) VALUES (?, ?, ?, ?, ?)`,
        [lead_id ?? null, title ?? null, value ?? null, stage ?? 'Proposal', dateClosed]
    );
    return insertId;
}

const update = async (id, { lead_id, title, value, stage, closed_at }) => {
    const dateClosed = closed_at ? closed_at : null;
    const [{ affectedRows }] = await db.query(
        `UPDATE deals SET lead_id=?, title=?, value=?, stage=?, closed_at=? WHERE id=?`,
        [lead_id ?? null, title ?? null, value ?? null, stage ?? null, dateClosed, id]
    );
    return affectedRows;
};

const destroy = async (id) => {
    const [{ affectedRows }] = await db.query(`DELETE FROM deals WHERE id=?`, [id]);
    return affectedRows;
};

// =================================================================
// 2. FUNGSI KHUSUS TRIGGER DARI LEADS (PENYEBAB ERROR TADI)
// =================================================================
const createFormLead = async (leadId, title, stage) => {
  const [{insertId}] = await db.query(
    `INSERT INTO deals (lead_id, title, stage) VALUES (?,?,?)`,
    [leadId, title, stage ?? null]
  );
  return insertId;
}

const updateStageByLeadId = async (leadId, stage, value = null) => {
  await db.query(
    `UPDATE deals SET stage=? WHERE lead_id=?`,
    [stage ?? null, leadId]
  );
};

const removeByLeadId = async (leadId) => {
  await db.query(`DELETE FROM deals WHERE lead_id =?`, [leadId]);
};

// =================================================================
// 3. EXPORT SEMUA FUNGSI AGAR BISA DIBACA CONTROLLER
// =================================================================
module.exports = { 
  findAll, findById, store, update, destroy, 
  createFormLead, updateStageByLeadId, removeByLeadId 
};