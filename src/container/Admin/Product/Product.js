import React, {  useState } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Button from '../../../component/UI/Button/Button';
const ViewProduct=props=>{
    const[id,setId]=useState("");
    const {access_token}=props;
    // useEffect(()=>{
    //     const headers = {
    //         Authorization: 'Bearer ' + access_token
    //     }
    //     axios.get('http://localhost:8080/product/admin/all',{ headers: headers })
    //     .then(response=>{
    //         // setCategories(response.data);
    //         console.log(response.data)
    //         // setLoading(false);
    //     })
    // },[access_token])

    const idChangedHandler=(event)=>{
        event.preventDefault();
        setId(event.target.value);
    }

    const activateHandler=(id)=>{
        const headers = {
                    Authorization: 'Bearer ' + access_token
                }
        axios.put(`http://localhost:8080/product/admin/activate/${id}`,{},{ headers: headers })
        .then(response=>{
            alert(response);
            alert(response.data);
            console(response.data);
        }).catch(error=>{
            alert(error);
            console.log(error);
        })
    }
    const deactivateHandler=(id)=>{
        const headers = {
                    Authorization: 'Bearer ' + access_token
                }
        axios.put(`http://localhost:8080/product/admin/deactivate/${id}`,{},{ headers: headers })
        .then(response=>{
            alert(response);
            alert(response.data);
            console(response.data);
        }).catch(error=>{
            alert(error);
            console.log(error);
        })
    }


    return(
        <div className="container" style={{border:"2px solid black",padding:"auto",marginTop:"20%",width:"50%"}}>

            <input  type="text" placeholder="enter id"   onChange={idChangedHandler} style={{padding:"auto",marginTop:"10px",width:"100px"}}/>
            <div>
            <Button btnType="Success" clicked={()=>activateHandler(id)}>Activate</Button>
            <Button btnType="Success" clicked={()=>deactivateHandler(id)}>De-Activate</Button>
            </div>
        </div>
    );
}
const mapStateToProps=state=>{
    return{
        access_token:state.auth.token
        
    };
};
export default connect(mapStateToProps)(ViewProduct);