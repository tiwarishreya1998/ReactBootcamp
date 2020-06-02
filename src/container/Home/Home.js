import React, { Component } from "react";
import Aux from '../../hoc/Aux/Aux';
import classes from "./Home.module.css";
import Category from "../Category/Category";
//import HomePage from '../../component/HomePagePic/HomePagePic';
//import homePic from '../../assests/HomePagePics/homePage.jpeg';

class Home extends Component {
  render() {
    return (
      <Aux>
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
        <div><Category/></div>
       
      </Aux>
    );
  }
}

export default Home;

// styles={{backgroundImage:`url("../../assests/HomePagePics/homePage.jpeg") center/cover no-repeat`}}