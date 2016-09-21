/* @flow */
'use strict'
import DeviceInfo from 'react-native-device-info'
import {userManager, loadUserData, loadFirstJoin} from '../util/XGlobal'
import jsCheckUpdate from '../util/checkUpdate'
import {lockToPortrait} from 'react-native-orientation'
// import umeng from '../util/umeng'
import React, {
    StatusBar,
    BackAndroid,
    UIManager,
    ToastAndroid,
} from 'react-native';
import Platform  from 'Platform'
import {LeanCloud_APP_ID,LeanCloud_APP_KEY} from './leancloud'
const defaultHost = !__DEV__ ?
    /*release*/   'leancloud.cn/1.1' :
    /*debug*/     'leancloud.cn/1.1'
    //'task.dayi.im'

//
// const LeanCloud_APP_ID = 'hd16vijfry1s8lpklrhbqpccl77erki0836v4vlrilnl35ui';
// const LeanCloud_APP_KEY = 'gz0v89hdmstmq3x4swyuhpxdi5lyg4wtcjq1iuxxcaziwobb';
let LeanCloud_APP_Session = '';

function setLeanCloudSession(session:string){
  LeanCloud_APP_Session = session;
}

// var httpHeader = {
//     // 'Content-Type': 'multipart/form-data',
//     // token: userManager.userData.user_token || "",
//     // versionCode: __DEV__ ? (DeviceInfo.getVersion() + 'Dev')
//     //     : DeviceInfo.getVersion() || "",
//     // platform: DeviceInfo.getBundleId() || "",
//     // deviceInfo: encodeURIComponent(DeviceInfo.getDeviceName()) || "",
//     // deviceId: DeviceInfo.getUniqueID() || "",
//     // apiVersion: '1.0',
//     "Content-Type": "application/json",
//     "X-LC-Key": LeanCloud_APP_KEY,
//     "X-LC-Id": LeanCloud_APP_ID,
//     "X-LC-Session":LeanCloud_APP_Session,
// }

function httpHeaders(needSession:bool):Object{

   let header = {
     "Content-Type": "application/json",
     "X-LC-Key": LeanCloud_APP_KEY,
     "X-LC-Id": LeanCloud_APP_ID,
   }

   if(needSession){
      header = Object.assign({},
        header,
      {
        "X-LC-Session":LeanCloud_APP_Session
      })
   }
   return header;
}


const tag = 1;


//主题色彩
const themeColorConfig = {
    mainColor: '#f26355', //主色彩，用于navbar 按钮颜色等、
    backViewColor: '#f7f7f7',
    lightMainColor: '#c18379', //主色彩，用于navbar 按钮颜色等、
    containingColor: '#ffffff', //内含主色彩
    lightContainingColor: '#d2d6d6', //内含主色彩
    mainBackgroundColor: '#f7f7f7',

    //字体颜色 需自行补充
    deepFontColor: '#000000',
    lightFontColor: '#d5ded3',
    grayFontColor: '#999999',
    blackFontColor: '#333333',

    // 线的颜色
    lineColor: '#dbdbdb',
    textInputTextColor: '#333333',
    placeholderTextColor: '#b7b7b7',
}

const isLogin = false;

//主题字体 这边看是否需要把CSS 样式进行抽取
const themeFontConfig = {}

//前置配置 在一进程序的时候就会
/**
 * 用于系统前置配置。
 */
function preConfig() {

    if (Platform.OS == 'ios') {
        // StatusBar.setBarStyle('light-content', true);
    } else {

    }
    //加载是否是第一次进入。
    loadFirstJoin()

    // 加载缓存设置到公共参数
    loadUserData();

    //热跟新
    jsCheckUpdate();

    //配置友盟信息
    // umeng.configure();

    if (Platform.OS != 'ios') {
        UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    lockToPortrait();

}


module.exports = {
    defaultHost,
    httpHeaders,
    ...themeColorConfig,
    preConfig,
    isLogin,
    tag,
    setLeanCloudSession,
};
