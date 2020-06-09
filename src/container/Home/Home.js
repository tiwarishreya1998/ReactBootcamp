import React from "react";
import Aux from '../../hoc/Aux/Aux';
import classes from "./Home.module.css";
import Category from "../Category/Category";
//import HomePage from '../../component/HomePagePic/HomePagePic';
import accessories from '../../assests/HomePagePics/accessories.jpeg';
import suitcase from '../../assests/HomePagePics/suitcase.jpeg';
import { connect } from 'react-redux'
const Home = props => {

  return (
    <Aux>
      <div className={classes.Category}> {props.isAuthenticated && localStorage.getItem('role') === 'Customer' ? <div ><Category /></div> : null}</div>
      <div className={classes.Container}>
        }
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
      <div className="card-row">
      <div className="card" style={{width:"1000px",position:"relative",paddingLeft:"auto",margin:"50px",marginLeft:"150px"}}>
        <img className="card-img-top" src={accessories} alt="Card image"  style={{width:"100%",display:"flex"}}/>
        
        <div className="card-body">
          <h4 className="card-title">Buy accessories</h4>
          <p className="card-text">Discount upto 50% on appearels</p>
         
        </div>
      </div>
      <div className="card" style={{width:"600px"}}>
      <div className="card-body">
          <h4 className="card-title">Vip Suitcase</h4>
          <p className="card-text">Discount upto 20%-50% </p>
         
        </div>
        <img className="card-img-top" src={suitcase} alt="Card image"  style={{width:"100%"}}/>
        
        
      </div>
      {/* <div className="card" style={{width:"600px"}}>
        <img className="card-img-top" src={accessories} alt="Card image"  style={{width:"100%"}}/>
        
        <div className="card-body">
          <h4 className="card-title">John Doe</h4>
          <p className="card-text">Some example text some example text. John Doe is an architect and engineer</p>
         
        </div>
      </div> */}
      </div>



    </Aux>
  );
}

const mapStatesToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,

  };
};

export default connect(mapStatesToProps)(Home);

// styles={{backgroundImage:`url("../../assests/HomePagePics/homePage.jpeg") center/cover no-repeat`}}