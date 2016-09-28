/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'



import {request} from '../../request';
import {classBatch,classNormalSearch} from '../../request/leanCloud';

export const SHOW_MODAL_SWIPER = 'SHOW_MODAL_SWIPER'
export const HIDDEN_MODEL_SWIPER = 'HIDDEN_MODEL_SWIPER'


export function showModalSwiper():Object{
  return {
    type:SHOW_MODAL_SWIPER,
    showModalSwiper:true,
  }
}

export function hiddenModelSwiper():Object{
  return {
    type:HIDDEN_MODEL_SWIPER,
    showModalSwiper:false,
  }
}

//查询collection 是否存在 需要使用批量操作。
export function getIntroData():Function{
  return (dispatch,getState)=>{
    const state = getState();
    const index = state.ideaList.index;
    const data = state.ideaList.data[index];
    const obejctId = data.objectId;
    const user = state.login.data
    const collectionExist =classNormalSearch('TodoObject',obejctId,{
      where:{"colleaction":{"$in":[user]}}
    })
    const params =  classBatch([collectionExist])
    request(params, (response)=>{
      if(response.statu){

      }else{

      }
    })

  }
}
