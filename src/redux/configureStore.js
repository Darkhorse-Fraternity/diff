/**
 * Created by lintong on 9/21/16.
 * @flow
 */
'use strict';

 import { createStore, applyMiddleware, compose,combineReducers } from 'redux';
 import thunk from 'redux-thunk';

import * as immutable from 'immutable';
 // import umeng from '../util/umeng'
 import { Platform } from 'react-native';
 import * as reducers from './reducers'
 const reducer = combineReducers(reducers);



 const rootReducer = (state, action) => {
   if (action.type === 'LOGOUT') {
 	// 	umeng.pageEnd('设置');
 	// 	umeng.pageStart("登录");
     state = undefined
   }

 	if (action.type === "NAV_PUSH") {
    //  const navigationState =  state.route.navigationState
 	// 	umeng.pageStart(navigationState.routes[navigationState.index].title);
 	}else if(action.type === 'NAV_POP'){
 	// 	const navigationState =  state.route.navigationState;
 	// 	umeng.pageEnd(navigationState.routes[navigationState.index].title);
 	}

   return reducer(state, action)
 }
 const middlewares = [thunk];
 let enhancer;
 if (__DEV__) {
   const installDevTools = require('immutable-devtools');
   installDevTools(immutable);

   const reduxRemoteDevTools = require('remote-redux-devtools');
   enhancer = compose(
     applyMiddleware(...middlewares),
     global.reduxNativeDevTools ?
       global.reduxNativeDevTools() :
       nope => nope
   );
   // enhancer = applyMiddleware(...middlewares);
 } else {
   enhancer = applyMiddleware(...middlewares);
 }




 // export default function configureStore(initialState) {
 //   const enhancer = compose(
 //     applyMiddleware(thunk),
 //     tools,//安卓无法使用，bug on
 //   );
 //   return createStore(rootReducer, initialState, enhancer);
 // }


 export default function configureStore(initialState:Object ={}) {
   const store = createStore(rootReducer, initialState, enhancer);
   if (global.reduxNativeDevTools) {
     global.reduxNativeDevTools.updateStore(store);
   }
   return store;
 }
