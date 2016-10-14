/* @flow */
'use strict';

import {
  ICOMMENT_LIST_START,
  ICOMMENT_LIST_FAILED,
  ICOMMENT_LIST_SUCCEED,
  ICOMMENT_DELETE_SUCCEED,
  ICOMMENT_ADD_FAILED,
  ICOMMENT_ADD_SUCCEED,
  ICOMMENT_CONTENT_CHANGE,
  ICOMMENT_BINDING_IDEAID,
} from '../actions/iComment'
import * as immutable from 'immutable';

const initialIdeaListState = immutable.fromJS({
  ideaId:'',//绑定的id 对象。
  content:'',
  loadStatu:'LIST_FIRST_JOIN',
  data:[],
  page:0,
});


export default function iCommentState(state:immutable.Map<string,any> = initialIdeaListState, action:Object) {
    switch (action.type) {
      case ICOMMENT_LIST_FAILED:
      case ICOMMENT_LIST_START:
        return state.mergeDeep({loadStatu:action.loadStatu});
      case ICOMMENT_LIST_SUCCEED:
        let data = state.get('data')
        const page = state.get('page')
         page == 0?data = action.data:data.push(action.data);
        return state.mergeDeep({
          loadStatu:action.loadStatu,
          page:action.page,
          data:data,
        });
      case ICOMMENT_ADD_SUCCEED:
      //TODO:
        return state
      case ICOMMENT_DELETE_SUCCEED:
      //TODO:
        return state
      case ICOMMENT_CONTENT_CHANGE:
        return state.setIn(['content'], action.content)
      case ICOMMENT_BINDING_IDEAID:
        return state.setIn(['ideaId'], action.ideaId)
      default:
        return state
    }

}
