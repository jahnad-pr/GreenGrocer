const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    // Verify token here (e.g., with JWT)
    next();
};

module.exports = authMiddleware;
