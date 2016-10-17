/*@flow*/
'use strict'



import TabView  from './TabView'
import LoginView from '../../pages/Setting/LoginView';
import PersonCenter from '../../pages/PersonInfo/PersonCenter';
import PersonInfo from '../../pages/PersonInfo';
import BaseWebView from '../../components/Base/BaseWebView';
import Setting from '../../pages/Setting';
import FindPwd from '../../pages/Setting/FindPwd';
import RegPhone from '../../pages/Setting/RegPhone'
import Feedback from '../../pages/Setting/Feedback'
//
//
import AlterPwd from '../../pages/PersonInfo/AlterPwd'
import NickName from '../../pages/PersonInfo/NickName'
// import PhoneContacts from '../../pages/PersonInfo/PhoneContacts';
import Contribute from '../../pages/Submit/Contribute'
import Intro from '../../pages/Other/Intro'
import IdeaList from '../../pages/Other/IdeaList'
import iShowList from '../../pages/Other/IShowList'
import iShowDetail from '../../pages/Other/iShowDetail'
import Comment from '../../pages/Other/Comment'
import AddComment from '../../pages/Other/AddComment'
import Submit from '../../pages/Submit/'
import Normal from '../../pages/Submit/Normal'
import iCommit from '../../pages/Other/iCommit'
import iServe from '../../pages/Other/iServe'
import iPurchase from '../../pages/Other/iPurchase'
import iReply from '../../pages/Other/iReply'
import iRate from '../../pages/Other/iRate'
import introDetail from '../../pages/Other/introDetail'
export  const PageMap =
{
  introDetail,
  iRate,
  iReply,
  iPurchase,
  iServe,
  Normal,
  Submit,
  iCommit,
  "WebView"             : BaseWebView,
  'TabView'             : TabView,

  'LoginView'           : LoginView,
  "PersonCenter"        : PersonCenter,
  "PersonInfo"          : PersonInfo,
  "Setting"             : Setting,
  "FindPwd"             : FindPwd,
  'Feedback'            : Feedback,
  "AlterPwd"            : AlterPwd,
  "NickName"            : NickName,
  // "PhoneContacts"       : PhoneContacts,
  'RegPhone'            : RegPhone,
  'Contribute'          : Contribute,
  'Intro'               : Intro,
  'IdeaList'            : IdeaList,
  'iShowList'           : iShowList,
  'iShowDetail'         : iShowDetail,
  'Comment'             : Comment,
  'AddComment'          : AddComment,
}
