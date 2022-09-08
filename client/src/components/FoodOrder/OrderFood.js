import React,{useState,useEffect} from "react"
import axios from "axios";
import { Form } from "react-bootstrap";
import {useParams } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
//import Select from "react-select";
import './food.css'
const Restration = (props)=>{

   const { id } = useParams();

    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [foodImage, setFoodimage] = useState("");

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [foodname, setFoodname] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState("");
    
    const [userid, setUserid] = useState("");


  // const [foodOrder, addfoodOrder] = useState({
  //   name: "",
  //   address: "",
  //   phone: "",
  //   foodname:"",
  //   quantity:1,
  //   total:'',
  //   userid:''
  // });

   if (localStorage.getItem("token") == null) {
    alert("Please Login");
    window.location.replace("/login");
  }

  useEffect( (e) => {
    //Runs on every render

    const len = localStorage.getItem("token").length;
    let result = localStorage.getItem("token").slice(1, len - 1);
    const abc = { token: result };

    axios
      .post("http://localhost:5000/register/view", abc)
      .then(res => [
        setUserid(res.data.userId)
        
  ])
      .catch((err) => {
        alert(err);
      });



      axios.get(`http://localhost:5000/food/${id}`).then(res => [
        
        setFoodname(res.data.food.foodName),
        setQuantity(1),
        setTotal(res.data.food.price),
        setDescription(res.data.food.description),
        setPrice(res.data.food.price),
        setFoodimage(res.data.food.foodImage)
  ])
  .catch((error) => console.log(error));





  },[]);

 

  // const { name,address,phone,foodname,quantity,total,userid} = foodOrder;

  // const onInputChange = (e) => {
  //   addfoodOrder({ ...foodOrder, [e.target.name]: e.target.value });
  // };

  const onSubmit = async (e) => {
    const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
    
    else{
    e.preventDefault();

    const foodOrder = {
      name,
      address,
      phone,
      foodname,
      quantity,
      total,
      userid
    };

    await axios.post("http://localhost:5000/foodorder/add", foodOrder)
    .then((res) => {
      setShow(true);
      setTimeout(() =>{
        setShow(false);
      window.location.href = "/";
      }, 4000)
     
    });
    
    
    }
    setValidated(true);
  };


const onclickplus = ()=>{
  if(quantity>=10)
  {
setQuantity(10),
setTotal(price*10)
}
  else
  {
  setQuantity(quantity+1),
  setTotal(price*(quantity+1))}
}

const onclickminus = ()=>{
  if(quantity<=1)
 { 
    setQuantity(1),
  setTotal(price*1)}
  else
  {
    setQuantity(quantity-1),
    setTotal(price*(quantity-1))}
}

const returnhome = ()=>{
  window.location.replace("/")
}


    return (
      <div style={{minHeight:"300px"}}>
<Alert style={{marginTop:"20px",marginLeft:"40px",marginRight:"40px"}} show={show} variant="success" aid="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        
        <Alert.Heading>Hey {name} !!!  Your order has been successfully completed!</Alert.Heading>
        <p>
        <br/>

You have ordered <b>{foodname}</b> . The Order Delivery to you with in 1h.<br/><br/> Thank You
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button type="submit" onClick={returnhome} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>
    
    <div className="" hidden={show}>


<div class="card-sl" style={{backgroundColor:"hsl(0,0%,75%,0.5)",paddingTop:"20px",paddingBottom:"20px",paddingInlineStart:"50px",paddingInlineEnd:"50px"}}>    
  <div class="card-body" >
       <div class="row" >
          
           <div class="col-md-5" >
               <div class="righta border" style={{backgroundColor:"white",borderRadius:"10px"}}>
                  
               <div class="text-center "> <h2>Your Order Details</h2> </div>
               <hr  class="text-center mb-2"/>
                   <h4 style={{color:"hsl(0,0%,0%,0.6)"}}>{foodname}</h4>
                   <div >
                       <div class="col-12 "><img class="img-fluid" src={`/uploads/${foodImage}`} style={{height:"170px",width:"290px",marginLeft:"70px"}} /></div>
                       
                   </div>
                  
                   <hr/>
                   <div class="row lower">
                       <div class="col text-lefta" style={{fontSize:"12px"}}>{description}</div>
                      
                   </div>
                   <div class="row lower mt-2">
                       <div class="col text-lefta">Price :- Rs. {price}</div>
                       <div class="col text-lefta">Quantity :- <button class="fa fa-minus ms-3 me-2" style={{border:"0px" , background:"white"}} onClick={onclickminus}>  </button> <input value={quantity} style={{width:"30px",textAlign:"center"}} disabled/> <button class="fa fa-plus ms-2" style={{border:"0px" , background:"white"}} onClick={onclickplus}> </button></div>
                   </div>
                   
                   
                   <hr/>
                   <div class="row lower">
                       <div class="col text-lefta"><b>Total Amount</b></div>
                       <div class="col text-righta ms-5"><b className="ms-5" style={{fontSize:"20px"}}> Rs. {price*quantity}   </b></div>
                   </div>
                   <br/> 
                   <h6 class="text-muted text-center">Apply Terms and Condition</h6>
               </div>
           </div>


           <div class="col-md-7">
           
               <div class="lefta border" style={{backgroundColor:"hsl(0,0%,99% ,0.8",borderRadius:"15px"}}>
              
                   <div class="row"> <span class="text-center mb-1" style={{fontSize:"40px"}}>Delivery Details </span>
                   <div class="d-flex  mb-3">
                   <p class="fw-bold  payicon">We Accept</p>
                       <div >&nbsp;&nbsp; &nbsp;&nbsp; 
                            <img src="https://img.icons8.com/color/48/000000/visa.png" /> <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" /> <img src="https://img.icons8.com/color/48/000000/maestro.png" /> </div>
                 </div></div>
                   <Form noValidate validated={validated} onSubmit={onSubmit} encType="multipart/form-data">
           

           <div class="row mb-2" >
   <div class="col">

<div class="input-group mb-3" style={{width:"250px"}}>
 <div class="input-group-prepend">
   <span class="input-group-text" id="basic-addon1" style={{backgroundColor:'hsl(0,0%,0%,0.3)',color:"white"}}>Food</span>
 </div>
 <input type="text" className="form-control" name="foodname"  value={foodname}    disabled />
</div></div>

<div class="col" >
<div class="input-group mb-3" style={{width:"160px"}} >
 <div class="input-group-prepend">
   <span class="input-group-text" id="basic-addon1" style={{backgroundColor:'hsl(0,0%,0%,0.3)',color:"white"}}>Quantity</span>
 </div>
 <input type="text" className="form-control" style={{textAlign:"center"}} name="quantity" value={quantity} disabled   />
</div></div>

<div class="col">
<div class="input-group mb-3" style={{width:"200px"}}>
 <div class="input-group-prepend">
   <span class="input-group-text" id="basic-addon1" style={{backgroundColor:'hsl(0,0%,0%,0.3)',color:"white"}}>Total Price</span>
 </div>
 
 <input type="text" className="form-control" name="total" value={total}   disabled  />
</div></div>

</div>


    

<div class="d-flex flex-row align-items-center mb-4">
             
          <label class="form-label fw-bold" style={{width:"300px"}} ><i class="fas fa-plane me-2"></i> Your Name &nbsp; </label>  
               <div class="form-outline mb-2 col-9">
                  <input 
                   type="text"
                   id="formControlLgXc"
                   class="form-control form-control-lg"
                   value={name}
                   name="name" placeholder="Enter Your Name" required
                   onChange={(e) => setName(e.target.value)} 
                 />
                <Form.Control.Feedback type="invalid">
             Please provide Your Name
           </Form.Control.Feedback> </div>
              
           </div>


          

           <div class="d-flex flex-row align-items-center mb-4">
        
          <label class="form-label fw-bold" style={{width:"300px"}}> <i class="fas fa-plane me-2"></i>Your Address</label>  
               <div class="form-outline mb-2 col-9">
                  <input 
                   type="text"
                   id="formControlLgXc"
                   class="form-control form-control-lg"
                   name="address" placeholder="Enter your Address"
                   required ="required"
                   onChange={(e) => setAddress(e.target.value)}
                   value={address}
                 /> 
                 <Form.Control.Feedback type="invalid">
             Please provide a address
           </Form.Control.Feedback></div>
              
           </div>

           <div class="d-flex flex-row align-items-center mb-4">
        
          <label class="form-label fw-bold" style={{width:"300px"}}> <i class="fas fa-plane me-2"></i>Mobile Number</label>  
               <div class="form-outline mb-2 col-9">
                
                  <input 
                   type="tel"
                   id="formControlLgXc"
                   class="form-control form-control-lg"
                   name="phone" placeholder="Enter your phone Number"
                    required ="required"
                    pattern="[0-9]{9,10}"
                    maxLength={10}
                    minLength={9}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                 /> 
                 <Form.Control.Feedback type="invalid">
             Please provide a phone number
           </Form.Control.Feedback></div>
              
           </div>
            

           <div class="d-grid gap-2">
  <button type="submit"  class="btn btn-danger" >Order Now</button>
</div>
     

         </Form>

               </div>
           </div>
       </div>
   </div>
   <div> </div>
</div>
    </div>
    
    </div>
    );
};

export default Restration;
