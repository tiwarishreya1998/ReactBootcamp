import React from 'react';
import Register from './Register/Register';
import classes from '../../container/Auth/Auth.module.css'
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import Login from './Login/Login';

const Auth=()=>{

    

    return(
        <Router>
        <div className={classes.Auth}>
          
          <div className={classes.Auth__Form}>
            <div className={classes.PageSwitcher}>
                <NavLink to="/sign-in" activeClassName={classes.PageSwitcher__ItemActive } className={classes.PageSwitcher__Item}>Sign In</NavLink>
                <NavLink exact to="/sign-up" activeClassName={classes.PageSwitcher__ItemActive } className={classes.PageSwitcher__Item}>Sign Up</NavLink>
              </div>

              <div className={classes.FormTitle}>
                  <NavLink to="/sign-in" activeClassName={classes.FormTitle__LinkActive} className={classes.FormTitle__Link}>Sign In</NavLink> or <NavLink exact to="/sign-up" activeClassName={classes.FormTitle__LinkActive}
                   className={classes.FormTitle__Link}>Sign Up</NavLink>
              </div>            

              <Route exact path="/sign-up" component={Register}>
              </Route>
              <Route path="/sign-in" component={Login}>
              </Route>
          </div>

        </div>
      </Router>
        
    );
}
export default Auth;