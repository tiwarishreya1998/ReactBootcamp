import React, { useState } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import Input from '../../../component/UI/Input/Input';
import Aux from '../../../hoc/Aux/Aux';
import Spinner from '../../../component/UI/Spinner/Spinner';
import classes from './SellerProfileUpdate.module.css';
import { updateObject } from '../../../shared/utility';
import {Link} from 'react-router-dom';
import profile1 from '../../../assests/HomePagePics/profile1.jpeg';

const SellerProfileUpdate = props => {
    const [params, setParams] = useState({
        firstName: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Enter  first name",
            },
        },
        lastName: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Enter last name",
            },
        },
        companyContact: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Enter contact number",
            },
        },
        gst: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Enter gst",
            },
        },
        companyName: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Enter company name",
            },
        }
    });

    const [loading, setLoading] = useState(false);
    const { access_token } = props;

    const submitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let key in params) {
            formData[key] = params[key].value;
        }
        console.log(formData)
        axios({
            method: "PATCH",
            url: "http://localhost:8080/seller/profile",
            data: formData,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + access_token,
            },
        })
            .then((response) => {
                setLoading(false);
                props.history.push("/sellerProfile")
                console.log(response.data)
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };

    const formElementsArray = [];
    for (let key in params) {
        formElementsArray.push({
            id: key,
            config: params[key],
        });
    };

    let form = formElementsArray.map((formElement) => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ));

    const inputChangedHandler = (event, paramName) => {
        const updatedSchedules = updateObject(params, {
            [paramName]: updateObject(params[paramName], {
                value: event.target.value
            }),
        });
        setParams(updatedSchedules);
    }

    
    if (loading) {
        form = <Spinner />
    }

    return (
        <Aux>
            <div class="container">
                <h1>Edit Profile</h1>
                <div class="row">
                   
                    <div class="col-md-4">
                        <div className={classes.Picture}>
                            <img src={profile1} class="avatar img-circle" alt="avatar" />
                            <h6>Upload a different photo...</h6>
                          
                            <input type="file" class="form-control" />
                           
                        </div>
                    </div>

                  
                    <div class="col-md-8 personal-info">
                        
                        <div class="col-md-6">
                            <h3>Personal info</h3>
                        </div>
                        <form class="row" onSubmit={submitHandler}>

                            <div class="form-group col-lg-9">
                                {form}
                            </div>
                            <Link to="/updateSellerPassword">Update Password</Link>
                            <i className="fa fa-edit"></i>

                            <div class="form-group col-md-3">
                                <label class=" control-label"></label>
                            </div>
                            <div class="col-md-6">
                                <button type="edit" class="btn btn-success">Save Changes</button>
                                &nbsp;&nbsp;&nbsp;
                                <Link to="/sellerProfile" >  <button type="reset" class="btn btn-danger">Cancel</button></Link> 
                               
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Aux>
    )
};

const mapStateToProps = state => {
    return {
        access_token: state.auth.token
    };
};


export default connect(mapStateToProps)(SellerProfileUpdate);