import jwt from 'jsonwebtoken'
import UserSchema from '../Schema/UserSchema.js';

 export const chekRole = (req,res,next) =>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'')
    if(token){      
        const decoded = jwt.verify(token, 'secret123');
        req.userRole = decoded.role
        if(req.userRole !== "user"){
            next();
        }else{
            return res.status(500).json({message:"У вас не хватает прав"})
        }
    }    

}