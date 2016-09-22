/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

export const SHOW_MODAL_SWIPER = 'SHOW_MODAL_SWIPER'
export const HIDDEN_MODEL_SWIPER = 'HIDDEN_MODEL_SWIPER'


export function showModalSwiper():Object{
  return {
    type:SHOW_MODAL_SWIPER,
    showModalSwiper:true,
  }
}

export function hiddenModelSwiper():Object{
  return {
    type:HIDDEN_MODEL_SWIPER,
    showModalSwiper:false,
  }
}
