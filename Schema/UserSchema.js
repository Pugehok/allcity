import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    login:{
        type:String,
        require: true,
        unique: true
    },
    role:{
      type:String,
      required: true,
      default: "user"  
    },
     email:{
        type:String,
        required:true,
        unique: true
    },
    avatar:{
        type:String,
    },
    firstname:{
        type:String,
        required: true
    },
    lastname:{
        type:String,
        required:true
    },
    passwordHash:{
        type:String,
        required:true
    },
   
    phone:{
        type:String,
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