/* @flow */
'use strict';

import {
  ICOLLECTION_LIST_START,
  ICOLLECTION_LIST_FAILED,
  ICOLLECTION_LIST_SUCCEED,
  ICOLLECTION_LIST_SELECT,
  ICOLLECTION_DELETE_SUCCEED
} from '../actions/iCollection'
import * as immutable from 'immutable';

const initialIdeaListState = immutable.fromJS({
  page:0,
  index:0,//用于选取详细页面的数据。
  loadStatu:'LIST_FIRST_JOIN',
  data:[],
});

export default function drawState(state:immutable.Map<string,any> = initialIdeaListState, action:Object) {
    switch (action.type) {
      case ICOLLECTION_LIST_FAILED:
      case ICOLLECTION_LIST_START:
        return state.mergeDeep({loadStatu:action.loadStatu});
      case ICOLLECTION_LIST_SUCCEED:
        let data = state.get('data')
        const page = state.get('page')
         page == 0?data = action.data:data.push(action.data);
        return state.merge({
          loadStatu:action.loadStatu,
          page:action.page,
          data:data,
        });
      case ICOLLECTION_LIST_SELECT:
        return state.mergeDeep({index:action.index});
      case  ICOLLECTION_DELETE_SUCCEED:
        let data = state.get('data')
        let index = state.get('index')
        data.pop(index);
        return state.merge({
          index:0,
          data:data,
        })
      default:
        return state
    }
}
