/*!
 *
 * Util模块 React Native module
 * 主要提供工具方法
 * @flow
 */
'use strict';
import React,{
  PixelRatio,
  AsyncStorage,
} from "react-native";
import Toast from './Toast'
import URLManage from './URLManage'
import Dimensions from "Dimensions";
import Platform  from 'Platform'
import Storage from 'react-native-storage';

// import viewUtil from './viewUtil'

function throwIfMissing(paramName:string=''):string {
  throw new Error('Missing parameter'+paramName);
  // return '';
}

var storage = new Storage({
  //最大容量，默认值1000条数据循环存储
  size: 1000,

  storageBackend: AsyncStorage,
  //数据过期时间，默认一整天（1000 * 3600 * 24秒）
  defaultExpires: 1000 * 3600 * 24,

  //读写时在内存中缓存数据。默认启用。
  enableCache: true,

  //如果storage中没有相应数据，或数据已过期，
  //则会调用相应的sync同步方法，无缝返回最新数据。
  sync : {
    //同步方法的具体说明会在后文提到
  }
})
//对于react native
global.storage = storage;


/**
 * 判断是否是正确的手机号码
 * @param  {[type]} num:string [description]
 * @return {[type]}            [description]
 */
function checkPhoneNum(num:string):bool{
  const reg = /^1[0-9]{10}$/;
  return reg.test(num)
}


module.exports = {
  /*最小线宽*/
  pixel: 1 / PixelRatio.get(),
  /*屏幕尺寸*/
  screenWidth : Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  navbarHeight: Platform.OS == 'ios' ? 0: 0,

  OS:Platform.OS == 'ios' ?'ios':'android',
  Toast,
  URLManage, //将URLManage 适配安卓苹果。
  throwIfMissing,
  checkPhoneNum,
};
