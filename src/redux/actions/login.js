/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import {request} from '../../request';
import {requestLogin, requestUsersByMobilePhone,getUserByID} from '../../request/leanCloud';
import {saveAccount,saveUserData, loadAccount, clearUserData} from '../../util/XGlobal'
import {
    navigatePush,
    navigatePop,
    navigateClearMiddleScene,
    navigatePopToIndex,
    navigateReplaceIndex
} from './nav'

import {setLeanCloudSession} from '../../configure'
// *** Action Types ***
export const ACCOUNT_CHANGE = 'ACCOUNTTEXT_CHANGE'
export const PASSWORD_CHANGE = 'PASSWORD_CHANGE'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCEED = 'LOGIN_SUCCEED'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOAD_ACCOUNT = 'LOAD_ACCOUNT'
export const LOGOUT = 'LOGOUT'
export const UPDATE_USERDATA = 'UPDATE_USERDATA'

//当为异步的时候这么写，返回一个函数
export function loadAccountAction():Function {

    return dispatch => {
        return loadAccount(ret => {
            dispatch(_loadAccount(ret));
        });
    }
}
function _loadAccount(ret:string):Object {
    return {
        type: LOAD_ACCOUNT,
        accountText: ret,
        passwordText: '',
    }
}

export function accountTextChange(text:string):Object {
    return {
        type: ACCOUNT_CHANGE,
        accountText: text,
    }
}

export function passwordTextChange(text:string):Object {
    return {
        type: ACCOUNT_CHANGE,
        passwordText: text,
    }
}

/**
 * 这边做了一个异步范例
 * dipacth 能够实现其异步，是通过 redux-thund 这个库来实现异步的。
 *
 */

/**
 * 登录
 * @param  {[type]} state:Object [description]
 * @return {[type]}              [description]
 */
export function login(state:Object):Function {

    // loginRequest.params.user_name = state.accountText;
    // loginRequest.params.password = state.passwordText;

    const parame = requestLogin(state.accountText, state.passwordText);

    return dispatch => {
        dispatch(_loginRequest());

        return request(parame, (response)=> {

            if (response.statu) {
                //加入sessionToken
                dispatch(_loginSucceed(response));
                dispatch(navigatePush('TabView'));
            } else {
                dispatch(_loginFailed(response));
            }
        });
    }
}


/**
 * 注册
 * @param  {[type]} state:Object [description]
 * @return {[type]}              [description]
 */
export function register(state:Object):Function {

    const params = requestUsersByMobilePhone(state.phone, state.ymCode,
        state.setPwd);

    return dispatch => {
        dispatch(_loginRequest());
        request(params, function (response) {
            if (response.statu) {
                dispatch(_loginSucceed(response));
                dispatch(navigatePop());
            } else {
                dispatch(_loginFailed(response));
            }
        });
    }
}



function _loginRequest():Object {
    return {
        type: LOGIN_REQUEST,
        loaded: true,
    }
}

function _loginSucceed(response:Object):Object {
    saveUserData(response.data);
    saveAccount(response.data.mobilePhoneNumber);
    return loginSucceed(response.data);
}

export function loginSucceed(data:Object):Object {
    //保存登录信息。
    setLeanCloudSession(data.sessionToken);
    return {
        type: LOGIN_SUCCEED,
        loaded: false,
        accountText: data.mobilePhoneNumber,
        data: data,
    }

}

function _loginFailed(response:Object):Object {
    return {
        type: LOGIN_FAILED,
        loaded: false
    }
}


export function logout():Function {
    clearUserData();

    return dispatch => {
        dispatch(logout2());//先退出
        return loadAccount(ret => {
            //加载本地数据。
            dispatch(_loadAccount(ret));
        });
    }


}

function logout2() {
    return {
        type: LOGOUT,
        index: 0,
    }
}

export function updateUserData(data:Object){
    return {
      type:UPDATE_USERDATA,
      data:data,
    }
}


export  function getUserByObjectID(objectID:string,callBack:Function) :Function{
    return dispatch => {
        dispatch(_loginRequest());
       const param = getUserByID(objectID);
        return request(param, (response)=> {

            if (response.statu) {
                //加入sessionToken
                dispatch(_loginSucceed(response));
                // dispatch(navigatePush('TabView'));
            } else {
                dispatch(_loginFailed(response));
            }
            callBack(response);
        });
    }
}
