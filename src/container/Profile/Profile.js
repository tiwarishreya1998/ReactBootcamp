import React, { useEffect, useState } from "react";
//import ViewProfile from '../../component/ViewProfile/ViewProfile';
import {connect} from 'react-redux';
//import * as actions from '../../store/actions/index';
//import Spinner from '../../component/UI/Spinner/Spinner';
import axios from 'axios';
import Aux from '../../hoc/Aux/Aux';
import {Link} from 'react-router-dom';

const Profile=props=>{

    const [firstName,setFirstName] = useState("");     
    const [lastName,setLastName] = useState("");     
    const [contact,setContact] = useState(""); 
    //const [image,setImage] = useState("");    
   // const [loading,setLoading] = useState(false);

    const {access_token}=props;
    console.log(access_token)
        useEffect(()=>{
            console.log(access_token)
            const headers = {
                Authorization: 'Bearer' + access_token
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
                                <img src="//placehold.it/100" className="avatar img-circle" alt="avatar" />
                                <h6>Upload a different photo...</h6>

                                <input type="file" className="form-control" />
                            </div>
                        </div>

                        
                        <div className="col-md-9 personal-info">
                            <div className="alert alert-info">
                                <i className="fa fa-coffee"></i>
                                Password <strong> must contain</strong> 8-15 characters with:
                                <br/>atleast one special symbol
                                <br/>atleast one uppercase letter
                                <br/>atleast one lowercase letter
                                <br/>atleast one numeric digit.
                        </div>

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
                               
                                {/* <div className="form-group">
                                    <label className="col-md-3 control-label">Password:</label>
                                    <div className="col-md-8">
                                        <input className="form-control" type="password" value="11111122333" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label">Confirm password:</label>
                                    <div className="col-md-8">
                                        <input className="form-control" type="password" value="11111122333" />
                                    </div>
                                </div> */}
                                <div className="form-group col-md-3">
                                    <label className=" control-label"></label>
                                    </div>
                                    <div className="col-md-6">
                                    {/* <button type="button" class="btn btn-success">Save Changes</button>
                                    &nbsp;&nbsp;&nbsp;
                                    <button type="reset" class="btn btn-danger">Cancel</button>
                                    &nbsp;&nbsp;&nbsp; */}
                                    <i className="fa fa-user-edit"></i>
                                    <button type="edit" className="btn btn-info">Update Profile</button>
                                    <Link to="/updateProfile">edit profile</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Aux>


    
    )};
const mapStateToProps=state=>{
    return{
        // profile:state.profile.profileDetails,
        // loading:state.profile.loading,
        
        // firstName:state.profile.firstName,
        // lastName:state.profile.lastName,
        // contact:state.profile.contact,
        // active:state.profile.active,
        access_token:state.auth.token
        //id:state.auth.id
    };
};

// const mapDispatchToProps=dispatch=>{
//     return{
//         onFetchProfile:()=>dispatch(actions.fetchProfile())
//     };
// };

export default connect(mapStateToProps)(Profile);
