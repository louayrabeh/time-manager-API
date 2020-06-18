const express = require('express')
const router = express.Router()
const user = require('../models/user')  
const jwt = require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const nodemailer = require('nodemailer')
// routes 

//get all users
router.get('/',(req,res)=>{
user.find()
.then(users=>res.status(200).json({success : true,results : users}))
.catch(error=>res.status(400).json(error))
})

// get user with id
router.get('/:id',(req,res)=>{
    const {id}= req.params
    user.findOne({_id : id})
    .then(users=>res.status(200).json({success : true,results : users}))
    .catch(error=>{console.log(error); res.status(400).json({error : error.message});})
    })




    //change password
    router.post('/passwordChange/:id',async (req,res)=>
    {   const {id} = req.params
        const {body} = req
        const user2= await user.findOne({email : body.email})
        if (!user2) return res.status(400).json({success:false , error:"a user with this email doesn't exists"})
        const token = req.header('auth-token')
        const tokenDecoded = jwt.decode(token)
        const user3= await user.findOne({_id : tokenDecoded.id})
        if (user3.userRole!=='manager'){
            if (user3.email!==body.email) return res.status(400).json({success:false ,error : "This is not your account , you cannot update its data"})
        }
        
        //Hash password
        const {password} = body
        const salt = await bcrypt.genSalt(10)
        const cryptoPass = await bcrypt.hash(password,salt)
        user.findOneAndUpdate({_id : id},{...user2 , password : cryptoPass , _id : id})
        .then(doc=>res.status(200).json({success : true , results : doc}))
        .catch(error=>res.status(400).json(error))
    
    }
    )




// update user
router.post('/:id',async (req,res)=>
{   const {id} = req.params
    const {body} = req
    const user2= await user.findOne({email : body.email})
    if (!user2) return res.status(400).json({success : false , error :"a user with this email doesn't exists"})
    const token = req.header('auth-token')
    const tokenDecoded = jwt.decode(token)
    const user3= await user.findOne({_id : tokenDecoded.id})
    if (user3.userRole!=='manager'){
        if (user3.email!==body.email) return res.status(400).json({success : false , error :"This is not your account , you cannot update its data"})
    }
    

    user.findOneAndUpdate({_id : id},{...body,_id:id})
    .then(doc=>res.status(200).json({success : true , results : doc}))
    .catch(error=>res.status(400).json({error}))

}
)



// delete user
router.delete('/:id',(req,res)=>
{   const {id} = req.params
    user.findOneAndDelete({_id : id})
    .then(doc=>res.status(200).json({success : true }))
    .catch(error=>res.status(400).json({error}))

}
)
module.exports=router