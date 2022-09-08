import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';

function AllTable() {
    const [tables, setTables] = useState();
    const [searchkey, setsearchkey] = useState('');
  



    useEffect(() => {
           axios.get('http://localhost:5000/table/').then(res => {
               setTables(res.data)
               console.log(res.data)

               
           })


       },[])


       const deleteTable = (e) =>{

        const tableId = e.target.id;

        axios.delete(`http://localhost:5000/table/${tableId}`).then((res) => {
            console.log(res.data)
            alert('Table Deleted')

            axios.get('http://localhost:5000/table/').then(res => {
            setTables(res.data)
            console.log(res.data)
        })



        })

    }

    const filterPackages = async (e) => {
        console.log(searchkey)

        const response = await axios.get(
            'http://localhost:5000/table/'
          );
        const  filteredPackages = response.data.filter((tables) =>
          tables.name.toLowerCase().includes(searchkey)
          );
          if (filteredPackages.length > 0) {
            setTables(filteredPackages);
          }
            else{
                alert("Search Not Found")
            }


    }



  return (
    <div  className="container">

    <h1>Tables</h1>
    <div >

    <div  className="row mb-2">

<input type="text" className="form-control col-4 mt-1"  onChange={(e) => {setsearchkey(e.target.value)} }
                 placeholder="Search Tables"   style={{ width: "200px", borderRadius: "10px"}} />
                <div className="col-6 col-md-4">
                 <button className="btn btn-secondary mt-1" style={{marginLeft: "1px"}}
                 onClick={()=>filterPackages(searchkey)}>Search</button>
                
                 </div>
                 <div className="col-6 col-md-4">
                    <a href={"/addtable"}>
                    <button className="btn btn-success mt-1" >Add Table</button></a>
                    </div>


</div>

    </div>


    <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Table Name</th>
                        <th>Description</th>
                        <th>Users</th>
                        <th>Image</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>

                </thead>
                <tbody>
                    {tables && tables.map((table , index) => (
                        <tr key={table.id} >
                            <td>{index+1}</td>

                            <td> <a style={{textDecoration: "none", fontWeight:"bold" , color: "black"}} href={`/view/${table._id}`}>
                                {table.name} </a></td>
                            <td>{table.description}</td>
                            <td>{table.users}</td>
                            <td> <img style={{width:"150px" , height:"100px"}} src={table.image}/></td>
                            <td>{table.createdAt.substring(0,10)}</td>
                            <td>
                                
                                    
                              <a href={`/edittable/${table._id}`}>
                                    <button className="btn btn-warning" > Edit</button>
                               </a>
                               
&nbsp;

                                    
                                
                                <a >
                                    <button id={table._id}
                                    onClick={(e)=> deleteTable(e)}
                                    className="btn btn-danger"> Delete</button>
                                </a>
                                
                            </td>
                        </tr>

                    ))}

                </tbody>

            </Table>


        


        
    </div>
  )
}

export default AllTable