import axios from 'axios';
import React, { useEffect, useState } from 'react'
import{ useRef } from 'react';
import ReactToPrint from 'react-to-print';

function BookingReport() {
    const [bookings, setBookings] = useState();

    const componentRef = useRef();
    
    useEffect(() => {
        axios.get('http://localhost:5000/tablebooking/').then(res => {
         setBookings(res.data)
            console.log(res.data)

            
        })


    },[])

  return (
    <div className=" mt-3" >
         <ReactToPrint
        trigger={() => <button className="btn btn-danger mb-2">Print this out!</button>}
        content={() => componentRef.current}
      />

        <div className=" container"ref={componentRef}>
        <h1  className="mb-3" style={{padding:"30px", fontVariant:"small-caps", fontSize:"60px" ,backgroundColor:"#FF7A00" , color:"White" , borderRadius:"10px"}}  class="logo">
          
          <i className="fas fa-hamburger"></i>  Food Factory
         </h1>

         <hr/>
            <h1 className="text-center">Table Reservation Report </h1>
            <hr/>

            <h5 > Date & Time : {`${new Date().toLocaleString()}`}</h5>

                <hr/>


<table   className="table table-striped table-hover table-">
<thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Table Type</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Created Date</th>
                        <th>Phone Number</th>
                        
                       
                    </tr>

                </thead>
                <tbody>
                    {bookings && bookings.map((booking , index) => (
                        <tr key={booking.id} >
                            <td>{index+1}</td>

                            <td> 
                                {booking.name} </td>
                            <td>{booking.tabletype}</td>
                            <td>{booking.date}</td>
                            <td>{booking.time}</td>
                            <td>{booking.createdAt.substring(0,10)}</td>
                            <td>{booking.phone}</td>
                            <td>
                                

                                    
                                
                               
                                
                            </td>
                        </tr>

                    ))}

                </tbody>
</table>
                        </div>


    </div>
  )
}

export default BookingReport