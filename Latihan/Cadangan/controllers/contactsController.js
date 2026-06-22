const contactsModel = require('../models/contactsModel');
const {validateId, validateStore, validateUpdate} = require('../validation/contactsValidation');

class ContactsController {
    constructor() {
        // Mengikat (binding) konteks 'this' agar aman saat dipanggil oleh Express Router
        this.index = this.index.bind(this);
        this.show = this.show.bind(this);
    }

    // Menampilkan seluruh data tabel contacts
    async index(req, res) {
        try {
            const data = await contactsModel.findAll();
            res.json({ success: true, total: data.length, data });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

    // Menampilkan data contact berdasarkan ID
    async show(req, res) {
        try {
            const { id } = req.params;
            const error = validateId(id);
            if (error) return res.status(400).json({ success: false, message: error });

            const data = await contactsModel.findById(id);
            if (!data) return res.status(404).json({ success: false, message: "Kontak tidak ditemukan" });
            
            res.json({ success: true, data });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }

   async store(req, res, next){
        // res.send("Menambahkan data");
        try{
            const errors = validateStore(req.body);
            if(errors) return res.status(400).json({success:false, errors});
            const id = await contactsModel.store(req.body);
            res.status(201).json({
                success: true,
                message: 'Kontak berhasil ditambahkan',
                data : {id},
            });
        } catch (err){
            next(err);
        }
   }

    async update(req, res, next){
        try{
            const {id} = req.params;
            const idError = validateId(id);
            if (idError) return res.json(400).json({success:false, message: idError});
    
            const errors = validateUpdate(req.body);
            if(errors) return res.status(400).json({success:false, errors});
    
            const affected = await contactsModel.update(id, req.body)// mengakses id mana yang akan diupdate
            if(!affected) return res.status(404).json({success:false, message: 'Kontak Tidak ditemukan'});
            res.json({success: true, message: 'Kontak Berhasil diupdate'});
            // res.send(`Mengupdate data id ${id}`);
        } catch (err){
            next(err);
        }
    }

    async destroy(req, res, next){
        // const {id} = req.params;
        // res.send(`Menghapus data id ${id}`);
         try{
        const {id} = req.params;
        const idError = validateId(id);
        if (idError) return res.json(400).json({success:false, message: idError});
 
         const affected = await contactsModel.destroy(id, req.body)// mengakses id mana yang akan diupdate
         if(!affected) return res.status(404).json({success:false, message: 'Kontak Tidak ditemukan'});
         
         res.json({success: true, message: 'Kontak Berhasil Dihapus'});
        } catch (err){
            next(err);
        }
    }
}

// Instansiasi objek kontroler
const object = new ContactsController();

// Ekspor objek siap pakai
module.exports = object;