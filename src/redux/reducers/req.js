/**
 * Created by lintong on 10/19/16.
 * @flow
 */
'use strict';
import {
    REQUEST_LOAD,
    REQUEST_FAILED,
    REQUEST_SUCCEEED
} from '../actions/req'

import * as immutable from 'immutable';
const initialState = immutable.fromJS({});

export default function reqState(state: immutable.Map<string,any> = initialState, action: Object) {

    switch (action.type) {
        case REQUEST_LOAD:{
            return  state.setIn([action.key,'load'], action.load);
        }
        case REQUEST_FAILED:{
            return  state.setIn([action.key,'load'], action.load).setIn([action.key,'err'], action.err);
        }
        case REQUEST_SUCCEEED:{
            return state.set(action.key,immutable.fromJS({
                load:action.load,
                data:action.payload
            }));
        }
        default:
            return state;
    }
}

