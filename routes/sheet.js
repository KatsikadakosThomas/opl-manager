const {Sheet}= require("../models/sheet")
const express= require("express")
const router= express.Router()


router.post("/", async (req,res)=>{
    let newSheet= new Sheet({
        user:req.body.user,
        characterName:req.body.characterName,
        playersName: req.body.playersName,
        campaign:req.body.campaign,
        archetype:req.body.archetype,
        artwork:req.body.artwork,
        level:req.body.level,
        xp:req.body.xp
    });
    
    newSheet= await newSheet.save()
    
    if(!newSheet) return res.status(404).send('no sheet created')

    res.send(newSheet)
    
})


module.exports = router; 