import jwt from 'jsonwebtoken'
import UserSchema from '../Schema/UserSchema.js';
import UserModel from '../Schema/UserSchema.js'

 export default  async (req,res,next) =>{
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'')
    if(token){      
        const decoded = jwt.verify(token, 'secret123');
        const user = await UserModel.findById(decoded._id)
        if(user.role == "adminstrator"){
            next();
        }else{
            return res.status(500).json({message:"У вас не хватает прав"})
        }
    }    

}