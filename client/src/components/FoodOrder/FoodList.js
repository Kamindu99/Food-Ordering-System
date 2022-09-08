import React, { Component } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";
import './food.css'

export default class FoodList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          foods: [],
        };
      }
    
      componentDidMount() {
        this.retrieveaFoods();
      }
    
      retrieveaFoods() {
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
    
      render() {


        return(
            <div>
              <div >
      
      
      <div     class=""
                    style={{
                      backgroundColor: "rgb(255, 167, 84)",
                      paddingBottom: "55px",
                      paddingTop: "15px",
                      
                    }}
                  >



                   <div  style={{float:"right",marginRight:"20px"}} >
                          <input
                            id="search-input"
                            type="search"
                            className=""
                            style={{width:"400px",height:"40px"}}
                            placeholder="Search Food"
                            onChange={this.handleSearchArea}
                          />
                       
                        <button
                          id="search-button"
                          type="button"
                          class="btn btn-primary"
                        >
                          <i class="fas fa-search"></i>
                        </button>
                        </div>
                   
            
                    
                        
                  </div>
                 
      
      
      
      
      
      <div class=" " style={{marginTop:"50px"}}>
      <Row xs={1} md={3} className="g-12" id="by" class="rounded" style={{marginInlineStart:"40px",marginInlineEnd:"50px"}}>
                      {this.state.foods.map((food, idx) => (
              <div >
                  <div class="col-md-! mb-4">
                      <div class="card-sl cardf-sl cardsh" style={{marginLeft:"40px"}}>
                          <div class="card-image cardf-image">
                              <img
                                 style={{height:"250px",width:"100%"}} src={`/uploads/${food.foodImage}`}/>
                          </div>
      
                        
                          <div class="card-heading cardf-heading">
                          {idx + 1}. &nbsp;{food.foodName}
                          </div>
                          <div class="card-text cardf-text">
                          Use your Food Factory account to order delivery from The Food Factory.
                          </div>
                          <div class="card-text cardf-text" >

                          <div class=" lower">
                       <div class="text-end" style={{marginRight:"20px"}} ><h4>Rs. {food.price}</h4></div>
                   </div>
      
      
                          </div>
                          <a href={`/food/order/${food._id}`} class="card-button cardf-button planta"> Buy Now</a>
      
      
                      </div>
                  </div>
              </div> 
              ))}
              </Row>
              </div> 
      
      
      <br/><br/>
      </div>
              </div>
         );
      }
      }
      
      
      