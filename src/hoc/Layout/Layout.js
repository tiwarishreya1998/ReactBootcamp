import React,{useState}from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'; 
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux';

const Layout=props=> {
  // state={
  //    showSideDrawer:false
  // }
  const [sideDrawerIsVisible,setSideDrawerIsVisible]=useState(false);

  const sideDrawerClosedHandler=()=>{
    setSideDrawerIsVisible(false);

  }
  const sideDrawerToggleHandler=()=>{
    setSideDrawerIsVisible(!sideDrawerIsVisible);
    // this.setState((prevState)=>{
    //   return{showSideDrawer: !prevState.showSideDrawer};
    // });

  }


  
    return(
    <Aux>
      <Toolbar
          isAuth={props.isAuthenticated}
          drawerToggleClicked={sideDrawerToggleHandler}/>
      <SideDrawer
          isAuth={props.isAuthenticated}
          open={sideDrawerIsVisible} 
          closed={sideDrawerClosedHandler}/>
      <main className={classes.Content}>
        {props.children}  
      </main>
      </Aux>
      )
  }

    
const mapStatesToProps=state=>{
  return{
    isAuthenticated:state.auth.token!==null
  };
};

export default connect(mapStatesToProps)(Layout);