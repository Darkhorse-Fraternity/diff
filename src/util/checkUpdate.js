//
//
//
// /*!
//  *
//  * https://github.com/reactnativecn/react-native-pushy/blob/master/docs/guide2.md
//  * 增量更新
//  * @flow
//  */
// 'use strict';
//  import {
//    isFirstTime,
//    isRolledBack,
//    packageVersion,
//    currentVersion,
//    checkUpdate,
//    downloadUpdate,
//    switchVersion,
//    switchVersionLater,
//    markSuccess,
//  } from 'react-native-update';
//
//  import React, {
//    Platform,
//  } from 'react-native';
//
//  import _updateConfig from '../../update.json';
//  const {appKey} = _updateConfig[Platform.OS];
//
// export default function jsCheckUpdate(){
//
//   if(__DEV__){
//     console.log('当前包版本号:',packageVersion);
//     console.log('当前版本Hash:',currentVersion);
//   }
//
//   //这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本
//    if (isFirstTime) {
//      markSuccess();
//    }
//
//   //检测更新
//   checkUpdate(appKey).then(info =>{
//     //判断有更新记录
//     if(info.update){
//       //去跟新
//       downloadUpdate(info).then(hash => {
//         switchVersionLater(hash);//下次启动时更新。
//       }).catch(err => {
//         console.log(err);
//       });
//     }
//   });
// }
