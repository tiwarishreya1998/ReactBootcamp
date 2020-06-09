import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import Aux from '../../../hoc/Aux/Aux';
import axios from 'axios';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';
import { updateObject } from '../../../shared/utility';

const AddProduct=props=>{

    const [params,setParams]=useState({
        name:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Name",
            },
        },
        brand:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Brand",
            },
        },
        // categoryId:{
        //     elementType:"input",
        //     elementConfig:{
        //         type:"text",
        //         placeholder:"CategoryId",
        //     },
        // },
        desc:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Description",
            },
        },
        isCancellable:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Enter 0 notcancellable else",
            },
        },
        isReturnable:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Enter 0 if notreturnable else ",
            },
        },
    });

    const[loading,setLoading]=useState(false);
    const {access_token}=props;
    const [categories,setCategories]=useState([]); 
    const[categoryId,setCategoryId]=useState("");
    useEffect(()=>{
        // setLoading(true);
        const headers = {
            Authorization: 'Bearer ' + access_token
        }
        axios.get('http://localhost:8080/seller/profile/categories',{ headers: headers })
        .then(response=>{
            setCategories(response.data);
            console.log(response.data)
            // setLoading(false);
        })
    },[access_token])
    const categoryChangeHandler = (e) => setCategoryId(e.target.value);

    const submitHandler=(event)=>{
        event.preventDefault();

        let query = `?categoryId=${categoryId}&`;
        for (let key in params) {
            if (key !== "name") {
                query = query + "" + key + "=" + params[key].value + "&";
            } else {
                query = query + key + "=" + params[key].value + "&";
            }
        }
        console.log("Query passed is", query)
        
       
        axios({
            method: "POST",
            url: "http://localhost:8080/product/add"+query,
            // data: formData,
            headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
            },
            })
        .then((response)=>{
            setLoading(false);
            props.history.push("/fetchProduct");
            console.log(response.data)
        })
        .catch((error)=>{
            setLoading(false);
            console.log(error);
        });
        };

   
    const formElementsArray=[];
    for(let key in params){
        formElementsArray.push({
            id:key,
            config:params[key],
        });
    };

    let form=formElementsArray.map((formElement)=>(
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            changed={(event) => inputChangedHandler(event, formElement.id)}/>
        ));
    
        const inputChangedHandler=(event,paramName)=>{
            const updatedSchedules=updateObject(params,{
                [paramName]:updateObject(params[paramName],{
                    value:event.target.value
                }),
            });
            setParams(updatedSchedules);
        }

    if(loading){
        form=<Spinner/>
    }
        return(
            <Aux>
                <div className="container">
                    <h1>New Product</h1>
                    <div className="row">
                        <div className="col-md-12 address-info">
                            <h4>fill your Product details:</h4>

                            <form className="row" onSubmit={submitHandler} >
                                <div className="row form-group col-lg-9">
                                    {form}
                                    <select id="categoryId" className="form-control" size="0" onChange={categoryChangeHandler} >
                                        <option value="default">Category</option>
                                            {categories.map(category => (
                                                <option key={category.category.id} value={category.category.id} onChange={categoryChangeHandler}>{category.category.name}</option>
                                            ))}
                                    </select>                
                                </div> 
                                    <div className="col-md-6">
                                    <button type="submit" className="btn btn-info" style={{marginLeft:"auto",marginRight:"auto"}}>Add Product</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Aux>
        )
};
const mapStateToProps=state=>{
    return{
        access_token:state.auth.token
        
    };
};

export default connect(mapStateToProps)(AddProduct);