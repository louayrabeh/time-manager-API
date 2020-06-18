const express = require('express')
const router = express.Router()
const subCategory = require('../models/subCategory')


//get all subCategories
router.get('/',(req,res)=>{
    subCategory.find()
    .then(subCategories=>res.status(200).json({results : subCategories}))
    .catch(error=>res.status(400).json(error))
    })
// get a project's subcategories
router.get('/project/:id',(req,res)=>{
    const {id} = req.params

        subCategory.find({projectId : id})
        .then(subCategories=>res.status(200).json({results : subCategories}))
        .catch(error=>res.status(400).json(error))
        })


// get subCategory with id
router.get('/:id',(req,res)=>{
    const {id}= req.params
    console.log(id)
    subCategory.findOne({_id : id})
    .then(result=>res.status(200).json({success : true,results : result}))
    .catch(error=>res.status(400).json({error : error.message}))
    })


// insert subCategory
router.post('/',(req,res)=>
{
    const {body} = req
    const emp = new subCategory(body)
    emp.save()
    .then((doc)=>res.status(201).json({success : true , results : doc }))
    .catch(error=>res.status(400).json(error))
    return
}
)
// update subCategory
router.post('/:id',(req,res)=>
{   const {id} = req.params
    const {body} = req
    subCategory.findOneAndUpdate({_id : id},{...body , _id : id})
    .then(doc=>res.status(200).json({success : true , results : doc}))
    .catch(error=>res.status(400).json(error))

}
)

// delete subCategory
router.delete('/:id',(req,res)=>
{   const {id} = req.params
    subCategory.findOneAndDelete({_id : id})
    .then(doc=>res.status(200).json({success : true }))
    .catch(error=>res.status(400).json(error))

}
)
module.exports=router
