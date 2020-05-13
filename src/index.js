import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,combineReducers,applyMiddleware, compose }from 'redux';
import counterReducer from './Store/reducers/counter';
import resultReducer from './Store/reducers/result';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';// already a middleware..



const rootReducer=combineReducers({
  ctr:counterReducer,
  res:resultReducer
});
//custom middleware
const logger=store=>{
  return next=>{
    return action=>{
      console.log('[Middleware dispatchin]',action);
      const result=next(action);
      console.log('[Middleware] next state',store.getState());
      return result;
    }
  }                                       
}


const composeEnhancer =window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;

const store=createStore(rootReducer,composeEnhancer(applyMiddleware(logger,thunk)));//2nd argument is a enhancer.you can also have a list of middleware


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
//combine reducer is a helper method for combining reducer..
//this is function with a js object mapping our reducers to diff slices of our state as input and mergers everythinginto one state and one reducer for us