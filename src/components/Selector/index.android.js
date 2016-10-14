/* @flow */
'use strict';


export function showSelector(items:Array<string>,callBack:Function,title:string =''){

    const data =   {
        items: items,
        title: title,
        itemsCallback: callBack,
        negativeText: "取消",
    }
    const DialogAndroid = require('react-native-dialogs')
    const dialog = new DialogAndroid();
    dialog.set(data);
    dialog.show();
}
