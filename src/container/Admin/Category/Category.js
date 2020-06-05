import React, { useEffect, useState } from 'react';
import Button from '../../../component/UI/Button/Button';
import axios from 'axios';
import {connect} from 'react-redux';
const Category =props=>{


    
    const [categories,setCategories]=useState([])


    const addCategoryHandler=()=>{
        props.history.push('/addCategory');
    }

    const updateCategoryHandler=()=>{
        props.history.push('/updateCategory');

    }
    const {access_token}=props;

    useEffect(()=>{
        const headers = {
            Authorization: 'Bearer ' + access_token
        }
        axios.get('http://localhost:8080/category/all',{ headers: headers })
        .then(response=>{
            setCategories(response.data);
            console.log(response.data)
            
        })
    },[access_token])


    const metadataClick=(filedValuesSet)=>{
        filedValuesSet.map((item)=>
        <div>{item.filedValuesSet[item].value.split(',')}</div>)
    }
    return(
    <>
        
        <table className="table table-bordered table-hover table-responsive-lg" style={{marginLeft:"15%", marginRight:"15%"}}>
        <thead className="thead-dark">
            <tr>
            <th scope="col">#</th>
            <th scope="col">Category Id</th>
            <th scope="col">Name</th>
            <th scope="col">Parent</th>
            <th scope="col">Children</th>
            <th scope="col">Field Values</th>
            {/* <th scope="col">Update</th> */}
            </tr>
        </thead>
        <tbody>
            {categories.map((category,index) => (
                <tr key={category.category.id}>
                    <th scope="row">{index}</th>
                    <td>{category.category.id}</td>
                    <td>{category.category.name}</td>
                    <td>{category.category.parentId ? category.category.parentId.name : 'No data'}</td>
                    <td>{category.childCategory.length > 0 ? category.childCategory.map((c) => <div key={c.id}>{c.name}<br /></div>) : 'No data'}</td>
                    <td>{category.filedValuesSet.length > 0 ? <button type="submit" className="btn btn-primary" onClick={() => metadataClick(category.filedValuesSet)} >Metadata</button> : 'No data'}</td>
                    {/* <td><button type="submit" className="btn btn-success" onClick={() => updateClick(category.category.id)} >Update</button></td> */}
                </tr>
            ))} 
        </tbody>
    </table>
    <div className="container" style={{width:"20%",border:"2px solid black"}}>
        <div><Button btnType="Success" clicked={()=>addCategoryHandler()}>Add category</Button>
        <Button btnType="Success" clicked={()=>updateCategoryHandler()}>Updatecategory</Button></div>
        </div>
       
        </>
    )
};
const mapStateToProps=state=>{
    return{
        access_token:state.auth.token
    }
}
export default connect(mapStateToProps)(Category);