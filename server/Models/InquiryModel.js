const mongoose = require('mongoose');
const Schema =  mongoose.Schema

const InquirySchema = new Schema ({

    name: {
        type : String,
        required : true
    },
    
    phone: {
        type : Number,
        required : true
    },

    email: {
        type : String,
        required : true
      
    },

    inq: {
        type : String,
        required : true
    },

    adreply:{
        type : String,
        default : "Our team will response to your inquiry soon"
    },
    
}, {
    timestamps:true
})



const userinquiry = mongoose.model('Inquiry' , InquirySchema);

module.exports = userinquiry;
