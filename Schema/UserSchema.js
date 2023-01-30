import mongoose from 'mongoose'

const UserSchema = new Schema({
    login:{
        type:String,
        require: true,
        unique: true
    }
}, {
    timestamps:true
})


export default mongoose.model('User', UserSchema)