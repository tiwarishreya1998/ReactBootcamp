import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import axios from 'axios';


const Profile=props=>{
    const [firstName,setFirstName] = useState("");     
    const [lastName,setLastName] = useState("");     
    const [companyContact,setCompanyContact] = useState("");
    const [gst,setGst]=useState("");
    const [companyName,setCompanyName]=useState("");
    const [address,setAddress]=useState([])
    const [id,setId]=useState("");
    const { access_token } = props;

    useEffect(()=>{
        console.log(access_token)
        const headers = {
            Authorization: 'Bearer ' + access_token
            }
            axios.get('http://localhost:8080/seller/profile',{ headers: headers })
            .then(response => {
            console.log(response.data);
            setId(response.data.id);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setCompanyContact(response.data.companyContact);  
            setGst(response.data.gst);
            setCompanyName(response.data.companyName)
            setAddress(response.data.address);
            })
            .catch(error => {
            console.log(error.response.data.error);
            });
            },[access_token]);


        
        


            return(
                <div className="container" style={{widht:"50%",border:"2px solid black",padding:"auto",margin:"auto"}}>
                
                <h3>Personal info</h3>

                            <form className="row"  >
                                <div className="form-group col-lg-3">
                                    <label className=" control-label">First name:</label></div>
                                    <div>
                                        <h2>{firstName}</h2>
                                    </div>
                                <br/>
                                <div className="form-group col-lg-3 ">
                                    <label className="control-label">Last name:</label></div>
                                    <div>
                                        <h4>{lastName}</h4>
                                    </div>
                                
                                    <br/>
                                <div className="form-group col-lg-3">
                                    <label className=" control-label"> company Contact Number:</label></div>
                                    <div>
                                        <h4>{companyContact} </h4>                                  
                                </div>
                                <br/>
                                <div className="form-group col-lg-3">
                                    <label className=" control-label"> gst Number:</label></div>
                                    <div>
                                        <h4>{gst} </h4>                                   
                                </div>
                                <br/>
                                <div className="form-group col-lg-3">
                                    <label className=" control-label"> company name:</label></div>
                                    <div>
                                        <h4>{companyName} </h4>                                  
                                </div>
                                <br/>
                                <div className="form-group col-lg-3">
                                    <label className=" control-label"> country</label></div>
                                    <div>
                                        <h4>{address.country} </h4>                                   
                                </div>
                                <br/>
                                <div className="form-group col-lg-3">
                                    <label className=" control-label"> city</label></div>
                                    <div><h4>{address.city}</h4>
                                     
                                    
                                </div>
                                <br/>
                                <div className="form-group col-lg-3">
                                    <label className=" control-label"> state</label></div>
                                    <div><h4>{address.state}</h4>
                                   
                                </div>
                                <br/>
                                <div className="form-group col-lg-3">
                                    <label className=" control-label"> zipcode</label></div>
                                    <div >
                                        <h4>{address.zipcode}</h4>
                                       
                                    
                                </div>
                                <br/>
                                <div className="form-group col-lg-3">
                                    <label className=" control-label"> address</label></div>
                                    <div><h4>{address.address}</h4>
                                        
                                    
                                </div>
                                <br/>                                                        
                                <div className="form-group col-md-3">
                                    <label className=" control-label"></label>
                                    </div>
                                    <div className="col-md-6">
                                    
                                    {/* <Link to="/updateProfile">Edit profile</Link> */}
                                    <i className="fa fa-edit"></i>
                                    
                                    <div>
                                    {/* <Link to="/fetchAddress">View Address</Link> */}
                                    </div>
                                </div>
                            </form>

                            </div>





                // <div>
                //     <h4>Fetched Product</h4>
                //     <div className="row" >
                //         <div className="col mb-3" >
                //             <div className="card-body" ></div>
                //             <center> <table className="table table-hover table-responsive-sm" style={{ width: "auto" }} >
                //                 <thead className="thead-dark">
                //                     <tr>
                //                         <th scope='col'>id</th>
                //                         <th scope='col'>firstname</th>
                //                         <th scope='col'>lastName</th>
                //                         <th scope='col'>companycontact</th>
                //                         <th scope='col'>gst</th>
                //                         <th scope='col'>company name</th>
                //                         <th scope='col'>country</th>
                //                         <th scope='col'>city</th>
                //                         <th scope='col'>state</th>
                //                         <th scope='col'>zipcode</th>
                //                         <th scope='col'>address</th>
                //                         <th scope='col'>#</th>
                //                     </tr>
                //                 </thead>
                //                 <tbody>

                //                         <tr key={id}>
                //                             <th scope="row">{id}</th>
                //                             <td>{firstName}</td>
                //                             <td>{lastName}</td>
                //                             <td>{companyContact}</td>
                //                             <td>{gst}</td>
                //                             <td>{companyName}</td>
                //                             {address.map(address=>(
                //                             <td>{address.country}</td>
                //                             <td>{address.city}</td>
                //                             <td>{address.state}</td>
                //                             <td>{address.zipcode}</td>
                //                             <td>{address.address}</td>))}
                                            
                //                         </tr>
                     
                //                 </tbody>
                //             </table>
                //             </center>
                //             <Button btnType="Success"
                //             clicked={() => updateProductHandler()}>
                //             Update Product</Button>
                //         </div>
                //     </div>
                // </div>
            )
}
const mapStateToProps = state => {
    return {
        access_token: state.auth.token
    }
}
export default connect(mapStateToProps)(Profile);