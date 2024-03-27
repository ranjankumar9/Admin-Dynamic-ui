const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ msg: 'Token is required' });

    jwt.verify(token, 'admin', (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // Token is expired, generate a new token
                const newToken = jwt.sign({ email: user.email, name: user.name }, 'admin', { expiresIn: '15m' });
                req.token = newToken;
                next();
            } else {
                return res.status(403).json({ msg: 'Invalid Token Please Verify It!' });
            }
        } else {
            req.user = user;
            next();
        }
    });
};

module.exports = { authenticateToken };
