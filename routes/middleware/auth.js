const jwt = require('jsonwebtoken')

// middleware(request, respond, next middleware)
function auth(req, res, next)
{
    const token = req.headers['authorization'];
    console.log(JSON.stringify(req.headers))
    
    // Check for token
    if(!token) return res.status(401).json({ msg: 'No token, authroziation is denied' })    // 401 - Unauthorised
    
    try{
        // Verify token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

        // Add user from payload
        req.user = decoded;

        console.log("Pass")
        next();
        
    }catch(e){
        console.log("Bad request")
        // 400 - bad request
        res.status(400).json({ msg: 'Token is not valid' })
    }    

}

module.exports = auth;