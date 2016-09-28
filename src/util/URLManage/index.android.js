/* @flow */
'use strict';

import {
  Linking,
} from "react-native";
 import {addParams} from '../../request/useMeth'
export default class URLManager {
  static openURL(url:String){
    Linking.openURL(url,null);
  }
  static openURLWithQuery(url:String, query:Object) {

      Linking.openURL(addParams(url,query), null);

  }
}
