/* @flow */
'use strict';

import {
  ToastAndroid,
} from "react-native";
export default class Toast {
  constructor() {

  }

  static show(message:String){
    ToastAndroid.show(message,0);
  }
  static longShow(message:String){
    ToastAndroid.show(message,1);
  }
}
