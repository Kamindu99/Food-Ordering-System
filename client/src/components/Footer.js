import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="mainfooter p-2 mt-3">
        <hr style={{
       
        marginTop: "inherit",
    
       
        }}/>
      <div className="ftr mt-4">
        <div className="row">
        <div className="col">
           <h4>Visit Us</h4>
           <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15843.194046863206!2d79.9729445!3d6.9146775!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2c63e344ab9a7536!2sSri%20Lanka%20Institute%20of%20Information%20Technology!5e0!3m2!1sen!2slk!4v1653555177092!5m2!1sen!2slk"></iframe>

        </div>
          {/* Column1 */}
          <div className="col">
            <h4>Address</h4>
            <h6 className="list-unstyled">
              <li>SLIIT Malabe Campus</li>
              <li> New Kandy Rd,</li>
              <li> Malabe 10115</li>
              <li>Sri Lanka</li>
              
            </h6>
          </div>
          {/* Column2 */}
          <div className="col abcs">
            <h4>Services</h4>
            <h6 className="list-unstyled">
              <li ><a href="https://courseweb.sliit.lk/" >CourseWeb</a> </li>
              <li><a href=" https://www.sliit.lk" >  SLIIT</a></li>
              </h6>

              
              
              <h4>Contact Us</h4>
              <h6 className="list-unstyled gg">
         
              <a href="https://www.facebook.com/sliit.lk/" >
              <i class="fab fa-facebook-f" style={{ color: "#adadad" }}></i>
            </a>{" "}
         
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
            <a href="https://twitter.com/SLIITinfo" >
              <i class="fab fa-twitter" style={{ color: "#adadad" }}></i>
            </a>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="https://www.instagram.com/sliit.life/" >
              <i class="fab fa-instagram" style={{ color: "#adadad" }}></i>
            </a>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="https://www.instagram.com/sliit.life/" >
              <i class="fab fa-linkedin" style={{ color: "#adadad" }}></i>
            </a>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </h6>
              
            
            
         
          {/* Column3 */}
          </div>
          <div className="col">
            <h4>Terms</h4>
            <h6 className="list-unstyled gg">
              
              <li data-toggle="modal" data-target="#staticBackdrop2">Copy Right</li>
              <li data-toggle="modal" data-target="#staticBackdrop3">Must Agree</li>
              <li data-toggle="modal" data-target="#staticBackdrop4"> Must Read</li>
            </h6>
          </div>
          
          
        </div>
        
        <p className="col-sm ml-5">
            
            <a className="ml-5"href="#" style={{visibility: "hidden"}}>
              <i class="fab fa-facebook-f" style={{ color: "#adadad" }}></i>
            </a>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="#" style={{visibility: "hidden"}}>
              <i class="fab fa-twitter" style={{ color: "#adadad" }}></i>
            </a>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="#" style={{visibility: "hidden"}}>
              <i class="fab fa-instagram" style={{ color: "#adadad" }}></i>
            </a>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {new Date().getFullYear()} SLIIT | All rights
            reserved | Terms Of Service | Privacy
          </p>
   
      </div>

      <hr  className="mt-2"style={{
        display: "inherit",
        marginTop: "inherit",
        marginBottom: "inherit",
        marginLeft: "inherit",
        marginRight: "inherit",
       
        borderWidth: "inherit",
        borderColor: "inherit",
        color: "inherit",
            backgroundColor: "white",
            height: 2
        }}/>
      <div >
      
      </div>
    </div>
  );
}

export default Footer;