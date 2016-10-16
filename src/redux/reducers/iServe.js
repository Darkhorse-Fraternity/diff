/* @flow */
'use strict';

import {
  ISERVE_LIST_START,
  ISERVE_LIST_FAILED,
  ISERVE_LIST_SUCCEED,
  ISERVE_DELETE_SUCCEED,
  ISERVE_ADD_FAILED,
  ISERVE_ADD_SUCCEED,
  ISERVE_CONTENT_CHANGE,
  ISERVE_BINDING_IDEAID,
  ISERVE_COMMIT_IMAGE,
  ISERVE_DELETE_IMAGE,
  ISERVE_CLEAR_DATA,
  ISERVE_PAGE_CHANGE,
  ISERVE_SET_PUBLISH,
} from '../actions/iServe'
import * as immutable from 'immutable';

const initialState = immutable.fromJS({
  iCommitId:'',//绑定的id 对象。
  content:'',
  loadStatu:'LIST_FIRST_JOIN',
  data:[],
  page:0,
  type:'image',
  uris:[],
  index:0,
});


export default function iServeState(state:immutable.Map<string,any> = initialState, action:Object) {
    switch (action.type) {
      case ISERVE_LIST_FAILED:
      case ISERVE_LIST_START:
        return state.mergeDeep({loadStatu:action.loadStatu});
      case ISERVE_LIST_SUCCEED:
        let data = state.get('data')
        const page = state.get('page')
         page == 0?data = action.data:data.push(action.data);
        return state.mergeDeep({
          loadStatu:action.loadStatu,
          page:action.page,
          data:data,
        });
      case ISERVE_ADD_SUCCEED:
      //TODO:
        return state
      case ISERVE_DELETE_SUCCEED:
      //TODO:
        return state
      case ISERVE_CONTENT_CHANGE:
        return state.setIn(['content'], action.content)

      case ISERVE_COMMIT_IMAGE:
        // const uris  =  state.get("uris").withMutations((list)=>{
        //   list.push(action.uri);
        // })
        const uris = state.get("uris").push(action.uri);
        return state.mergeDeep({uris:uris});
      case ISERVE_DELETE_IMAGE:
        const uris2  =  state.get("uris").withMutations((list)=>{
          list.pop(action.uri);
        })
        return state.setIn(['uris'],uris2);
      case ISERVE_PAGE_CHANGE:
        return state.mergeDeep({
          index:action.page,
          type:action.replytype,
          iCommitID:action.iCommitID,
        })
      case ISERVE_SET_PUBLISH:{

        const index = state.get('index')
        return state.updateIn(['data',index],item =>{
          return item.updateIn(['statu'],statu=>'publish')
        })
      }

      case ISERVE_CLEAR_DATA:
         return state.mergeDeep({
          conten:'',
          uris:[],
        })

      default:
        return state
    }

}
