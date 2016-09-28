/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import {request} from '../../request';
import {limitSearch,classUpdate} from '../../request/leanCloud';
import{
  LIST_FIRST_JOIN,
  LIST_NO_DATA,
  LIST_LOAD_DATA,
  LIST_LOAD_MORE,
  LIST_LOAD_NO_MORE,
  LIST_LOAD_ERROR,
  LIST_NORMAL,
} from '../../../src/components/Base/BaseListView'

export const IJOIN_LIST_START = 'IJOIN_LIST_START'
export const IJOIN_LIST_FAILED = 'IJOIN_LIST_FAILED'
export const IJOIN_LIST_SUCCEED = 'IJOIN_LIST_SUCCEEDT'
export const IJOIN_LIST_SELECT = 'IJOIN_LIST_SELECT'
export const IJOIN_DELETE_START = 'IJOIN_DELETE_START'
export const IJOIN_DELETE_SUCCEED = 'IJOIN_DELETE_SUCCEED'
export const IJOIN_DELETE_FAILED = 'IJOIN_DELETE_FAILED'
const pageSize = 40;

export function iJoinListLoad():Function{
  return (dispatch,getState) => {
    return dispatch(_requestList(0));
  }
}

export function iJoinListLoadMore():Function{
  return (dispatch,getState) => {
    const page = getState().ideaList.get('page') +1;
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
        const loaded = getState().ideaList.loaded;


        const user = getState().login.data;
        const params = limitSearch('TodoObject',page,pageSize,{
          'include':'images',
          'where':{
            'user':{'__type':"Pointer","className":"_User","objectId":"55a0c5d4e4b031b00558ae79"}}
          });
        if(!loaded){//not serial
          dispatch(_listStart(page != 0));//当page 不为0 的时候则表示不是加载多页。
          request(params, function (response) {
              if (response.statu) {
                  dispatch(_listSucceed(response.data.results,page));
              } else {
                  dispatch(_listFailed(response));
              }
          });
        }
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
   if(page == 0 && data.count == 0){
     loadStatu = LIST_NO_DATA
   }
    return {
        type: IJOIN_LIST_SUCCEED,
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
        type: IJOIN_LIST_FAILED,
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
        type: IJOIN_LIST_START,
        loadStatu: loadStatu,
    }
}

export function iJoinSelcet(index:number):Object {
   return {
     type:IJOIN_LIST_SELECT,
     index:index
   }
}

export function iJoinDelete(objectId:string):Function {
  return (dispatch,getState)=>{
    const index = getState().IJOIN.index;
    const data = getState().IJOIN.data[index];
    //通知服务器,做伪删除，即把type改为3
    const params = classUpdate("TodoObject",data.objectId,{gradeType:3})
    dispatch(request(params, (response)=>{
      if(response.statu){
        dispatch(iJoinDeleteSucceed());
      }else{
        dispatch(iJoinDeleteFailed());
      }
    }))

  }
}

export function iJoinDeleteSucceed():Object{
  return {
    type:IJOIN_DELETE_SUCCEED,
  }
}

export function iJoinDeleteFailed():Object{
  return {
    type:IJOIN_DELETE_FAILED
  }
}
