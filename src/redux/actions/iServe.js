/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import {request, send} from '../../request';
import {limitSearch, classDelete, classUpdate} from '../../request/leanCloud';
import{
    LIST_FIRST_JOIN,
    LIST_NO_DATA,
    LIST_LOAD_DATA,
    LIST_LOAD_MORE,
    LIST_LOAD_NO_MORE,
    LIST_LOAD_ERROR,
    LIST_NORMAL,
} from '../../../src/components/Base/BaseListView'

import {Toast, checkPhoneNum} from '../../util'
import {uploadFilesByLeanCloud} from '../../util/uploadAVImage'


export const ISERVE_LIST_START = 'ISERVE_LIST_START'
export const ISERVE_LIST_FAILED = 'ISERVE_LIST_FAILED'
export const ISERVE_LIST_SUCCEED = 'ISERVE_LIST_SUCCEEDT'
export const ISERVE_DELETE_START = 'ISERVE_DELETE_START'
export const ISERVE_DELETE_SUCCEED = 'ISERVE_DELETE_SUCCEED'
export const ISERVE_DELETE_FAILED = 'ISERVE_DELETE_FAILED'
export const ISERVE_ADD_SUCCEED = 'ISERVE_ADD_SUCCEED'
export const ISERVE_ADD_FAILED = 'ISERVE_ADD_FAILED'
export const ISERVE_CONTENT_CHANGE = 'ISERVE_CONTENT_CHANGE'
export const ISERVE_BINDING_IDEAID = 'ISERVE_BINDING_IDEAID'
export const ISERVE_COMMIT_IMAGE = 'ISERVE_COMMIT_IMAGE'
export const ISERVE_DELETE_IMAGE = 'ISERVE_DELETE_IMAGE'
export const ISERVE_CLEAR_DATA = 'ISERVE_CLEAR_DATA'
export const ISERVE_INDEX_CHANGE = 'ISERVE_INDEX_CHANGE'
export const ISERVE_SET_PUBLISH = 'ISERVE_SET_PUBLISH'

import {navigatePop, navigateRefresh} from './nav'

const pageSize = 40;

export function iServeListLoad(): Function {
    return (dispatch, getState) => {
        return dispatch(_requestList(0));
    }
}

export function iServeListLoadMore(): Function {
    return (dispatch, getState) => {
        const page = getState().ideaList.get('page') + 1;
        return dispatch(_requestList(page));
    }
}

/**
 * 注册
 * @param  {[type]} state:Object [description]
 * @return {[type]}              [description]
 */
function _requestList(page: number): Function {

    return (dispatch, getState) => {
        const state = getState();
        const loaded = state.iServe.get('loaded');
        // const idea = state.route.navigationState.routes
        // [state.route.navigationState.index].idea
        // const objectId = idea.get('objectId')
        const user = state.login.data;
        const params = limitSearch('iCommit', page, pageSize, {
            include: 'user,idea,images,idea.images',
            where: {
                "idea": {
                    "$inQuery": {
                        "where": {
                            'user': {'__type': "Pointer", "className": "_User", "objectId": user.objectId}
                        },
                        "className": "TodoObject"
                    }
                }
            }
        });
        if (!loaded) {//not serial
            dispatch(_listStart(page != 0));//当page 不为0 的时候则表示不是加载多页。
            request(params, function (response) {
                if (response.statu) {
                    dispatch(_listSucceed(response.data.results, page));
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

function _listSucceed(data: Object, page: number = 0): Object {
    let loadStatu = LIST_NORMAL
    if (data.length < pageSize) {
        loadStatu = LIST_LOAD_NO_MORE
    }
    if (page == 0 && data.length == 0) {
        loadStatu = LIST_NO_DATA
    }

    return {
        type: ISERVE_LIST_SUCCEED,
        page: page,
        loadStatu: loadStatu,
        data: data,
    }

}


/**
 * 请求失败
 * @param  {[type]} response:Object [description]
 * @return {[type]}                 [description]
 */
function _listFailed(response: Object): Object {
    return {
        type: ISERVE_LIST_FAILED,
        loadStatu: 'LIST_LOAD_ERROR',
    }
}

/**
 * 开始请求，使得loaded 变动。
 * @param  {[type]} response:Object [description]
 * @return {[type]}                 [description]
 */
var isFirst = true
function _listStart(isLoadMore: bool): Object {
    let loadStatu = LIST_FIRST_JOIN
    if (isFirst) {
        isFirst = false;
    } else {
        loadStatu = isLoadMore ? LIST_LOAD_MORE : LIST_LOAD_DATA
    }
    return {
        type: ISERVE_LIST_START,
        loadStatu: loadStatu,
    }
}

export function iServeContentChange(content: string): Object {

    return {
        type: ISERVE_CONTENT_CHANGE,
        content
    }
}


export function iServeAdd(): Function {
    return (dispatch, getState)=> {
        const state = getState();

        const content = state.iServe.get('content')
        const type = state.iServe.get('type')
        const imageURLs = state.iServe.get('uris').toArray();
        const id = state.iServe.get('iCommitID')
        if (content.length == 0) {
            Toast.show('需要填写回复内容。')
            return
        }


        if (type == 'image' && imageURLs.length == 0) {
            Toast.show('必须含有图片')
            return
        }


        const params = {
            statu: 'publish',
            replyContent: content,
        }
        dispatch(navigateRefresh({rightButtonIsLoad: true}))

        __handlePromis(type, imageURLs, id, params).then(response=> {
            dispatch(navigateRefresh({rightButtonIsLoad: false}))
            dispatch(navigatePop())
            dispatch(iServeAddSucceed())
            dispatch(iServeClearData())

            // dispatch(iServeListLoad())
            // 把上层对应row 改变数据
            dispatch(setPublish())
        }).catch((res)=> {
            Toast.show(res.message)
            dispatch(navigateRefresh({rightButtonIsLoad: false}))
            dispatch(iServeAddFailed())
        })
    }
}

async function __handlePromis(type: string, imageURLs: Array<string>, iCommitID: string, params: Object): Promise<any> {

    let replyImages = {}
    if (type == 'image') {
        await uploadFilesByLeanCloud(imageURLs).then((response)=> {
            replyImages = {
                "__op": "AddUnique",//添加数组
                "objects": response,
            }

            params = {replyImages, ...params}
        });

    }
    const newParams = classUpdate('iCommit', iCommitID, params)
    send(newParams)

}


function iServeClearData(): Object {
    return {
        type: ISERVE_CLEAR_DATA,
    }
}

function iServeAddSucceed(): Object {
    Toast.show('发送成功')
    return {
        type: ISERVE_ADD_SUCCEED,
    }
}

function iServeAddFailed(): Object {
    return {
        type: ISERVE_ADD_FAILED
    }
}

export function iServeDelete(index: number): Function {
    return (dispatch, getState)=> {
        const data = getState().iCommnet.get('data');
        const item = data.get(index);
        //通知服务器,做伪删除，即把type改为3
        const params = classDelete("iCommit", item.objectId)
        request(params, (response)=> {
            if (response.statu) {
                dispatch(iServeDeleteSucceed(index));
            } else {
                dispatch(iServeDeleteFailed());
            }
        })

    }
}

export function iServeDeleteSucceed(index: number): Object {
    return {
        type: ISERVE_DELETE_SUCCEED,
        index,
    }
}

export function iServeDeleteFailed(): Object {
    return {
        type: ISERVE_DELETE_FAILED
    }
}

export function iBindingIdeaID(ideaId: string, commitType: string): Object {
    return {
        type: ISERVE_BINDING_IDEAID,
        ideaId,
        commitType,
    }
}


export function commitImage(uri: string) {

    return {
        type: ISERVE_COMMIT_IMAGE,
        uri,
    }
}

export function deleteImage(uri: string) {
    return {
        type: ISERVE_DELETE_IMAGE,
        uri,
    }
}

export function indexChange(index: number, replytype: string, iCommitID: string): Object {
    return {
        type: ISERVE_INDEX_CHANGE,
        index,
        replytype,
        iCommitID,
    }
}

function setPublish(): Object {
    return {
        type: ISERVE_SET_PUBLISH,
    }
}
