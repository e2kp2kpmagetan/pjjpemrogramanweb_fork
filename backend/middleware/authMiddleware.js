const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer <token>

    if (!token) return res.status(401).json({ success: false, message: 'Akses ditolak, Token tidak ada' });

    jwt.verify(token, process.env.JWT_SECRET || 'rahasia_super_aman', (err, decoded) => {
        if (err) return res.status(403).json({ success: false, message: 'Token tidak valid atau kedaluwarsa' });
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;