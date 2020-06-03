import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems =(props)=>(
    <ul  className={classes.NavigationItems}>
        <NavigationItem link="/" active>HOME</NavigationItem>
        <NavigationItem link="/admin" active>Users</NavigationItem>      
        
        {props.isAuthenticated?
        <NavigationItem link="/profile">Profile</NavigationItem>
        :null
        }
        {!props.isAuthenticated ? (
            <NavigationItem link="/auth">Auth</NavigationItem>
        ):(
            <NavigationItem link="/logout">Logout</NavigationItem>
            
        )}
        
    </ul>

);

export default navigationItems;


