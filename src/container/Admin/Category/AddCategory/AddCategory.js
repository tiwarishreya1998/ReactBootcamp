import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Button from '../../../../component//UI/Button/Button';
import {connect} from 'react-redux';

const AddCategory=props=>{

    

    const [parentId,setParentId] = useState("");     
    const [name,setName] = useState("");   
    const [categories,setCategories]=useState([]);
    const {access_token}=props;
  
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

    const idChangedHandler=(e)=>{
        setParentId(e.target.value);
    }


    const nameChangedHandler=(e)=>{
        setName(e.target.value);
    }
  

    const submitHandler=(event)=>{
        event.preventDefault();
        console.log(access_token);
        const headers = {
            Authorization: 'Bearer ' + access_token
        }
        let fetchedData=null;
        let query='?';
        if(parentId){
            query=query+`parentId=${parentId}&name=${name}`;
            fetchedData=axios.post('http://localhost:8080/category/add'+query,{},{headers:headers})
        }else{
            query=query+`name=${name}`;
            fetchedData=axios.post('http://localhost:8080/category/add'+query,{},{headers:headers})
        }
       
        fetchedData.then(response => {
            
            
            console.log("Data received is: ",response)
            console.log("Data fetched is",response.data)
        }).catch(error => {
            console.log("Error is",error)
        })
    }
    return(
        // <div className="container" style={{width:"50%",border:"2px solid green",padding:"50px"}}>
        //     <form onSubmit={submitHandler}>
        //         {/* <div>
        //         <h4>Enter Parent Category id</h4>
        //         <input type="text" placeholder="Category id"  onChange={idChangedHandler}/>
        //         </div> */}
        //         <div className="col-lg-9">
        //             <select id="categoryId" className="form-control" size="0" onChange={idChangedHandler} >
        //                 <option value="default">Category</option>
        //                     {categories.map(category => (
        //                     <option key={category.category.id} value={category.category.id} onChange={idChangedHandler}>{category.category.name}</option>
        //                     ))}
        //             </select>
        //         </div>
        //         <input type="text" placeholder="enter category name" onChange={nameChangedHandler}/>
                
        //         <Button btnType="Success" >Submit</Button>
                
                
        //     </form>
           
        // </div>
        <div className="container" style={{width:"50%",border:"2px solid green",padding:"50px"}}>
            <form onSubmit={submitHandler}>
                <div className="col-lg-9">
                                    <select id="categoryId" className="form-control" size="0" onChange={idChangedHandler} >
                                        <option value="default">Category</option>
                                            {categories.map(category => (
                                                <option key={category.category.id} value={category.category.id} onChange={idChangedHandler}>{category.category.name}</option>
                                            ))}
                                    </select>
                                </div>
                <input type="text" placeholder="enter category name" onChange={nameChangedHandler}/>
                <Button btnType="Success">add Category</Button>
            </form>
        </div>
    )
}
const mapStateToProps=state=>{
    return{
        access_token:state.auth.token
    };
}
export default connect(mapStateToProps)(AddCategory);