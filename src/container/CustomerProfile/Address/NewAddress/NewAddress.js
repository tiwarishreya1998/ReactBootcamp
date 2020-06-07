import React,{useState} from 'react';
import {connect} from 'react-redux';
import Aux from '../../../../hoc/Aux/Aux';
import axios from 'axios';
import Spinner from '../../../../component/UI/Spinner/Spinner';
import Input from '../../../../component/UI/Input/Input';
import {updateObject} from '../../../../shared/utility'; 
const NewAddress=props=>{

    const [params,setParams]=useState({
        country:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Enter country",
            },
        },
        city:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Enter city",
            },
        },
        state:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Enter state",
            },
        },
        zipcode:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Enter Zipcode",
            },
        },
        address:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Enter address",
            },
        },
        label:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Enter label",
            },
        },
    });

    const submitHandler=(event)=>{
        event.preventDefault();
        const formData = {};
            for (let key in params) {
            formData[key] = params[key].value;
            }
        axios({
            method: "POST",
            url: "http://localhost:8080/customer/profile/address",
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

    const[loading,setLoading]=useState(false);
    const {access_token}=props;

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
                    <h1>New Address</h1>
                            <h3>Address info</h3>

                            <form onSubmit={submitHandler} >
                                <div >
                                    {form}                
                                </div>                             
                               
                                    <button type="edit" className="btn btn-info">Add address</button>
                                
                            </form>
                        
                </div>
            </Aux>
        );
}
const mapStateToProps=state=>{
    return{
        access_token:state.auth.token
        
    };
};

export default connect(mapStateToProps)(NewAddress);
