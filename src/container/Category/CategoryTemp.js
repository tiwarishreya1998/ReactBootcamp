// import  React from 'react';
// import Aux from '../../hoc/Aux/Aux';
// import { updateObject,checkValidity } from '../../shared/utility';
// import Spinner from '../../component/UI/Spinner/Spinner';
// import axios from 'axios';
// import Input from '../../component/UI/Input/Input';
// import classes from './Category.module.css';


// const Category=props=>{
//     const[params,setParams]=usestate({
//         SortBy:{
//             elementType:"select",
//             elementConfig:{
//                 options:[
//                     {value:"none",displayValue:"SELECT SORT BY"},
//                     {value:"id",displayValue:"id"},
//                 ],
//             },
//             validation:{},
//             value:"none",
//             isValid:true
//         },
//         page:{
//             elementType:"input",
//             elementConfig:{
//                 type:"number",
//                 placeholder:"Enter page Number",
//             },
//             value:"",
//             validation:{
//                 required:true,
//             },
//             isValid:false,
//             touched:false,
//         },
//         size: {
//             elementType: "input",
//             elementConfig: {
//               type: "number",
//               placeholder: "Enter Size",
//             },
//             value: "",
//             validation: {
//               required: true,
//             },
//             isValid: false,
//             touched: false,
//           },
//     });

//     const [loading,setLoading]=useState(false);
//     const [details,setDetails]=useState([]);


//     const submitHandler=(event)=>{
//         event.preventDefault();
//         setLoading(true)
//         let result=null;

//         const paramData={};

//         let query='?';
//         for(let key in params){
//             if(key!=="SortBy"){
//                 query=query+ "&" + key + "=" +params[key].value;
//             }else{
//                 query =query + key + "=" +params[key].value;
//             }
//         }

//         for(let key in params){
//             paramData[key]=params[key].value;
//         }

//         let fetchedData=null;
//         fetchedData=axios.get("http://localhost:8080/category/all"+query);
//         setLoading(false);

//         fetchedData.then(response=>{
//             result=response.data
//             setDetails(result);
//         }).catch(error=>{
//             console.log("error is",error)
//         })
//     }

//     const formElementsArray=[];
//     for(let key in params){
//         formElementsArray.push({
//             id:key,
//             config:params[key],
//         });
//     };

//     const inputChangedHandler=(event,paramName)=>{
//         const updatedSchedules = updateObject(params, {
//             [paramName]: updateObject(params[paramName], {
//               value: event.target.value,
//               valid: checkValidity(event.target.value, params[paramName].validation),
//               touched: true,
//             }),
//           });
//           setParams(updatedSchedules);
//     }


//     const showList=(l)=>{
//         if(l>0){
//             return <CategoryView fetchedDetails={details}/>
//         }
//     }

//     let form=formElementsArray.map((formElement)=>(
//         <Input
//         key={formElement.id}
//         elementType={formElement.config.elementType}
//         elementConfig={formElement.config.elementConfig}
//         value={formElement.config.value}
//         invalid={!formElement.config.valid}
//         shouldValidate={formElement.config.validation}
//         touched={formElement.config.touched}
//         changed={(event) => inputChangedHandler(event, formElement.id)}/>

//     ));

//     if(loading){
//         form=<Spinner/>;
//     }

//     return(
//         <Aux>
//             <div className={classes.CategoryData}>
//                 <form onSubmit={submitHandler}>
//                     <h4>Categories</h4>
//                     {form}
//                     <i class="fa fa-shopping-cart"></i>
//                 </form>
//                 <div>
//                 <section>{showList(details.length)}</section>
//                 </div>
//             </div>
//         </Aux>
//     )
// }
// export default Category;