const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema ({
    foodName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    foodImage:{
        type:String,
        required:true
    }


});

module.exports = mongoose.model('foods',foodSchema);