
/*!
 *
 * https://leancloud.cn/docs/leanstorage_guide-js.html#从本地路径构建文件
 * 上传image 到leanCloud
 * @flow
 */

'use strict';

import {LeanCloud_APP_ID,LeanCloud_APP_KEY} from '../configure/leancloud'
import AV from 'leancloud-storage';
// AV.initialize(LeanCloud_APP_ID, LeanCloud_APP_KEY);
AV.init({
  appId: LeanCloud_APP_ID,
  appKey: LeanCloud_APP_KEY
});

export function  upload(image:string,callBack:Function){

    const file = new AV.File('image.jpg', {
      blob: {
        'uri':image,
        // height:100,
        // width:100,
        isStored:true,
      },
      owner:AV.User.currentAsync(),
    });
    // console.log('files:',file);
    file.save()
      .then((res) => {
        // console.log('Uploaded: ' + res.url())
        // console.log('Uploaded: ' + JSON.stringify(res));
        callBack(true,res);
      })
      .catch((err) => {
        console.log('Error: ' + err.message);
        callBack(false);
      });
}


export function uploadFilesByLeanCloud(imageURLs:any){

  const promises = imageURLs.map((imageURL,i)=>{

      const file = new AV.File('image.jpg', {
        blob: {
          'uri':imageURL,
          // height:100,
          // width:100,
          isStored:true,
        },
        owner:AV.User.currentAsync(),
      });
      // console.log('files:',file);
      return file.save();

    })


  return  Promise.all(promises);

}
