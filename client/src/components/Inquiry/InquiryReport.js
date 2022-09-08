import axios from 'axios';
import React, { useEffect, useState } from 'react'
import{ useRef } from 'react';
import ReactToPrint from 'react-to-print';

function InquiryReport() {
    const [inquiries, setInquiries] = useState();

    const componentRef = useRef();
    
    useEffect(() => {
        axios.get('http://localhost:5000/inquiry/').then(res => {
            setInquiries(res.data)
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
            <i className="fas fa-hamburger"></i> Food Factory
            </h1>

            <hr/>

            <h1 className="text-center">Clients Inquiry Report </h1>

            <hr/>

            <h5 > Date & Time : {`${new Date().toLocaleString()}`}</h5>

            <hr/>


            <table   className="table table-striped table-hover table-">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Client Name</th>
                        <th>Phone Number</th>
                        <th>Client Email</th>
                        <th>Client Inquiry</th>
                        <th>Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {inquiries && inquiries.map((inquiry , index) => (
                        <tr key={inquiry.id} >
                            <td>{index+1}</td>
                            <td>{inquiry.name} </td>
                            <td>+{inquiry.phone}</td>
                            <td>{inquiry.email}</td>
                            <td>{inquiry.inq}</td>
                            <td>{inquiry.createdAt.substring(0,10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default InquiryReport