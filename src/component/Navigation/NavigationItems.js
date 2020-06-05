import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems =(props)=>(
    <ul  className={classes.NavigationItems}>
        <NavigationItem link="/" active>HOME</NavigationItem>
        {props.isAuthenticated && localStorage.getItem('role')==='Admin' ? <NavigationItem link="/admin" active>Users</NavigationItem>:null }      
        {props.isAuthenticated && localStorage.getItem('role')==='Admin' ?<NavigationItem link="/category" active>Category</NavigationItem>:null} 
        {props.isAuthenticated && localStorage.getItem('role')==='Customer'? <NavigationItem link="/profile">Profile</NavigationItem> :null  }
        {!props.isAuthenticated ? ( <NavigationItem link="/auth">Auth</NavigationItem> ):(<NavigationItem link="/logout">Logout</NavigationItem> )}
        
    </ul>

);

export default navigationItems;


