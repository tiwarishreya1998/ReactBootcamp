//Page where we load signin and sign up page

import React, {useState,useEffect} from 'react';
import Input from '../../../component/UI/Input/Input';
import classes from '../Auth.module.css';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux'
import Spinner from '../../../component/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {updateObject,checkValidity} from '../../../shared/utility';
//import {Link} from 'react-router-dom';

const Login=props=>{

    const [loginForms,setLoginForms]=useState({
            username:{
                elementType:'input',
                elementConfig:
                {
                    type:'email',
                    placeholder:'Mail Address'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
             },
             password:{
                elementType:'input',
                elementConfig:
                {
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
             }
        });
        
    const [isSignup,setIsSignup]=useState(true);

    const{onSetAuthRedirectPath,authRedirectPath}=props;

    useEffect(()=>{

        if(authRedirectPath !== '/'){
            
            onSetAuthRedirectPath();
        }
    },[onSetAuthRedirectPath,authRedirectPath]);

   


    const inputChangedHandler=(event,controlName)=>{
        const updatedControls=updateObject(loginForms,{
            [controlName]:updateObject(loginForms[controlName],{
                value:event.target.value,
                valid:checkValidity(event.target.value,loginForms[controlName].validation),
                touched:true
            })
        });
        setLoginForms(updatedControls)
    };

    const submitHandler=(event)=>{
        event.preventDefault();
        props.onAuth(loginForms)

    };
    const switchAuthModeHandler=()=>{
        setIsSignup(!isSignup);
    };


 
    const forgotHandler=()=>{
        props.history.replace("/forgotPassword")
        
    }

    
        const formElementsArray=[];
        for(let key in loginForms){
                formElementsArray.push({
                  id:key,
                  config:loginForms[key]  
                });
        }
        let form=formElementsArray.map(formElement=>(
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=>inputChangedHandler(event,formElement.id)}/>
                
        ));

        if(props.loading){
            form=<Spinner/>
        }

        let errorMessage=null;
        if(props.error){
            errorMessage=(
                 <p>{props.error.message}</p>
            );
        }


        let authRedirect=null;

        if(props.isAuthenticated){            
            authRedirect=<Redirect to={props.authRedirectPath}/>
            
        }


        return (
          <div className={classes.FormCenter}>
            {authRedirect}
            {errorMessage}
            <h4>Login</h4>
            <form onSubmit={submitHandler} className={classes.FormFields}>
              {form}
                <div className={classes.FormField}>
                    <button className={classes.FormField__Button} onClick={switchAuthModeHandler}>Login</button> 
                    {/* <Link to="/forgotPassword" className={classes.FormField__Link}>Forgot Password ?</Link> */}
                    <button onClick={forgotHandler}>forgot</button>
                    
                </div>
                
            </form>
          </div>
        )
    }

const mapStateToProps=state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token!==null,
        authRedirectPath:state.auth.authRedirectPath
    };
};


const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(loginForms)=>dispatch(actions.auth(loginForms)),
        onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Login);





  
  


