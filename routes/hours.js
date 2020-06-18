const express = require('express')
const router = express.Router()
const hour = require('../models/hour')
// routes 
//get all hours
router.get('/',(req,res)=>{
hour.find()
.then(hours=>res.status(200).json({results : hours}))
.catch(error=>res.status(400).json(error))
})
//get hours by task
router.get('/task/:id',(req,res)=>{
    const {id} = req.params
    hour.find({taskId : id})
    .then(hours=>res.status(200).json({results : hours}))
    .catch(error=>res.status(400).json(error))
    })
//get hours by user
router.get('/user/:id',(req,res)=>{
    const {id} = req.params
    hour.find({userId : id})
    .then(hours=>res.status(200).json({results : hours}))
    .catch(error=>res.status(400).json(error))
    })
    

// get hour with id
router.get('/:id',(req,res)=>{
    const {id}= req.params
    hour.findOne({_id : id})
    .then(hours=>res.status(200).json({success : true,results : hours}))
    .catch(error=>res.status(400).json({error : error.message}))
    })

// insert hour
router.post('/',(req,res)=>
{
    const {body} = req
    const hour1 = new hour(body)
    hour1.save()
    .then((doc)=>res.status(201).json({success : true , results : doc }))
    .catch(error=>res.status(400).json(error))

}
)
// update hour
router.post('/:id',(req,res)=>
{   const {id} = req.params
    const {body} = req
    hour.findOneAndUpdate({_id : id},{...body , _id : id})
    .then(doc=>res.status(200).json({success : true , results : doc}))
    .catch(error=>res.status(400).json(error))

}
)

// delete hour
router.delete('/:id',(req,res)=>
{   const {id} = req.params
    hour.findOneAndDelete({_id : id})
    .then(doc=>res.status(200).json({success : true }))
    .catch(error=>res.status(400).json(error))

}
)
module.exports=router