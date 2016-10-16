/* @flow */
'use strict';

import {
  IPURCHASE_LIST_START,
  IPURCHASE_LIST_FAILED,
  IPURCHASE_LIST_SUCCEED,
  IPURCHASE_DELETE_SUCCEED,
  IPURCHASE_ADD_FAILED,
  IPURCHASE_ADD_SUCCEED,
  IPURCHASE_CONTENT_CHANGE,
  IPURCHASE_RATE_RESET,
  IPURCHASE_PAGE_CHANGE,
  IPURCHASE_RATE_CHANGE,
} from '../actions/iPurchase'
import * as immutable from 'immutable';

const initialState = immutable.fromJS({
  content:'',
  loadStatu:'LIST_FIRST_JOIN',
  data:[],
  type:'image',
  item:{},
  rate:0,
  page:0,
  index:0,
});


export default function iPurchaseState(state:immutable.Map<string,any> = initialState, action:Object) {
    switch (action.type) {
      case IPURCHASE_LIST_FAILED:
      case IPURCHASE_LIST_START:
        return state.mergeDeep({loadStatu:action.loadStatu});
      case IPURCHASE_LIST_SUCCEED:
        let data = state.get('data')
        const page = state.get('page')
         page == 0?data = action.data:data.push(action.data);
        return state.mergeDeep({
          loadStatu:action.loadStatu,
          page:action.page,
          data:data,
        });
      case IPURCHASE_ADD_SUCCEED:
      //TODO:
        return state
      case IPURCHASE_DELETE_SUCCEED:
      //TODO:
        return state
      case IPURCHASE_CONTENT_CHANGE:
        return state.setIn(['content'], action.content)
      case IPURCHASE_PAGE_CHANGE:
        return state.setIn(['index'],action.index)
      case IPURCHASE_RATE_CHANGE:
        return state.setIn(['rate'], action.rate)
      case IPURCHASE_RATE_RESET:{
        const index = state.get('index')
        const rate = state.get('rate')
       return state.updateIn(['data',index],item =>{

         return item.setIn(['statu'],'done').updateIn(['rate'],ra=>rate)
       })
      }

      default:
        return state
    }

}
