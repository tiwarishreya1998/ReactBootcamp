import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';



const initialState={
    orders:[],
    loading:false,
    purchased:false        //should be true when we start to order
};

const purchasedInit=(state,action)=>{
    return updateObject(state,{purchased:false});
};
const purchasedBurgerStart=(state,action)=>{
    return updateObject(state,{loading:false});
};
const purchasedBurgerFail=(state,action)=>{
    return updateObject(state,{loading:false});
};

const purchasedBurgerSuccess=(state,action)=>{
    const newOrder= updateObject(action.orderData,{id:action.orderId})
    return updateObject(state,{
        loading:false,
       purchased:true,
       orders:state.orders.concat(newOrder)})
};

const fetchOrdersStart=(state,action)=>{
    return updateObject(state,{loading:true});
};
const fetchOrdersSuccess=(state,action)=>{
    return updateObject(state,{
        orders:action.orders,
        loading:false});
};
const fetchOrdersFail=(state,action)=>{
    return updateObject(state,{loading:false});
};


const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.PURCHASED_BURGER_SUCCESS:return purchasedBurgerSuccess(state,action);

        case actionTypes.PURCHASED_BURGER_FAIL:return purchasedBurgerFail(state,action);
            
        case actionTypes.PURCHASED_BURGER_START:return purchasedBurgerStart(state,action);           
           
        case actionTypes.PURCHASED_INIT:return purchasedInit(state,action);          
          
        case actionTypes.FETCH_ORDERS_START:return fetchOrdersStart(state,action);            
    
        case actionTypes.FETCH_ORDERS_SUCCESS:return fetchOrdersSuccess(state,action);            

        case actionTypes.FETCH_ORDERS_FAIL:return fetchOrdersFail(state,action);
            
        default:return state;
    }
};

export  default reducer;