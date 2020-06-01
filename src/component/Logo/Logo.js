import React from 'react';
import mylogo from '../../assests/mylogo.png';
import classes from './Logo.module.css';

const logo =(props)=>(
    <div className={classes.Logo}style={{height:props.height}}>
        <img src={mylogo} alt="MyShopping"/>
    </div>
);
export default logo;