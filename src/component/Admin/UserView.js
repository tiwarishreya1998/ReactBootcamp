import React,{ useState } from "react";
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import axios from "axios";
import classes from "./UserView.module.css";
import {connect} from 'react-redux';
const UserView =(props)=>{

    const count=0;
    const [loading,setLoading]=useState(false);


    const{access_token}=props;
    const activateUserHandler=(id)=>{
        setLoading(true);
        const headers = {
            Authorization: 'Bearer ' + access_token
        }
        console.log("id recieved is : ",id);
        let fetchedData=null;
        if(props.userRole==="seller"){
            fetchedData=axios.patch("http://localhost:8080/admin/activate/seller/"+id,{},{headers:headers})
        }else{
            fetchedData=axios.patch("http://localhost:8080/admin/activate/customer/"+id,{},{headers:headers})
        }
        fetchedData.then(response=>{
            setLoading(false)
            alert(response.data)
            console.log(response)
        }).catch(error=>{
            setLoading(false)
            alert(error.data)
            console.log("Error is",error.data)
        });
    };

    const deactivateUserHandler=(id)=>{
        setLoading(true)
        const headers = {
            Authorization: 'Bearer ' + access_token
        }
        console.log("id recieved is ",id)
        let fetchedData=null;
        if(props.userRole==="seller"){
            fetchedData=axios.patch("http://localhost:8080/admin/deactivate/seller/"+id,{},{headers:headers})
        }
        else{
            fetchedData=axios.patch("http://localhost:8080/admin/deactivate/customer/"+id,{},{headers:headers})
        }
        fetchedData.then(response=>{
            setLoading(false)
            alert(response.data)
            console.log(response)
        }).catch(error=>{
            setLoading(false)
            console.log("Error is",error)
        })
    }

    if(loading){
        return <Spinner />
    }

    return(
        <div className={classes.UserView}>
        <h4>Fetched users</h4>
        <table className="table table-sm" >
            <thead>
                <tr>
                    <th scope="col">S.no</th>
                    <th scope="col">id</th>
                    <th scope="col">FirstName</th>
                    <th scope="col">LastName</th>
                    <th scope="col">Email</th>
                    <th scope="col">Active</th>
                    <th scope="col">Activate</th>
                    <th scope="col">Deactivate</th>
                </tr>
            </thead>
            <tbody>
                {props.fetchedUsers.map((user)=>(
                    <tr key={user.id}>
                        <th scope="row" key={user.id}>{count+1}</th>
                        <td >{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{String(user.active)}</td>
                        <td><Button clicked ={(id)=>activateUserHandler(user.id)} btnType="Success">Activate</Button></td>
                        <td><Button clicked ={(id)=>deactivateUserHandler(user.id)} btnType="Danger">Deactivate</Button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
        // <section className={classes.UserView}>
        //     <h4>Fetched users</h4>
        //     <table>
        //         <thead>
        //             <tr>
        //                 <th>S.no</th>
        //                 <th>id</th>
        //                 <th>FirstName</th>
        //                 <th>LastName</th>
        //                 <th>Email</th>
        //                 <th>Active</th>
        //                 <th>Activate</th>
        //                 <th>Deactivate</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {props.fetchedUsers.map((user)=>(
        //                 <tr key={user.id}>
        //                     <td key={user.id}>{count+1}</td>
        //                     <td>{user.id}</td>
        //                     <td>{user.firstName}</td>
        //                     <td>{user.lastName}</td>
        //                     <td>{user.email}</td>
        //                     <td>{String(user.active)}</td>
        //                     <td><Button clicked ={(id)=>activateUserHandler(user.id)} btnType="Success">Activate</Button></td>
        //                     <td><Button clicked ={(id)=>deactivateUserHandler(user.id)} btnType="Danger">Deactivate</Button></td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        // </section>
    );
};
const mapStateToProps=state=>{
    return{
        access_token:state.auth.token

    }
}
export default connect(mapStateToProps)(UserView);