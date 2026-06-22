//validasi data yang diakses harus angka
const validateId = (id) => {
    if(!id || isNaN(id)) return 'ID harus berupa angka';
    return null;
};

const validateStore = ({customer_id, type, description, activity_date, created_by} = {}) =>{
    const errors = [];
//kondisi error
    if(!customer_id) errors.push('ID Pelanggan wajib diisi');
    if(!type || !type.trim()) errors.push('Tipe wajib diisi');
    if(!description || !description.trim()) errors.push('Deskripsi wajib diisi');
    if(!activity_date) errors.push('Tanggal wajib diisi');
    if(!created_by) errors.push('Kode Pembuat wajib diisi');
    
    return errors.length ? errors : null;
}

const validateUpdate = validateStore
module.exports = { validateId, validateStore, validateUpdate };