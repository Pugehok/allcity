import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { registerValidator } from './Validation/AuthValidation.js'
import UserModel from './Schema/UserSchema.js'
import { validationResult } from 'express-validator'

dotenv.config()
const app = express();
const DB_CONNECT = process.env.DB_CONNECT
const PORT = process.env.PORT

mongoose
.connect(DB_CONNECT)
.then(()=> console.log("База данных запущена"))
.catch((e)=> console.log(`База данных не смогла запуститься ${e}`))



app.use(express.json())


app.listen(PORT || 4000, (req,res)=>{
    console.log(`Server succeful started on port ${process.env.PORT}`)
});

app.get('/cards', (req,res) =>{
    
});


app.post('/register', registerValidator, (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors)
        return res.status(400).json(errors.array())
    }

    res.send('Вы зарегаались')
});