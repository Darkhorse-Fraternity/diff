/* @flow */
'use strict';
import {
  NativeModules,
} from "react-native";
var ExportURLManager = NativeModules.ExportURLManager
export default  class URLManager {
  static openURL(url:String){
    ExportURLManager.presentURL(url,true);
  }
  static openURLWithQuery(url:String, query:Object) {
    ExportURLManager.presentURLString(url, query, true);
  }
  static registeNetworkConfig(userInfo:Object) {
    ExportURLManager.regiteNetworkConfig(userInfo);
  }
}
