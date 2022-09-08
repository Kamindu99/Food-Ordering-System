import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function EditTable() {
    const {id} = useParams();

    const [name, setName] = useState('');
    const[description, setDescription] = useState('');
    const [users, setUsers] = useState('')
    const [image , setImage] = useState('')


    useEffect(() => {
        axios.get(`http://localhost:5000/table/${id}`).then((res) => {
            console.log(res.data)
            setName(res.data.name)
            setDescription(res.data.description)
            setUsers(res.data.users)
            setImage(res.data.image)
        })

    },[])


    const handleSubmit = async (e) =>{
        e.preventDefault()
        const table ={
            name,
            description,
            users,
            image
        }
        axios.put(`http://localhost:5000/table/${id}`, table)
        alert("Data Updated successfully")
        window.location.href=('/alltable')
    }

    
  return (
    <div>
         <div className="one">
        <div className="formw">
            <h1>Edit Table</h1>
        <form  onSubmit={handleSubmit}>

            <label  for="name">Name</label>
            <input type="text"
            className="form-control mb-2" placeholder = "Name"
            name="name" 
            value={name}
            onChange ={(e)=> setName(e.target.value)}
            />

            <label  for="description">Description</label>
            <input type="text"
            className="form-control mb-2" placeholder = "Description"
            name="Description" 
            value={description}
            onChange ={(e)=> setDescription(e.target.value)}
            />

            <label  for="users">Users</label>
            <input type="text"
            className="form-control mb-2" placeholder = "Users"
            name="users" 
            value={users}
            onChange ={(e)=> setUsers(e.target.value)}
            />

            <label  for="image">Image</label>
            <input type="text"
            className="form-control mb-2" placeholder = "Image"
            name="image"
            value={image}
            onChange ={(e)=> setImage(e.target.value)}
            />

            <button type="submit" className="btn btn-warning"> Update</button>

</form>
        </div>
    </div>






        
    </div>
  )
}

export default EditTable