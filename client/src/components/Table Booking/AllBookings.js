import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';


function AllBookings() {
    const [bookings, setBookings] = useState();
    const [searchkey, setsearchkey] = useState('');
  

   

    



    useEffect(() => {
           axios.get('http://localhost:5000/tablebooking/').then(res => {
            setBookings(res.data)
               console.log(res.data)

               
           })


       },[])


       const deleteBookings = (e) =>{

        const tableId = e.target.id;

        axios.delete(`http://localhost:5000/tablebooking/${tableId}`).then((res) => {
            console.log(res.data)
            alert('Booking Deleted')

            axios.get('http://localhost:5000/tablebooking/').then(res => {
                setBookings(res.data)
            console.log(res.data)
        })



        })

    }

    const filterBookings = async (e) => {
        console.log(searchkey)

        const response = await axios.get(
            'http://localhost:5000/tablebooking/'
          );
        const  filteredPackages = response.data.filter((bookings) =>
        bookings.name.toLowerCase().includes(searchkey)
          );
          if (filteredPackages.length > 0) {
            setBookings(filteredPackages);
          }
            else{
                alert("Search Not Found")
            }


    }


      



  return (
    <div  className="container">

    <h1>Tables Booking Details</h1>
    <div >
   

    <div  className="row mb-2">

<input type="text" className="form-control col-4 mt-1"  onChange={(e) => {setsearchkey(e.target.value)} }
                 placeholder="Search Tables"   style={{ width: "200px", borderRadius: "10px"}} />
                <div className="col-6 col-md-4">
                 <button className="btn btn-secondary mt-1" style={{marginLeft: "1px"}}
                 onClick={()=>filterBookings(searchkey)}>Search</button>

                 <button className="btn btn-warning mt-1" style={{marginLeft: "3px"}}
                    onClick={()=>window.location.reload(false)}>Refresh</button>
<a href="/bookingreport">
<button className="btn btn-success mt-1" style={{marginLeft: "3px"}} 
                    >Generate Report</button></a>
                
                 </div>
                 


</div>

    </div>


    <Table  striped bordered hover >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Table Type</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Created Date</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
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
                                

                                    
                                
                                <a >
                                    <button id={booking._id}
                                    onClick={(e)=> deleteBookings(e)}
                                    className="btn btn-danger"> Block User</button>
                                </a>
                                
                            </td>
                        </tr>

                    ))}

                </tbody>

            </Table>





           
            


        


        
    </div>
  )
}

export default AllBookings