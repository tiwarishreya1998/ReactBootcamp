import React,{useState} from 'react';
import {connect} from 'react-redux';
import Aux from '../../../hoc/Aux/Aux';
import classes from '../Auth.module.css';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';
import {updateObject} from '../../../shared/utility'; 
import axios from 'axios';

const SellerAddress=props=>{

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
      
    });
    const submitHandler = (event) => {
        event.preventDefault();
        const addresses = []
        const addressData = {}
        for(let key in params){
        addressData[key] = params[key].value;
        }
        
        addresses.push(addressData)
        const registeredSeller = {...props.pastData,addresses}
        
        console.log("Submitted seller info is : ",registeredSeller)
        //props.onRegister(registeredSeller)
        let responseData=null;
        responseData=axios.post("http://localhost:8080/register/seller",registeredSeller);
        responseData.then((response)=>{
            setLoading(false);
            alert("Seller Successfully Registered");
            alert(response.data)
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
                <div className={classes.RegisterData}>
                        <h1>Company Address</h1>
                            <form onSubmit={submitHandler} >
                                
                                    {form}            
                                
                                    
                                    <button type="edit" className="btn btn-info">Register</button>
                              
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

export default connect(mapStateToProps)(SellerAddress);