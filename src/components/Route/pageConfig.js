/*@flow*/
'use strict'



/**
 * 和page 分开写是为了避免循环引用，所以这边需要记得保持key的一致性。
 */


export  const pageConfig = {
  'TabView'           :{title:'创意列表',hideBackBtn:true,gestureResponseDistance:0.0001,
                          direction:'vertical',hideNavBar:true,},
  'LoginView'           :{title:'登录',hideNavBar:true,gestureResponseDistance:0.0001,
                          direction:'vertical'},

  "PersonCenter"        : { title : "个人中心", },
  "BaseWebView"         : { title : "加载中。。"},
  "CourseInfoView"      : { title : "课程详情", },
  "LessonEvaluateView"  : { title : "课程评价", },
  "PersonInfo"          : { title : "个人资料", },
  "MyOrder"             : { title : "我的订单",},
  "Setting"             : { title : "设置",   },
  "FindPwd"             : { title : "找回密码", },
  'Feedback'            : { title :"意见反馈",},
  "ClassRecord"         : { title : "课时流水", },
  "AlterPwd"            : { title : "修改密码", },
  "NickName"            : { title : "修改昵称", },
  "PhoneContacts"       : { title : "修改手机号", },
  'RegPhone'            : { title : '注册'},
  'Contribute'          : { title : '创意服务'},
  'Intro'               : { title : '介绍',hideNavBar:true},
  'IdeaList'            : { title : '创意列表'},
}

export function config(key:string):Object{

  return {
    key :key,
    ...(pageConfig[key]||{title:key}),
  }
}
