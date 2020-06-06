import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

const ViewMetaData=props=>{

    const [metadata,setMetaData]=useState([]);
    const {access_token}=props;
    useEffect(()=>{
        const headers = {
            Authorization: "Bearer " + access_token,
        };
        axios.get("http://localhost:8080/metadata/view",{ headers: headers })
        .then(response=>{
            setMetaData(response.data);
            console.log(response.data)
        }).catch(error=>{
        if(error.message!=null){
                alert(error.message);
            }
        });
    },[access_token]);
    return(
        <div className="container fluid" style={{marginTop: "5%",marginBottom:"5%",width:"50%"}}>

        <h1>VIEW METADATA</h1>
        <ul>
        {metadata.map((item)=>(
             <li key={item.id}>
                 id:{item.id}
                 <br/>
                 name:{item.name}
             </li>

         ))}
        </ul>
        
        </div>
    )
}
const mapStateToProps = state => {
    return {
        access_token: state.auth.token
    }
}
export default connect(mapStateToProps)(ViewMetaData);