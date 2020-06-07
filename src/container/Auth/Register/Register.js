import React,{useState} from 'react';
import classes from '../Auth.module.css';
import Input from '../../../component/UI/Input/Input';
import Spinner from '../../../component/UI/Spinner/Spinner';
import axios from 'axios';
import {updateObject,checkValidity} from '../../../shared/utility';
import {Link} from 'react-router-dom';
//import SellerRegister from '../SellerRegister/SellerRegister';
import Button from '../../../component/UI/Button/Button';
const Register =(props)=>{

    const [register,setRegister]=useState({
        firstName: {
            elementType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Enter your FirstName",
            },
            value: "",
            validation: {
              required: true,
            },
            isValid: false,
            touched: false,
          },
          middleName: {
            elementType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Enter your MiddleName",
            },
            value: "",
            validation: {
              required: true,
            },
            isValid: false,
            touched: false,
          },
          lastName: {
            elementType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Enter your LastName",
            },
            value: "",
            validation: {
              required: true,
            },
            isValid: false,
            touched: false,
          },
          email: {
            elementType: "input",
            elementConfig: {
              type: "email",
              placeholder: "Enter your E-mail",
            },
            value: "",
            validation: {
              required: true,
              isEmail: true,
            },
            isValid: false,
            touched: false,
          },
          password: {
            elementType: "input",
            elementConfig: {
              type: "password",
              placeholder: "Enter your Password",
            },
            value: "",
            validation: {
              required: true,
              // minLength: 8,
              // maxLength: 15,
            },
            isValid: false,
            touched: false,
          },
          confirmPassword: {
            elementType: "input",
            elementConfig: {
              type: "password",
              placeholder: "Enter your Confirm Password",
            },
            value: "",
            validation: {
              required: true,
              // minLength: 8,
              // maxLength: 15,
            },
            isValid: false,
            touched: false,
          },
          contact: {
            elementType: "input",
            elementConfig: {
              type: "text",
              placeholder: "Enter your Mobile number",
            },
            value: "",
            validation: {
              required: true,
            },
            isValid: false,
            touched: false,
          },
    });

    const [loading, setLoading]=useState(false);

    const formElementsArray = [];
    for (let key in register) {
      formElementsArray.push({
        id: key,
        config: register[key],
      });
    };

    const inputChangedHandler = (event, registerData) => {
        const updatedSchedules = updateObject(register, {
          [registerData]: updateObject(register[registerData], {
            value: event.target.value,
            valid: checkValidity(
              event.target.value,
              register[registerData].validation
            ),
            touched: true,
          }),
        });
        setRegister(updatedSchedules);
    };
    console.log("this is passs",register.password.value);
    console.log("this is con passs",register.confirmPassword.value);

    const sellerHandler=()=>{
      props.history.push('/sellerRegister')
    }

    const submitHandler=(event)=>{
        event.preventDefault();
        setLoading(true);
        const registerData={};
        for (let key in register) {
            registerData[key] = register[key].value;
          }
        console.log(registerData)
        let responseData=null;
        responseData=axios.post("http://localhost:8080/register/customer",registerData);
        responseData.then((response)=>{
            setLoading(false);
            alert(response.data)
        })
        .catch((error)=>{
            setLoading(false);
            console.log(error);
        });

    };

    

    let form = formElementsArray.map((formElement) => (
        <Input
          className={classes.FormField}
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => inputChangedHandler(event, formElement.id)}
        />
      ));

      if (loading) {
        form = <Spinner />;
    }

    return(
      <div className={classes.FormCenter}>
        <div className={classes.RegisterData}>
      <h1><i className="fa fa-user-plus">Customer Registration</i></h1>
            <form onSubmit={submitHandler} className={classes.FormFields}>              
                  {form}  
                <div className={classes.FormField}>
                  <button 
                  className={classes.FormField__Button}>Sign Up As Customer</button> 
                  <Link to="/sign-in" className={classes.FormField__Link}> I'm already member</Link>
                </div>            
            </form>
            <Button btnType="Success" clicked={sellerHandler}>Register as seller?</Button>
        </div>
        </div>
    );

};
export default Register;