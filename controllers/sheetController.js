const { Sheet } = require('../models/sheet')

//POST NEW SHEET
exports.createSheet = async (req, res) => {
    //new sheet obj
    let newSheet = new Sheet({
        user: req.body.user,
        characterName: req.body.characterName,
        playersName: req.body.playersName,
        campaign: req.body.campaign,
        archetype: req.body.archetype,
        artwork: req.body.artwork,
        level: req.body.level,
        xp: req.body.xp,
    })

    //insert it to db
    newSheet = await newSheet.save()

    //if db returns false send error
    if (!newSheet) return res.status(404).send('no sheet created')

    //then show me new sheetS
    res.send(newSheet)
}
