import React , {useState}from 'react'
import axios from 'axios'
import { Form } from "react-bootstrap";
import {  useEffect } from "react";
import {Link } from "react-router-dom";

 function Profile() {

    
    const [name , setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    
    if (localStorage.getItem("token") == null){

        alert("Please Login")
        window.location.replace("/register")


    }
    const logout=(e)=>{
       
        if (window.confirm("You Want To LogOut ")){
          const token = localStorage.removeItem("token");
   
          if (token == null  ){
            alert("log  Out Success ");
            window.location.replace("/login")
          } }
          
       }
    useEffect((e) => {
        //Runs on every render 
        
        const len = localStorage.getItem("token").length
        let result = localStorage.getItem("token").slice(1,len-1)
        const abc = {token:result}
        
        
        axios.post('http://localhost:5000/register/view', abc).then(res=>{
           
            
                setName(res.data.name)
                setEmail(res.data.email)
                setMobile(res.data.mobile) 
                
                console.log(res.data)
            
        }).catch((err)=>{
            alert(err);
        })

    });
     

  return (
    <div className="one">
       
        <div className="formw">
        <button style={{width:"15%" ,height:"9%",float: "right"}} onClick={ logout} class=" btn btn-danger" >LogOut</button>
            <h1> Profile</h1>

            <Form >
            <div>
                <label  for="name">Name</label>
            <input type="text"
            id="name"
            className="form-control mb-3"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            disabled
             />
            </div>

            <div>
                <label  for="name">Email</label>
            <input type="text"
            id="name"
            className="form-control mb-3"
            value={email}
            onChange={(e)=> setMobile(e.target.value)}
            disabled
             />
            </div>
            <div>
                <label  for="name">Mobile</label>
            <input type="text"
            id="name"
            className="form-control mb-3"
            value={mobile}
            onChange={(e)=> setMobile(e.target.value)}
             disabled/>
            </div>
            <div>
            <label  for="name">Password</label>
            <input type="password"
            id="pass"
            className="form-control mb-3"
            value={123456}
            disabled
             />
            </div>


            <Link className="link-register" to={"/edit"}>
            <button style={{width:"100%"}} type="submit" class=" btn btn-danger btn-lg btn-block" >Edit Details</button>
            </Link>
          
   

        </Form>

        </div>


    </div>
  )
}

export default Profile