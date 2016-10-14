/* @flow */
'use strict';

import {
  IDEA_LIST_START,
  IDEA_LIST_FAILED,
  IDEA_LIST_SUCCEED,
  IDEA_LIST_SELECT,
} from '../actions/ideaList'
import * as immutable from 'immutable';

const initialIdeaListState = immutable.fromJS({
  page:0,
  index:0,//用于选取详细页面的数据。
  loadStatu:'LIST_FIRST_JOIN',
  data:[],
});


export default function ideaState(state:immutable.Map<string,any> = initialIdeaListState, action:Object) {
    switch (action.type) {
      case IDEA_LIST_FAILED:
      case IDEA_LIST_START:
        return state.mergeDeep({loadStatu:action.loadStatu});
      case IDEA_LIST_SUCCEED:
        let data = state.get('data')
        const page = state.get('page')
         page == 0?data = action.data:data.push(action.data);
        return state.mergeDeep({
          loadStatu:action.loadStatu,
          page:action.page,
          data:data,
        });
      case IDEA_LIST_SELECT:
        return state.mergeDeep({index:action.index});
      default:
        return state
    }

}
