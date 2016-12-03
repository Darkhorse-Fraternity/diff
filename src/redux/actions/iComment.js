/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import {request} from '../../request';
import {limitSearch,classDelete,classCreatNewOne} from '../../request/leanCloud';
import{
  LIST_FIRST_JOIN,
  LIST_NO_DATA,
  LIST_LOAD_DATA,
  LIST_LOAD_MORE,
  LIST_LOAD_NO_MORE,
  LIST_LOAD_ERROR,
  LIST_NORMAL,
} from '../../../src/components/Base/BaseListView'


export const ICOMMENT_LIST_START = 'ICOMMENT_LIST_START'
export const ICOMMENT_LIST_FAILED = 'ICOMMENT_LIST_FAILED'
export const ICOMMENT_LIST_SUCCEED = 'ICOMMENT_LIST_SUCCEEDT'
export const ICOMMENT_DELETE_START = 'ICOMMENT_DELETE_START'
export const ICOMMENT_DELETE_SUCCEED = 'ICOMMENT_DELETE_SUCCEED'
export const ICOMMENT_DELETE_FAILED = 'ICOMMENT_DELETE_FAILED'
export const ICOMMENT_ADD_SUCCEED = 'ICOMMENT_ADD_SUCCEED'
export const ICOMMENT_ADD_FAILED = 'ICOMMENT_ADD_FAILED'
export const ICOMMENT_CONTENT_CHANGE = 'ICOMMENT_CONTENT_CHANGE'
export const ICOMMENT_BINDING_IDEAID = 'ICOMMENT_BINDING_IDEAID'

import {navigatePop,navigateRefresh} from './nav'

const pageSize = 40;

export function iCommentListLoad():Function{
  return (dispatch,getState) => {
    return dispatch(_requestList(0));
  }
}

export function iCommentListLoadMore():Function{
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
        const state = getState();
        const loaded = state.ideaList.get('loaded');
        const objectId = state.iComment.get('ideaId')
        const user = state.login.data;
        const params = limitSearch('iComment',page,pageSize,{
          include:'user',
           where:{
             'idea':{'__type':"Pointer","className":"TodoObject","objectId":objectId}}
           }
          );
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
        type: ICOMMENT_LIST_SUCCEED,
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
        type: ICOMMENT_LIST_FAILED,
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
        type: ICOMMENT_LIST_START,
        loadStatu: loadStatu,
    }
}

export function iCommentContentChange(content:string):Object{

  return {
    type:ICOMMENT_CONTENT_CHANGE,
    content
  }
}


export function iCommentAdd():Function{
  return (dispatch,getState)=>{
    const state = getState();

    const obejctId = state.iComment.get('ideaId')
    const user =state.login.data;
    const content = state.iComment.get('content')
    const params = classCreatNewOne('iComment',{
      content,
      idea:{
          "__type": "Pointer",
          "className": "TodoObject",
          "objectId": obejctId},
      user:{
          "__type": "Pointer",
          "className": "_User",
          "objectId": user.objectId},
    })
    dispatch(navigateRefresh({rightButtonIsLoad:true}))

    request(params, (response)=>{
      dispatch(navigateRefresh({rightButtonIsLoad:false}))

      if(response.statu){
        dispatch(iCommentAddSucceed())
        dispatch(iCommentListLoad())
          dispatch(iCommentContentChange(''))
          dispatch(navigatePop())
      }else{
        dispatch(iCommentAddFailed())
      }
    })
  }
}

 function iCommentAddSucceed():Object{
  return {
    type:ICOMMENT_ADD_SUCCEED,
  }
}

 function iCommentAddFailed():Object{
  return {
    type:ICOMMENT_ADD_FAILED
  }
}

export function iCommentDelete(index:number):Function {
  return (dispatch,getState)=>{
    const data = getState().iCommnet.get('data');
    const item = data.get(index);
    //通知服务器,做伪删除，即把type改为3
    const params = classDelete("iComment",item.objectId)
    request(params, (response)=>{
      if(response.statu){
        dispatch(iCommentDeleteSucceed(index));
      }else{
        dispatch(iCommentDeleteFailed());
      }
    })

  }
}

export function iCommentDeleteSucceed(index:number):Object{
  return {
    type:ICOMMENT_DELETE_SUCCEED,
    index,
  }
}

export function iCommentDeleteFailed():Object{
  return {
    type:ICOMMENT_DELETE_FAILED
  }
}

export function iCommentBindingIdeaID(ideaId:string):Object{
  return {
    type:ICOMMENT_BINDING_IDEAID,
    ideaId,
  }
}
