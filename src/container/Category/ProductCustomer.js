import React, { useEffect,useState } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Aux from '../../hoc/Aux/Aux';

const  ProductCustomer=props=>{

    const[product,setProducts]=useState([]);
    const[image,setImages]=useState([]);
    const { match } = props;

    let {id} = match.params;
    const {access_token}=props;
    useEffect(()=>{
        const headers = {
            Authorization: 'Bearer ' + access_token
        }
        axios.get(`http://localhost:8080/product/customer/all/106`,{},{headers:headers})
        .then(response=>{
            setImages(response.data.image);
            setProducts(response.data.product);            
        })
        

    })

    return(
        <Aux>
        <section className="products">

      
        <div class="product-card">
          <div class="product-image">
              
            <img src/>
          </div>
          <div class="product-info">
            <h5>Winter Jacket</h5>
            <h6>$99.99</h6>
          </div>
        </div>
      
        
      
        </section>
      </Aux>
    )

}
const mapStateToProps=state=>{
    return{
        access_token:state.auth.token
        
    };
};
export default connect(mapStateToProps)(ProductCustomer);