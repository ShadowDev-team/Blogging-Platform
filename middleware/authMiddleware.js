const authMiddleware = (req, res, next) => {
    const publicPaths = ['/home', '/login', '/register', '/reset-password', 'reset-password/verify'];

    const isPublicPath = publicPaths.includes(req.path) || /^\/blog\/\d+$/.test(req.path);

    if (req.path.startsWith('/api')) return next();
    if (isPublicPath) return next();

    // Check if user is in the session
    if (req.session && req.session.user) return next();

    res.redirect('/login');
};

module.exports = authMiddleware;