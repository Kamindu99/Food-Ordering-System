import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form } from "react-bootstrap";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';

function AdminAllReply() {
    const [inquiries, setInquiries] = useState();
    const [searchkey, setsearchkey] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/inquiry/').then(res => {
            setInquiries(res.data)
            console.log(res.data)
        })
    }, [])

    const deleteInquiry = (e) => {

        const inquiryId = e.target.id;

        axios.delete(`http://localhost:5000/inquiry/${inquiryId}`).then((res) => {
            console.log(res.data)
            alert('Inquiry Deleted Successfully')

            axios.get('http://localhost:5000/inquiry/').then(res => {
                setInquiries(res.data)
                console.log(res.data)
            })
        })
    }
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
            <h1>All Responded Client Inquiries</h1>
            <br />
            <div >
                <div className="row mb-2">
                    <input type="text"
                        className="form-control col-4 mt-1"
                        onChange={(e) => { setsearchkey(e.target.value) }}
                        placeholder="Search Inquiries"
                        style={{ width: "200px", borderRadius: "10px" }}
                    />

                    <div className="col-6 col-md-4">
                        <button className="btn btn-secondary mt-1"
                            style={{ marginLeft: "1px" }}
                            onClick={() => filterInquiries(searchkey)}>Search
                        </button>
                    </div>
                </div>
            </div>
            <br />

            {inquiries && inquiries.map((inquiry, index) => (
                <If condition={inquiry.adreply !== "Our team will response to your inquiry soon"}>
                    <Then>
                        <section id="select">
                            <div className="rt-container">
                                <div className="col-rt-12">
                                    <div className="Scriptcontent">
                                        <div className="student-profile py-4">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-lg-8">
                                                        <div className="card shadow-lg">
                                                            <div className="card-header bg-transparent border-3">
                                                                <h3 className="mb-0"><i className="far fa-clone pr-1"></i> &nbsp; Client Inquiry Details</h3>
                                                            </div>
                                                            &nbsp;
                                                            <div className="card-body pt-0">
                                                                <table className="table">
                                                                    <tr>
                                                                        <th width="30%">Name</th>
                                                                        <td width="2%">:</td>
                                                                        <td>{inquiry.name}</td>
                                                                    </tr>
                                                                    &nbsp;
                                                                    <tr>
                                                                        <th width="30%">Phone Number</th>
                                                                        <td width="2%">:</td>
                                                                        <td>+{inquiry.phone}</td>
                                                                    </tr>
                                                                    &nbsp;
                                                                    <tr>
                                                                        <th width="30%">Email</th>
                                                                        <td width="2%">:</td>
                                                                        <td>{inquiry.email}</td>
                                                                    </tr>
                                                                    &nbsp;
                                                                    <tr>
                                                                        <th width="30%">Inquiry</th>
                                                                        <td width="2%">:</td>
                                                                        <td>{inquiry.inq}</td>
                                                                    </tr>
                                                                    &nbsp;
                                                                    <tr>
                                                                        <th width="30%">Status</th>
                                                                        <td width="2%">:</td>
                                                                        <td>
                                                                            <If condition={inquiry.adreply == "Our team will response to your inquiry soon"}>
                                                                                <Then>
                                                                                    <a>
                                                                                        <button className="btn btn-danger btn-sm" type="button"  >
                                                                                            <i className="fa fa-times" aria-hidden="true"></i> &nbsp;
                                                                                            Haven't Responded
                                                                                        </button>
                                                                                    </a>
                                                                                </Then>
                                                                                <Else>
                                                                                    <a>
                                                                                        <button className="btn btn-success btn-sm" type="button"  >
                                                                                            <i className="fa fa-check" aria-hidden="true"></i> &nbsp;
                                                                                            Response Added
                                                                                        </button>
                                                                                    </a>
                                                                                </Else>
                                                                            </If>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-4">
                                                        <div className="card-c shadow-sm border rounded shadow-lg">
                                                            <div className="card-header bg-transparent text-center">
                                                                <Form>
                                                                    <div className="form-group" style={{ marginBottom: '15px' }}>

                                                                        <div className="p-2 bg-dark text-white rounded">
                                                                            <i className="fa fa-user" aria-hidden="true"></i> &nbsp;
                                                                            <label style={{ marginBottom: '5px' }}><b> Client ({inquiry.name}) 's Inquiry</b></label>
                                                                            &nbsp;&nbsp;
                                                                        </div>
                                                                        &nbsp;
                                                                        <h6> {inquiry.inq}</h6>
                                                                    </div>
                                                                </Form>
                                                            </div>
                                                        </div>
                                                        &nbsp;
                                                        <div className="card-c shadow-sm border rounded shadow-lg">
                                                            <div className="card-body text-center">
                                                                <Form>
                                                                    <div className="form-group" style={{ marginBottom: '15px' }}>
                                                                        <div className="p-2 bg-success text-white rounded">
                                                                            <i className="fa fa-comments" aria-hidden="true"></i> &nbsp;
                                                                            <label style={{ marginBottom: '5px' }}><b>Response From Administration</b></label>
                                                                            &nbsp;&nbsp;
                                                                        </div>
                                                                        &nbsp;
                                                                        <h6 className='rounded'> {inquiry.adreply}</h6>
                                                                    </div>
                                                                </Form>
                                                            </div>
                                                        </div>
                                                        <br /><br />
                                                        <div className="row">
                                                            <div className="col">
                                                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                                <a href={`/editreply/${inquiry._id}`} class="btn btn-warning"><i className="fas fa-edit"></i>&nbsp; Edit Response</a>
                                                                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                                                <a id={inquiry._id} onClick={(e) => deleteInquiry(e)} className="btn btn-danger"><i className="fas fa-trash-alt"></i>&nbsp; Delete Inquiry</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br /><br />
                        </section>
                    </Then>
                </If >
            ))}
        </div >
    )
}

export default AdminAllReply;