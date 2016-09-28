  /* @flow */

'use strict';

import {throwIfMissing,Toast} from '../util';
import {defaultHost, httpHeaders,tag} from '../configure';
// import {LimitableMap} from './LimitableMap'
// import {userManager} from '../util/XGlobal';
import RCTDeviceEventEmitter  from 'RCTDeviceEventEmitter';
import {addParams} from './useMeth';

var LimitableMap = require('./limitableMap');

const cache = new LimitableMap(100);//允许缓存的大小,简单的缓存并没有存入disk中、

const cacheType = {
  noCache :'noCache',//不做缓存处理
  onlyCache :'onlyCache',//有缓存后，只做缓存处理。不做其他操作
  firstCache : 'firstCache',//先做缓存处理，后做网络请求。
  cacheElseNet: 'cacheElseNet',// 先做缓存处理，如果有则不做其他处理。
}

const schemeType = {
  http:'http',
  https: 'https',
}

const methodType = {
  get : 'GET',
  post: 'POST',
  head: 'HEAD',
  put : 'PUT',
  delete :'DELETE',
}



// const statuType = {
//     requestSuccess:'requestSuccess',
//     requestFalse:'requestFalse',
//     requestError:'requestError',
// }



function formDataForParams(obj:Object) {
  var formData = new FormData();
  obj && Object.keys(obj).map(function(key){
    var val = obj[key];
    formData.append(key, val);
  })
  return formData;
}


function *HandleRequest() {
  yield false;
  yield true;
}


//将返回的数据包装再返回。

function _callBackData():Object{
   return {
     data:Object,
     statu:false,
     msg:String,
   }
}

/**
 * 对数据进行包装后返回
 * @param  {[type]} response:Object   [description]
 * @param  {[type]} callback:function [description]
 * @return {[type]}                   [description]
 */
function successCallback(response:Object,callback:Function):Object{

    const callBackData = _callBackData();
    callBackData.data= response;
    callBackData.statu = true;
    typeof callback == 'function' && callback(callBackData);
    // typeof successCallback == 'function' && setTimeout(callback, 5000, callBackData);
    return callBackData;
}

function failCallback(err:Error,url:string,params:Object):Object{
  const callBackData = _callBackData();
  callBackData.statu = false;
  // callBackData.error = err;
  if(err.msg == 'Network request failed'){
    callBackData.msg ='网络请求失败';
  } else{
    callBackData.msg = err.message;
  }

  handlerError(url,params, callBackData);
  return callBackData;
}


//错误日志处理
//
function handlerError(urlpath:string,iParam:Object,oParam:Object) {
  if (oParam.statu == false){
    // if (oParam.code == -11 ) {
    //   // clearUserData()
    //   RCTDeviceEventEmitter.emit("logout");
    // }

    if (__DEV__) {
      var cl =  '接口请求错误:\n'+'URL:\n'+ urlpath + '\n参数:' + JSON.stringify(iParam) +' \n回值:\n'
      + JSON.stringify(oParam);
      console.warn(cl);
    }
    const arr=oParam.msg.split('error:');
    Toast.show(arr[1]);
  }

}

module.exports = {
  schemeType,
  methodType,
  cacheType,
  /**
   * 发送网络请求
   * @param  {[type]} {scheme,host,path,method,cacheOptimize,params,timeout}
   * @param  {function} successCallback 请求成功回调
   * @param  {function} failCallback 请求失败回调
   */
  request( {scheme  = schemeType.https,
            host    = defaultHost,
            path    = throwIfMissing('send/path'),
            method  = 'GET',
            timeout = 20000,
            cacheOptimize = cacheType.noCache,
            params,
            needSession = false,
            ...otherParams,}:Object,

            callBack:Function):HandleRequest {

    let urlpath = scheme + '://' + host + path;
    // var header = Object.assign({}, httpHeader,{token:userManager.userData.user_token})

    const httpHeader = httpHeaders(needSession);


    var cacheKey =  addParams(urlpath, params) + JSON.stringify(httpHeader);
    var data =  cache.get(cacheKey)
    var handle = HandleRequest()

    if (cacheOptimize !=  cacheType.noCache){
      if (data !== undefined) {
        //同步情况，可以直接返回值。
        successCallback(data,callBack);

        if (cacheOptimize == cacheType.cacheElseNet ) {
          return handle;
        }
      }
    }else if (cacheOptimize == cacheType.onlyCache){
       return handle;
    }

    // httpHeader.token = userManager.userData.user_token;

    let request = method=='GET' ? new Request(addParams(urlpath, params),{method:method, headers:httpHeader}) : new Request(urlpath, {method:method, headers:httpHeader, body:JSON.stringify(params)});
    let requestPromise = Promise.race([
      fetch(request, {credentials:'include'}),
      new Promise(function (resolve, reject) {
        var reason =  __DEV__?'网络请求超时'+urlpath:'网络请求超时'
        setTimeout(() => reject(new Error(reason)), timeout);
      })
    ]);
    let status = 200;
    requestPromise.then((response)=>{
        status = response.status;
       return   response.json()
    }).then((responseData)=>{
        if(status >= 200 && status < 300){
        if (cacheOptimize !=  cacheType.noCache && responseData.retcode === tag) {
            cache.set(cacheKey, responseData);
        }

        var result = handle.next()
        if ( result.value === false) {
          successCallback(responseData,callBack);
        }
      }else{
        const message =  __DEV__?"HttpCode:"+status+",code:"+responseData.code+",error:"+responseData.error
        :responseData.error;
        throw new Error(message);
      }

    })
    .catch(function(err:Error){


      if ( handle.next().value === false) {
        const Oparm =  failCallback(err,urlpath,params);
        typeof callBack == 'function' && callBack(Oparm);
      }
    });

     return handle;
  }
}
