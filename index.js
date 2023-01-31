import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { registerValidator } from './Validation/AuthValidation.js'
import UserModel from './Schema/UserSchema.js'
import { validationResult } from 'express-validator'
import checkAuth from './middleware/checkAuth.js'
dotenv.config()
const app = express();


mongoose
.connect(process.env.DB_CONNECT)
.then(()=> console.log("База данных запущена"))
.catch((e)=> console.log(`База данных не смогла запуститься ${e}`))



app.use(express.json())



app.listen(process.env.PORT|| 4000, (req,res)=>{
    console.log(`Server succeful started on port ${process.env.PORT}`)
});

app.get('/cards', (req,res) =>{
});

app.get('/auth/me', checkAuth, async (req,res) => {
    try {
        const user = await UserModel.findById(req.userId)
        const {passwordHash, ...userData} = user._doc
        res.json({
            ...userData
        })
      if(!user)
        res.status(404).json({
            message:"Пользователь не найден"
        })
    } catch (error) {
        res.status(500).json({
            message:"Нет досутпа"
        })
    }
})


app.post('/auth/login', async (req,res) =>{
    try {
        const user = await UserModel.findOne({email:req.body.email});
        if(!user){
            return req.status(404).json({
                message: 'Пользователь не найден'
            })
        }

    
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if(!isValidPass){
            return res.status(400).json({
                message:"Неверный логин или пароль"
            })
        }

        const token = jwt.sign({
            _id:user._id,
        },
        'secret123',
        {
            expiresIn:'30d',
        })

        const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось авторизоваться"
        })
    }
})


app.post('/register', registerValidator, async (req,res) =>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors)
            return res.status(400).json(errors.array())
        }
           
    
        const password = req.body.password
        const salt = await bcrypt.genSalt(7)
        const hash = await bcrypt.hash(password,salt)
        const UserData = new UserModel ({
        login: req.body.userName,
        email: req.body.email,
        firstname: req.body.fullName,
        lastname: req.body.lastName,
        passwordHash:hash
        }) 
    
        const user = await UserData.save()
        const token = jwt.sign({
            _id:user._id,
        },
        'secret123',
        {
            expiresIn:'30d',
        })

    const {passwordHash, ...userData} = user._doc

        res.json({
            ...userData,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось зарегистрироваться"
        })
    }
  

});





