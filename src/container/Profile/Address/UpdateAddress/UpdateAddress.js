 import React,{useState} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Spinner from '../../../../component/UI/Spinner/Spinner';
import Button from '../../../../component/UI/Button/Button';


  
const UpdateAddress=props=>{

    const[id,setId]=useState("");
    const[country,setCountry]=useState("");
    const[state,setState]=useState("");
    const[city,setCity]=useState("");
    const[zipCode,setZipCode]=useState("");
    const[address,setAddress]=useState("");
    const[label,setLabel]=useState("");
    

    const[loading,setLoading]=useState(false);
    const {access_token}=props;


    const newAddressHanlder=()=>{
        props.history.push('/newAddress')
    }


    const submitHandler=(event)=>{
        event.preventDefault();
        const postData={
            "id":id,
            "country":country,
            "state":state,
            "city":city,            
            "zipCode":zipCode,
            "label":label,
            "address":address
        }
        const headers={
            Authorization:'Bearer '+access_token
        }
        axios.put('http://localhost:8080/customer/profile/updateAddress/'+id,postData,{headers:headers})
        .then(response=>{
            setLoading(false)
            alert(response.data);
            console.log(response.data)
        })
        .catch(error=>{
            setLoading(false);
            console.log(error.response.data)
        })

    }

    
    const idChangeHandler=(event)=>setId(event.target.value);
    const countryChangeHandler=(event)=>setCountry(event.target.value);
    const stateChangeHandler=(event)=>setState(event.target.value);
    const cityChangeHandler=(event)=>setCity(event.target.value);
    const zipCodeChangeHandler=(event)=>setZipCode(event.target.value);
    const addressChangeHandler=(event)=>setAddress(event.target.value);
    const labelChangeHandler=(event)=>setLabel(event.target.value);
    
        if(loading){
            return <Spinner/>
        }

    return(
        <div className="container">
                    <h1>UpdateAddress</h1>
        <form className="row" onSubmit={submitHandler} >
           
            <div className="form-group col-md-3">
                <label className=" control-label">Id</label>
            </div>
            <div className="col-lg-9">
                <input className="form-control " type="text" value={address.id} onChange={idChangeHandler}/>
            </div>  
            <div className="form-group col-md-3">
                <label className=" control-label">Country</label>
            </div>
            <div className="col-lg-9">
                <input className="form-control " type="text" value={address.country} onChange={countryChangeHandler}/>
            </div>
            <div className="form-group col-md-3">
                <label className=" control-label">State</label>
            </div>  
                <div className="col-lg-9">
                <input className="form-control " type="text" value={address.state} onChange={stateChangeHandler}/>
                </div>
                <div className="form-group col-md-3">
                <label className=" control-label">City</label>
            </div>
                <div className="col-lg-9">
                <input className="form-control " type="text" value={address.city} onChange={cityChangeHandler}/>
                </div>
                <div className="form-group col-md-3">
                <label className=" control-label">zipCode</label>
            </div>
                <div className="col-lg-9">
                <input className="form-control " type="text" value={address.zipCode} onChange={zipCodeChangeHandler}/>
                </div>
                <div className="form-group col-md-3">
                <label className=" control-label">Address</label>
            </div>
                <div className="col-lg-9">
                <input  className="form-control " type="text" value={address.address} onChange={addressChangeHandler}/>
                </div>
                <div className="form-group col-md-3">
                <label className=" control-label">Label</label>
            </div>
                <div className="col-lg-9">
                <input className="form-control " type="text" value={address.label} onChange={labelChangeHandler}/>
                </div>
                          
        
                               
                                
            <div className="form-group col-md-3">
                <label className=" control-label"></label>
            </div>
            <div className="col-md-6">
                <button type="edit" className="btn btn-info">Update Profile</button>
            </div>
            
        </form>
        <Button btnType="Success" clicked={()=>newAddressHanlder()}>Add new Address</Button>
        </div>
    )
};

const mapStateToProps=state=>{
    return{
        access_token:state.auth.token
        
    };
};

export default connect(mapStateToProps)(UpdateAddress);