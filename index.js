import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const PORT=4444;


const app = express();

mongoose
.connect('mongodb+srv://pugehok:3429382q@cluster0.klurzlj.mongodb.net/?retryWrites=true&w=majority')
.then(()=> console.log("База данных запущена"))
.catch((e)=> console.log(`База данных не смогла запуститься ${e}`))
app.use(express.json())


app.listen(PORT, (req,res)=>{
    console.log(`Server succeful started on port ${PORT}`)
});

app.get('/cards', (req,res) =>{
    
});


app.post('/', (req,res) =>{

});