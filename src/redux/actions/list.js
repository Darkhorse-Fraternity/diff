/**
 * Created by lintong on 10/19/16.
 * @flow
 */
'use strict';

import{
    LIST_FIRST_JOIN,
    LIST_NO_DATA,
    LIST_LOAD_DATA,
    LIST_LOAD_MORE,
    LIST_LOAD_NO_MORE,
    LIST_LOAD_ERROR,
    LIST_NORMAL,
} from '../../components/Base/BaseListView'
export const LIST_START = 'LIST_START'
export const LIST_FAILED = 'LIST_FAILED'
export const LIST_SUCCEED = 'LIST_SUCCEEDT'
export const LIST_SELECT = 'LIST_SELECT'
export const LIST_DELETE = 'LIST_DELETE'
const pageSize = 200;

// import {limitSearch} from '../../../../DBike/src/request/leanCloud'
import {send} from '../../request'
/**
 * 保证加载的时候，同个请求不窜行。
 */

export function clear(key:string,rowID:string){
    return {
        type: LIST_DELETE,
        rowID,
        key
    }
}


export function listLoad(key:string,params:Object):Function{
    return (dispatch) => {
        return dispatch(_requestlist(0,key,params));
    }
}

export function listLoadMore(key:string,params:Object):Function{
    return (dispatch,getState) => {
        const page = getState().list.getIn([key,'page']) +1;
        return dispatch(_requestlist(page,key,params));
    }
}

/**
 * 注册
 * @param  {[type]} state:Object [description]
 * @return {[type]}              [description]
 */
function _requestlist(page:number,key:string,params:Object):Function {

    return (dispatch,getState) => {
        const load = getState().list.getIn([key,'loadStatu'])
        if(load != LIST_LOAD_DATA && load != LIST_LOAD_MORE ){//not serial
            // const newParams = limitSearch(path,page,pageSize,params);
            params.params.skip = page * 40;
            dispatch(_listStart(page != 0,load == undefined,key));//当page 不为0 的时候则表示不是加载多页。
            console.log('test:', params);
            send(params).then(response => {
                !response.data && console.log('res:', response);
                dispatch(_listSucceed(response.results,page,key));
            }).catch(e => {
                console.log('error:',e.message)
                dispatch(_listFailed(key));
            })



        }
    }
}


/**
 * 请求成功
 * @param  {[type] data:Object [成功返回的数据]
 * @param  {[type]} page:number =  0 [当前的页数。]
 * @return {[type]}             [description]
 */

function _listSucceed(data:Object,page:number = 0,key:string):Object {
    let loadStatu = LIST_NORMAL
    if(data.length < pageSize){
        loadStatu = LIST_LOAD_NO_MORE
    }
    // if(page == 0 && data.length == 0){
    //     loadStatu = LIST_NO_DATA
    // }
    return {
        type: LIST_SUCCEED,
        page,
        loadStatu: loadStatu,
        data,
        key,
    }

}


/**
 * 请求失败
 * @param  {[type]} response:Object [description]
 * @return {[type]}                 [description]
 */
function _listFailed(key:string):Object {
    return {
        type: LIST_FAILED,
        loadStatu: 'LIST_LOAD_ERROR',
        key,
    }
}

/**
 * 开始请求，使得loaded 变动。
 * @param  {[type]} response:Object [description]
 * @return {[type]}                 [description]
 */
function _listStart(isLoadMore:bool,isFirst:bool,key:string):Object {
    let loadStatu = LIST_FIRST_JOIN
    if(!isFirst){
        loadStatu = isLoadMore?LIST_LOAD_MORE:LIST_LOAD_DATA
    }
    return {
        type: LIST_START,
        loadStatu: loadStatu,
        key,
    }
}



