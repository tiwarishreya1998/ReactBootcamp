import React, {useState } from 'react';
import {connect} from 'react-redux';
import Aux from '../../../hoc/Aux/Aux';
import axios from 'axios';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';
import {updateObject} from '../../../shared/utility'; 
import {Link} from 'react-router-dom'; 
import profile from '../../../assests/HomePagePics/profile.jpeg';
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
                        <div className="col-md-4">
                            
                            <img src={profile} className="avatar img-circle" alt="avatar" />
                                <h6>Upload a different photo...</h6>

                                <input type="file" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-8 personal-info">
                        
                        <div class="col-md-6">
                            <h3>Personal info</h3>
                        </div>
                        <Link to="/customerPassword">Update Password</Link>
                                <i className="fa fa-edit"></i>

                            <form className="row" onSubmit={submitHandler} >
                                <div className="form-group col-lg-9">

                                 {form}              
                                
                                </div>
                                

                                <div class="form-group col-md-3">
                                <label class=" control-label"></label>
                            </div>
                            <div class="col-md-6">
                                <button type="edit" class="btn btn-success">Save Changes</button>
                                &nbsp;&nbsp;&nbsp;
                                <Link to="/profile" >  <button type="reset" class="btn btn-danger">Cancel</button></Link> 
                               
                            </div>
                            </form>
                            
                            
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

