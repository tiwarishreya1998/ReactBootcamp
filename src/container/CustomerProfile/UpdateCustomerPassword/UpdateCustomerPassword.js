import React, { useState } from "react";
import { updateObject, checkValidity } from "../../../shared/utility";
import Spinner from "../../../component/UI/Spinner/Spinner";
import Input from "../../../component/UI/Input/Input";
import Button from "../../../component/UI/Button/Button";
//import {Link} from 'react-router-dom';
import axios from "axios";
import Aux from "../../../hoc/Aux/Aux";

const UpdateCustomerPassword = React.memo((props) => {
  const [params, setParams] = useState({
    pass: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Enter your new password",
      },
      value: "",
      validation: {
        required: true,
      },
      isValid: false,
      touched: false,
    },
    cPass: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Confirm your new password",
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

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("Param in submit : ", params);
    setLoading(true);
    let query = "?";

    for (let key in params) {
      if (key !== "pass") {
        query = query + "&" + key + "=" + params[key].value;
      } else {
        query = query + key + "=" + params[key].value;
      }
    }

    console.log("Query passed is", query);

      axios({
        method: "PUT",
        url: "http://localhost:8080/customer/profile/updatePassword"+query,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((response) => {
        setLoading(false);
        alert(response.data)
        console.log("Data received is: ", response);
        console.log("Data fetched is", response.data);
      })
      .catch((error) => {
        console.log("Error is", error.response);
        alert(error.response.data);
        setLoading(false);
      });
  };

  const inputChangedHandler = (event, paramName) => {
    const updatedData = updateObject(params, {
      [paramName]: updateObject(params[paramName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, params[paramName].validation),
        touched: true,
      }),
    });
    setParams(updatedData);
  };

  const formElementsArray = [];
  for (let key in params) {
    formElementsArray.push({
      id: key,
      config: params[key],
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

  if (loading) {
    form = <Spinner />;
  }

  return (
    <Aux>
      <div >
        <form onSubmit={submitHandler}>
          <h4>Update Password</h4>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        
      </div>
    </Aux>
  );
});

export default UpdateCustomerPassword;