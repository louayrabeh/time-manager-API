const jwt = require('jsonwebtoken')

function verifyToken(req,res,next)
{
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({success : false , msg : "access denied"})
    try {
        const verified = jwt.verify(token,process.env.SECRET_KEY)
        req.user=verified
        next()
    } catch (error) {
        res.status(401).json({success : false , error : error})
    }
    

}
module.exports = verifyToken