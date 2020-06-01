import React,{useState} from 'react';
import Spinner from '../../../component/UI/Spinner/Spinner';
import { updateObject } from '../../../shared/utility';
import Button from '../../../component/UI/Button/Button';
import axios from 'axios';

const ForgotPassword=React.memo((props)=>{
    const [loading,setLoading]=useState(false);

    const[params, setParams]=useState("");

    if(loading){
        return <Spinner/>
    }


    const inputChangedHandler=(event,paramName)=>{
        const updatedSchedules=updateObject(params[paramName],{
            [paramName]:updateObject(params[paramName],{
                value:event.target.value
            })
        });
        setParams(updatedSchedules);
    }

    const submitHandler=(event)=>{
        event.preventDefault();
        let email=params.value
        setLoading(true);
        let fetchedData=null;
        console.log(event)
        fetchedData=axios.post("http://localhost:8080/token/"+email)
        fetchedData.then(response=>{
            setLoading(false)
            console.log(response)
        }).catch(error=>{
            setLoading(false)
            console.log("Error is",error.data)
        });
    };

    return(
        <div>
            <form onSubmit={submitHandler}>
                <h4>Forgot Password </h4>
                <input type="text" placeholder="enter your email" onChange={inputChangedHandler}/>
                <Button btnType="Success">Submit</Button>
            </form>
        </div>
    );

});

export default ForgotPassword;