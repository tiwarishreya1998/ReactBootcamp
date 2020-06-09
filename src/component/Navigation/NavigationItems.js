import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Category from '../../container/Category/Category';
const navigationItems =(props)=>(
    <ul  className={classes.NavigationItems}>
        <NavigationItem link="/" active>HOME</NavigationItem>
        {props.isAuthenticated && localStorage.getItem('role')==='Admin' ? <NavigationItem link="/admin" active>Users</NavigationItem>:null }      
        {props.isAuthenticated && localStorage.getItem('role')==='Admin' ?<NavigationItem link="/category" active>Category</NavigationItem>:null} 
        {props.isAuthenticated && localStorage.getItem('role')==='Customer'? <NavigationItem link="/profile">Profile</NavigationItem> :null  }
        {props.isAuthenticated && localStorage.getItem('role')==='Seller' ? <NavigationItem link="/sellerProfile" active>Profile</NavigationItem>:null}
        {props.isAuthenticated && localStorage.getItem('role')==='Admin' ? <NavigationItem link="/metaData" active>Metadata</NavigationItem>:null}
        {props.isAuthenticated && localStorage.getItem('role')==='Seller' ? <NavigationItem link="/addProduct" active>Add Product</NavigationItem>:null}
        {props.isAuthenticated && localStorage.getItem('role')==='Seller' ? <NavigationItem link="/updateProduct" active>UpdateProduct</NavigationItem>:null}
        {props.isAuthenticated && localStorage.getItem('role')==='Seller' ? <NavigationItem link="/fetchProduct" active>Fetch Product</NavigationItem>:null}
        {props.isAuthenticated && localStorage.getItem('role')==='Admin' ? <NavigationItem link="/viewProduct" active>Product</NavigationItem>:null}
        {!props.isAuthenticated ? ( <NavigationItem link="/auth">Auth</NavigationItem> ):(<NavigationItem link="/logout">Logout</NavigationItem> )}
        {/* {props.isAuthenticated && localStorage.getItem('role') === 'Customer' ? <NavigationItem link="/categoryCustomer">Category </NavigationItem> : null} */}
    </ul>

);

export default navigationItems;


