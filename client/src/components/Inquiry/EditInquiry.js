import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function EditInquiry() {
    const { id } = useParams();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [inq, setInq] = useState('');


    useEffect(() => {
        axios.get(`http://localhost:5000/inquiry/${id}`).then((res) => {
            console.log(res.data)
            setName(res.data.name)
            setPhone(res.data.phone)
            setEmail(res.data.email)
            setInq(res.data.inq)
        })

    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const userinquiry = {
            name,
            phone,
            email,
            inq
        }
        axios.put(`http://localhost:5000/inquiry/${id}`, userinquiry)
        alert("Inquiry Data Updated Successfully")
        window.location.href = ('/allinquiryuser')
    }


    return (

        <div>
            <br />
            <div className="one">
                <div className="formw">
                    <h1>Edit Inquiry</h1>
                    <br/>
                    <form onSubmit={handleSubmit}>

                        <label for="name"><b>Name</b></label>
                        <input type="text"
                            className="form-control mb-2" placeholder="Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label htmlFor="phone"><b>Phone Number</b></label>
                        <input type="number"
                            className="form-control mb-3"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required />

                        <label htmlFor="email"><b>Email</b></label>
                        <input type="email"
                            className="form-control mb-3"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />

                        <label htmlFor="inquiry"><b>Inquiry</b></label>
                        <input type="text"
                            className="form-control mb-3"
                            name="inquiry"
                            value={inq}
                            onChange={(e) => setInq(e.target.value)}
                            required />

                        <br/>

                        <button type="submit" className="btn btn-warning"><i className="fas fa-edit"></i>&nbsp; Update Inquiry</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditInquiry