import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const PORT=4444;


const app = express();
app.use(express.json())


app.listen(PORT, (req,res)=>{
    console.log(`Server succeful started on port ${PORT}`)
})

app.get('/cards', (req,res) =>{
    
})


app.post('/')