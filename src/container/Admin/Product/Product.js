import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
const ViewProduct=props=>{

    const {access_token}=props;
    useEffect(()=>{
        const headers = {
            Authorization: 'Bearer ' + access_token
        }
        axios.get('http://localhost:8080/product/admin/all',{ headers: headers })
        .then(response=>{
            // setCategories(response.data);
            console.log(response.data)
            // setLoading(false);
        })
    },[access_token])
    



    return(
        <div></div>
    );
}
const mapStateToProps=state=>{
    return{
        access_token:state.auth.token
        
    };
};
export default connect(mapStateToProps)(ViewProduct);