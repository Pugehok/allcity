import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    login:{
        type:String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require: true,
    }
}, {
    timestamps:true
})


export default mongoose.model('User', UserSchema)