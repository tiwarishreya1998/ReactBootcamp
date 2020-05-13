import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';


class Checkout extends Component{

    // componentDidMount(){
    //         this.props.onInitPurchase();
    // }

    // state={
    //     ingredients:null,
    //     price:0
    // }

    // componentWillMount(){
    //     const query=new URLSearchParams(this.props.location.search);// search for question marks..
    //     const ingredients={};
    //     let price=0;
    //     for(let param of query.entries()){
    //            // ['salad','1']
    //            if(param[0]==='price'){
    //                price=param[1];

    //            }
    //            else{
    //            ingredients[param[0]]= +param[1];//param[1] as  property name and added to ingredients value as object.
    //            }
    //     }
    //     //console.log('hello',ingredients);
    //     this.setState({ingredients:ingredients,totalPrice:price});
    // }

    checkoutCancelledHandler=()=>{
            this.props.history.goBack();
    }
    checkoutContinuedHandler=()=>{
            this.props.history.replace('/checkout/contact-data');      
    }



    render(){
        let  summary=<Redirect to="/"/>
        
        if(this.props.ings){

        const purchasedRedirect=this.props.purchased?<Redirect to=""/>:null;
            summary=(<div>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route 
                path={this.props.match.path +'/contact-data'} //pass render as a method which takes js as a element render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}{...props}
                component={ContactData}/>  
                </div>
            );
        }
        return summary;      
    }
}
const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    };
}

// const mapDispatchToProps=dispatch=>{
//     return{
//         onInitPurchase:()=>dispatch(actions.purchaseInit())
//     };
// };

export default connect(mapStateToProps)(Checkout);