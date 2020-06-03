import React,{useState} from 'react';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Button from '../../../component/UI/Button/Button';
import axios from 'axios';

const ForgotPassword=React.memo((props)=>{
    const [loading,setLoading]=useState(false);

    const[params, setParams]=useState("");

    if(loading){
        return <Spinner/>
    }


    const inputChangedHandler=(event,paramName)=>{

        setParams(event.target.value);
        console.log(event.target.value)
    }

    const submitHandler=(event)=>{
        event.preventDefault();
        let email=params
        console.log(params);
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


    const resetHandler=()=>{
        props.history.push("/resetPassword");
    }
    return(
        <div>
            <form onSubmit={submitHandler}>
                <h4>Forgot Password </h4>
                <input type="text" placeholder="enter your email" value={params} onChange={inputChangedHandler}/>
                <Button btnType="Success" >Submit</Button>
            </form>
            <Button btnType="Success" clicked={()=>resetHandler()}>Reset Password</Button>
        </div>
    );

});

export default ForgotPassword;