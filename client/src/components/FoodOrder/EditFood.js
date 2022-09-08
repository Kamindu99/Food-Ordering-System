import React,{useState,useEffect} from "react"
import axios from "axios";
import { Form } from "react-bootstrap";
import { useParams } from 'react-router-dom';

const EditFood = (props)=>{

     const [validated, setValidated] = useState(false);
     
     const { id } = useParams();

     const[foodName,setName]=useState("");
     const[description,setDescription]=useState("");
     const[price,setPrice]=useState("");
     const[foodImage,setFileName]=useState("");
     const[,setMessage]=useState("");
     const fileInput = React.createRef();
   
     const onChangeFile= e=>{
        setFileName(e.target.files[0]);
    }

   const changeOnClick =(e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

else{
       e.preventDefault();
   
       const formData=new FormData();
       formData.append("foodName",foodName);
       formData.append("description",description);
       formData.append("price",price);
       formData.append("foodImage",foodImage);
   
       setName("");
       setDescription("");
       setPrice("");
       
   
       axios
       .put(`http://localhost:5000/food/admin/update/${id}`,formData)
       .then(
        (res)=>setMessage(res.data))
        
       .catch((err)=>{
           console.log(err);
       });
       
       alert("Food Details Edit Successful")
       window.location.replace("/food/allfood");
      }
      setValidated(true);
   };

   useEffect(() => {
    axios
      .get(
        `http://localhost:5000/food/${id}`
      )
      .then((res) =>
       [
        setName(res.data.food.foodName),
        setPrice(res.data.food.price),
        setDescription(res.data.food.description),
        setFileName(res.data.food.foodImage)
       
      ])
      .catch((error) => console.log(error));
  }, []);




    return (
      <div >
      <div className=""> 

     <section class="intro">
 <div class="bg-image h-100 ">
   <div class="mask d-flex align-items-center h-100 pt-4 pb-4" style={{backgroundColor: "hsl(0,0%,75%,0.2)"}}>
     <div class="container">
       <div class="row d-flex justify-content-center align-items-center">
         <div class="col-12 col-lg-9 col-xl-9">
           <div class="card" style={{borderRadius: "1rem"}}>
             <div class="row g-0">
               <div class="col-md-4 d-none d-md-block">
                 <img
                   src="https://images.squarespace-cdn.com/content/v1/518ea9e4e4b0eb1ecff22776/1505338359278-ZR0NGOOVNIMBNDWKECZL/ordering+food+online?format=500w"

                   alt="login form"
                   class="img-fluid" style={{borderTopLeftRadius: "1rem", borderBottomLeftRadius: "1rem", height:"584px",objectFit: "cover"}}
                 />
               </div>
               <div class="col-md-8 d-flex align-items-center" style={{backgroundColor: "hsl(0,0%,75%,0.1)"}}>
                 <div class="card-body py-5 px-4 p-md-5">

                   <Form noValidate validated={validated} onSubmit={changeOnClick} encType="multipart/form-data">
                     <h3 class="fw-bold mb-5" style={{color: "#992129"}}>Edit Food Item Details</h3>
             


                     <div class="row ">
                 <div class="col-md-6 mb-4">

                   <div class="form-outline">
                   <label class="form-label fw-bold" for="form2Example1">Food Name</label>
                       <input type="text" id="form2Example1" class="form-control" placeholder="Enter Food Name"
               name="foodName"
               value={foodName}
               onChange={(e)=>setName(e.target.value)}
               required/>

               
                 <Form.Control.Feedback type="invalid">
             Please provide a valid Name. 
           </Form.Control.Feedback>
                   </div>

                 </div>
                 <div class="col-md-6 mb-4">

                   <div class="form-outline">
                   <label class="form-label fw-bold" for="form2Example1">Food Price</label>
                       <input type="number" id="form2Example1" class="form-control" placeholder="Enter Price"
               name="price"
               value={price}
               onChange={(e)=>setPrice(e.target.value)}
               required/>

<Form.Control.Feedback type="invalid">
             Please provide Price 
           </Form.Control.Feedback>
                   </div>

                 </div>
               </div>


                     <div class="form-outline mb-4">
                     <label class="form-label fw-bold" for="form2Example1">Food Description</label>
                       <textarea type="text" id="form2Example1" class="form-control" placeholder="Enter Description"
               rows="3"
               name="description"
               value={description}
               onChange={(e)=>setDescription(e.target.value)}
               required/>
               <Form.Control.Feedback type="invalid">
             Please provide Description
           </Form.Control.Feedback>
                       
                     </div>

                     <div class="form-outline mb-4">

                     <label class="form-label fw-bold" for="form2Example1">Food Image</label>
           <div class="mb-3">
           <input class="form-control"  type="file"  id="formFile" filename="foodImage" />
           <Form.Control.Feedback type="invalid">
             Please provide Image. 
           </Form.Control.Feedback>
           </div>
</div>
                     <div class="d-grid gap-2 mt-5">
 <button type="submit"  class="btn btn-danger btn-rounded" >Edit Food Details</button>
</div>
                  
                   </Form>

                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
</section>


     </div>















      </div>


    );
};

export default EditFood;