
const express = require("express");
const router = express.Router();//route modular => membantu file route agar digunakan di bagian server(app.js)

const CustomerController = require("../controllers/CustomerController");
const leadCtrl     = require('../controllers/LeadController');
const dealCtrl     = require('../controllers/DealController');
const dashboardCtrl = require('../controllers/DashboardController');
const contactsController = require('../controllers/contactsController');
const activitiesController = require('../controllers/activitiesController');
//define route atau ketika diakses diluar maka disebut endpoint

router.get("/", (req, res)=> {
    res.send("Hello express"); 
});


router.get("/dashboard", dashboardCtrl.index);

router.get("/customers", CustomerController.index);
router.get("/customers/:id", CustomerController.show);
router.post("/customers", CustomerController.store);
router.put("/customers/:id", CustomerController.update);
router.delete("/customers/:id", CustomerController.destroy);


// Leads
router.get('/leads',         leadCtrl.index);
router.get('/leads/:id',     leadCtrl.show);
router.post('/leads', leadCtrl.store);
router.put('/leads/:id',leadCtrl.update);
router.delete('/leads/:id', leadCtrl.destroy);
 
// Deals
router.get('/deals',         dealCtrl.index);
router.get('/deals/:id',     dealCtrl.show);

//Contacts
router.get("/contacts", contactsController.index);
router.get("/contacts/:id", contactsController.show);
router.post("/contacts", contactsController.store);
router.put("/contacts/:id", contactsController.update);
router.delete("/contacts/:id", contactsController.destroy);

//Activities
router.get("/activities", activitiesController.index);
router.get("/activities/:id", activitiesController.show);
router.post("/activities", activitiesController.store);
router.put("/activities/:id", activitiesController.update);
router.delete("/activities/:id", activitiesController.destroy);

module.exports = router;