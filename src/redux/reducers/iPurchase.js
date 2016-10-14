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
  IPURCHASE_BINDING_IDEAID,
  IPURCHASE_CHANGE_PHONE,
  IPURCHASE_COMMIT_IMAGE,
  IPURCHASE_DELETE_IMAGE,
  IPURCHASE_CLEAR_DATA,
} from '../actions/IPURCHASE'
import * as immutable from 'immutable';

const initialState = immutable.fromJS({
  ideaId:'',//绑定的id 对象。
  content:'',
  loadStatu:'LIST_FIRST_JOIN',
  data:[],
  page:0,
  type:'image',
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
      case IPURCHASE_BINDING_IDEAID:
        // return state.setIn(['ideaId'], action.ideaId)
        return state.mergeDeep({
          ideaId:action.ideaId,
          type:action.commitType,
        })
      case IPURCHASE_CLEAR_DATA:
        return initialState
      default:
        return state
    }

}
