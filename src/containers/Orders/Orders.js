 import React,{useEffect} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders=props=>{

        // const { onFetchOrder} = props;

        // useEffect(()=>{
        //     onFetchOrder(props.token,props.userId);
        // },[onFetchOrder]);

        const { onFetchOrder , token, userId} = props;
            useEffect(() => {
            onFetchOrder(token,userId);
            }, [onFetchOrder,token,userId]);

        
            let orders=<Spinner/>;
            if(!props.loading){               
                orders=props.orders.map(order=>(
                    
                    <Order 
                    key ={order.id}
                    ingredients={order.ingredients}
                    price={order.price}/>
                ));
                
            }
            return(
                <div>
                    {orders}
                </div>
            );
        }

        
        const mapStateToProps=state=>{
            return{
                orders:state.order.orders,
                loading:state.order.loading,
                token:state.auth.token,
                userId:state.auth.userId
            
            };
        };
        const mapDispatchToProps=dispatch=>{
            return{
                onFetchOrder:(token,userId)=>
                dispatch(actions.fetchOrders(token,userId))
            };
        };



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));