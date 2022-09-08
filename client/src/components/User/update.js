import React , {useState}from 'react'
import axios from 'axios'
import { Form } from "react-bootstrap";
import {  useEffect } from "react";

 function Edit() {

    const [id , setId] = useState('');
    const [name , setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
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
           
            
                setId   (res.data.userId)
                setEmail(res.data.email)
                setMobile(res.data.mobile) 
            
        }).catch((err)=>{
            alert(err);
        })

    });
    const edit = (e) => {
        const form = e.currentTarget;

        e.preventDefault();
        const update = {
            id:id,
            name:name,
            email:email,
            mobile:mobile,
            password:password
        }

        console.log(update)

        axios.put('http://localhost:5000/register/update', update).then(res=>{
           
            alert("Update Success")
        
    }).catch((err)=>{
        alert(err);
    })
    }
   
     

  return (
    <div className="one">
       
        <div className="formw">
       
            <h1> UPDATE</h1>

            <Form onSubmit={(e) => edit(e)}>
            <div>
                <label  for="name">Name</label>
            <input type="text"
            id="name"
            className="form-control mb-3"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            
             />
            </div>

            <div>
                <label  for="name">Email</label>
            <input type="text"
            id="email"
            className="form-control mb-3"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            disabled
             />
            </div>
            <div>
                <label  for="name">Mobile</label>
            <input type="text"
            id="mobile"
            className="form-control mb-3"
            value={mobile}
            onChange={(e)=> setMobile(e.target.value)}
            disabled
             />
            </div>
            <div>
            <label  for="name">Password</label>
            <input type="password"
            id="pass"
            className="form-control mb-3"
            placeholder='edit Password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
             />
            </div>




            <button style={{width:"100%"}} type="submit" class=" btn btn-danger btn-lg btn-block" >Confirm Edit </button>


        </Form>

        </div>


    </div>
  )
}

export default Edit