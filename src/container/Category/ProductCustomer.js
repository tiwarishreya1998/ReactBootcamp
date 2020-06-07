import React, { useEffect,useState } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Aux from '../../hoc/Aux/Aux';
import ProductCard from './ProductCard';
import classes from './ProductCustomer.module.css';

const  ProductCustomer=props=>{

    const[products,setProducts]=useState([]);
    const[images,setImages]=useState([]);
  
    console.log("props",props)

    let id=props.history.location.state;

    console.log(id)
    const {access_token}=props;
    useEffect(()=>{
        const headers = {
            Authorization: 'Bearer ' + access_token
        }
        axios.get(`http://localhost:8080/product/customer/all/${id}`,{headers:headers})
        .then(response=>{
          alert(response.data)
            console.log(response)
            setImages(response.data.image);
            setProducts(response.data.products);
            console.log(response.data.image)   
            console.log(response.data.products)         
        })
        

    },[access_token,id])

    return(
        <Aux>
        <section className={classes.Products}>     
        <div className={classes.Card}>
          <div className={classes.Image}>
        {products.map(product => (
                    <ProductCard id={product.id} key={product.id} name={product.name} desc={product.description} image={images[images.findIndex(el => el.includes(product.id))]} 
                       
                    />
                ))}
          {/* {products.map(product => (
                    
                    <div>
                   <div className="product-info"> <h5>{product.brand}</h5>
                   <h6>{product.price}</h6></div>
                   </div>
                ))}  */}
            {/* <img src="http://localhost:8080/products/44/variations/113PI.jpeg"/> */}
          </div>
          </div>
          <div >
          
            
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