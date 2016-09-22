/*!
 *
 * https://github.com/marcshilling/react-native-image-picker
 * 选取照片
 * @flow
 */
'use strict';

import ImagePicker from 'react-native-image-picker'
import {Toast} from './'
import {StatusBar} from 'react-native'

const DEFAULT_OPTIONS = {
  title: '修改头像', // specify null or empty string to remove the title
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: '从手机相册选择', // specify null or empty string to remove this button
  // customButtons: {
  //   //'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  // },
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  durationLimit: 10, // video recording max time in seconds
  maxWidth: 150, // photos only
  maxHeight: 150, // photos only
  aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
  quality: 0.2, // 0 to 1, photos only
  angle: 0, // android only, photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image after selection
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
  //**  skipBackup: true, // ios only - image will NOT be backed up to icloud
    path: 'images' // ios only - will save image at /Documents/images rather than the root
  }
}

export default function imagePicker(options:Object,callBack:Function){


  // StatusBar.setBarStyle('default', false);
  ImagePicker.showImagePicker({...DEFAULT_OPTIONS, ...options}, (response) => {
  // console.log('Response = ', response);
    // StatusBar.setBarStyle('light-content', false);
    // console.log(response);
  callBack(response);
  if (response.didCancel) {
    // console.log('User cancelled image picker');
  }
  else if (response.error) {
    Toast.show(response.error)
    // console.log('ImagePicker Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
    // You can display the image using either data:
    // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

    // uri (on iOS)
    //const source = {uri: response.uri.replace('file://', ''), isStatic: true};
    // uri (on android)
    //const source = {uri: response.uri, isStatic: true};


  }
});



}
