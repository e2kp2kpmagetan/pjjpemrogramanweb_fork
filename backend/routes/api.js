const express = require("express");
const router = express.Router();

// IMPOR MIDDLEWARE
const verifyToken = require("../middleware/authMiddleware"); 
const { requireAdmin } = require("../middleware/roleMiddleware");

// IMPOR CONTROLLERS
const authController = require("../controllers/AuthController");
const usersController = require("../controllers/UsersController");
const customerController = require("../controllers/CustomerController");
const leadController = require("../controllers/LeadController");
const dealController = require("../controllers/DealController");
const contactsController = require("../controllers/contactsController");
const activitiesController = require("../controllers/activitiesController");

// ==========================================
// RUTE PUBLIK (Login)
// ==========================================
router.post("/auth/login", authController.login);

// ==========================================
// RUTE TERPROTEKSI (Wajib Login via JWT Token)
// ==========================================
router.use(verifyToken);

// --- 1. MANAJEMEN USERS (Kunci Mutlak: Hanya Admin) ---
router.get("/users", requireAdmin, usersController.index);
router.get("/users/:id", requireAdmin, usersController.show);
router.post("/users", requireAdmin, usersController.store);
router.put("/users/:id", requireAdmin, usersController.update);
router.delete("/users/:id", requireAdmin, usersController.delete);

// --- 2. CUSTOMERS ---
router.get("/customers", customerController.index);
router.get("/customers/:id", customerController.show);
router.post("/customers", customerController.store);
router.put("/customers/:id", customerController.update);
router.delete("/customers/:id", requireAdmin, customerController.destroy); // Hapus butuh Admin

// --- 3. LEADS ---
router.get("/leads", leadController.index);
router.get("/leads/:id", leadController.show);
router.post("/leads", leadController.store);
router.put("/leads/:id", leadController.update);
router.delete("/leads/:id", requireAdmin, leadController.destroy); // Hapus butuh Admin

// --- 4. DEALS ---
router.get("/deals", dealController.index);
router.get("/deals/:id", dealController.show);
router.post("/deals", dealController.store);
router.put("/deals/:id", dealController.update);
router.delete("/deals/:id", requireAdmin, dealController.destroy); // Hapus butuh Admin

// --- 5. CONTACTS ---
router.get("/contacts", contactsController.index);
router.get("/contacts/:id", contactsController.show);
router.post("/contacts", contactsController.store);
router.put("/contacts/:id", contactsController.update);
router.delete("/contacts/:id", requireAdmin, contactsController.destroy); // Hapus butuh Admin

// --- 6. ACTIVITIES ---
router.get("/activities", activitiesController.index);
router.get("/activities/:id", activitiesController.show);
router.post("/activities", activitiesController.store);
router.put("/activities/:id", activitiesController.update);
router.delete("/activities/:id", requireAdmin, activitiesController.destroy); // Hapus butuh Admin

module.exports = router;