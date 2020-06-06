import React,{useState} from 'react';
import Aux from '../../hoc/Aux/Aux';
import {updateObject,checkValidity} from '../../shared/utility';
import Input from '../../component/UI/Input/Input';
import Spinner from '../../component/UI/Spinner/Spinner';
import UserView from '../../component/Admin/UserView';
import axios from 'axios';
import Button from '../../component/UI/Button/Button';
import classes from './Admin.module.css';
import {connect} from 'react-redux';
const Admin=React.memo((props)=>{
    const [params,setParams]=useState({
        role:{
            elementType:"select",
            elementConfig:{
                options:[
                    {value:"none",displayValue:"Select User type"},
                    {value:"seller",displayValue:"Seller"},
                    {value:"customer",displayValue:"Customer"}
                ]
            },
            validation:{},
            value:"none",
            isValid:true
        },
        SortBy:{
            elementType:"select",
            elementConfig:{
                options:[
                    {value:"none",displayValue:"SELECT SORT BY"},
                    {value:"id",displayValue:"id"},
                ],
            },
            validation:{},
            value:"none",
            isValid:true
        },
        page:{
            elementType:"input",
            elementConfig:{
                type:"number",
                placeholder:"Enter page Number",
            },
            value:"",
            validation:{
                required:true,
            },
            isValid:false,
            touched:false,
        },
        size: {
            elementType: "input",
            elementConfig: {
              type: "number",
              placeholder: "Enter Size",
            },
            value: "",
            validation: {
              required: true,
            },
            isValid: false,
            touched: false,
          },

    });
    const{access_token}=props;
    const [loading,setLoading]=useState(false);
    const [users,setUsers]=useState([]);

    const submitHandler = (event) => {
        event.preventDefault();
        console.log("Param in submit : ", params);
        setLoading(true)
        let result = null;
        const headers = {
            Authorization: 'Bearer ' + access_token
        }
        const paramData = {};
    
        let query = "?";
        for (let key in params) {
          if (key !== "role") {
            if (key !== "SortBy") {
              query = query + "&" + key + "=" + params[key].value;
            } else {
              query = query + key + "=" + params[key].value;
            }
          }
        }
    
        console.log("Query passed is",query)
    
        for (let key in params) {
          paramData[key] = params[key].value;
        }
    
        console.log("Role is",paramData.role)
    
        let fetchedData = null;    
        if (paramData.role === "seller") {
            fetchedData = axios.get("http://localhost:8080/admin/seller"+query,{headers:headers})
            setLoading(false)
        } else {
            fetchedData = axios.get("http://localhost:8080/admin/customer"+query,{headers:headers})
            setLoading(false)
        }
    
        fetchedData.then(response => {
            result = response.data
            setUsers(result)
            console.log("Data received is: ",response)
            console.log("Data fetched is",response.data)
        }).catch(error => {
            console.log("Error is",error)
        })
      };




    const formElementsArray=[];
    for(let key in params){
        formElementsArray.push({
            id:key,
            config:params[key],
        });
    };


    const inputChangedHandler=(event,paramName)=>{
        const updatedSchedules = updateObject(params, {
            [paramName]: updateObject(params[paramName], {
              value: event.target.value,
              valid: checkValidity(event.target.value, params[paramName].validation),
              touched: true,
            }),
          });
          setParams(updatedSchedules);
    }

    const showList=(l)=>{
        if(l>0){
            return <UserView fetchedUsers={users} userRole={params.role.value}/>;
        };
    };


    let form=formElementsArray.map((formElement)=>(
        <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => inputChangedHandler(event, formElement.id)}/>
    ));

    if(loading){
        form=<Spinner/>;
    }
    return(
        <Aux>
            <div className={classes.AdminData}> 
                <form onSubmit={submitHandler}>
                    <h4>ENTER USER TYPE</h4>
                    {form}
                    <Button btnType="Success">GetUsers</Button>
                </form>
            </div>
            <div>
                <section>{showList(users.length)}</section>
            </div>
        </Aux>
    );
})

const mapStateToProps=state=>{
    return{
        access_token:state.auth.token

    }
}
export default connect(mapStateToProps)(Admin);