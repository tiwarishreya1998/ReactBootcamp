import React,{useEffect} from 'react';
import Layout from './component/Layout/Layout';
import Admin from './container/Admin/Admin';
import { Route, Switch, withRouter, Redirect, Router } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import classes from './App.module.css';
import Home from './container/Home/Home';
import Logout from './container/Auth/Logout/Logout';
import Profile from './container/CustomerProfile/Profile';
import ForgotPassword from './container/CustomerProfile/ForgotPassword/ForgotPassword';
import ResetPassword from './container/CustomerProfile/ResetPassword/ResetPassword';
import UpdateProfile from './container/CustomerProfile/UpdateProfile/UpdateProfile';
import Register from './container/Auth/Register/Register';
import Login from './container/Auth/Login/Login';
import FetchAddress from './container/CustomerProfile/Address/FetchAddress/FetchAddress1';
import UpdateAddress from './container/CustomerProfile/Address/UpdateAddress/UpdateAddress';
import NewAddress from './container/CustomerProfile/Address/NewAddress/NewAddress';
import Category from './container/Admin/Category/Category';
import AddCategory from './container/Admin/Category/AddCategory/AddCategory'
import UpdateCategory from './container/Admin/Category/UpdateCategory/UpdateCategory';
import MetaData from './container/Admin/Category/MetaData/MetaData';
import AddMetadata from './container/Admin/Category/MetaData/AddMetadata';
import ViewMetaData from './container/Admin/Category/MetaData/ViewMetaData';
import CategoryMetaData from './container/Admin/Category/MetaData/CategoryMetaData';
import AddProduct from './container/SellerProduct/AddProduct/AddProduct';
import FetchProduct from './container/SellerProduct/FetchProduct/FetchProduct';
import UpdateProduct from './container/SellerProduct/UpdateProduct/UpdateProduct';
import Product from './container/Admin/Product/Product';
import SellerRegister from './container/Auth/SellerRegister/SellerRegister';
import ProfileSeller from './container/SellerProfile/Profile';
import ProductCustomer from './container/Category/ProductCustomer';
const asyncAuth=asyncComponent(()=>{
  return import('./container/Auth/Auth');
});

const App = (props) => {
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/categoryProduct" component={ProductCustomer}/>
      <Route path="/sellerProfile" component={ProfileSeller}/>
      <Route path="/sellerRegister" component={SellerRegister}/>
      <Route path="/viewProduct" component={Product}/>
      <Route path="/addProduct" component={AddProduct}/>
      <Route path="/fetchProduct" component={FetchProduct}/>
      <Route path="/updateProduct" component={UpdateProduct}/>
      <Route path="/addMetadata" component={AddMetadata}/>
      <Route path="/viewMetadata" component={ViewMetaData}/>
      <Route path="/addMetadataValues" component={CategoryMetaData}/>
      <Route path="/metaData" component={MetaData}/>
      <Route path="/updateCategory" component={UpdateCategory}/>
      <Route path="/newAddress" component={NewAddress}/>
      <Route path="/updateAddress" component={UpdateAddress}/>
      <Route path="/fetchAddress" component={FetchAddress}/>
      <Route exact path="/sign-up" component={Register}/>              
      <Route path="/sign-in" component={Login}/>              
      <Route path="/" exact component={Home} />
      <Route path="/auth" component={asyncAuth} />
      <Route path="/admin" component={Admin} />
      <Route path="/profile" component={Profile}/>
      <Route path="/forgotPassword" exact component={ForgotPassword}/>
      <Route path="/resetPassword" component={ResetPassword}/>
      <Route path="/categories" component={Category}/>
      <Route path="/category" component={Category}/>
      <Route path="/addCategory" component={AddCategory}/>
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/categoryProduct" component={ProductCustomer}/>
        <Route path="/sellerProfile" component={ProfileSeller}/>
        <Route path="/sellerRegister" component={SellerRegister}/>
        <Route path="/viewProduct" component={Product}/>
        <Route path="/addProduct" component={AddProduct}/>
        <Route path="/fetchProduct" component={FetchProduct}/>
        <Route path="/updateProduct" component={UpdateProduct}/>
        <Route path="/addMetadata" component={AddMetadata}/>
        <Route path="/viewMetadata" component={ViewMetaData}/>
        <Route path="/addMetadataValues" component={CategoryMetaData}/>
        <Route path="/updateCategory" component={UpdateCategory}/>
        <Route path="/category" component={Category}/>
        <Route path="/addCategory" component={AddCategory}/>
        <Route path="/updateAddress" component={UpdateAddress}/>
        <Route path="/fetchAddress" component={FetchAddress}/>
        <Route path="/updateProfile" component={UpdateProfile}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/admin" component={Admin} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" exact component={asyncAuth} />
        <Route path="/" exact component={Home} />
        <Route path="/newAddress" component={NewAddress}/>
        <Route path="/categories" component={Category}/>
        <Route path="/metaData" component={MetaData}/>
        <Redirect to="/" />
      </Switch>
    );
  };
  return (
    <div className={classes.App}>
      <Layout>{routes}</Layout>
    </div>
  );

};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
