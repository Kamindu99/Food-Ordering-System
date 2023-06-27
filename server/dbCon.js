const mongoose = require('mongoose')

const dbConnection = () =>{
    const MONGO_URL = "mongodb+srv://Kamindu_99:123@travelmanagementsystem.q7l3w.mongodb.net/FoodDB?retryWrites=true&w=majority"

    mongoose.connect(MONGO_URL, ()=> {
        console.log("Database connection Success")
    })
}

module.exports = {dbConnection} 