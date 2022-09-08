import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './menu.css';

function TableMenu() {
    const [tables, setTables] = useState(); 
    const [searchkey, setsearchkey] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [notab, setNotab] = useState(false);


  



    useEffect (() => {
      setIsLoading(true);
           axios.get('http://localhost:5000/table/').then(res => {

               setTables(res.data)
               console.log(res.data)

               
           })

           setIsLoading(false)


       },[])



       const filterPackages = async (e) => {
        setIsLoading(true);
        console.log(searchkey)

        const response = await axios.get(
            'http://localhost:5000/table/'
          );
        const  filteredPackages = response.data.filter((tables) =>
          tables.name.toLowerCase().includes(searchkey)
          );
          if (filteredPackages.length > 0) {
            setTables(filteredPackages);
            setIsLoading(false)
          }
            else{
              setIsLoading(true)
              setTimeout(() => {
                setIsLoading(false);
              }, 300);
              
              setNotab(true)
              setTimeout(() => {
                setNotab(false);
              }, 3000)
              
              
            
            
            }


    }
   

   const reset = () => {
    setIsLoading(true);
    setsearchkey('');
    

    axios.get('http://localhost:5000/table/').then(res => {
               setTables(res.data)
               console.log(res.data)

               
           })
           setIsLoading(false)
           setNotab(false);
 
   }





  return (
    <div    >
    <div  >
      <div style={{
                      backgroundColor: "rgb(255, 167, 84)",
                      paddingBottom: "15px",
                      paddingTop: "15px",
                      
                    }}  >

      <div   className="container" >  
    <div  className="row"    >

<input type="text" className="form-control col-4 mt-1" value={searchkey}  onChange={(e) => {setsearchkey(e.target.value)} }
                 placeholder="Search Tables"   style={{ width: "200px", borderRadius: "10px" , backgroundColor: "rgb(255, 167, 84)" , color: "white" , borderColor: "white"}}/>
                <div  className="col-6 col-md-4">
                 <button className="btn btn-secondary mt-1" 
                 onClick={()=>filterPackages(searchkey)}>Search</button>
                 <button className="btn btn-danger mt-1 " style={{marginLeft:"05px"}} 
                 onClick={reset}>x</button>
              
                
                 </div>

</div>
</div>
</div>

{notab && <div className="alert alert-danger alert-dismissible fade show" role="alert">
  Table Not Found,  Please Try Again !
          
          </div> }


{isLoading ? (
        <div style={{marginTop: "200px" }} className="d-flex justify-content-center">
        <div  className="spinner-border text-warning"  style={{width: "3rem", height: "3rem" }}role="status">
          <span className="sr-only">Loading...</span>
          </div>
          </div>
        ) : (
          <div>
{tables && tables.map((table , index) => (
                       <div>

<div class="containerR">
  <div class="cardR">
    <div class="cardR-header" style={{textAlign: 'center'}}>
      <img className='p-2'
      
      src={table.image} alt="rover" />
    
    </div>
    <div class="cardR-body">
    
      <h3 style={{textTransform:"uppercase"}}>
        {table.name}
      </h3>
   
    
<p className='mt-2' scope="row"> {table.description}</p>

    
      <div className="userR" >
     <a href={`/booktable/${table.name}`}>
  <button style={{width:"325px"}} className="button1">
                          
 Book Table
  </button>
</a>

  
      </div>
    </div>
  </div>
  </div>



                       </div>

                    ))}

            </div>
            )}
















    </div>
    
    </div>

  )
}

export default TableMenu