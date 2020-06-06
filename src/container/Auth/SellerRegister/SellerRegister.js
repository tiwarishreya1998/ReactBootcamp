import React, { useState } from 'react';
import classes from '../Auth.module.css';
import { updateObject, checkValidity } from '../../../shared/utility';
import Input from '../../../component/UI/Input/Input';
import Spinner from '../../../component/UI/Spinner/Spinner';
// import axios from "axios";
// import Button from '../../../component/UI/Button/Button';
import SellerAddress from './SellerAddress';
const SellerRegister = (props) => {
  const [signup, setSignup] = useState({
    // signupAs: {
    //   elementType: "select",
    //   elementConfig: {
    //     options: [
    //       { value: "none", displayValue: "Select Role" },
    //       { value: "cust", displayValue: "Customer" },
    //       { value: "sell", displayValue: "Seller" },
    //       {value:"adm",diaplayValue: "Admin"}
    //     ],
    //   },
    //   validation: {},
    //   value: "none",
    //   isValid: true,
    // },
    firstName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your First Name",
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
        placeholder: "Enter your Middle Name",
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
        placeholder: "Enter your Last Name",
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
        placeholder: "Enter email id",
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
        minLength: 8,
        maxLength: 15,
      },
      isValid: false,
      touched: false,
    },
    confirmPassword: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "confirm Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 8,
        maxLength: 15,
      },
      isValid: false,
      touched: false,
    },
    companyName: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your Company Name",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
    companyContact: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Enter your Company Contact number",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    gst: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your gst Number",
        },
        value: "",
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },

  });


  
  const [loading, setLoading] = useState(false);

  const inputChangedHandler = (event, registerData) => {
    const updatedSchedules = updateObject(signup, {
      [registerData]: updateObject(signup[registerData], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          signup[registerData].validation
        ),
        touched: true,
      }),
    });
    setSignup(updatedSchedules);
  };

  const formElementsArray = [];
  for (let key in signup) {
    formElementsArray.push({
      id: key,
      config: signup[key],
    });
  }

  let form = formElementsArray.map((formElement) => (
    <Input
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

  const [mydata,setMyData]=useState("");
  const [dataAdded,setDataAdded]=useState(false)
  const submitHandler=(event)=>{
    event.preventDefault();
    setLoading(true);
    const registerData={};
    for (let key in signup) {
        registerData[key] = signup[key].value;
      }
    console.log(registerData)
    localStorage.setItem("registerData",registerData);
    setMyData(registerData);

    setDataAdded(true);
    let responseData=null;

    // responseData=axios.post("http://localhost:8080/register/seller",registerData);
    // responseData.then((response)=>{
    //     setLoading(false);
    //     alert(response.data)
    // })
    // .catch((error)=>{
    //     setLoading(false);
    //     console.log(error);
    // });


};

 if(dataAdded){
   return <SellerAddress pastData={mydata}/>
 }

  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.RegisterData}>
      <h1><i className="fa fa-user-plus">  Seller Registration</i></h1>
      <p>Please fill in all the required fields to create a new account.</p>
      <form onSubmit={submitHandler}>
        {form}
        <button type="submit" data-toggle="modal" data-target="#myModal">Signup</button>
      </form>
    </div>
  );
};

export default SellerRegister;