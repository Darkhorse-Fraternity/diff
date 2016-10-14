/* @flow */

'use strict'
import {uploadFilesByLeanCloud} from '../../util/uploadAVImage'
import {Toast} from '../../util'
import {request} from '../../request'
import {classCreatNewOne} from '../../request/leanCloud'
import {navigateRefresh,navigatePop} from './nav'
export const COMMIT_IMAGE = 'COMMIT_IMAGE'
export const DELETE_IMAGE = 'DELETE_IMAGE'
export const CLEAR_CONTRIBUTE = 'CLEAR_CONTRIBUTE'
export const PUT_MY_IDEA_SCCEED = 'PUT_MY_IDEA_SCCEED'
export const PUT_MY_IDEA_FAIL = 'PUT_MY_IDEA_FAIL'
export const PUT_MY_IDEA_START = 'PUT_MY_IDEA_START'
export const CLEAN_MY_IDEA_DATA = 'CLEAN_MY_IDEA_DATA'
export const ADD_MY_IDEA_TITLE = 'ADD_MY_IDEA_TITLE'
export const ADD_MY_IDEA_CONTENT = 'ADD_MY_IDEA_CONTENT'
export const ADD_MY_IDEA_LINK = 'ADD_MY_IDEA_LINK'
export const ADD_MY_IDEA_PRICE = 'ADD_MY_IDEA_PRICE'
export const CHANGE_REPLY_TYPE = 'CHANGE_REPLY_TYPE'
export const CHANGE_COMMIT_TYPE = 'CHANGE_COMMIT_TYPE'
export const SHOW_CONTRIBUTE_MODAL = 'SHOW_CONTRIBUTE_MODAL'
/**
 * [tabSwitch description]
 * @param  {[type]} Param:Object [description]
 * @return {[type]}              [description]
 */
export function commitImage(uri:string) {

	return {
		type: COMMIT_IMAGE,
    uri,
	}
}

export function deleteImage(uri:string){
  return {
    type: DELETE_IMAGE,
    uri,
  }
}

export function clearImage(){
  return {
    type: CLEAR_CONTRIBUTE,
  }
}




export function putMyIdea():Function{

	return (dispatch, getState) => {

		const state = getState()

    const type = state.contribute.get('replyType')




		const imageURLs = state.contribute.get('uris').toArray();
		const title = state.contribute.get('title')
		const contents = state.contribute.get('content')

	 	let price = state.contribute.get('price')

		//做约束检查。
		if(imageURLs.length < 2){
			Toast.show('图片不能少于两张,更多的图片更能吸引用户哦~');
			return;
		}else if (title.length == 0) {
			Toast.show('不能没有题目,做一些关于内容的简介吧');
			return;
		}else if (contents.length == 0) {
			Toast.show('怎么能没有介绍呢？( ⊙ o ⊙ )啊！');
			return;
		}else if(price.length == 0){
			price = 0;
		}


    let link = ''
    let commitType = ''
    if(type == 'image' || type == 'write' || type == 'phone'){
      commitType = state.contribute.get('commitType')
			if (commitType.length == 0) return;
    }else if(type == 'link') {
      link = state.contribute.get('link')
			if(link.length == 0){
				Toast.show('需要给出您的链接');
				return;
			}
    }



		dispatch(_putMyIdeaStart())
		dispatch(navigateRefresh({'rightButtonIsLoad':true}))
		const promise = 	uploadFilesByLeanCloud(imageURLs);
		const userID = state.login.data.objectId;
		promise.then((res) => {
			const images = {
				"__op":"AddUnique",//添加数组
				"objects":res,
			}
			const user = {
					"__type":"Pointer",
					"className":"_User",
					"objectId":userID,
			}
			 //完成后将取出的值加入到该idea中提交。
			 const params = {
				 images,
				 user,
				 contents,
				 title,
				 link,
				 price,
         type,
         commitType,
			 }
			 const newParams = classCreatNewOne('TodoObject',params);
			 request(newParams, (response)=>{
				 if (response.statu) {
					 //返回退出并清空数据。
					 Toast.show('您的创意想法已经提交。')
					 dispatch(_putMyIdeaSucceed())
					 dispatch(navigatePop())
					 dispatch(cleanMyIdea())

				 }else{
					 console.log('res',response);
					 throw new Error(response.msg);
				 }
			 });

		}).catch((err) => {
			console.warn('Error: ' + err.message);
			//返回错误代码，告知

			dispatch(navigateRefresh({'rightButtonIsLoad':false}))
			dispatch(_putMyIdeaFail());
		});
	}

}

function _putMyIdeaSucceed():Object{
	return {
		type:PUT_MY_IDEA_SCCEED,
		loaded:false,
	}
}

function _putMyIdeaFail():Object{
	return {
		type:PUT_MY_IDEA_FAIL,
		loaded:false,
	}
}

function _putMyIdeaStart():Object{
	return {
		type:PUT_MY_IDEA_START,
		loaded:true,
	}
}

export function cleanMyIdea():Object{
	return {
		type:CLEAN_MY_IDEA_DATA,
	}
}

export function addTitle(title:string):Object{
	return {
		type:ADD_MY_IDEA_TITLE,
		title:title
	}
}

export function addContent(content:string):Object{
	return {
		type:ADD_MY_IDEA_CONTENT,
		content:content,

	}
}

export function addLink(link:string):Object{
	return {
		type:ADD_MY_IDEA_LINK,
		link:link,
	}
}

export function addPrice(price:string):Object{
	return{
		type:ADD_MY_IDEA_PRICE,
		price:price,
	}
}

// function _putMyIdeaRequest(images:Array<Object>,contents:string):Function{
// 	return (dispatch,getState)=>{
//
// 	}
// }
//
export function changeReplyType(replyType:string):Object{
	return {
		type:CHANGE_REPLY_TYPE,
    replyType,
	}
}

export function changeCommitType(commitType:string):Object{
	return {
		type:CHANGE_COMMIT_TYPE,
    commitType,
	}
}

export function showModal(showModal:bool):Object{
	return {
		type:SHOW_CONTRIBUTE_MODAL,
		showModal
	}
}
