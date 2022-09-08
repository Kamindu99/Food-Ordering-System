const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InquiryAdminSchema = new Schema({
    
    reply: {
        type : String,
        required : true
    }
})

const inquiryadmin = mongoose.model("InquiryAdmin", InquiryAdminSchema);

module.exports = inquiryadmin;


