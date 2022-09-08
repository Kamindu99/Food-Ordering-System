import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card,Row } from 'react-bootstrap';

function MyFoodOrders() {
    const [id,setId] = useState();
    const [bookings, setBookings] = useState();


    
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
        
        axios.get(`http://localhost:5000/foodorder/book/${ids}`).then(res => {
          
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


    


    const deleteOrder = (e) =>{

        const orderid = e.target.id;

        axios.delete(`http://localhost:5000/foodorder/admin/delete/${orderid}`).then((res) => {
            console.log(res.data)
            alert('Order Deleted')
            window.location.reload();

        })

    }

   const setaa = (id)=>{

      const data={
        cmp:true
      }
       axios.put(`http://localhost:5000/foodorder/admin/update/${id}`, data);
      window.location.reload();
        
        }


  return (
    <div>
            <div className="">
       
        <div     class=""
                    style={{
                      backgroundColor: "rgb(255, 167, 84)",
                      paddingBottom: "5px",
                      paddingTop: "15px",
                      
                    }}
                  >

<h1 style={{marginLeft:"100px",}} >My Food Orders</h1>

                   
            
                    
                        
                  </div>
                 
       

        {bookings? <div>
          <div class=" mt-5 mb-5" >
    <div class="d-flex justify-content-center" >
        <div class="col-md-8" >
        <Row xs={1} md={1} className="g-4" id="by" class="rounded">
        {bookings.map((booking,index) => (
            <div class="row p-2  border rounded pb-4 pt-4 " style={{background:"hsl(0,0%,75%,0.3)" ,marginTop:"30px"}}>
              
                <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" src="https://icon-library.com/images/order-food-icon/order-food-icon-20.jpg" style={{height:'130px',marginTop:"14px"}}/></div>
                <div class="col-md-6 mt-1">
                    <h5>{index + 1}. &nbsp;{booking.foodname} - ( {booking.quantity} )</h5>
                    <div class="d-flex flex-row">
                        <div className='fst-italic text-muted mb-3'> Ordered at {booking.orderedDate.substring(0,10)} ,  by Mr/Mrs.{booking.name}</div>
                    </div>
                    
                    <p class="text-justify  para mb-0"> 
                    If you Receive the food, press the Received Button here. We are Committed to providing you with the most Efficient Service. Thank you for you Order.
                    
                    </p>
               
                </div>
                <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                    <div class="d-flex flex-row align-items-center">
                        <h4 class="mr-1">Rs. {booking.total}</h4>
                    </div>
                    <h6 class="text-success">   Thank you Mr/Mrs.{booking.name}</h6>
                    <div class="d-flex flex-column mt-4">
                    <button onClick={()=> setaa(booking._id)} style={{border:"0", backgroundColor:booking.cmp==true?"#b14700":""}} className="btn btn-success btn-sm mb-2">
                        {booking.cmp == true ? <text>Received</text>: null }
                        {booking.cmp == false ? <text>Not Received</text>: null }
                </button>
                      <button  class="btn btn-danger btn-sm " style={{border:"0", backgroundColor:booking.cmp==true?"#722828":""}} type="button" id={booking._id} onClick={(e)=> deleteOrder(e)} >
                        
          
                        {booking.cmp == true ? <text>Delete Order</text>: null }
                        {booking.cmp == false ? <text>Cancle Order</text>: null }
                        
                        </button>
                    
                    </div>
                </div>
            </div>
))}
</Row>

           
        </div>
    </div>
</div>

        </div> :  <div><p>You have not booked tables. Please Book a table from the menu</p></div> }



        
    </div>
    </div>
  )
}

export default MyFoodOrders