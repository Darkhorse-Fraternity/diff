/* @flow */
'use strict';
import {
  NativeModules,
} from "react-native";
var ToastIOS = NativeModules.ToastIOS
export default   class Toast {
  constructor() {

  }
  static show(message:String){
    ToastIOS.show(message,null,2);
  }
  static  longShow(message:String){
    ToastIOS.show(message,null,5);
  }
}
