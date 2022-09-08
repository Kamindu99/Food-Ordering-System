const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const {dbConnection} =require('./dbCon')

const tableRoute = require('./Routes/TableRoutes')
const tableBookingRoute = require('./Routes/TableBookingRoutes')
const user = require('./Routes/UserRoute')
const FoodRoutes = require('./Routes/FoodRoutes')
const FoodOrderRoutes = require('./Routes/FoodOrderRoutes')
const inquiryRoute = require('./Routes/InquiryRoutes')
const inquiryAdminRoute = require('./Routes/InquiryAdminRoutes')

const app = express();

app.use(express.json())
app.use(bodyParser.json())
app.use(cors());


app.use('/table', tableRoute)
app.use('/tablebooking', tableBookingRoute)
app.use('/register', user)
app.use('/food', FoodRoutes)
app.use('/foodorder', FoodOrderRoutes)
app.use('/inquiry', inquiryRoute)
app.use('/inquiryadmin', inquiryAdminRoute)



const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    dbConnection();
})