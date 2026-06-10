import express from "express";
import Thread from "../models/Thread.js";
import getOpenRouterAPIResponse from "../utils/openrouter.js";

const router = express.Router();

//test
router.post("/test", async(req, res)=>{
    try{
        const thread = new Thread({
            threadId:"nano",
            title: "Testing Nano Thread",
        });
        const response = await thread.save();
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"failed to save in DB"});
    }
});

//get all threads
router.get("/thread", async(req, res)=>{
    try{
        const threads = await Thread.find({}).sort({updatedAt: -1});
        //descending order of updatedAt //most recent data on top
        res.json(threads);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed fetch all threads"});
    }
});

router.get("/thread/:threadId", async(req, res)=>{
    const {threadId} = req.params;

    try{
        const thread = await Thread.findOne({threadId});
        if(!thread){
            res.status(404).json({error: "Thread not found"});
        }

        res.json(thread.messages)
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to fetch the thread"});
    }
});


router.delete("/thread/:threadId", async(req, res)=>{
    const {threadId} = req.params;

    try{
        const deletedThread = await Thread.findOneAndDelete({threadId});
        if(!deletedThread){
            res.status(404).json({error: "Thread not deleted"});
        }

        res.status(200).json({success:"Thread deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to delete the thread"});
    }
});

router.post("/chat", async(req, res)=>{
    const {threadId, message} = req.body;
    if(!threadId || !message){
         res.status(400).json({success:"Missing required fields"});
    }
    try{
        let thread = await Thread.findOne({threadId});

        if(!thread){
            //create a new thread in the DB
            thread = new Thread({
                threadId,
                title: message,
                messages: [{role:"user", content: message}]
            })
        }else{
            //thread already exists
            thread.messages.push({role:"user", content: message});
        }

        const assistantReply = await getOpenRouterAPIResponse(message);
        thread.messages.push({role:"assistant", content: assistantReply});
        thread.updatedAt = new Date();
        await thread.save();
        res.json({reply: assistantReply})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Something went wrong"});
    }
});
export default router;