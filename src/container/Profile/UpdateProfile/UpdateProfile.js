import React, {useState } from 'react';
import {connect} from 'react-redux';
import Aux from '../../../hoc/Aux/Aux';
import axios from 'axios';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';
import {updateObject} from '../../../shared/utility'; 

const UpdateProfile =props=>{
    const [params,setParams]=useState({
        firstName:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Enter  firstName",
            },
        },
        lastName:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Enter lastName",
            },
        },
        contact:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Enter contact",
            },
        },
        
    });

    const[loading,setLoading]=useState(false);
    const {access_token}=props;

        const submitHandler=(event)=>{
            event.preventDefault();
            const formData = {};
                for (let key in params) {
                formData[key] = params[key].value;
                }
            axios({
                method: "PATCH",
                url: "http://localhost:8080/customer/profile",
                data: formData,
                headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + access_token,
                },
                })
            .then((response)=>{
                setLoading(false);
            })
            .catch((error)=>{
                setLoading(false);
                console.log(error);
            });
            };


            

            const formElementsArray=[];
                for(let key in params){
                    formElementsArray.push({
                        id:key,
                        config:params[key],
                    });
            };



                
            let form=formElementsArray.map((formElement)=>(
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    changed={(event) => inputChangedHandler(event, formElement.id)}/>
                ));
            
                const inputChangedHandler=(event,paramName)=>{
                    const updatedSchedules=updateObject(params,{
                        [paramName]:updateObject(params[paramName],{
                            value:event.target.value
                        }),
                    });
                    setParams(updatedSchedules);
                }
            
                if(loading){
                    form=<Spinner/>
                }
    
        

        

    return(
        
            <Aux>
                <div className="container">
                    <h1>Edit Profile</h1>
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

                            <form className="row" onSubmit={submitHandler} >
                                <div className="form-group col-lg-3">
                                    {form}                
                                </div>
                               
                                
                                <div className="form-group col-md-3">
                                    <label className=" control-label"></label>
                                </div>
                                    <div className="col-md-6">
                                    <button type="edit" className="btn btn-info">Update Profile</button>
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

export default connect(mapStateToProps)(UpdateProfile);

