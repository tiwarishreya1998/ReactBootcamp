import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
//import FetchAddress from './Address/FetchAddress/FetchAddress';
import axios from 'axios';
import Aux from '../../hoc/Aux/Aux';
import {Link} from 'react-router-dom';
//import Button from '../../component/UI/Button/Button';
import profile from '../../assests/HomePagePics/profile.jpeg';
//import UpdateProfile from '../Profile/UpdateProfile/UpdateProfile';
const Profile=props=>{

    const [firstName,setFirstName] = useState("");     
    const [lastName,setLastName] = useState("");     
    const [contact,setContact] = useState(""); 


    const {access_token}=props;
    console.log(access_token)
        useEffect(()=>{
            console.log(access_token)
            const headers = {
                Authorization: 'Bearer ' + access_token
                }
                axios.get('http://localhost:8080/customer/profile',{ headers: headers })
                .then(response => {
                console.log(response.data);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setContact(response.data.contact);                
                })
                .catch(error => {
                console.log(error.response.data.error);
                });
                },[access_token]);
        
        // let ship=null
        // const getAddressHandler=()=>{
        //             ship=<FetchAddress/>
        // }

    

        const firstNameChangeHandler = (e) => {setFirstName(e.target.value)     }      
        const lastNameChangeHandler = (e) => {setLastName(e.target.value)     }      
        const contactChangeHandler = (e) => {setContact(e.target.value)     }
        

    return(
        
            <Aux>
                <div className="container">
                    <h1>Customer Profile</h1>
                    <div className="row">
                        {/* <!-- left column --> */}
                        <div className="col-md-3">
                            <div className="text-center">
                                <img src={profile} className="avatar img-circle" alt="avatar" />
                                
                            </div>
                        </div>

                        
                        <div className="col-md-9 personal-info">
                            {/* <div className="alert alert-info">
                                <i className="fa fa-coffee"></i>
                                Password <strong> must contain</strong> 8-15 characters with:
                                <br/>atleast one special symbol
                                <br/>atleast one uppercase letter
                                <br/>atleast one lowercase letter
                                <br/>atleast one numeric digit.
                        </div> */}

                            <h3>Personal info</h3>
                            
                            <form className="row"  >
                                <div className="form-group col-lg-3">
                                    <label className=" control-label">First name:</label></div>
                                    <div className="col-lg-9">
                                        <input className="form-control " readOnly="readonly" value={firstName} onChange={firstNameChangeHandler}/>
                                    </div>
                                
                                <div className="form-group col-lg-3 ">
                                    <label className="control-label">Last name:</label></div>
                                    <div className="col-lg-9">
                                        <input className="form-control" readOnly="readonly" value={lastName} onChange={lastNameChangeHandler} />
                                    </div>
                                
                                
                                <div className="form-group col-lg-3">
                                    <label className=" control-label">Contact Number:</label></div>
                                    <div className="col-lg-9">
                                        <input className="form-control" readOnly="readonly" value={contact}  onChange={contactChangeHandler}/>
                                    
                                </div>
                            
                                <div className="form-group col-md-3">
                                    <label className=" control-label"></label>
                                    </div>
                                    <div className="col-md-6">
                                        <Link to="/updateProfile">Edit profile</Link>
                                    <i className="fa fa-edit"></i>
                                    
                                    <div>
                                    <Link to="/fetchAddress">View Address</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Aux>


    
    )};
const mapStateToProps=state=>{
    return{
       
        access_token:state.auth.token
       
    };
};


export default connect(mapStateToProps)(Profile);
