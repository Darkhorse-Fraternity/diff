/* @flow */

'use strict';


import {
  VOICE_TEST,
  NET_TEST,
  LOAD_AVATAR
} from '../actions/util'
//import {checkPhoneNum} from '../../util';
import * as immutable from 'immutable';
const initialUtilState = immutable.fromJS({
  test: {
    netTest:'未测试',
    voiceTest: '未测试'
  },
  loadAvatar:{
    statu:"success",
  }
});

export default function drawState(state:immutable.Map<string,Object> = initialUtilState, action:Object) {
    switch (action.type) {
      case VOICE_TEST:
        return state.setIn(['test', 'voiceTest'], action.voiceTest);
      case NET_TEST:
        return state.setIn(['test', 'netTest'], action.netTest);
      case LOAD_AVATAR:
        return state.setIn(['loadAvatar', 'statu'], action.statu);
      default:
        return state
    }

}
