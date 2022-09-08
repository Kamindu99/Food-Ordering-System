import React, { Component } from "react";
import axios from "axios";
import './food.css'

export default class AllFoodAdmin extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          foods: [],
        };
      }
    
      componentDidMount() {
        this.retrievefood();
      }
    
      retrievefood() {
        axios.get("http://localhost:5000/food").then((res) => {
          if (res.data.success) {
            this.setState({
              foods: res.data.existingFood,
            });
          }
        });
      }
    
    
      filterData(foods, searchkey) {
        const result = foods.filter(
          (post) =>
            post.foodName.toLowerCase().includes(searchkey) ||
            post.foodName.toUpperCase().includes(searchkey)
        );
        this.setState({ foods: result });
      }
    
      handleSearchArea = (e) => {
        const searchkey = e.currentTarget.value;
    
        axios.get("http://localhost:5000/food").then((res) => {
          if (res.data.success) {
            this.filterData(res.data.existingFood, searchkey);
          }
        });
      };
    

      onDelete = (id) =>{
        if(window.confirm("Confirm Delete")){
              axios.delete(`http://localhost:5000/food/admin/delete/${id}`).then((res)=>{
      
              alert("success Deleted");
              this.retrievefood();
          })}}


      render() {
    return(
      <div>
        <div >


              <div     
              style={{
                
                backgroundColor: "hsla(101, 27%, 53%, 0.27)",
                paddingBottom: "10px",
                paddingTop: "10px",
                
              }}
              
            >
            
              <button
              style={{marginLeft:"50px",marginTop:"15px"}}
                    id="search-button"
                    type="button"
                    class="btn btn-primary"
                  >
                    <i class="fas fa-search"></i><a style={{textDecoration:"none",color:"white"}} href="/food/add">Add New Food</a>
                  </button>
           <div  style={{float:"right",marginRight:"20px",marginTop:"15px"}}>
                    <input
                      id="search-input"
                      type="search"
                      style={{width:"400px",padding:"10px"}}
                      placeholder="Search Food"
                      onChange={this.handleSearchArea}
                    />
                 
                  <button
                    id="search-button"
                    type="button"
                    class="btn btn-primary pt-2 pb-3"
                  >
                    <i class="fas fa-search"></i>
                  </button>
                  </div>
                  <div class="form-outline mb-2 ">
                <h2 style={{ marginInlineStart: "38%" ,marginTop:"5px"}}>
                  
                  <b>All Food Items</b>
                </h2>
              </div>
            </div>
           


      
 
<div style={{ marginInlineEnd: "10px", marginInlineStart: "10px" }}>
<table class="table table-bordered border-dark "
                  style={{ backgroundColor: "hsla(90, 0%,90%, 0.9)"}}>
  <thead class="table-dark">
    <tr>
      <th scope="col">Food ID</th>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Price</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {this.state.foods.map((food, idx) => (
    <tr>
      <td style={{width:"10%"}}>Food_0{idx + 1}</td>
      <td style={{width:"15%"}}>{food.foodName}</td>
      <td style={{width:"50%"}}>{food.description}</td>
      <td style={{width:"10%"}}>Rs. {food.price}</td>
      <td style={{width:"15%"}}><button className="btn btn-warning ms-3 me-3"><a style={{textDecoration:"none",color:"black"}} href={`/food/edit/${food._id}`}>Edit</a></button>
      <button className="btn btn-danger ms-2 " onClick={()=>this.onDelete(food._id)}>Delete</button></td>
  
    </tr>
  ))}
  </tbody>
</table>
</div>




<br/><br/>
</div>
        </div>
   );
}
}


