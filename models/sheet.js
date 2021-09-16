const mongoose= require("mongoose")

const sheetSchema= new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    },
    characterName:{
        type:String,
        default:"cloaked stranger"
    },
    playersName:{
        type:String,
        default:"John doe"
    },
    campaign:{
        type:String,
        default:"The GM knows"
    },
    archetype:{
        type:String,
        default:""
    },
    artwork:{
        type:String,
        default:""
    },
    level:
    {
        type:Number,
        required:true,
        default:1,
        min:1,
        max:10
    },

    xp:
    {
        type:Number,
        required:true,
        default:1,
        min:1,
        max:255
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    },
})


sheetSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

sheetSchema.set('toJSON', {
    virtuals: true,
})

exports.Sheet = mongoose.model('Sheet', sheetSchema)