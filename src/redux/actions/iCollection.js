/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import {request} from '../../request';
import {limitSearch,classUpdate,classCreatNewOne} from '../../request/leanCloud';
import{
  LIST_FIRST_JOIN,
  LIST_NO_DATA,
  LIST_LOAD_DATA,
  LIST_LOAD_MORE,
  LIST_LOAD_NO_MORE,
  LIST_LOAD_ERROR,
  LIST_NORMAL,
} from '../../../src/components/Base/BaseListView'

export const ICOLLECTION_LIST_START = 'ICOLLECTION_LIST_START'
export const ICOLLECTION_LIST_FAILED = 'ICOLLECTION_LIST_FAILED'
export const ICOLLECTION_LIST_SUCCEED = 'ICOLLECTION_LIST_SUCCEEDT'
export const ICOLLECTION_LIST_SELECT = 'ICOLLECTION_LIST_SELECT'
export const ICOLLECTION_DELETE_START = 'ICOLLECTION_DELETE_START'
export const ICOLLECTION_DELETE_SUCCEED = 'ICOLLECTION_DELETE_SUCCEED'
export const ICOLLECTION_DELETE_FAILED = 'ICOLLECTION_DELETE_FAILED'
export const ICOLLECTION_ADD = 'ICOLLECTION_ADD'
const pageSize = 40;

export function iCollectionListLoad():Function{
  return (dispatch,getState) => {
    return dispatch(_requestList(0));
  }
}

export function iCollectionListLoadMore():Function{
  return (dispatch,getState) => {
    const page = getState().ideaList.get('page') +1;
    return dispatch(_requestList(page));
  }
}

/**
 *
 * @param  {[type]} state:Object [description]
 * @return {[type]}              [description]
 */
 function _requestList(page:number):Function {

    return (dispatch,getState) => {
        const loaded = getState().ideaList.loaded;


        const user = getState().login.data;
        const params = limitSearch('TodoObject',page,pageSize,{
          'include':'images',
          'where':{"$relatedTo":{"object":{"__type":"Pointer","className":"Post","objectId":user.objectId},"key":"likes"}}
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
   if(page == 0 && data.length == 0){
     loadStatu = LIST_NO_DATA
   }
    return {
        type: ICOLLECTION_LIST_SUCCEED,
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
        type: ICOLLECTION_LIST_FAILED,
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
        type: ICOLLECTION_LIST_START,
        loadStatu: loadStatu,
    }
}

export function iCollectionSelcet(index:number):Object {
   return {
     type:ICOLLECTION_LIST_SELECT,
     index:index
   }
}



export function iCollectionSucceed():Object{
  //需要删除可能存在list中的data.
  return {
    type:ICOLLECTION_DELETE_SUCCEED,
  }
}

export function iCollectionDeleteFailed():Object{
  return {
    type:ICOLLECTION_DELETE_FAILED
  }
}

export function iCollectionCancle():Function{
  return (dispatch,getState)=>{
    const state = getState();
    const index = state.ideaList.index;
    const data = state.ideaList.data[index];
    const obejctId = data.objectId;
    const user = state.login.data
    const params =  classUpdate('TodoObject',obejctId,
    {"collection":
      {"__op":"AddRelation","objects":[user]}})

    dispatch(request(params, (response)=>{
      if(response.statu){
        dispatch(iCollectionDeleteSucceed());
      }else{
        dispatch(iCollectionDeleteFailed());
      }
    }))

  }
}

export function iCollectionAdd():Function{
  return (dispatch,getState)=>{
    const state = getState();
    const index = state.ideaList.index;
    const data = state.ideaList.data[index];
    const obejctId = data.objectId;
    const user = state.login.data
    const params =  classUpdate('TodoObject',obejctId,
    {"collection":
      {"__op":"RemoveRelation","objects":[user]}})

    dispatch(request(params, (response)=>{

    }))

  }
}
