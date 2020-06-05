import React,{useState, useEffect} from 'react';
import * as actions from '../../store/actions/index';
import axios from 'axios';
import Aux from '../../hoc/Aux/Aux';
import classes from '../../component/SideDrawer/SideDrawer.module.css';
import Spinner from '../../component/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import Backdrop from '../../component/UI/Backdrop/Backdrop';

const Category=(props)=>{
    const [sidebar,setSidebar]=useState({display:"none"});
    const [backdrop,setBackdrop]=useState(false);
    const [onFetchCategories,access_token,isAuthenticated]=props;

    useEffect(()=>{
        if(isAuthenticated)
        {
            onFetchCategories(access_token);
        }
    },[onFetchCategories,access_token,isAuthenticated]);

    const sidebarClose=()=>{
        setSidebar({display:"none"});
        setBackdrop(false);
    }

    const sidebarOpen=()=>{
        setSidebar({
            backgroundColor:"white",
            display:'inline',
            width:"300px",
            height:"1000px",
            marginTop:"22%",
        });
        setBackdrop(true);
        onFetchCategories(access_token);
    }


    const categoryHandler=(categoryId)=>{
        onFetchCategories(access_token,categoryId);
    };

    const redirectHandler=()=>{
        sidebarClose();
        props.history.replace('/sign-in');
    }
    const productViewHandler=()=>{
        props.history.push("/category/"+props.currId);
        sidebarClose();
    }

    const categoryNavigator=()=>{
        let prevCatId;
        const headers = {
            Authorization: 'Bearer ' + access_token
        }
        let query='';
        if(props.currId){
            query=`?categoryId=${props.currId}`;

        }
        axios.get('http://localhost:8080/customer/profile/categories'+query,{headers:headers})
        .then((response)=>{
            console.log(response.data[0].parentId.id);
            prevCatId=response.data[0].parentId.id;
            console.log(prevCatId);
        })
        .catch((error)=>{
            console.log(error.response.data.error);
        });
        onFetchCategories(access_token,prevCatId);
    }
    let spinner=<Spinner/>

    let importantData=props.error?props.error:props.categories.map((category)=>(
        <li key={category.id}
        className="list-group-item d-flex justify-content-between align-items-center">
            {category.name}
            <span className="badge badge-primary badge-pill"
            onClick={()=>categoryHandler(category.id)}>
                <i className="fas fa-chevron-right"></i>

            </span>

        </li>
    ));

    let sidebarClass=classes.SideDrawer

    return(
        <Aux>
            <Backdrop show={backdrop} clicked={sidebarClose}/>
            <span
            className="w3-button w3-slarge"
            style={{width:"50px"}}
            onClick={sidebarOpen}>
                ---
                ---
                ---
            </span>
            <div className={sidebarClass.join(' ')}
            style={{...sidebar,overflowY:"scroll",maxHeight:"100vh"}}
            id="mysidebBar">
                <button onClick={sidebarClose} className="w3-bar-item w3-button w3-large"
                style={{marginTop:"5px"}}>close &times; </button>
                {!props.isAuthenticated ? (
                    <span className="btn btn-danger" onClick={redirectHandler}>
                        Signin
                    </span>):props.loading?(spinner):(<ul className="list-group">{importantData}</ul>
                )}
            {props.categories.length===0&& props.isAuthenticated? (
                <span onClick={productViewHandler}>
                <i className="fa fa eye" aria-hidden="true">view</i></span>
            ):null}

            {props.isAuthenticated &&
            props.currId &&
            props.categories.length!==0?(
                <span style={{fontSize:"2ren"}} onClick={categoryNavigator}>

                </span>
            ):null}
            </div>
        </Aux>
    )

}
const mapStateToProps=state=>{
    return{
        loading:state.categories.loading,
        access_token:state.auth.token,
        isAuthenticated:state.auth.token!=null,
        categories:state.categories.categories,
        // loading:state.categories.loading,
        error:state.categories.error,
        currId:state.categories.currId
    };

};

const mapDispatchToProps=(dispatch)=>{
    return{
        onFetchCategories:(token,categoryId)=>dispatch(actions.fetchCategories(token,categoryId))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Category);