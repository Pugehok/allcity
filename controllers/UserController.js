import UserModel from '../Schema/UserSchema.js'
import { validationResult } from 'express-validator'
import checkAuth from '../middleware/checkAuth.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) =>{

        try {
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
                role:user.role
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
      
}

export const login = async (req,res) =>{
    try {
        const user = await UserModel.findOne({email:req.body.email});
        if(!user){
            return res.status(404).json({
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
            role: user.role
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
}


export const getMe = async (req,res) =>{
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
            message:"Нет доступа"
        })
    }
}