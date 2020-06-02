import React, { useState ,useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Aux from '../../../../hoc/Aux/Aux';
import Button from '../../../../component/UI/Button/Button';
//import UpdateAddress from '../UpdateAddress/UpdateAddress';

const FetchAddress=props=>{

    const[addresses,setAddresses]=useState([]);
    // const [id,setId]=useState("");
    // const [country,setCountry] = useState("");     
    // const [city,setCity] = useState("");     
    // const [state,setState] = useState(""); 
    // const [zipcode,setZipcode]=useState("");
    // const [address,setAddress]=useState("");
    // const [label,setLabel]=useState("");

    const {access_token}=props;
    console.log(access_token)


        useEffect(()=>{
            console.log(access_token)
            const headers = {
                Authorization: 'Bearer' + access_token
                }
                axios.get('http://localhost:8080/customer/profile/addresses',{ headers: headers })
                .then(response => {
                console.log(response.data);
                setAddresses(response.data); 
                })
                .catch(error => {
                console.log(error.response.data);
                });
                },[access_token]);



    const deleteAddressHandler=(id)=>{
        const headers = {
            Authorization: 'Bearer' + access_token
        }
        axios.delete('http://localhost:8080/customer/profile/address/'+id,{ headers: headers })
        .then(response=>{
            console.log(response);
        }).catch(error=>{
            console.log(error.response.data);
        });

    };

    // const idChangeHandler = (e) => {setId(e.target.value)     }  
    // const countryChangeHandler = (e) => {setCountry(e.target.value)     }      
    // const stateChangeHandler = (e) => {setState(e.target.value)     }      
    // const cityChangeHandler = (e) => {setCity(e.target.value) }
    // const zipcodeChangeHandler = (e) => {setZipcode(e.target.value) }
    // const addressChangeHandler = (e) => {setAddress(e.target.value) }
    // const labelChangeHandler = (e) => {setLabel(e.target.value) }


    const updateAddressHandler=()=>{
        props.history.push('/updateAddress');
    }
    return(
        
        <Aux>
        <h4>Fetched Address</h4>
        <Button btnType="Success" clicked={()=>updateAddressHandler()}>Update Address</Button>
        <div className="row" >
            
            <div className="col mb-3" style={{width:"20%"}}>
                <div className="card">
                    <div className="card-body" style={{marginRight:"-20%"}}></div>

                        <table className="table table-hover table-responsive-sm" style={{width:"70%",marginLeft:"5%"}} >
                                <thead className="thead-dark">
                                <tr>
                                    <th scope='col'>id</th>
                                    <th scope='col'>country</th>
                                    <th scope='col'>state</th>
                                    <th scope='col'>city</th>
                                    <th scope='col'>zipCode</th>
                                    <th scope='col'>address</th>
                                    <th scope='col'>label</th>
                                    <th scope='col'>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {addresses.map((address,index)=>(
                                        <tr key={address.id}>
                                            <th scope="row">{address.id}</th>
                                            <td>{address.country}</td>
                                            <td>{address.state}</td>
                                            <td>{address.city}</td>
                                            <td>{address.zipCode}</td>
                                            <td>{address.address}</td>
                                            <td>{address.label}</td>
                                            <td><Button btnType="Success" clicked={(id)=>deleteAddressHandler(address.id)}> Delete</Button></td>
                                            <td></td>
                                        </tr>
                                    ))}
                                </tbody>
                            
                        </table>
                    </div>
                </div>
            </div>
        </Aux>
    )}

    const mapStateToProps=state=>{
        return{
           
            access_token:state.auth.token

        };
    };
export default connect(mapStateToProps)(FetchAddress);
