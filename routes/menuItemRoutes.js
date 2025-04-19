const express = require('express');
const router = express.Router();
const MenuItems = require('./../Models/MenuItem.js');

router.post('/',async (req,res)=>{
    try{
        const data = req.body
    
        const Items = new MenuItems(data);
    
        const response = await Items.save();
        console.log('data saved');
        res.status(200).json(response);
        }
        catch(err){
            console.log(err);  
            res.status(500).json({error:'internal server error'});  
        }
})

router.get('/',async (req,res)=>{
    try{
       const data = await MenuItems.find();
       console.log('data fetched successfully')
       res.status(200).json(data);
    }catch(err){ 
       console.log(err);
       res.status(500).json({error:'internal server error'});
    }
})

router.get('/:tasteItem',async (req,res)=>{
    try{
        const tasteItem = req.params.tasteItem;
        if(tasteItem =='sweet' || tasteItem =='spicy' || tasteItem =='sour'){
            const response = await MenuItems.find({taste:tasteItem});
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

module.exports = router;