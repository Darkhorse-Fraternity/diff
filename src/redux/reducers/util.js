/* @flow */

'use strict';


import {
    VOICE_TEST,
    NET_TEST,
    LOAD_AVATAR,
    DATA_STORAGE
} from '../actions/util'
//import {checkPhoneNum} from '../../util';
import * as immutable from 'immutable';
const initialUtilState = immutable.fromJS({
    test: {
        netTest: '未测试',
        voiceTest: '未测试'
    },
    loadAvatar: {
        statu: "success",
    }
});

export default function drawState(state: immutable.Map<string,any> = initialUtilState, action: Object) {
    switch (action.type) {
        case VOICE_TEST:
            return state.setIn(['test', 'voiceTest'], action.voiceTest);
        case NET_TEST:
            return state.setIn(['test', 'netTest'], action.netTest);
        case LOAD_AVATAR:
            return state.setIn(['loadAvatar', 'statu'], action.statu);
        case DATA_STORAGE:
            const data = typeof action.data == 'object' ? immutable.fromJS(action.data) : action.data
            return state.set(action.key, data);
        default:
            return state
    }

}
