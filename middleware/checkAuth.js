import jwt from 'jsonwebtoken'

 const chekAuth = (req,res,next) =>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'')
    if(token){
        try {
           const decoded = jwt.verify(token, 'secret123');
           req.userId = decoded._id;
           req.UserRole = decoded.role
            next();
        } catch (error) {
            return res.status(403).json({
                message:"Нет доступа"
            })
        }
    } else {
        return res.status(403).json({
            message:"Нет доступа"
        })
    }
}
export default chekAuth 
