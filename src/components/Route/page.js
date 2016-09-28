/*@flow*/
'use strict'



import TabView  from './TabView'
import LoginView from '../../pages/LoginView';
import PersonCenter from '../../pages/PersonCenter';
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
import Contribute from '../../pages/Other/Contribute'
import Intro from '../../pages/Other/Intro'
import IdeaList from '../../pages/Other/IdeaList'
import iShowList from '../../pages/Other/IShowList'
export  const PageMap =
{
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
}
