import React, { useEffect,useState } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

const Category =props=>{
    const[categories,setCategories]=useState([]);
    const{access_token}=props;


    useEffect(()=>{
        console.log(access_token)
        const headers = {
            Authorization: 'Bearer' + access_token
        }
        axios.get('http://localhost:8080/customer/profile/categories',{headers:headers})
        .then(response=>{
            console.log(response.data);
            setCategories(response.data)
        }).catch(error=>{
            console.log(error.response.data);
        });
    },[access_token]);

    return(
        <div className="container">
            <div className="dropdown">
            <button className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Categories
                <span className="caret"></span>
            </button>
                <ul className="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1">
                    {categories.map((category)=>
                    <li role="presentation">{category.name}</li>
                    )}
                </ul>
            </div>
        </div>
    )
};
const mapStateToProps=state=>{
    return{
        access_token:state.auth.token
    }
}
export default  connect(mapStateToProps)(Category);