/* @flow */

'use strict';


import {combineReducers} from 'redux'

import {
    LOGIN_REQUEST,
    LOGIN_SUCCEED,
    LOGIN_FAILED,
    ACCOUNT_CHANGE,
    PASSWORD_CHANGE,
    LOGOUT,
    LOAD_ACCOUNT,
    UPDATE_USERDATA
} from '../actions/login'
//import {checkPhoneNum} from '../../util';
import {CHANGEAVATAR} from '../actions/util'
import {saveUserData} from '../../util/XGlobal'
const initialLoginState = {
    loaded: false,
    isLogin: false,
    accountText: __DEV__ ? "13588833404" : '',
    passwordText: __DEV__ ? "123456" : '',
    data: {},
}


/**
 * [loginState description]
 * @param  {[type]} state:Object  =   第一次为空，以后则为提交后改变的值。
 * @param  {[type]} action:Object atcions 提交的会在这边显示。
 * @return {[type]}         返回给component 的state 值。
 */
export default function loginState(state:immutable.Map<string,any> = initialLoginState, action:Object) {
    switch (action.type) {
        case LOAD_ACCOUNT:
        case ACCOUNT_CHANGE:
        case PASSWORD_CHANGE:
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                ...action,
            });
        case LOGIN_FAILED:
        case LOGOUT:
            return Object.assign({}, state, {
                ...action,
                isLogin:false,
            });
        case LOGIN_SUCCEED:
            return Object.assign({}, state, {
                ...action,
                isLogin:true,
            });
        case LOGOUT:

            return Object.assign({}, state, {
                ...action
            });

        case UPDATE_USERDATA:{

              state.data =  Object.assign({},state.data, action.data)
              saveUserData(state.data);
             return Object.assign({},state);
        }
        case CHANGEAVATAR:

            const avatar = state.data.avatar;

            state.data.avatar = Object.assign({},avatar,action.avatar);
            state.data = Object.assign({},state.data);
            saveUserData(state.data);
            return Object.assign({},state);

        default:
            return state
    }
}


// const loginReducers = combineReducers({
// 	loginState
// })
//
// export default loginReducers
