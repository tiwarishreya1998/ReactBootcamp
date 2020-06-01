import React, { useState } from 'react';
import { updateObject } from '../../../shared/utility';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Button from '../../../component/UI/Button/Button';
import axios from 'axios';
import Input from '../../../component/UI/Input/Input';

const ResetPassword=props=>{

    const [params,setParams]=useState({
        email:{
            elementType:"input",
            elementConfig:{
                type:"email",
                placeholder:"Enter emailr",
            },
        },
        token:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Enter token",
            },
        },
        pass:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Enter pass",
            },
        },
        cpass:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:" cc pass",
            },
        },
        
    });
    const[loading,setLoading]=useState(false);


    const submitHandler=(event)=>{
        event.preventDefault();
        setLoading(true)
        //let result=null;

        const paramData={};
        let query="?";
        for(let key in params){
        query=query+"&"+key+"="+params[key].value;
        }

        console.log("Query passed is",query)
        for(let key in params){
            paramData[key]=params[key].value;
        }

        let fetchedData=null;
        fetchedData=axios.patch("http://localhost:8080/resetPassword"+query)
        setLoading(false)
        
        fetchedData.then(response=>{
           //result=response.fetchedData
           console.log(response);
        }).catch(error=>{
            console.log("error is",error)
        })
    }

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
        // value={formElement.config.value}
        // invalid={!formElement.config.valid}
        // shouldValidate={formElement.config.validation}
        // touched={formElement.config.touched}
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
        <div>
            <form onSubmit={submitHandler}>
                {form}
                {/* <input type="email" placeholder="enter your email" onChange={inputChangedHandler} >Email</input>
                <input type="text" placeholder="enter the token" onChange={inputChangedHandler}>Token</input>
                <input type="password" placeholder="enter the password" onChange={inputChangedHandler}>Password</input>
                <input type="password" placeholder="enter the confirmed password " onChange={inputChangedHandler}>Confirm Password</input> */}
                <Button btnType="Success">Reset</Button>
            </form>
        </div>
    )
}
export default ResetPassword;