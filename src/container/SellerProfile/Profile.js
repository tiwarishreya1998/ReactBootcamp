import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import profile1 from '.././../assests/HomePagePics/profile1.jpeg';

const SellerProfile = props => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [companyContact, setCompanyContact] = useState("");
    const [gst, setGst] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [address, setAddress] = useState([]);
    const [id, setId] = useState("");
    // const [country,setCountry]=useState([]);
    // const [city,setCity]=useState([]);
    // const [state,setState]=useState([]);
    // const [zipCode,setzipCode]=useState([])

    // const [address,setAddress]=useState([])

    const { access_token } = props;

    useEffect(() => {
        console.log(access_token)
        const headers = {
            Authorization: 'Bearer ' + access_token
        }
        axios.get('http://localhost:8080/seller/profile', { headers: headers })
            .then(response => {
                console.log(response.data);
                setId(response.data.id);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setCompanyContact(response.data.companyContact);
                setGst(response.data.gst);
                setCompanyName(response.data.companyName)
                setAddress(response.data.address);
            })
            .catch(error => {
                console.log(error);
            });
    }, [access_token]);

    const idChangeHandler = (e) => { setId(e.target.value) }
    const firstNameChangeHandler = (e) => { setFirstName(e.target.value) }
    const lastNameChangeHandler = (e) => { setLastName(e.target.value) }
    const companyContactChangeHandler = (e) => { setCompanyContact(e.target.value) }
    const gstChangeHandler = (e) => { setGst(e.target.value) }
    const companyNameChangeHandler = (e) => { setCompanyName(e.target.value) }
    // const addressChangeHandler = (e) => { setAddress(e.target.value) }





    return (
        <div className="container" style={{ widht: "50%", border: "2px solid black", padding: "auto", margin: "auto" }}>

            <div className="col-md-3">
                <div className="text-center">
                    <img src={profile1} className="avatar img-circle" alt="avatar" />

                </div>
            </div>
            <h3>Personal info</h3>

            <form className="row"  >
                <div class="form-group col-lg-3">
                    <label class=" control-label">Id</label>
                </div>
                <div class="col-lg-9">
                    <input class="form-control" readonly="readonly" type="text" value={id} onChange={idChangeHandler} />
                </div>

                <div class="form-group col-lg-3">
                    <label class=" control-label">First Name:</label>
                </div>
                <div class="col-lg-9">
                    <input class="form-control" readonly="readonly" type="text" value={firstName} onChange={firstNameChangeHandler} />
                </div>

                <div class="form-group col-lg-3">
                    <label class=" control-label">Last name:</label>
                </div>
                <div class="col-lg-9">
                    <input class="form-control" readonly="readonly" type="text" value={lastName} onChange={lastNameChangeHandler} />
                </div>

                <div class="form-group col-lg-3">
                    <label class=" control-label">Company Contact Number:</label>
                </div>
                <div class="col-lg-9">
                    <input class="form-control" readonly="readonly" type="text" value={companyContact} onChange={companyContactChangeHandler} />
                </div>

                <div class="form-group col-lg-3">
                    <label class=" control-label">GST:</label>
                </div>
                <div class="col-lg-9">
                    <input class="form-control" readonly="readonly" type="text" value={gst} onChange={gstChangeHandler} />
                </div>

                <div class="form-group col-lg-3">
                    <label class=" control-label">Company Name:</label>
                </div>
                <div class="col-lg-9">
                    <input class="form-control" readonly="readonly" type="text" value={companyName} onChange={companyNameChangeHandler} />
                </div>

                <div class="form-group col-lg-3">
                    <label class=" control-label">Country:</label>
                </div>
                <div class="col-lg-9">
                    <input class="form-control" readonly="readonly" type="text" value={address.country} />
                </div>

                <div class="form-group col-lg-3">
                    <label class=" control-label">City:</label>
                </div>
                <div class="col-lg-9">
                    <input class="form-control" readonly="readonly" type="text" value={address.city} />
                </div>

                <div class="form-group col-lg-3">
                    <label class=" control-label">State:</label>
                </div>
                <div class="col-lg-9">
                    <input class="form-control" readonly="readonly" type="text" value={address.state} />
                </div>

                <div class="form-group col-lg-3">
                    <label class=" control-label">Zipcode:</label>
                </div>
                <div class="col-lg-9">
                    <input class="form-control" readonly="readonly" type="text" value={address.zipCode} />
                </div>

                <div class="form-group col-lg-3">
                    <label class=" control-label">address</label>
                </div>
                <div class="col-lg-9">
                    <input class="form-control" readonly="readonly" type="text" value={address.address} />
                </div>

                {/*<div className="form-group col-lg-3">
                                    <label className=" control-label"> zipcode</label></div>
                                    <div >
                                        <h4>{address.zipcode}</h4>
                                       
                                    
                                </div>
                                <br/>
                                <div className="form-group col-lg-3">
                                    <label className=" control-label"> address</label></div>
                                    <div><h4>{address.address}</h4>
                                         */}

                {/* </div> */}
                <br />

                <div class="col-md-12">
                    <Link to="/updateSellerProfile"><button type="edit" class="btn btn-info">Update Profile</button></Link>
                </div>

                
            </form>

        </div>
    )
}
const mapStateToProps = state => {
    return {
        access_token: state.auth.token
    }
}
export default connect(mapStateToProps)(SellerProfile);