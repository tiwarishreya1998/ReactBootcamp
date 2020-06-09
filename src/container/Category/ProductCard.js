import React from 'react';

// import classes from './ProductList.module.css';
import { withRouter } from 'react-router-dom';

const ProductCard = (props) => {
    // let nameClass = ["badge badge-warning text-wrap"]
    
    return (
        <div className="col-xs-12 col-sm-4">
            <img src={`http://${props.image.toString()}`} alt="something"/>
            <centre>
                <p style={{fontWeight: "bold",width:"6rem",marginBottom:"0px",textAlign:"center"}}>{props.name}</p></centre>
                <p  style={{fontWeight: "bold"}}></p>
                <button style={{ textAlign: "center",marginBottom:"10px" }} onClick={() => {props.history.push("/product/details/"+props.id)}}>View Product</button>
        </div>
    );
};

export default withRouter(ProductCard);