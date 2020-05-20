import React from 'react';
import classes from './Modal.module.css'
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const Modal=props=>{

    // shouldComponentUpdate(nextProps,nextState){
    //    return nextProps.show!==this.props.show||nextProps.children!==this.props.children;
    // }

    
    
        return(
            <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
                <div className={classes.Modal}
                style={{
                transform:props.show?'translateY(0)':'translateY(-100vh)',//viewport heigh to slide it outside of the screen
                opacity:props.show ? '1':'0' }}>
                {props.children}

            </div>
            </Aux>

        );
    }


export default React.memo(Modal,
    (prevProps,nextProps)=>
    nextProps.show===prevProps.show&&
    nextProps.children===prevProps.children);