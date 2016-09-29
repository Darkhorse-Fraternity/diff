/* @flow */
'use strict';

import {
  IJOIN_LIST_START,
  IJOIN_LIST_FAILED,
  IJOIN_LIST_SUCCEED,
  IJOIN_LIST_SELECT,
  IJOIN_DELETE_SUCCEED
} from '../actions/iJoin'
import * as immutable from 'immutable';

const initialIdeaListState = immutable.fromJS({
  page:0,
  index:0,//用于选取详细页面的数据。
  loadStatu:'LIST_FIRST_JOIN',
  data:[],
});

export default function iJoinState(state:immutable.Map<String,any> = initialIdeaListState, action:Object) {
    switch (action.type) {
      case IJOIN_LIST_FAILED:
      case IJOIN_LIST_START:
        return state.mergeDeep({loadStatu:action.loadStatu});
      case IJOIN_LIST_SUCCEED:
        let data = state.get('data')
        const page = state.get('page')
         page == 0?data = action.data:data.push(action.data);
        return state.mergeDeep({
          loadStatu:action.loadStatu,
          page:action.page,
          data:data,
        });
      case IJOIN_LIST_SELECT:
        return state.mergeDeep({index:action.index});
      case  IJOIN_DELETE_SUCCEED:
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
