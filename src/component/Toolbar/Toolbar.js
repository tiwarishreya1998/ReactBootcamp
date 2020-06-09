
import React from 'react';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems';
import {connect} from 'react-redux';
import Category from '../../container/Category/Category';
const toolbar=(props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <Logo height="80%"/>       
        {/* <div className={classes.Category}> 
        {localStorage.getItem('role') === 'Customer' ? <div ><Category /></div> : null}</div> */}
 
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} isRole={props.isRole}/>
        </nav>
    </header>
);

export default toolbar;