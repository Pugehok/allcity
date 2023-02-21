import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv' 
import { registerValidator } from './Validation/AuthValidation.js'
import {UserController, PostController} from './controllers/index.js'
import checkAuth  from './middleware/checkAuth.js'
import checkRole  from './middleware/chekRoles.js'
import {postCreateValidator} from './Validation/PostValidation.js'
import multer from 'multer'
import cors from 'cors'

dotenv.config()
const app = express();

app.use(cors())

const storage = multer.diskStorage({
    destination: (_, __, cb)=>{
        cb(null, "uploads")
    },
    filename:(_, file, cb)=>{
        cb(null, `${file.originalname}`)
    },
})

mongoose
.connect(process.env.DB_CONNECT)
.then(()=> console.log("База данных запущена"))
.catch((e)=> console.log(`База данных не смогла запуститься ${e}`))


const upload = multer({storage})


app.use(express.json())



app.listen(process.env.PORT || 4000, (req,res)=>{
    console.log(`Server succeful started on port ${process.env.PORT}`)
});



app.post('/upload', checkAuth, upload.single('image'), (req, res)=>{
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})


app.use('/uploads', express.static('uploads'), (req,res)=>{
})

app.get('/auth/me', checkAuth, UserController.getMe)


app.post('/auth/login', UserController.login)


app.post('/register', registerValidator, UserController.register)

app.get('/posts', PostController.getAll)
app.get('/posts/:id', checkAuth, PostController.getOne)
app.post('/posts/', checkAuth, postCreateValidator, PostController.create)
app.delete('/posts/:id', checkAuth, checkRole, PostController.remove)
app.patch('/posts/:id', checkAuth, PostController.update)


