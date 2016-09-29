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
} from '../actions/iComment'
import * as immutable from 'immutable';

const initialIdeaListState = immutable.fromJS({
  content:'',
  loadStatu:'LIST_FIRST_JOIN',
  data:[],
});


export default function iCommentState(state:immutable.Map<String,any> = initialIdeaListState, action:Object) {
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
      default:
        return state
    }

}
