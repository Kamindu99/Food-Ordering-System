import React from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";
import './food.css'

class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios
      .get("http://localhost:5000/foodorder")
      .then((res) => {
        if (res.data.success) {
          this.setState({
            posts: res.data.existingFoodOrder,
          });
        }
      });
  }

  onDelete = (id) =>{
    
          axios.delete(`http://localhost:5000/foodorder/admin/delete/${id}`).then((res)=>{
  
          
          window.location.reload()
      })}

      
      setaa = (id)=>{

    const data={
      cmp:true
    }
     axios.put(`http://localhost:5000/foodorder/admin/update/${id}`, data);
    window.location.reload();
      
      }

  render() {

    return (
      <div>
 
        <div
          className=""
          style={{
            backgroundImage:
              "url('https://tinteguri.com/wp-content/uploads/2021/08/1584014651food02.jpg')",
            minHeight: "650px", backgroundRepeat:"no-repeat", backgroundSize:"cover"
          }}
        >
          <br />
          <div >
            <div
              class="d-flex flex-row align-items-center mb-2"
              style={{
                backgroundColor: "hsla(90, 100%, 0%, 0.5)",
                color: "white",
                paddingTop: "10px",
              }}
            >
              <div class="form-outline mb-2 ">
                <h2 style={{ marginInlineStart: "60px" }}>
                  
                  <b>Food Ordered Details</b>
                </h2>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div class="form-outline mb-2 ">
                <ReactToPrint
                  trigger={() => (
                    <button
                      type="button"
                      class="btn btn-danger"
                      style={{ marginInlineStart: "380%",width:"180px" }}
                    >
                      <i class="fas fa-print me-2"></i>Print this out!
                    </button>
                  )}
                  content={() => this.componentRef}
                />
              </div>
            </div>

            <div ref={(Component) => (this.componentRef = Component)}>
              <hr />
              <div
                style={{ marginInlineEnd: "10px", marginInlineStart: "10px" }}
              >
                <table
                  class="table table-bordered border-light "
                  style={{ backgroundColor: "hsla(90, 0%,90%, 0.9)"}}
                >
                  <thead class="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Address</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Food Name</th>
                      <th scope="col">quantity </th>
                      <th scope="col">Total</th>
                      <th scope="col">ordered Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody >
                    {this.state.posts.map((posts, index) => (
                      <tr key={index} style={{ fontWeight: "bold" }}>
                        <th scope="row">{index + 1}</th>
                        <td>{posts.name}</td>
                        <td>{posts.address}</td>
                        <td>{posts.phone}</td>
                        <td>{posts.foodname}</td>
                        <td>{posts.quantity}</td>
                        <td>Rs. {posts.total}</td>
                        <td>{posts.orderedDate}</td>
                        <td>
                        <button onClick={()=>this.setaa(posts._id)} style={{width:"160px",backgroundColor:posts.cmp==true?"red":""}} className="btn btn-success">
                        {posts.cmp == true ? <text>Completed</text>: null }
                        {posts.cmp == false ? <text>Not Completed</text>: null }
                </button>

                {/* <button onClick={()=>this.onDelete(posts._id)}className="btn btn-success">
                        delete
                </button> */}
                    
                        
                        </td>
                      
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ComponentToPrint;
