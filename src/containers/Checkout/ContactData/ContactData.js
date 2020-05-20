import React,{ useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject,checkValidity} from '../../../shared/utility';


const ContactData =props=>{

   const [orderForm, setOrderForm]=useState({
          
              name:{
                    elementType:'input',
                    elementConfig:
                    {
                        type:'text',
                        placeholder:'Your name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                 },
              street:{
                    elementType:'input',
                    elementConfig:
                    {
                        type:'text',
                        placeholder:'your street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
             },
              zipCode:{
                    elementType:'input',
                    elementConfig:
                    {
                        type:'text',
                        placeholder:'your Zipcode'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:5
                    },
                    valid:false,
                    touched:false
             },
              country:{
                    elementType:'input',
                    elementConfig:
                    {
                        type:'text',
                        placeholder:'Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
             },
              email:{
                    elementType:'input',
                    elementConfig:
                    {
                        type:'email',
                        placeholder:'your e-mail'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
             },
              deliveryMethod:{
                elementType:'select',
                elementConfig:
                {
                    options:[
                                {value:'fastest',displayValue:'Fastest'},
                                {value:'cheapest',displayValue:'Cheapest'}
                            ]
                },
                value:'fastest',
                validation:{},
                valid:true
             },
       });
       const [formIsValid,setformIsValid]=useState(false);
       
        
    


    const orderHandler=(event)=>{
        event.preventDefault();
        //  this.setState({loading:true});
         const formData={};
         for(let formElementIdentifier in orderForm){
             formData[formElementIdentifier]=orderForm[formElementIdentifier].value;

         }
         const order={
            ingredients:props.ings,
            price:props.price,
            orderData:formData,
            userId:props.userId
            }
            console.log(props.userId);
            props.onOrderBurger(order,props.token);
        }

        // axios.post('/orders.json',order)
        // .then(response=>{
        //     this.setState({loading:false});
        //     this.props.history.push('/');
        // })
        // .catch(error=>{
        //     this.setState({loading:false});
        // });
            //console.log(this.props.ingredients);
       


        const inputChangedHandler = (event, inputIdentifier) => {
        
                const updatedFormElement = updateObject(orderForm[inputIdentifier], {
                    value: event.target.value,
                    valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
                    touched: true
                });
                const updatedOrderForm = updateObject(orderForm, {
                    [inputIdentifier]: updatedFormElement
                });
                
                let formIsValid = true;
                for (let inputIdentifier in updatedOrderForm) {
                    formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
                }
                setOrderForm(updatedOrderForm);
                setformIsValid(formIsValid);
                //this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
            }

    
        const formElementsArray=[];
        for(let key in orderForm){
                formElementsArray.push({
                  id:key,
                  config:orderForm[key]  
                });
        }

        let form=(
            <form onSubmit={orderHandler}>
           
            {formElementsArray.map(formElement=>(
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event)=>inputChangedHandler(event,formElement.id)}/>))
                            
            }
            <Button btnType="Success" disabled={!formIsValid}>Order</Button>
            </form>
        );


        if (props.loading){
            form=<Spinner/>;
        }


        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }


const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
};


const mapDispatchToProps=dispatch=>{
    return{
    onOrderBurger:(orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
    };
};



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));