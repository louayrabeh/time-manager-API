const express = require('express')
const router = express.Router()
const project = require('../models/project')

//get all projects
router.get('/',(req,res)=>{
    project.find()
    .then(projets=>res.status(200).json({results : projets}))
    .catch(error=>res.status(400).json(error))
    })

// get project with id
router.get('/:id',(req,res)=>{
    const {id}= req.params
    project.findOne({_id : id})
    .then(project=>res.status(200).json({success : true,results : project}))
    .catch(error=>res.status(400).json({error : error.message}))
    })  
// insert project
router.post('/',(req,res)=>
{
    const {body} = req
    const proj = new project(body)
    proj.save()
    .then((doc)=>res.status(201).json({success : true , results : doc }))
    .catch(error=>res.status(400).json(error))

}
)  

// update project
router.post('/:id',(req,res)=>
{   const {id} = req.params
    const {body} = req
    project.findOneAndUpdate({_id : id},{...body , _id : id})
    .then(doc=>res.status(200).json({success : true , results : doc}))
    .catch(error=>res.status(400).json(error))

}
)

// delete project
router.delete('/:id',(req,res)=>
{   const {id} = req.params
    project.findOneAndDelete({_id : id})
    .then(doc=>res.status(200).json({success : true }))
    .catch(error=>res.status(400).json(error))

}
)
module.exports=router