import {postCreateValidator} from '../Validation/PostValidation.js'
import PostModel from '../Schema/PostSchema.js'
import { validationResult } from 'express-validator'
import { getUserId } from '../middleware/checkAuth.js'

export const getAll = async (req,res) =>{
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)
    } catch (error) {
        
    }
}

export const create = async (req,res) =>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors)
            return res.status(400).json(errors.array())
        }

       const doc = new PostModel({
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId
    }) 

    const post = await doc.save().then((d) => {
        res.status(200).json({
            message:'Ваш пост успешно создан'
        })
        console.log(`пользователь - ${req.userId} создал новый пост`)
    }).catch((err)=>{
        console.log(err)
        res.status(300).json({
            message:"Что - то пошло не так"
        })
    })

    } catch (err) {
        console.log(err)

        res.status(400).json({
            message:"Что - то пошло не так"
        })
    }
}

export const getOne = async (req, res) =>{
    try {
        const postId = req.params.id;

        PostModel.findOneAndUpdate({
            _id:postId,

        }, {
            $inc: {viewsCount: 1}
        },
        {
            returnDocument:'after'
        },
        (err, doc) =>{
        if(!doc){
             return res.status(404).json({
             message: "Не удалось найти пост"
                })
         }
            if(err){
              console.log(err)
              return  res.status(500).json({
                    message: "Не удалось загрузить пост"
                })
            }
            res.status(200).json(doc)
        }
    )

    } catch (error) {
        console.log(err)
        res.status(500).json({
            message: "Не удалось загрузить пост"
        })
    }
}

export const remove = async(req,res)=>{
        const postId = req.params.id;
        try {
            PostModel.findByIdAndDelete({_id:postId},(err,doc)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    message:"Не удалось удалить статью"
                })
            }
            if(!doc) return res.status(400).json({
                message:"Не удалось найти статью."
            })
            console.log(doc.user._id)
            res.status(200).json({
                message:"Статья успешно удалена"
            })

            })

        } catch (error) {
            console.log(error)
        }
      
    }

    export const update = async (req,res)=>{
        try {
            const postId = req.params.id
            const isText = req.body.text;
            const isTitle = req.body.title; 
            if(isText.length && isTitle.length < 6) return res.json({message:"Обнавляемая глава или текст не должен быть короче 6-ти символов"})

        PostModel.findByIdAndUpdate({
                _id: postId
            },{
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId
            },(err,doc)=>{
                try {
                    if(err) {
                        console.log(err)
                        return res.status(500).json({message:"Упс, что - то пошло не так"})
                    }
                    if(!doc) return res.status(400).json({message:"Статья которую вы хотите отредактировать не найдена!"})
                    if(doc) return res.status(200).json({message:"Статья успешно обновлена"})
                } catch (error) {
                    console.log(error)
                }
               
            })
           
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message:"Не получилось обновить запись"                
            })
        }
    }