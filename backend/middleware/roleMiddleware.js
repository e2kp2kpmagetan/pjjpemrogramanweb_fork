// backend/middleware/roleMiddleware.js
const requireAdmin = (req, res, next) => {
    // Membaca data role dari token JWT yang sudah di-decode oleh middleware verifyToken
    const userRole = req.user ? req.user.role : req.userRole;

    if (userRole !== 'admin') {
        return res.status(403).json({ 
            success: false, 
            message: "Akses ditolak: Area ini eksklusif hanya untuk Administrator!" 
        });
    }
    next();
};

module.exports = { requireAdmin };