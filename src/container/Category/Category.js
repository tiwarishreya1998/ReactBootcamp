import React, { useEffect,useState } from 'react';
import axios from 'axios';
import Button from '../../component/UI/Button/Button';
import {connect} from 'react-redux';
import Backdrop from '../../component/UI/Backdrop/Backdrop';
import classes from '../../component/SideDrawer/SideDrawer.module.css';
import { withRouter } from 'react-router-dom';

const Category =props=>{
    const[categories,setCategories]=useState([]);
    const [sidebar,setSidebar]=useState({display:"none"});
    const [backdrop,setBackdrop]=useState(false);
    const [latestId,setLatestId]=useState("");
    const{access_token}=props;
    // console.log("message")

   

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
            console.log("my data",response.data.id);
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
        props.history.replace('auth');
        sidebarClose();
        
    }
    const productViewHandler=(id)=>{
        console.log("categoryProduct "+id)
        // props.history.push("categoryProduct/"+id);
        props.history.push({
            pathname: "/categoryProduct",
            state:id
          });
        sidebarClose();
    }

    const childCategoryHandler=(access_token,latestId)=>{
        console.log("latestid",latestId)
        let parId;
        const headers = {
            Authorization: 'Bearer ' + access_token
        }
        let query='';
        if(latestId){
            query=`?categoryId=${latestId}`;

        }setLatestId(latestId)
        console.log("child category lastest prev id", latestId)
        axios.get('http://localhost:8080/customer/profile/categories'+query,{headers:headers})
        .then((response)=>{
            console.log("child category ",response.data)
            //setLatestId(response.data.id)
            //console.log(response.data.id)
            //console.log(response.data[0].parentId.id);
            //parId=response.data[0].parentId.id;
           //console.log(parId);
          // setLatestId(response.data.id)
           console.log("child catgeory lastes id ",response.data.id)
            setCategories(response.data)
            

        })
        .catch((error)=>{
            console.log(error);
        });
        //onFetchCategories(access_token,parId);
    }


    let sidebarClass=["w3-sidebar w3-bar-block",classes.SideDrawer]
    console.log(categories.length)
    return(
        <div>
        <Backdrop show={backdrop} clicked={sidebarClose}/>
            <span className="w3-button w3-slarge" style={{border:"solid #225E62",backgroundColor:"#66DAC7",textAlign:"center"}} onClick={sidebarOpen}>
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
                <span onClick={()=>productViewHandler(latestId)}>                    
                <i className="fa fa eye" aria-hidden="true">view</i></span>
            ):null}

            {props.isAuthenticated && latestId && categories.length!==0?(
            <span  onClick={childCategoryHandler}>

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
export default  withRouter(connect(mapStateToProps)(Category));
