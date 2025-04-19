const express = require('express');
const router = express.Router();
const Person = require('./../Models/Person.js');


// person post method 

router.post('/', async (req,res)=>{
    try{
    const data = req.body

    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);
    }
    catch(err){
        console.log(err);  
        res.status(500).json({error:'internal server error'});  
    }
    
})

// get method to get all persons

router.get('/',async (req,res)=>{
    try{
       const data = await Person.find();
       console.log('data fetched successfully')
       res.status(200).json(data);
    }catch(err){
       console.log(err);
       res.status(500).json({error:'internal server error'});
    }
})

router.get('/:workType',async (req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType=='chef' || workType =='manager' || workType =='waiter'){
            const response = await Person.find({work:workType});
            console.log('responsed fetched successfully');
            res.status(200).json(response);
    }else{
        res.status(404).json({error:'internal server error'});
    }    
}catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
}
})

router.put('/:id',async (req,res)=>{
    try{
        const id = req.params.id;
        const data = req.body;
        const response = await Person.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true,
        })

        if(!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const response = await Person.findByIdAndDelete(id);

        if(!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('data deleted');
        res.status(200).json({message:'Person deleted successfully'});

    }catch(err){ 
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

module.exports = router;