import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Form } from "react-bootstrap";
import { useParams } from 'react-router-dom';


function AddReply() {
    const { id } = useParams();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [inq, setInq] = useState('');
    const [adreply, setAdreply] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/inquiry/${id}`).then((res) => {
            console.log(res.data)
            setName(res.data.name)
            setPhone(res.data.phone)
            setEmail(res.data.email)
            setInq(res.data.inq)
            setAdreply(res.data.adreply)
        })

    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const userinquiry = {
            name,
            phone,
            email,
            inq,
            adreply
        }
        axios.put(`http://localhost:5000/inquiry/${id}`, userinquiry)
        alert("Response Sent Successfully")
        window.location.href = ('/allinquiry')
    }


    return (
        <div className="one">
            <div className="formw">
                <h1>Add Reply</h1>
                <hr />
                <Form onSubmit={handleSubmit}>
                    <br />
                    <div>
                        <label htmlFor="name"><b>Response to the Inquiry :</b></label>
                        <br /><br />
                        <input type="text"
                            id="reply"
                            className="form-control"
                            value={adreply}
                            onChange={(e) => setAdreply(e.target.value)}
                            required style={{ width: "600px", height: "100px" }} />
                        <Form.Control.Feedback type="invalid" className=" mb-2">
                            Please provide a reply
                        </Form.Control.Feedback>
                    </div>

                    <br /><br />

                    <div className='row'>
                        <div className="col">
                            <button type="submit" style={{ width: "200px" }} className="btn btn-outline-success"><i class="fa fa-paper-plane" aria-hidden="true"></i> &nbsp;
                                Send Response
                            </button>
                        </div>

                        <div className="col">
                            <button type="reset" style={{ width: "200px" }} className="btn btn-outline-danger"><i class="fa fa-times" aria-hidden="true"></i> &nbsp;
                                Cancel
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default AddReply