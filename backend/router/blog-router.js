const express = require('express');
const router = express.Router();
const BlogSchemaModel=require('../database/model');

// get all blog
// add blog
// update blog
// delete blog
// get a blog by id

// get all blog
router.get('/user/get-all-blogs',async(req,res)=>{
    const getData=await BlogSchemaModel.find({});
    try{
        if(getData===null){
            res.status(404).json({message:"Blog not found"});
        }
        else{
            res.status(200).json({Blogs:getData,message:"Blogs found"});
        }
    }
    catch(error){
        console.log(error);
        res.status(400).json({error});
    }
})

// get blog by id
router.get('/user/get-blog')
// create a blog
router.post('/user/add-blog',async(req,res)=>{
    const createBlog=await BlogSchemaModel(req.body);
    try{
        createBlog.save();
        res.status(201).json({blog:createBlog,message:"Blog created successfully"});
    }
    catch(error){
        console.log(error);
        // res.status(400).json({message:"Unable to create blog"});
        res.status(400).json({error});
    }
})

// update a blog 
// patch to update specific data
router.patch('/user/update-blog/:id',async(req,res)=>{
    const findBlog=await BlogSchemaModel.findByIdAndUpdate({_id:req.params.id},req.body);
    try{
        if(!findBlog){
            res.status(404).json({message:"blog not found"});
        }
        else{
            res.status(200).json({updatedBlog:findBlog,message:"Blog updated successfully"});
        }
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
})
// delete blog
router.delete('/user/delete-blog/:id',async(req,res)=>{
    const deletedBlog=await BlogSchemaModel.findByIdAndDelete({_id:req.params.id});
    try{
        if(!deletedBlog){
            res.status(404).json({message:"blog not found"});
        }
        else{
            res.status(200).json({deletedBlog,message:"blog deleted successfully"});
        }
    }
    catch(error){
        console.log(error);
        res.json({error});
    }
})
module.exports=router
