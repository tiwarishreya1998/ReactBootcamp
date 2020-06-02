import React,{useEffect} from 'react';
import Layout from './component/Layout/Layout';
import Admin from './container/Admin/Admin';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import classes from './App.module.css';
import Home from './container/Home/Home';
import Logout from './container/Auth/Logout/Logout';
import Profile from './container/Profile/Profile';
import ForgotPassword from './container/Profile/ForgotPassword/ForgotPassword';
import ResetPassword from './container/Profile/ResetPassword/ResetPassword';
import UpdateProfile from './container/Profile/UpdateProfile/UpdateProfile';
import Register from './container/Auth/Register/Register';
import Login from './container/Auth/Login/Login';
import FetchAddress from './container/Profile/Address/FetchAddress/FetchAddress1';
import UpdateAddress from './container/Profile/Address/UpdateAddress/UpdateAddress';
import NewAddress from './container/Profile/Address/NewAddress/NewAddress';
import Category from './container/Category/Category';

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
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
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
