import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form } from "react-bootstrap";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

function AllInquiry() {
    const [inquiries, setInquiries] = useState();
    const [searchkey, setsearchkey] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/inquiry/').then(res => {
            setInquiries(res.data)
            console.log(res.data)
        })
    }, [])

    const filterInquiries = async (e) => {
        console.log(searchkey)
        const response = await axios.get(
            'http://localhost:5000/inquiry/'
        );
        const filteredInquiries = response.data.filter((inquiries) =>
            inquiries.name.toLowerCase().includes(searchkey)
        );
        if (filteredInquiries.length > 0) {
            setInquiries(filteredInquiries);
        }
        else {
            alert("Search Not Found")
        }
    }

    return (
        <div className="container">
            <br />
            <h1>All Inquiries</h1>
            <br />
            <div >
                <div className="row mb-2">
                    <input type="text"
                        className="form-control col-4 mt-1"
                        onChange={(e) => { setsearchkey(e.target.value) }}
                        placeholder="Search Inquiries"
                        style={{ width: "200px", borderRadius: "10px" }}
                    />

                    <div className="col">
                        <button className="btn btn-secondary mt-1"
                            style={{ marginLeft: "1px" }}
                            onClick={() => filterInquiries(searchkey)}>Search
                        </button>
                    </div>

                    <div className="col">
                        <a href={"/adminallreply"}>
                            <button className="btn btn-warning mt-1" ><i class="fas fa-eye" aria-hidden="true"></i> &nbsp;View Responded Inquiries</button>
                        </a>
                    </div>

                    <div className="col">
                        <a href={"/inquiryreport"}>
                            <button className="btn btn-success mt-1" ><i class="fa fa-file" aria-hidden="true"></i> &nbsp;Generate Report</button>
                        </a>
                    </div>
                </div>
            </div>
            <br />
            {inquiries && inquiries.map((inquiry, index) => (
                <div className="formw mb-5" style={{height: "340px"}}>
                    <Form>
                        <div>
                            <label htmlFor="name"><b><i class="fa fa-user" aria-hidden="true"></i> &nbsp; Name :</b> {inquiry.name}</label>
                            <hr />
                            <label htmlFor="inquiry"><b><i class="fa fa-comment" aria-hidden="true"></i>&nbsp; Inquiry :</b> {inquiry.inq}</label>
                            <hr />
                            <label htmlFor="reply"><b><i class="fas fa-question-circle" aria-hidden="true"></i>&nbsp;Status :&nbsp;&nbsp;&nbsp;</b>
                                <If condition={inquiry.adreply == "Our team will response to your inquiry soon"}>
                                    <Then>
                                        <a>
                                            <button className="btn btn-danger btn-sm" type="button"  >
                                                <i class="fa fa-times" aria-hidden="true"></i> &nbsp;
                                                Haven't Responded
                                            </button>
                                        </a>
                                    </Then>
                                    <Else>
                                        <a>
                                            <button className="btn btn-success btn-sm" type="button"  >
                                                <i class="fa fa-check" aria-hidden="true"></i> &nbsp;
                                                Response Added
                                            </button>
                                        </a>
                                    </Else>
                                </If>
                            </label>
                            <hr />
                            <br />
                        </div>

                        <div className="row">
                            <div className="col">
                                <a href={`/addreply/${inquiry._id}`} class="btn btn-outline-success" style={{width: "200px", marginBottom: "300px"}}><i class="fa fa-comment" aria-hidden="true"></i>&nbsp;Add Reply</a>
                            </div>

                            <div className="col">
                                <button type="reset" style={{ width: "200px" }} className="btn btn-outline-danger"><i class="fa fa-times" aria-hidden="true"></i> &nbsp;
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            ))}
        </div>
    )
}

export default AllInquiry;