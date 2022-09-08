import React, { useState } from 'react'
import axios from 'axios'
import { Form } from "react-bootstrap";

function AddInquiry() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [inq, setInq] = useState('');

    const [validated, setValidated] = useState(false);

    const addInquiry = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            e.preventDefault();
            const newUserInquiry = {
                name,
                phone,
                email,
                inq,
            }

            await axios.post('http://localhost:5000/inquiry/add', newUserInquiry).then((res) => {
                alert("Inquiry Added Successfully")
                console.log(res.data)
                window.location.href = '/allinquiryuser'
            })
        }
        setValidated(true);
    }

    const reset = () => {
        setName('');
        setPhone('');
        setEmail('');
        setInq('');
    };

    return (
        <div className="one">
            <div className="formw">
                <h1>Create New Inquiry</h1>
                <hr />
                <Form noValidate validated={validated} onReset={reset} onSubmit={(e) => addInquiry(e)}>
                    <div>
                        <label htmlFor="name"><b>Name</b></label>
                        <input type="text"
                            id="name"
                            className="form-control mb-3"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required />
                        <Form.Control.Feedback type="invalid" className=" mb-2">
                            Please provide a valid Name
                        </Form.Control.Feedback>
                    </div>

                    <div>
                        <label htmlFor="phone"><b>Phone Number</b></label>
                        <input type="number"
                            id="phone"
                            className="form-control mb-3"
                            placeholder="+94719885481"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required />
                        <Form.Control.Feedback type="invalid" className=" mb-2">
                            Please provide a phone number
                        </Form.Control.Feedback>
                    </div>

                    <div>
                        <label htmlFor="email"><b>Email</b></label>
                        <input type="email"
                            id="email"
                            className="form-control mb-3"
                            placeholder="abc@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <Form.Control.Feedback type="invalid" className=" mb-2">
                            Please provide valid email
                        </Form.Control.Feedback>
                    </div>

                    <div>
                        <label htmlFor="inquiry"><b>Inquiry</b></label>
                        <input type="text"
                            id="inquiry"
                            className="form-control mb-3"
                            placeholder="Enter Your Inquiry"
                            value={inq}
                            onChange={(e) => setInq(e.target.value)}
                            required />
                        <Form.Control.Feedback type="invalid" className=" mb-2">
                            Please provide your inquiry
                        </Form.Control.Feedback>
                    </div>
                    &nbsp;
                    <div className="row">
                        <div className="col">
                            <br />
                            <button type="submit" style={{ width: "200px" }} className="btn btn-outline-success">
                                <i class="fa fa-comment" aria-hidden="true"></i> &nbsp;
                                Create Inquiry
                            </button>
                        </div>

                        <div className="col">
                            <br />
                            <button type="reset" style={{ width: "200px" }} className="btn btn-outline-danger">
                                <i class="fa fa-times" aria-hidden="true"></i> &nbsp;
                                Reset
                            </button>
                        </div>

                        <div className="col">
                            <br />
                            <a href={"/allinquiryuser"} class="btn btn-outline-warning" style={{ width: "200px" }}><i className="fas fa-comments"></i>&nbsp; All Inquiries</a>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default AddInquiry;