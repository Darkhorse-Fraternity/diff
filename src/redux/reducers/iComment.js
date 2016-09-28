/* @flow */
'use strict';

import {
  ICOMMENT_LIST_START,
  ICOMMENT_LIST_FAILED,
  ICOMMENT_LIST_SUCCEED,
} from '../actions/iComment'
import * as immutable from 'immutable';

const initialIdeaListState = immutable.fromJS({
  page:0,
  index:0,//用于选取详细页面的数据。
  loadStatu:'LIST_FIRST_JOIN',
  data:[],
});


export default function drawState(state:immutable.Map<String,any> = initialIdeaListState, action:Object) {
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

      default:
        return state
    }

}
