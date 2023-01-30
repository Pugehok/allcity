import mongoose from 'mongoose'

const UserSchema = new Schema({
    login:{
        type:String,
        require: true,
        unique: true
    },
    avatar:{
        type:String,
    },
    firstname:{
        type:String,
        require: true
    },
    lastname:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique: true
    },
    phone:{
        type:String,
        require:true,
    },
    publication:{
        type:Array,
    },
    subscribtion:{
        type:Array,
    },
    description:{
        type:String,
    }
}, {
    timestamps:true
})


export default mongoose.model('User', UserSchema)