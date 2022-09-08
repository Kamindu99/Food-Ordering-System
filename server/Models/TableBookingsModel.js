const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const TableBookingSchema = new Schema({
    name:{
        type:String,
        required:false
    },
    tabletype:{
        type:String,
        required:false
    },
    userid:{
        type:String,
        required:false
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:false
    }

},{
    timestamps:true
})

const tBooking = mongoose.model('TableBooking' , TableBookingSchema)

module.exports = tBooking