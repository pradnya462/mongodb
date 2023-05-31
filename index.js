const dbConnect=require('./mongodb')
const express=require('express');

const app=express();
//get API
app.use(express.json())
app.get('/',async(req,res)=>{
    let result=await dbConnect();
    result=await result.find().toArray();
    res.send(result);
})

//post API

app.post('/',async(req,res)=>{
    let result=await dbConnect();
    result=await result.insertOne(req.body);
    res.send("data inserted successfully");
})

//put API
app.put('/:name',async(req,res)=>{
    let result=await dbConnect();
    result=await result.updateOne({name:req.params.name},{$set:req.body});
    res.send("data updated successfully");
})
app.delete('/:name',async(req,res)=>{
    let result=await dbConnect();
    result=(await result).deleteOne({name:req.params.name})
    res.send("data deleted successfully");
})

app.listen(3000);