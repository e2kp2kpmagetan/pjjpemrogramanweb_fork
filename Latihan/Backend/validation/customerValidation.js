
//validasi data yang diakses harus angka
const validateId = (id) => {
    if(!id || isNaN(id)) return 'ID harus berupa angka';
    return null;
};

const validateStore = ({name, email, phone, company, status} = {}) =>{
    const errors = [];
//kondisi error
    if(!name || !name.trim()) errors.push('name wajib diisi');
    if(name && name.length > 100) errors.push('name maksimal 100 karakter');
    if(email && email.length> 100) errors.push('email maksimal 100 karakter');
    if(phone && phone.length > 20) errors.push('phone maksimal 20 karakter');

    return errors.length ? errors : null;
}

//validasi update samakan dengan store
const validateUpdate = validateStore
module.exports = {validateId, validateStore, validateUpdate};