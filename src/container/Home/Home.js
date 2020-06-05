import React from "react";
import Aux from '../../hoc/Aux/Aux';
import classes from "./Home.module.css";
import Category from "../Category/Category";
//import HomePage from '../../component/HomePagePic/HomePagePic';
//import homePic from '../../assests/HomePagePics/homePage.jpeg';
import {connect} from 'react-redux'
const Home =props=>{
  
    return (
      <Aux>
        {props.isAuthenticated && localStorage.getItem('role')==='Customer' ?<div><Category/></div>:null}
        <div className={classes.Container}>
            {/* <h1>Welcome and Enjoy</h1>
            <input 
              type="text"
              className={classes.Search}
              placeholder="SEARCH"
            /> */}
        </div> 
        
        <div className={classes.Text}>  
            <h1>Welcome and Enjoy</h1>
            <input 
              type="text"
              // className={classes.Search}
              placeholder="SEARCH" 
            /><i className="fa fa-search"></i>
        </div> 
        
        
       
      </Aux>
    );
  }

const mapStatesToProps=state=>{
  return{
    isAuthenticated:state.auth.token!==null,
    
  };
};

export default connect(mapStatesToProps)(Home);

// styles={{backgroundImage:`url("../../assests/HomePagePics/homePage.jpeg") center/cover no-repeat`}}