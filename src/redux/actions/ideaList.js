/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import {request} from '../../request';
import {limitSearch} from '../../request/leanCloud';
import{
  LIST_FIRST_JOIN,
  LIST_NO_DATA,
  LIST_LOAD_DATA,
  LIST_LOAD_MORE,
  LIST_LOAD_NO_MORE,
  LIST_LOAD_ERROR,
  LIST_NORMAL,
} from '../../../src/components/Base/BaseListView'
export const IDEA_LIST_START = 'IDEA_LIST_START'
export const IDEA_LIST_FAILED = 'IDEA_LIST_FAILED'
export const IDEA_LIST_SUCCEED = 'LOAD_LIST_SUCCEEDT'
export const IDEA_LIST_SELECT = 'IDEA_LIST_SELECT'
const pageSize = 40;

/**
 * 保证加载的时候，同个请求不窜行。
 */

export function ideaListLoad():Function{
  return (dispatch,getState) => {
    return dispatch(_requestIdeaList(0));
  }
}

export function ideaListLoadMore():Function{
  return (dispatch,getState) => {
    const page = getState().ideaList.get('page') +1;
    return dispatch(_requestIdeaList(page));
  }
}

/**
 * 注册
 * @param  {[type]} state:Object [description]
 * @return {[type]}              [description]
 */
 function _requestIdeaList(page:number):Function {
    const params = limitSearch('TodoObject',page,pageSize,{
      include:'user,images',
      where:{
        'gradeType':{"$in":[1]},
      }
    });
    return (dispatch,getState) => {
        const loaded = getState().ideaList.loaded;
        if(!loaded){//not serial
          dispatch(_ideaListStart(page != 0));//当page 不为0 的时候则表示不是加载多页。
          request(params, function (response) {
              if (response.statu) {
                  dispatch(_ideaListSucceed(response.data.results,page));
              } else {
                  dispatch(_ideaListFailed(response));
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

 function _ideaListSucceed(data:Object,page:number = 0):Object {
   let loadStatu = LIST_NORMAL
   if(data.length < pageSize){
     loadStatu = LIST_LOAD_NO_MORE
   }
   if(page == 0 && data.count == 0){
     loadStatu = LIST_NO_DATA
   }
    return {
        type: IDEA_LIST_SUCCEED,
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
function _ideaListFailed(response:Object):Object {
    return {
        type: IDEA_LIST_FAILED,
        loadStatu: 'LIST_LOAD_ERROR',
    }
}

/**
 * 开始请求，使得loaded 变动。
 * @param  {[type]} response:Object [description]
 * @return {[type]}                 [description]
 */
 var isFirst = true
function _ideaListStart(isLoadMore:bool):Object {
    let loadStatu = LIST_FIRST_JOIN
    if(isFirst){
      isFirst = false;
    }else{
      loadStatu = isLoadMore?LIST_LOAD_MORE:LIST_LOAD_DATA
    }
    return {
        type: IDEA_LIST_START,
        loadStatu: loadStatu,
    }
}

export function ideaListSelcet(index:number):Object {
   return {
     type:IDEA_LIST_SELECT,
     index:index
   }
}
