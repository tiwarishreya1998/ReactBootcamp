import React from 'react';
import Backdrop from '../UI/Backdrop/Backdrop';
import Aux from '../../hoc/Aux/Aux';
import Logo from '../Logo/Logo';
import classes from './SideDrawer.module.css';
import NavigationItems from '../Navigation/NavigationItems';

const sideDrawer=(props)=>{
    let attachedClasses=[classes.SideDrawer,classes.Close];
    if(props.open){
        attachedClasses=[classes.SideDrawer,classes.Open]
    }
    return(
        <Aux>
            <Backdrop clicked={props.closed} show={props.open}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;