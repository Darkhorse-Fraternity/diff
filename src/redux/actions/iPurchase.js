/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import {request,send} from '../../request';
import {limitSearch,classDelete,classUpdate} from '../../request/leanCloud';
import{
  LIST_FIRST_JOIN,
  LIST_NO_DATA,
  LIST_LOAD_DATA,
  LIST_LOAD_MORE,
  LIST_LOAD_NO_MORE,
  LIST_LOAD_ERROR,
  LIST_NORMAL,
} from '../../../src/components/Base/BaseListView'

import {Toast} from '../../util'
// import {uploadFilesByLeanCloud} from '../../util/uploadAVImage'


export const IPURCHASE_LIST_START = 'IPURCHASE_LIST_START'
export const IPURCHASE_LIST_FAILED = 'IPURCHASE_LIST_FAILED'
export const IPURCHASE_LIST_SUCCEED = 'IPURCHASE_LIST_SUCCEEDT'
export const IPURCHASE_DELETE_START = 'IPURCHASE_DELETE_START'
export const IPURCHASE_DELETE_SUCCEED = 'IPURCHASE_DELETE_SUCCEED'
export const IPURCHASE_DELETE_FAILED = 'IPURCHASE_DELETE_FAILED'
export const IPURCHASE_ADD_SUCCEED = 'IPURCHASE_ADD_SUCCEED'
export const IPURCHASE_ADD_FAILED = 'IPURCHASE_ADD_FAILED'
export const IPURCHASE_CONTENT_CHANGE = 'IPURCHASE_CONTENT_CHANGE'
export const IPURCHASE_PAGE_CHANGE = 'IPURCHASE_PAGE_CHANGE'
export const IPURCHASE_RATE_CHANGE = 'IPURCHASE_RATE_CHANGE'
export const IPURCHASE_RATE_RESET = 'IPURCHASE_RATE_RESET'
import {navigatePop,navigateRefresh} from './nav'

const pageSize = 40;

export function iPurchaseListLoad():Function{
  return (dispatch,getState) => {
    return dispatch(_requestList(0));
  }
}

export function iPurchaseListLoadMore():Function{
  return (dispatch,getState) => {
    const page = getState().iPurchase.get('page') +1;
    return dispatch(_requestList(page));
  }
}

/**
 * 注册
 * @param  {[type]} state:Object [description]
 * @return {[type]}              [description]
 */
 function _requestList(page:number):Function {

    return (dispatch,getState) => {
        const state = getState();
        // const loaded = state.iPurchase.get('loaded');
        const user = state.login.data;
        const params = limitSearch('iCommit',page,pageSize,{
          include:'user,idea,images,idea.images,idea.user,replyImages',
          "where":{
            'user':{'__type':"Pointer","className":"_User","objectId":user.objectId}},
          });
        // if(!loaded){//not serial
          dispatch(_listStart(page != 0));//当page 不为0 的时候则表示不是加载多页。
          request(params, function (response) {
              if (response.statu) {
                  dispatch(_listSucceed(response.data.results,page));
              } else {
                  dispatch(_listFailed(response));
              }
          });
        // }
    }
}

/**
 * 请求成功
 * @param  {[type] data:Object [成功返回的数据]
 * @param  {[type]} page:number =  0 [当前的页数。]
 * @return {[type]}             [description]
 */

 function _listSucceed(data:Object,page:number = 0):Object {
   let loadStatu = LIST_NORMAL
   if(data.length < pageSize){
     loadStatu = LIST_LOAD_NO_MORE
   }
   if(page == 0 && data.length == 0){
     loadStatu = LIST_NO_DATA
   }

    return {
        type: IPURCHASE_LIST_SUCCEED,
        page:page,
        loadStatu: loadStatu,
        data: data,
    }

}


/**
 * 请求失败
 * @param  {[type]} response:Object [description]
 * @return {[type]}                 [description]
 */
function _listFailed(response:Object):Object {
    return {
        type: IPURCHASE_LIST_FAILED,
        loadStatu: 'LIST_LOAD_ERROR',
    }
}

/**
 * 开始请求，使得loaded 变动。
 * @param  {[type]} response:Object [description]
 * @return {[type]}                 [description]
 */
 var isFirst = true
function _listStart(isLoadMore:bool):Object {
    let loadStatu = LIST_FIRST_JOIN
    if(isFirst){
      isFirst = false;
    }else{
      loadStatu = isLoadMore?LIST_LOAD_MORE:LIST_LOAD_DATA
    }
    return {
        type: IPURCHASE_LIST_START,
        loadStatu: loadStatu,
    }
}

export function iPurchaseContentChange(content:string):Object{

  return {
    type:IPURCHASE_CONTENT_CHANGE,
    content
  }
}


export  function iRateAdd():Function{
  return (dispatch,getState)=>{
    const state = getState();

    const user =state.login.data;
    const rate = state.iPurchase.get('rate')
    const index =state.iPurchase.get('index')
    const id = state.iPurchase.getIn(['data',index,'objectId'])
    dispatch(navigateRefresh({rightButtonIsLoad:true}))

    const params = {
      statu:'done',
      rate
    }

    const newParams =  classUpdate('iCommit',id,params)
    send(newParams).then(response=>{
      dispatch(navigateRefresh({rightButtonIsLoad:false}))
      dispatch(navigatePop())
      dispatch(iPurchaseAddSucceed())
      // dispatch(iPurchaseListLoad())
      dispatch(rateReset())
      dispatch(rateChange(0))
    }).catch((res)=>{
      dispatch(navigateRefresh({rightButtonIsLoad:false}))
      dispatch(iPurchaseAddFailed())
    })
  }
}






 function iPurchaseAddSucceed():Object{
   Toast.show('发送成功')
  return {
    type:IPURCHASE_ADD_SUCCEED,
  }
}

 function iPurchaseAddFailed():Object{
  return {
    type:IPURCHASE_ADD_FAILED
  }
}

export function iPurchaseDelete(index:number):Function {
  return (dispatch,getState)=>{
    const data = getState().iCommnet.get('data');
    const item = data.get(index);
    //通知服务器,做伪删除，即把type改为3
    const params = classDelete("IPURCHASE",item.objectId)
    request(params, (response)=>{
      if(response.statu){
        dispatch(iPurchaseDeleteSucceed(index));
      }else{
        dispatch(iPurchaseDeleteFailed());
      }
    })

  }
}

export function iPurchaseDeleteSucceed(index:number):Object{
  return {
    type:IPURCHASE_DELETE_SUCCEED,
    index,
  }
}

export function iPurchaseDeleteFailed():Object{
  return {
    type:IPURCHASE_DELETE_FAILED
  }
}

export function selectChange(index:number):Object{
  return {
    type:IPURCHASE_PAGE_CHANGE,
    index,
  }
}

export function rateChange(rate:number):Object{
  return {
    type:IPURCHASE_RATE_CHANGE,
    rate,
  }
}

export function rateReset():Object{
  return {
    type:IPURCHASE_RATE_RESET,
  }
}
