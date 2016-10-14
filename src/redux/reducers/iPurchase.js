/* @flow */
'use strict';

import {
  ICOMMIT_LIST_START,
  ICOMMIT_LIST_FAILED,
  ICOMMIT_LIST_SUCCEED,
  ICOMMIT_DELETE_SUCCEED,
  ICOMMIT_ADD_FAILED,
  ICOMMIT_ADD_SUCCEED,
  ICOMMIT_CONTENT_CHANGE,
  ICOMMIT_BINDING_IDEAID,
  ICOMMIT_CHANGE_PHONE,
  ICOMMIT_COMMIT_IMAGE,
  ICOMMIT_DELETE_IMAGE,
  ICOMMIT_CLEAR_DATA,
} from '../actions/iCommit'
import * as immutable from 'immutable';

const initialState = immutable.fromJS({
  ideaId:'',//绑定的id 对象。
  content:'',
  loadStatu:'LIST_FIRST_JOIN',
  data:[],
  page:0,
  type:'image',
  uris:[],
  phoneNumber:'',
});


export default function iCommitState(state:immutable.Map<String,any> = initialState, action:Object) {
    switch (action.type) {
      case ICOMMIT_LIST_FAILED:
      case ICOMMIT_LIST_START:
        return state.mergeDeep({loadStatu:action.loadStatu});
      case ICOMMIT_LIST_SUCCEED:
        let data = state.get('data')
        const page = state.get('page')
         page == 0?data = action.data:data.push(action.data);
        return state.mergeDeep({
          loadStatu:action.loadStatu,
          page:action.page,
          data:data,
        });
      case ICOMMIT_ADD_SUCCEED:
      //TODO:
        return state
      case ICOMMIT_DELETE_SUCCEED:
      //TODO:
        return state
      case ICOMMIT_CONTENT_CHANGE:
        return state.setIn(['content'], action.content)
      case ICOMMIT_BINDING_IDEAID:
        // return state.setIn(['ideaId'], action.ideaId)
        return state.mergeDeep({
          ideaId:action.ideaId,
          type:action.commitType,
        })
      case ICOMMIT_CHANGE_PHONE:
        return state.setIn(['phoneNumber'], action.phoneNumber)
        case ICOMMIT_COMMIT_IMAGE:
          // const uris  =  state.get("uris").withMutations((list)=>{
          //   list.push(action.uri);
          // })
          const uris = state.get("uris").push(action.uri);
          return state.mergeDeep({uris:uris});
        case ICOMMIT_DELETE_IMAGE:
          const uris2  =  state.get("uris").withMutations((list)=>{
            list.pop(action.uri);
          })
          return state.setIn(['uris'],uris2);
      case ICOMMIT_CLEAR_DATA:
        return initialState
      default:
        return state
    }

}
