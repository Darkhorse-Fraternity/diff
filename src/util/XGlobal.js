/* @flow */
'use strict';
import ReactNative,{Linking,Alert} from 'react-native';
import RCTDeviceEventEmitter  from 'RCTDeviceEventEmitter';
import EmitterSubscription from 'EmitterSubscription';
import Platform  from 'Platform';
//全局可用的参数下载这里。
//

//登录的数据需要做成全局可以用 ES6 单例写法
//http://amanvirk.me/singleton-classes-in-es6/
//
//

let instance = null;
const UserManageSaveInfo = 'UserManageSaveInfo';
class UserManager {
  userData:Object;
  isFirstJoin:bool;
  isLogin:bool;
  constructor() {
    if (!instance) {
      instance = this;
      this.userData = {
        user_token : '',
        user_info :{
          user_name : "未命名",//用户名
          nick : "",//昵称
          headimg : "",//用户头像

          uid : -1,//用户id

          grade_str :"高一" , //年级
          grade:0,
          place_id:'',
          place_str:'',//地区串（浙江杭州西湖区）
          school_id:0,//学校ID
          school_str:'',//学校名称
          order_url:'',//订单链接地址
          left_course_time : "",  //剩余课时
          connect_phone : "",  //联系手机号
        }
      };
      this.isFirstJoin = true;
      this.isLogin = false;
    }
    return instance;
  }

  saveInfo(info:Object,...params:any){
    // 合并信息
     Object.assign(this.userData.user_info,info,...params);
    // 发出通知给监听者。
    RCTDeviceEventEmitter.emit(UserManageSaveInfo, this.userData.user_info);
  }

  lestenUerInfo(callBack:Function): EmitterSubscription{

    return  RCTDeviceEventEmitter.addListener(UserManageSaveInfo,callBack);
  }
}
export const userManager = new UserManager();

//保存到本地
const Save_UserData_Key = 'saveUserData';
const Save_FirstTime_Key = 'saveFirstTime';
const Save_Account_Key = 'saveAccount';
export function saveUserData(data:Object){
    // userManager.userData.user_token =  data.user_token;


    //从普通按钮中来的。
    // RCTDeviceEventEmitter.emit("userIsLogin",
    //   {"isLogin":userManager.isLogin,"isFromStorage":false});
    global.storage.save({
       key: Save_UserData_Key,  //注意:请不要在key中使用_下划线符号!
       rawData: data,
     });
}

export function saveFirstTime()
{
   global.storage.save({
     key: Save_FirstTime_Key,  //注意:请不要在key中使用_下划线符号!
     rawData: false,
   });
}
export function loadFirstJoin(){
  global.storage.load({
     key: Save_FirstTime_Key,
   }).then( ret => {
     RCTDeviceEventEmitter.emit("loadFirstJoin",ret);
   }).catch( err => {});
}

export function clearUserData() {
  userManager.userData = {
    user_token : '',
    user_info :{
      user_name : "未命名",//用户名
      nick : "",//昵称
      headimg : "",//用户头像
      uid : -1,//用户id
      grade_str :"高一" , //年级
      grade:0,
      place_id:'',
      place_str:'',//地区串（浙江杭州西湖区）
      school_id:0,//学校ID
      school_str:'',//学校名称
      order_url:'',//订单链接地址
      left_course_time : "",  //剩余课时
      connect_phone : "",  //联系手机号
    }
  };
  global.storage.remove({
    key:Save_UserData_Key
  });
}




export function loadUserData():Promise{
  // 读取
  // 这边sui
  //

  return  global.storage.load({
     key: Save_UserData_Key,

     //autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
     autoSync: true,

     //syncInBackground(默认为true)意味着如果数据过期，
     //在调用同步方法的同时先返回已经过期的数据。
     //设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
     //syncInBackground: false
   }).then( ret => {
     //如果找到数据，则在then方法中返回

    //  alert(`userManager.isLogin:${userManager.isLogin}`)
      // console.log('test:','---')
     RCTDeviceEventEmitter.emit("userIsLogin", {"isLogin":true,
           "data":ret});
   }).catch( err => {
     //如果没有找到数据且没有同步方法，
     //或者有其他异常，则在catch中返回
    //  alert(`THIS IS A ERR ${err}`);
      // console.log('test:','---1')
     RCTDeviceEventEmitter.emit("userIsLogin",
         {"isLogin":false});
    //  console.warn(err);
   })
}



//存储登录账号
export function saveAccount(account:string){
  global.storage.save({
     key: Save_Account_Key,  //注意:请不要在key中使用_下划线符号!
     rawData: account,
   });
}

//
export  function loadAccount(callBack:Function){
    global.storage.load({key: Save_Account_Key,}).then(ret =>{
      callBack(ret);
    }).catch(err =>{
      console.log('loadAccount:',err);
    })
  }

/**
 * 提示升级
 */

 // static alert(title: string, message?: string, button?: Buttons, type?: AlertType)
 //  {
 //  	'update':1,
 //  	'enfoce':0,
 //  	content:'',
 //  	title:'',
 //  	download_url:''
 //  }

export function alertUpdate(data:Object) {
  if(data.update){
    Alert.alert(
      data.title||'有新版本了',
      data.content||'我们需要升级~',
      data.enfoce?
      [{text: '点击升级', onPress: () => _goUpDate(data)}]
      :[{text: '取消'},{text: '点击升级', onPress: () => _goUpDate(data)}]
     )
   }
}

function _goUpDate(data:Object){
    if (data.enfoce) {
        alertUpdate(data);
    }
    // if (Platform.OS == 'ios') {
      Linking.openURL(data.download_url);
    // }else{
    //
    // }
};
