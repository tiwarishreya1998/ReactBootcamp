import React, { useEffect,useState } from 'react';
import axios from 'axios';
import Button from '../../component/UI/Button/Button';
import {connect} from 'react-redux';
import Backdrop from '../../component/UI/Backdrop/Backdrop';
import classes from '../../component/SideDrawer/SideDrawer.module.css';

const Category =props=>{
    const[categories,setCategories]=useState([]);
    const [sidebar,setSidebar]=useState({display:"none"});
    const [backdrop,setBackdrop]=useState(false);
    const [latestId,setLatestId]=useState("");
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



    const onFetchCategories=(access_token)=>{
        console.log(access_token)
        const headers = {
            Authorization: 'Bearer' + access_token
        }
        axios.get('http://localhost:8080/customer/profile/categories',{headers:headers})
        .then(response=>{
            console.log(response.data);
            setLatestId(response.data.id)
            setCategories(response.data)
        }).catch(error=>{
            console.log(error.response.data);
        });
    }
    const sidebarClose=()=>{
        setSidebar({display:"none"});
        setBackdrop(false);
    }

    const sidebarOpen=()=>{
        setSidebar({
            backgroundColor:"#66DAC7",
            display:'inline',
            width:"300px",
            height:"1000px",
            marginTop:"22%",
        });
        setBackdrop(true);
        onFetchCategories(access_token);
    }


    const categoryHandler=(categoryId)=>{
        childCategoryHandler(access_token,categoryId);
    };

    
    const redirectHandler=()=>{
        props.history.replace('http://localhost:3000/auth');
        sidebarClose();
        
    }
    const productViewHandler=()=>{
        props.history.push("http://localhost:3000/categoryProduct/"+latestId);
        sidebarClose();
    }

    const childCategoryHandler=(access_token,latestId)=>{
        let parId;
        const headers = {
            Authorization: 'Bearer ' + access_token
        }
        let query='';
        if(latestId){
            query=`?categoryId=${latestId}`;

        }
        axios.get('http://localhost:8080/customer/profile/categories'+query,{headers:headers})
        .then((response)=>{
            console.log(response.data[0].parentId.id);
            parId=response.data[0].parentId.id;
            console.log(parId);
            setCategories(response.data)

        })
        .catch((error)=>{
            console.log(error);
        });
        // onFetchCategories(access_token,parId);
    }


    let sidebarClass=["w3-sidebar w3-bar-block",classes.SideDrawer]
    return(
        // <div className="container">
        //     <div className="dropdown">
        //     <button className="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Categories
        //         <span className="caret"></span>
        //     </button>
        //         {/* <ul className="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1">
        //             {categories.map((category)=>
        //             <li role="presentation">{category.name}</li>
        //             )}
        //         </ul> */}
        <div>
        <Backdrop show={backdrop} clicked={sidebarClose}/>
            <span className="w3-button w3-slarge" style={{border:"2px solid #225E62",backgroundColor:"#66DAC7"}} onClick={sidebarOpen}>
                Categories
            </span>
            <div className={sidebarClass.join(' ')} style={{...sidebar,overflowY:"scroll"}}id="one">
            <Button btnType="Success" clicked={sidebarClose}>close</Button>


            {!props.isAuthenticated ? (
            <span className="btn btn-danger" onClick={redirectHandler}> Signin </span>) : 
            (<ul className="list-group">
            {categories.map((category)=>(
            <li key={category.id}
                className="list-group-item d-flex justify-content-between align-items-center">
                    {category.name}
                    <span onClick={()=>categoryHandler(category.id)}>
                        <i className="fa fa-angle-right"></i>

                    </span>

            </li>
            ))}
            </ul>
                )}
            {categories.length===0 && props.isAuthenticated ? (
                <span onClick={productViewHandler}>
                <i className="fa fa eye" aria-hidden="true">view</i></span>
            ):null}

            {props.isAuthenticated && latestId && categories.length!==0?(
            <span  onClick={(latestId)=>childCategoryHandler(latestId)}>

                </span>
            ):null}
            </div>
     </div>
       
    )
};
const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token!==null,
        access_token:state.auth.token
    }
}
export default  connect(mapStateToProps)(Category);