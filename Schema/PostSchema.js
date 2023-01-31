import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    
    publishman:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require: true,
    },
    photo:{
        type: string,
        require: true,
    },
    author:{
        type: string,
    },
    tags:{
        type:string
    },
    // views amount of views in numbers
    views :{
        type:number
    },
    views :{
        type:number
    },
    comments:{
        type: array
    },
    onmoderation:{
        type:Boolean,
    }
}, {
    timestamps:true
})


export default mongoose.model('Post', PostSchema)