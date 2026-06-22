//validasi data yang diakses harus angka
const validateId = (id) => {
  if (!id || isNaN(id)) return 'ID harus berupa angka';
  return null;
};

const ACTIVITY_TYPE = ["Call", "Email", "Meeting", "Note"];

const validateStore = ({ customer_id, created_by, type } = {}) => {
   const errors = [];
   //kondisi error
   if (!customer_id) errors.push("Customer_id wajib diisi");
   if (!created_by) errors.push("Created_by wajib diisi");
   if (type && !ACTIVITY_TYPE.includes(type))
      errors.push(`Status harus: ${ACTIVITY_TYPE.join(", ")}`);

   return errors.length ? errors : null;
};

//validasi update samakan dengan store
const validateUpdate = validateStore;

module.exports = { validateId, validateStore, validateUpdate };