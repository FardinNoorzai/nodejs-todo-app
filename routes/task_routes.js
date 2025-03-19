const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const jwt_verification_middleware = require('../middlewares/jwt_verification_middleware');
router.use(jwt_verification_middleware);
router.get('/',async (req,res)=>{
    const email = req.email;
    const user_id = req.user;
    try{
        tasks =  await Task.find({user_id});
        return res.status(200).json(tasks);
    }catch(error){
        return res.status(400).json({error: error.message});
    }
})

router.post('/',async (req,res)=>{
    const user_id = req.user;
    try{
        const task = new Task({...req.body,user_id});
        await task.save();
        return res.status(201).json(task);
    }catch(error){
        return res.status(400).json({error: error.message});
    }
})

router.delete('/',async (req,res)=>{
    const { task_id } = req.body;
    try{
        await Task.findByIdAndDelete(task_id);
        return res.status(200).json({message: 'Task deleted successfully'});
    }catch(err){
        return res.status(400).json({error: error.message});
    }
});
router.put('/',async (req,res)=>{

    const { task_id } = req.body;
    try{
        await Task
        .findByIdAndUpdate(task_id,req.body);
        return res.status(200).json({message: 'Task updated successfully'});
    }catch(err){
        return res.status(400).json({error: error.message});
    }
});

module.exports = router;