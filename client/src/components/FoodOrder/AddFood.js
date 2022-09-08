import React,{useState} from "react"
import axios from "axios";
import { Form } from "react-bootstrap";
import './food.css'
import { useNavigate } from 'react-router-dom';


const AddFood = ()=>{

     const [validated, setValidated] = useState(false);
     const history = useNavigate();


     const[foodName,setName]=useState("");
     const[description,setDescription]=useState("");
     const[price,setPrice]=useState("");
     const[,setMessage]=useState("");
     const[foodImage,setFileName]=useState("");
   
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
   
       
       
   
       axios
       .post("http://localhost:5000/food/admin/add",formData)
       .then(
        (res)=>setMessage(res.data))
        .catch((err)=>{
           console.log(err);
       });
       alert("New Food Added Successful");
       history('/food/allfood');
    
      }
      setValidated(true);
   };
    return (
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
                    src="https://static.thenounproject.com/png/1092662-200.png"
                    alt="login form"
                    class="img-fluid" style={{borderTopLeftRadius: "1rem", borderBottomLeftRadius: "1rem", height:"584px"}}
                  />
                </div>
                <div class="col-md-8 d-flex align-items-center" style={{backgroundColor: "hsl(0,0%,75%,0.1)"}}>
                  <div class="card-body py-5 px-4 p-md-5">

                    <Form noValidate validated={validated} onSubmit={changeOnClick} encType="multipart/form-data">
                      <h3 class="fw-bold mb-5" style={{color: "#92aad0"}}>Add New Food Item</h3>
              


                      <div class="row ">
                  <div class="col-md-6 mb-4">

                    <div class="form-outline">
                    <label class="form-label" for="form2Example1">Food Name</label>
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
                    <label class="form-label" for="form2Example1">Food Price</label>
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
                      <label class="form-label" for="form2Example1">Food Description</label>
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

                      <label class="form-label" for="form2Example1">Food Image</label>
            <div class="mb-3">
            <input class="form-control" required type="file"  id="formFile" filename="foodImage" onChange={onChangeFile}/>
            <Form.Control.Feedback type="invalid">
              Please provide Image. 
            </Form.Control.Feedback>
            </div>
</div>
                      <div class="d-grid gap-2 mt-5">
  <button type="submit"  class="btn addfood btn-rounded" >Add New Food</button>
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
    );
};

export default AddFood;