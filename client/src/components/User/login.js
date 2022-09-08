import React , {useState}from 'react'
import axios from 'axios'
import { Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';  
import {  useEffect } from "react";
import {Link } from "react-router-dom";
 function Login() {
    
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    useEffect(()=>{

        const token = localStorage.getItem('token');
        if (token){  
            window.location.replace("/profile");   
        }
})
    const navigate = useNavigate();


    const log = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
    
        const login = {
            mobile,
            password
        }
    
        axios.post('http://localhost:5000/register/login', login).then(res=>{
           
                if(res.data.success){
                    alert("Successfull")
                    localStorage.setItem("token",JSON.stringify(res.data.token));
                    navigate("/profile");

                }else {
                    alert("Wrong Password")
                }
            
            
            
        }).catch((err)=>{
            alert(err);
        })

       
}





  return (
    <div className="one">
        <div className="formw">
           
            <Link className="link-register" to={"/register"}>
            <h7 style={{width:"15%" ,height:"9%",float: "right" ,color:"red"}}   >Register</h7>
            </Link>
            <h1> Login</h1>
            
            <hr/>
           
            <Form onSubmit={(e) => log(e)}>
            <div>
                <label  for="name">Mobile Number</label>
            <input type="text"
            id="name"
            className="form-control mb-3"
            placeholder="+94-71988189"
            value={mobile}
            onChange={(e)=> setMobile(e.target.value)}
            required />
            <Form.Control.Feedback type="invalid" className=" mb-2">
              Please provide a valid Name
            </Form.Control.Feedback>
</div>



            <div>
            <label  for="description">Password</label>
<input type="password"
            id="description"
            className="form-control mb-3"
            placeholder="password"
            value={password} 
            onChange={(e)=> setPassword(e.target.value)}
            required />
            <Form.Control.Feedback type="invalid"className=" mb-2">
              Please provide a description
            </Form.Control.Feedback>
</div>


            <button style={{width:"100%"}} type="submit" class=" btn btn-danger btn-lg btn-block" >Login</button>


        </Form>

        </div>


    </div>
  )
}

export default Login