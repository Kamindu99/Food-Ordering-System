import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form } from "react-bootstrap";
import { useParams } from 'react-router-dom';

function EditReply() {
    const { id } = useParams();

    const [adreply, setAdReply] = useState('')


    useEffect(() => {
        axios.get(`http://localhost:5000/inquiry/${id}`).then((res) => {
            setAdReply(res.data.adreply)
        })

    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const inquirys = {
            adreply
        }
        axios.put(`http://localhost:5000/inquiry/${id}`, inquirys)
        alert("Response Updated Successfully")
        window.location.href = ('/adminallreply')
    }


    return (

        <div className="one">
            <div className="formw">
                <h1>Edit Reply</h1>
                <hr />
                <Form onSubmit={handleSubmit}>
                    <br />
                    <div>
                        <label htmlFor="name"><b>Response to the Inquiry :</b></label>
                        <br /><br />
                        <input type="text"
                            id="reply"
                            className="form-control mb-3"
                            value={adreply}
                            onChange={(e) => setAdReply(e.target.value)}
                            required style={{ width: "600px", height: "100px" }} />
                    </div>
                    <br />
                    <div className="row">
                        <button type="submit" style={{ width: "180px", marginLeft: 17 }} className="btn btn-warning">
                            <i className="fas fa-edit"></i>&nbsp;
                            Edit Response
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default EditReply