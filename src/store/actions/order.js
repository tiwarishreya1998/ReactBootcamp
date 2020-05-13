import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

//synchronous action creator
export const purchaseBurgerSuccess=(id,orderData)=>{
    return{
        type:actionTypes.PURCHASED_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    };
};

//synchronous action creator
export const purchaseBurgerFail=(error)=>{
    return{
        type:actionTypes.PURCHASED_BURGER_FAIL,
        error:error
    };
};

export const purchaseBurgerStart=()=>{
    return{
        type:actionTypes.PURCHASED_BURGER_START
    };
};

//asynchronous action creator
export const purchaseBurger=(orderData)=>{
    
    return dispatch=>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json',orderData)
        .then(response=>{
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        })
        .catch(error=>{
            dispatch(purchaseBurgerFail(error))
        });

    };
};

export const purchaseInit=()=>{
    return{
        type:actionTypes.PURCHASED_INIT
    };
};

export const fetchOrdersSuccess=(orders)=>{
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    };
};
export const fetchOrdersFail=(error)=>{
    return{
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    };
};
export const fetchOrdersStart=()=>{
    return{
        type:actionTypes.FETCH_ORDERS_START,
        
    };
};
export const fetchOrders=()=>{
    return dispatch=>{
        dispatch(fetchOrdersStart())
        axios.get('/orders.json')
        .then(res=>{
            //console.log(res.data);
            const fetchedOrders=[];
            for (let key in res.data)
            {
                fetchedOrders.push({...res.data[key],id:key});
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
           
            
        }).catch(err=>{
            dispatch(fetchOrdersFail(err))
           
    });
    }
}