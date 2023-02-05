import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { registerValidator } from './Validation/AuthValidation.js'
import { validationResult } from 'express-validator'
import checkAuth from './middleware/checkAuth.js'
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
import chekAuth from './middleware/checkAuth.js'
import {chekRole} from './middleware/chekRoles.js'
import {postCreateValidator} from './Validation/PostValidation.js'
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


app.get('/auth/me', checkAuth, UserController.getMe)


app.post('/auth/login', UserController.login)


app.post('/register', registerValidator, UserController.register)

app.get('/posts', chekAuth, PostController.getAll)
app.get('/posts/:id', chekAuth, PostController.getOne)
app.post('/posts/', checkAuth, postCreateValidator, PostController.create)
app.delete('/posts/:id', chekAuth, chekRole, PostController.remove)
app.patch('/posts/:id', chekAuth, PostController.update)


