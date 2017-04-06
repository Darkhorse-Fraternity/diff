/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import {loadUserData} from '../util/XGlobal'
// import jsCheckUpdate from '../../util/checkUpdate'
// import {lockToPortrait} from 'react-native-orientation'
// import umeng from '../util/umeng'
import React, {
    Platform,
    UIManager,
    ToastAndroid,
    StatusBar,
    BackAndroid
} from 'react-native';
import {loginSucceed} from './actions/login'
import {tabSwitch} from './actions/tab'
import {navigatePush} from './actions/nav'
import pushConfig from '../configure/push'
export const PRE_CONFIG_STATU = 'PRE_CONFIG_STATU'
import  store from './configureStore'


import {pop} from './nav'



//前置配置 在一进程序的时候就会
/**
 * 用于系统前置配置。
 */
function _preConfig() {


    //加载是否是第一次进入。
    // loadFirstJoin()

    // 加载缓存设置到公共参数


    //热跟新
    // jsCheckUpdate();


    // lockToPortrait();
    //配置友盟信息
    // umeng.configure();

    if (Platform.OS != 'ios') {
        UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    // Platform.OS=='ios'&& StatusBar.setBarStyle('light-content', true);

    //pushConfig()

  // const param = {
  //         "userId": 1250,
  //         "userAccount": "TonyYo",
  //         "userType": 1,
  //         "phoneNo": "13588833404",
  //         "advisersCode": "",
  //         "status": 1,
  //         "city": "0592",
  //         "province": "0",
  //         "createTime": "2017-02-26 10:39:52"
  // }
  //
  // saveUserData(param)
}


let lastBackPressed: number = 0;

function _backAnroid (getState) {
    BackAndroid.addEventListener('hardwareBackPress', ()=> {
        const state = getState().route.navigationState
        const index = state.index;
        console.log('index:', index);
        //idnex 前两个分别是登录和tabview
        if (index > 1) {
            pop();
            return true;
        }
        let times = Date.now();
        if (times - lastBackPressed >= 2500) {
            //再次点击退出应用
            lastBackPressed = times;
            ToastAndroid.show("再按一次退出应用", 0);
            return true;
        }
        lastBackPressed = 0;
        return false;
    });
}



export function preConfig():Function {
    _preConfig();
    return (dispatch,getState) =>{
        _backAnroid(getState)

         // dispatch(tabSwitch(0))
        //dispatch(navigatePush({key:'Home',applyAnimation:false}))
        loadUserData().then((response)=>{
            dispatch(loginSucceed(response))
            // console.log('test:',response)
            dispatch(navigatePush('TabView',false))
            dispatch(__preConfigResult())

        }).catch((error)=>{
            console.log('loadUserDataError:',error.message)
        });
    }

}

function __preConfigResult():Object {

    return {
        type: PRE_CONFIG_STATU,
        status:'done',
    };
}

