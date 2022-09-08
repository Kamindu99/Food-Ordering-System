import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavDropdown } from 'react-bootstrap';


function Navbar() {
   const [name , setName] = useState();




   useEffect((e) => {
      //Runs on every render 

      if (localStorage.getItem("token") != null){
console.log("useEffect Called")
      
      const len = localStorage.getItem("token").length

      let result = localStorage.getItem("token").slice(1,len-1)
      const abc = {token:result}
      
      
      axios.post('http://localhost:5000/register/view', abc).then(res=>{
         
         
              console.log(res.data.userId)
              const ids = res.data.userId
              const name = res.data.name
              setName(name)
    
      })  .catch((err)=>{
          alert(err);
      })

        
     } else {


      console.log("useEffect Called")


     }
      
    

  },[]);


  const logout=(e)=>{
       
   if (window.confirm("You Want To LogOut ")){
     const token = localStorage.removeItem("token");

     if (token == null  ){
       alert("logOut Success ");
       window.location.reload();
      
     } }
     
  }

  


  const onMouseEnter= (e)  => {
   e.target.style.backgroundColor = 'white';
   
   e.target.style.color = 'black';
   e.target.style.borderRadius = '05px';
   e.target.style.padding = '05px';
  
  
}

const onMouseLeave= (e)=> {
   e.target.style.backgroundColor = '';
   e.target.style.color = '';
   e.target.style.borderRadius = '';
   e.target.style.padding = '';
}



  return (
    <div className="sss">

   <head>
    
     
    
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
      
   </head>
   <body>
      <nav>
         <div   class="logo">
          
          <span style={{ fontSize:"70px"}} className="fas fa-hamburger"   ></span> 
          <a  href="/" style={{fontVariant:"small-caps", fontSize:"60px", textDecoration:"none",color:"white"}
         } >Food Factory</a> 
         </div>
         <input type="checkbox" id="click"/>
         <label for="click" class="menu-btn">
         <i class="fas fa-bars"></i>
         </label>
         <ul>
            <li><a href="/" >Menu</a></li>
            <li><a href={"/tablemenu"} >Table Booking</a></li>
            <li><a href="/addinquiry">Inquiry</a></li>

{localStorage.getItem("token") == null ? <li><a href="/login">Login</a></li> : 


//  <NavDropdown onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} 
//    style={{color:"#f2f2f2", marginLeft:"10px", fontSize:"18px" , fontWeight: "500"}}
 
//               id="nav-dropdown-light-example"
//               ClassName="nav-dropdown"
//               title={name}
//               menuVariant="light"
//             >
//               <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">
//                My Food Orders
//               </NavDropdown.Item>
//               <NavDropdown.Item href="/mybookings">My Table Bookings</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item onClick={logout}>
//                logout
//               </NavDropdown.Item>
//             </NavDropdown> 



<div class="dropdown">
  <button class="dropbtn">{name}</button>
  <div class="dropdown-content">
  <a href="/profile">Profile</a>
  <a href="/myorders">My Food Orders</a>
  <a href="/mybookings">My Table Bookings</a>
  
  <a href="#" onClick={logout}>Logout</a>
  </div>
</div>

     
       
            
         
            }

            
            
         </ul>
      </nav>
      <div class="content">
         {/* <div>
            Responsive Navigation Menu Bar Design
         </div>
         <div>
            using only HTML & CSS
         </div> */}
      </div>
   </body>



        
    </div>
  )
}

export default Navbar