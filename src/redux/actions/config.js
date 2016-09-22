/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import {loadUserData, loadFirstJoin} from '../../util/XGlobal'
import jsCheckUpdate from '../../util/checkUpdate'
import {lockToPortrait} from 'react-native-orientation'
// import umeng from '../util/umeng'
import React, {
    Platform,
    UIManager,
    ToastAndroid,
} from 'react-native';

export const PRE_CONFIG_STATU = 'PRE_CONFIG_STATU'


//前置配置 在一进程序的时候就会
/**
 * 用于系统前置配置。
 */
function _preConfig() {


    //加载是否是第一次进入。
    // loadFirstJoin()

    // 加载缓存设置到公共参数
    loadUserData();

    //热跟新
    jsCheckUpdate();


    lockToPortrait();
    //配置友盟信息
    // umeng.configure();

    if (Platform.OS != 'ios') {
        UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }


}



export function preConfig():Object {
    _preConfig();
    return {
        type: PRE_CONFIG_STATU,
        status:'done',
    };
}
