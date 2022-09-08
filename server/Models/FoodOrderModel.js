const mongoose = require('mongoose');
const foodOrderSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    foodname:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    total:{
        type:String,
        required:true
    },
    cmp:{
        type:Boolean,
        default:false
    },
    orderedDate:{
        type:Date,
        default:Date.now
    },
    userid:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('foodorders',foodOrderSchema);