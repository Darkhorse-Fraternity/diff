/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import {request,send} from '../../request';
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

import {uploadFilesByLeanCloud} from '../../util/uploadAVImage'
import {Toast,checkPhoneNum} from '../../util'

export const ICOMMIT_LIST_START = 'ICOMMIT_LIST_START'
export const ICOMMIT_LIST_FAILED = 'ICOMMIT_LIST_FAILED'
export const ICOMMIT_LIST_SUCCEED = 'ICOMMIT_LIST_SUCCEEDT'
export const ICOMMIT_DELETE_START = 'ICOMMIT_DELETE_START'
export const ICOMMIT_DELETE_SUCCEED = 'ICOMMIT_DELETE_SUCCEED'
export const ICOMMIT_DELETE_FAILED = 'ICOMMIT_DELETE_FAILED'
export const ICOMMIT_ADD_SUCCEED = 'ICOMMIT_ADD_SUCCEED'
export const ICOMMIT_ADD_FAILED = 'ICOMMIT_ADD_FAILED'
export const ICOMMIT_CONTENT_CHANGE = 'ICOMMIT_CONTENT_CHANGE'
export const ICOMMIT_BINDING_IDEAID = 'ICOMMIT_BINDING_IDEAID'
export const ICOMMIT_CHANGE_PHONE = 'ICOMMIT_CHANGE_PHONE'
export const ICOMMIT_COMMIT_IMAGE = 'ICOMMIT_COMMIT_IMAGE'
export const ICOMMIT_DELETE_IMAGE = 'ICOMMIT_DELETE_IMAGE'
export const ICOMMMIT_INDEX_CHANGE = 'ICOMMMIT_INDEX_CHANGE'


export const ICOMMIT_CLEAR_DATA = 'ICOMMIT_CLEAR_DATA'

import {navigatePop,navigateRefresh} from './nav'

const pageSize = 40;

export function iCommitListLoad():Function{
  return (dispatch,getState) => {
    return dispatch(_requestList(0));
  }
}

export function iCommitListLoadMore():Function{
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
        const loaded = state.iCommit.get('loaded');
        const idea = state.route.navigationState.routes
        [state.route.navigationState.index].idea
        const objectId = idea.get('objectId')
        const user = state.login.data;
        const params = limitSearch('iCommit',page,pageSize,{
          include:'user,images,replyImages',
           where:{
             'idea':{'__type':"Pointer","className":"TodoObject","objectId":objectId}}
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
        type: ICOMMIT_LIST_SUCCEED,
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
        type: ICOMMIT_LIST_FAILED,
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
        type: ICOMMIT_LIST_START,
        loadStatu: loadStatu,
    }
}

export function iCommitContentChange(content:string):Object{

  return {
    type:ICOMMIT_CONTENT_CHANGE,
    content
  }
}


export  function iCommitAdd():Function{
  return (dispatch,getState)=>{
    const state = getState();

    const obejctId = state.iCommit.get('ideaId')
    const user =state.login.data;
    const content = state.iCommit.get('content')
    const type = state.iCommit.get('type')
    const mobilePhoneNumber =  state.iCommit.get('phoneNumber')
    const imageURLs = state.iCommit.get('uris').toArray();

    if(content.length == 0){
      Toast.show('需要填写购买内容。')
      return
    }


    if(type == 'phone' && !checkPhoneNum(mobilePhoneNumber)){
      Toast.show('不是正确的手机号')
      return
    }

    if(type == 'image' && imageURLs.length ==0){
      Toast.show('必须含有图片')
      return
    }

    let oParam = {};
    if(type == 'phone') oParam = {mobilePhoneNumber}


    const params = {
      type,
      ...oParam,
      content,
      idea:{
          "__type": "Pointer",
          "className": "TodoObject",
          "objectId": obejctId},
      user:{
          "__type": "Pointer",
          "className": "_User",
          "objectId": user.objectId},
    }
    dispatch(navigateRefresh({rightButtonIsLoad:true}))


    // const sendPromis =  send(params).then((response)=>{
    //     dispatch(navigateRefresh({rightButtonIsLoad:false}))
    //     dispatch(navigatePop())
    //     dispatch(iCommitAddSucceed())
    //     dispatch(iCommitListLoad())
    // }).catch((item)=>{
    //     dispatch(navigateRefresh({rightButtonIsLoad:false}))
    //     dispatch(iCommitAddFailed())
    // })
    __handlePromis(type, imageURLs, params).then(response=>{
      dispatch(navigateRefresh({rightButtonIsLoad:false}))
      dispatch(navigatePop())
      dispatch(iCommitAddSucceed())
      dispatch(iCommitListLoad())
      dispatch(iCommitClearData())
    }).catch((res)=>{
        Toast.show(res.message)
      dispatch(navigateRefresh({rightButtonIsLoad:false}))
      dispatch(iCommitAddFailed())
    })
  }
}

async function __handlePromis(type:string,imageURLs:Array<string>,params:Object):Promise<any>{

  let images = {}
  if(type == 'image'){
    await uploadFilesByLeanCloud(imageURLs).then((response)=>{
       images = {
				"__op":"AddUnique",//添加数组
				"objects":response,
			}

      params = {images,...params}
    });

  }
  const newParams =  classCreatNewOne('iCommit',params)
  send(newParams)

}


function iCommitClearData():Object{
  return {
    type:ICOMMIT_CLEAR_DATA,
  }
}

 function iCommitAddSucceed():Object{
   Toast.show('发送成功')
  return {
    type:ICOMMIT_ADD_SUCCEED,
  }
}

 function iCommitAddFailed():Object{
  return {
    type:ICOMMIT_ADD_FAILED
  }
}

export function iCommitDelete(index:number):Function {
  return (dispatch,getState)=>{
    const data = getState().iCommnet.get('data');
    const item = data.get(index);
    //通知服务器,做伪删除，即把type改为3
    const params = classDelete("ICOMMIT",item.objectId)
    request(params, (response)=>{
      if(response.statu){
        dispatch(iCommitDeleteSucceed(index));
      }else{
        dispatch(iCommitDeleteFailed());
      }
    })

  }
}

export function iCommitDeleteSucceed(index:number):Object{
  return {
    type:ICOMMIT_DELETE_SUCCEED,
    index,
  }
}

export function iCommitDeleteFailed():Object{
  return {
    type:ICOMMIT_DELETE_FAILED
  }
}

export function iBindingIdeaID(ideaId:string,commitType:string):Object{
  return {
    type:ICOMMIT_BINDING_IDEAID,
    ideaId,
    commitType,
  }
}
export function changePhoneNumber(phoneNumber:string):Object{
  return {
    type:ICOMMIT_CHANGE_PHONE,
    phoneNumber
  }
}

export function commitImage(uri:string) {

	return {
		type: ICOMMIT_COMMIT_IMAGE,
    uri,
	}
}

export function deleteImage(uri:string){
  return {
    type: ICOMMIT_DELETE_IMAGE,
    uri,
  }
}

export function selectChange(index:number):Object{
  return {
    type:ICOMMMIT_INDEX_CHANGE,
    index,
  }
}
