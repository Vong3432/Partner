const jwt = require('jsonwebtoken')

// middleware(request, respond, next middleware)
function auth(req, res, next)
{
    const token = req.header('auth-token');

    // Check for token
    if(!token) return res.status(401).json({ msg: 'No token, authroziation is denied' })    // 401 - Unauthorised
    
    try{
        // Verify token
        const decoded = jwt.verify(token, 'myJwtSecret')

        // Add user from payload
        req.user = decoded;
        next();
        
    }catch(e){
        // 400 - bad request
        res.status(400).json({ msg: 'Token is not valid' })
    }    

}

module.exports = auth;