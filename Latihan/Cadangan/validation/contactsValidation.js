// Validasi data yang diakses harus angka murni (0-9)
const validateId = (id) => {
    if(!id || isNaN(id)) return 'ID harus berupa angka';
    return null;
};

const validateStore = ({customer_id, name, email, phone, position} = {}) =>{
    const errors = [];
//kondisi error
    if(!customer_id) errors.push('ID Pelanggan wajib diisi');
    if(!name || !name.trim()) errors.push('Nama wajib diisi');
    if(!email || !email.trim()) errors.push('Email wajib diisi');
    if(!phone || !phone.trim()) errors.push('Nomor telepon wajib diisi');
    if(!position || !position.trim()) errors.push('Posisi wajib diisi');
    if(phone && phone.length > 20) errors.push("Nomor Telepon maksimal 20 karakter");
    
    return errors.length ? errors : null;
}

//validasi update samakan dengan store
const validateUpdate = validateStore
module.exports = { validateId, validateStore, validateUpdate };