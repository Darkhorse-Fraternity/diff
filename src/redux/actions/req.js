/**
 * Created by lintong on 10/19/16.
 * @flow
 */
'use strict';
import {send} from '../../request'
export const REQUEST_LOAD = 'REQUEST_LOAD'
export const REQUEST_SUCCEEED = 'REQUEST_SUCCEEED'
export const REQUEST_FAILED = 'REQUEST_FAILED'

export function request(key: string, params: Object,callBack:Function): Function {


    const callback2 =  callBack
    return (dispatch) => {
        dispatch(requestStart(key));//当page 不为0 的时候则表示不是加载多页。
        send(params).then(response => {

            // console.log('test:', response);
            dispatch(requestSucceed(key, response))
            if(callback2)callback2(response.return_code != 'fail',response)

        }).catch(e => {
            console.log('e:', e.message);
            dispatch(requestFailed(key, e.message))
            if(callback2)callback2(false,e)
        })
    }
}

function requestSucceed( key: string,data: Object): Object {
    return {
        type: REQUEST_SUCCEEED,
        load: false,
        payload: data,
        key,
    }

}


/**
 * 请求失败
 * @param  {[type]} response:Object [description]
 * @return {[type]}                 [description]
 */
function requestFailed(key: string, err: any): Object {
    return {
        type: REQUEST_FAILED,
        load: false,
        key,
        err,
    }
}

/**
 * 开始请求，使得loaded 变动。
 * @param  {[type]} response:Object [description]
 * @return {[type]}                 [description]
 */
function requestStart(key: string): Object {
    return {
        type: REQUEST_LOAD,
        load: true,
        key,
    }
}


 export  function clearData(key:string) {
    return (dispatch)=>dispatch(requestSucceed(key, undefined))
}