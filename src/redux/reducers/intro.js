/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'


import {
  SHOW_MODAL_SWIPER,
  HIDDEN_MODEL_SWIPER,
} from '../actions/intro'
import * as immutable from 'immutable';
import {ListView} from 'react-native'

const initialIntroState = immutable.fromJS({
  showModalSwiper:false,
});


export default function drawState(state:immutable.Map<String,any> = initialIntroState, action:Object) {
    switch (action.type) {
      case SHOW_MODAL_SWIPER:
      case HIDDEN_MODEL_SWIPER:
        return  state.setIn(['showModalSwiper'],action.showModalSwiper);
      default:
        return state
    }

}
