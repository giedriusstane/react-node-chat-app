import jwt from 'jsonwebtoken';



const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        req.userId = payload.userId;
        next();
    })

};


export default { verifyToken };