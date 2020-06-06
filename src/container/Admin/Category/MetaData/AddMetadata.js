import React,{useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Button from '../../../../component/UI/Button/Button';
const AddMetadata=props=>{
    const [metadata,setMatadata]=useState("");


    const metadataChangedHandler=(event)=>{
        setMatadata(event.target.value);
    }
    const {access_token}=props;
    const submitHandler=()=>{
        const headers = {
            Authorization: "Bearer " + access_token,
        };
        let query="?";
        query=query+`name=${metadata}`
        axios.post("http://localhost:8080/metadata/add"+query,{},{headers:headers})
        .then(response=>{
            alert(response.data)
            console(response.data)
        }).catch(err =>{
            console.log(err.message);
            if(err.message!=null){
                alert(err.message);
            }})
    }
    return(
        <div className="container fluid" style={{marginTop: "5%",marginBottom:"5%",width:"50%"}}>
            <form onSubmit={submitHandler}>
            <h4>Add Metadata</h4>
            <input type="text" placeholder="enter Metadata" onChange={metadataChangedHandler}/>
            <Button btnType="Success">Add</Button>
            </form>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        access_token: state.auth.token
    }
}
export default connect(mapStateToProps)(AddMetadata);