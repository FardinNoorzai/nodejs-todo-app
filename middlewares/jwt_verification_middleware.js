const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token){
        return res.status(401).json({error: 'No token, authorization denied' })
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode.user_id;
        req.email = decode.email;
        next();
    }catch(err){
        return res.status(401).json({ error: 'Token is not valid' });
    }
}

module.exports = verifyToken;