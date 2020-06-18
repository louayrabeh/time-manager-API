const jwt = require('jsonwebtoken')

function verifyRole(req,res,next)
{
    const token = req.header('auth-token')
    try {
        const verified = jwt.verify(token,process.env.SECRET_KEY)
        
        if (!(req.method==='GET'))
        {
         
    if (!(verified.userRole === 'manager')) 
    {    if (!(req.originalUrl.split('/api/tasks').length > 0))
                {
                    return res.status(401).json({success :false , msg :"You can\'t change data , Access Denied !!"});
                    }
     
            
        
        
    }
        }

        req.user=verified
        next()
    } catch (error) {
        res.status(401).json({success:false , error})
    }
    

}
module.exports = verifyRole