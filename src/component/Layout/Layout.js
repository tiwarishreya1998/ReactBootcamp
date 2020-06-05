import React,{useState} from 'react'; 
import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../SideDrawer/SideDrawer';
import {connect} from 'react-redux';

const Layout =(props)=>{

    const [sideDrawerIsVisible,setSideDrawerIsVisible]=useState(false);

    const sideDrawerClosedHandler=()=>{
        setSideDrawerIsVisible(false);
    };

    const drawerToggleHandler=()=>{
        setSideDrawerIsVisible(!sideDrawerIsVisible);

    };

return(
<Aux>
    <Toolbar 
        isRole={props.isRole}
        isAuth={props.isAuthenticated}
        drawerToggleClicked={drawerToggleHandler}/>
    <SideDrawer
        isRole={props.isRole}
        open={sideDrawerIsVisible} 
        closed={sideDrawerClosedHandler}
        isAuth={props.isAuthenticated}/>
    
    <main className={classes.Content}>
        {props.children}
    </main>
</Aux>
)};
const mapStatesToProps=state=>{
    return{
      isAuthenticated:state.auth.token!==null,
      isRole:state.auth.role
    };
  };
  
export default connect(mapStatesToProps)(Layout);