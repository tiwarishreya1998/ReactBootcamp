import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,combineReducers} from 'redux';
import counterReducer from './Store/reducers/counter';
import resultReducer from './Store/reducers/result';
import {Provider} from 'react-redux';


const rootReducer=combineReducers({
  ctr:counterReducer,
  res:resultReducer
});
const store=createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//combine reducer is a helper method for comining reducer..
//this is function with a js object mapping our reducers to diff slices of our state as input and mergers everythinginto one state and one reducer for us