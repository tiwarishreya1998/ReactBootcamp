import React,{useState,useEffect} from 'react';

import Button from '../../../../component/UI/Button/Button';
import { connect } from 'react-redux';
import axios from 'axios';
const UpdateCategory=props=>{

    const{access_token}=props;
    useEffect(()=>{
        // setLoading(true);
        const headers = {
            Authorization: 'Bearer ' + access_token
        }
        axios.get('http://localhost:8080/category/all',{ headers: headers })
        .then(response=>{
            setCategories(response.data);
            console.log(response.data)
            // setLoading(false);
        })
    },[access_token])

   // const [loading,setLoading]=useState(false);
    const [name,setName]=useState("")
    const [categories,setCategories]=useState([]);  
    const[categoryId,setCategoryId]=useState("");


    const submitHandler=(event)=>{
        event.preventDefault();
        // setLoading(true);
        const headers = {
            Authorization: 'Bearer ' + access_token
        }
        let query='?';
        query=query+`name=${name}&id=${categoryId}`;
        axios.put('http://localhost:8080/category/update'+query,{},{headers:headers})
        .then(response=>{
            console.log(response.data);
            alert(response.data);
            // setLoading(false);
        })
        

    }
        
    const categoryChangeHandler = (e) => setCategoryId(e.target.value);

    const nameChangedHandler=(event)=>{
        setName(event.target.value)
    }
  
    return(
        // <div className="container" style={{width:"50%",border:"2px solid green",padding:"50px"}}>
        //     <form onSubmit={submitHandler}>
        //         <div>
        //         <h4>Category id</h4>
        //         <input type="text" placeholder="Category id"  onChange={idChangedHandler}/>
        //         </div>
        //         <div>
        //         <h4>Name of Category</h4>
        //         <input type="text" placeholder="Category name" onChange={nameChangedHandler}/>
        //         <div>
        //         <Button btnType="Success" >Submit</Button>
        //         </div>
        //         </div>
        //     </form>
           
        // </div>
        <div className="container" style={{width:"50%",border:"2px solid green",padding:"50px"}}>
            <form onSubmit={submitHandler}>
                <div className="col-lg-9">
                                    <select id="categoryId" className="form-control" size="0" onChange={categoryChangeHandler} >
                                        <option value="default">Category</option>
                                            {categories.map(category => (
                                                <option key={category.category.id} value={category.category.id} onChange={categoryChangeHandler}>{category.category.name}</option>
                                            ))}
                                    </select>
                                </div>
                <input type="text" placeholder="enter category name" onChange={nameChangedHandler}/>
                <Button btnType="Success">Update Category</Button>
            </form>
        </div>
    )
};
const mapStateToProps=state=>{
    return{
        access_token:state.auth.token
    }
}

export default connect(mapStateToProps)(UpdateCategory)