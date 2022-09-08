import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';

function MyBookings() {
    const [id,setId] = useState();
    const [bookings, setBookings] = useState();

    


    if (localStorage.getItem("token") == null){

        alert("Please Login")
        window.location.replace("/login")
  
  
    }



    useEffect((e) => {
        //Runs on every render 

        console.log("useEffect Called")
        
        const len = localStorage.getItem("token").length

        let result = localStorage.getItem("token").slice(1,len-1)
        const abc = {token:result}
        
        
        axios.post('http://localhost:5000/register/view', abc).then(res=>{
           
            
                setId(res.data.userId)
                console.log(res.data.userId)
                const ids = res.data.userId
        
        axios.get(`http://localhost:5000/tablebooking/book/${ids}`).then(res => {
         
         if(res.data.length != 0){
              setBookings(res.data)
         }else{
           
            
         }

            console.log(res.data)

            
        })
                
              
            
        })
        
        
        
        .catch((err)=>{
            alert(err);
        })
  
    },[]);


    


    const deleteBookings = (e) =>{

        const tableId = e.target.id;

        axios.delete(`http://localhost:5000/tablebooking/${tableId}`).then((res) => {
            console.log(res.data)
            alert('Booking Deleted')
            window.location.reload();

            



        })

    }











  return (
    <div className="formw">
        <h1>My Bookings</h1>

       

        {bookings? <div>
            {bookings.map((booking,index) => (
                <div>
                    <Card className="mb-2" key={booking._id} border="primary" style={{ width: '35rem' }}>
        <Card.Header>{index+1}  <strong>{booking.tabletype}</strong> Table</Card.Header>
        <Card.Body>
          <Card.Title>Reservation Date : {booking.date}</Card.Title>
          <Card.Title>Reservation Time : {booking.time}</Card.Title>
          <Card.Text>
            Created at {booking.createdAt.substring(0,10)} , {booking.createdAt.substring(11,16)} by Mr/Mrs.{booking.name}
            <div className="row mt-2">
            
                <div className="col-6 md-4">
                    <button className="btn btn-danger" id={booking._id} onClick={(e)=> deleteBookings(e)}>Cancel Reservation</button>
                    </div>


            </div>
          </Card.Text>
        </Card.Body>
      </Card>
     
      </div>



            ))}
        </div> :  <div><p>You have not booked tables. Please Book a table from the menu</p></div> }


            

        







        
    </div>
  )
}

export default MyBookings