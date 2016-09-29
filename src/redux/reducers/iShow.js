/* @flow */
'use strict';

import {
  ISHOW_LIST_START,
  ISHOW_LIST_FAILED,
  ISHOW_LIST_SUCCEED,
  ISHOW_LIST_SELECT,
  ISHOW_DELETE_SUCCEED
} from '../actions/iShow'
import * as immutable from 'immutable';

const initialiShowListState = immutable.fromJS({
  page:0,
  index:0,//用于选取详细页面的数据。
  loadStatu:'LIST_FIRST_JOIN',
  data:[],
});

export default function iShowState(state:immutable.Map<String,any> = initialiShowListState, action:Object) {
    switch (action.type) {
      case ISHOW_LIST_FAILED:
      case ISHOW_LIST_START:
        return state.mergeDeep({loadStatu:action.loadStatu});
      case ISHOW_LIST_SUCCEED:{
        let data = state.get('data')
        const page = state.get('page')
         page == 0?data = action.data:data.push(action.data);
        return state.mergeDeep({
          loadStatu:action.loadStatu,
          page:action.page,
          data:data,
        });}
      case ISHOW_LIST_SELECT:
        return state.mergeDeep({index:action.index});
      case  ISHOW_DELETE_SUCCEED:{
        let data = state.get('data')
        let index = state.get('index')
        let loadStatu =state.get('loadStatu')
        const data2 =  data.remove(index);
        return state.merge({
          index:0,
          data:data2,
          loadStatu:data.length==0?'LIST_NO_DATA  ':loadStatu

        })}
      default:
        return state
    }
}
