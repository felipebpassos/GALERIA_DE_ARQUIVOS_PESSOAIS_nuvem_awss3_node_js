const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1]; // Remove o 'Bearer' do início do header

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Adiciona o userId ao request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido.' });
    }
};

module.exports = auth;
