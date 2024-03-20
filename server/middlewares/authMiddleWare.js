const {verify} = require('jsonwebtoken')
const validateToken  = (req,res,next)=>{
    const accessToken = req.header('accessToken')
    if(!accessToken) return res.json('user not logged in')
    try {
        const validToken = verify(accessToken,'importantsecret')
        if(validToken){
            return next()
        }
    } catch (error) {
        return res.json({error:'error valid token',error})
    }
}
module.exports = validateToken