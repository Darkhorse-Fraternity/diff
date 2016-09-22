/* @flow */
'use strict';
import  React,{Component,PropTypes} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  ActivityIndicator
} from 'react-native'
import {pixel,navbarHeight} from '../../util/'
import { createAnimatableComponent } from 'react-native-animatable';
const AniView = createAnimatableComponent(View);
import Button from 'react-native-button'
// import {Actions} from "react-native-router-flux";
import {BCButton} from '../../components/Base/WBButton';
import {blackFontColor,backViewColor} from '../../configure';
// import {BCButton} from '../Base/WBButton';

import {request} from '../../request'
// import {logoutRequest} from '../../request/info'
import {connect} from 'react-redux'
import { navigatePush,navigatePopToIndex,navigateClearMiddleScene } from '../../redux/actions/nav'
import {logout} from '../../redux/actions/login'
const styles = StyleSheet.create({
  list: {
    backgroundColor: backViewColor,
    marginTop: navbarHeight,
  },
  groupSpace: {
    height: 15/2,
  },
  group: {
    backgroundColor: 'white',
  },
  row: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
  },


  // cbutton:{
  //   marginRight:10,
  //   marginLeft:10,
  //   marginTop: 20,
  //   height: 40,
  //   justifyContent: 'center',
  // },
  arrowView: {
    borderBottomWidth:pixel*2,
    borderRightWidth:pixel*2,
    borderColor:'#8c8c85',
    transform:[{rotate:'315deg'}],
    width:10,
    height:10,
  },
  ImageStyles:{
    width : 30,
    height: 30,
  },
  imageNail: {
    // marginTop: 13,
    // marginBottom: 13,
    marginLeft:10,
    width: 20,
    height: 20,
  },

  rowText: {
    marginLeft:10,
    fontSize: 14,
    color:blackFontColor,
  },
});


 class WBSetting extends Component {

  constructor(props:Object){
    super(props);
    this.state = {
      logoutLoad:false
    }
  }

  state:{
    logoutLoad:bool
  };

  _renderRow(title: string,needArrow:bool ,activity:bool = false,onPress: Function = ()=>{}) {
    return (
      <AniView animation="fadeIn" duration={500} delay={30}>
        <TouchableHighlight onPress={onPress}>
          <View style={styles.row}>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
              {/*<Image
                source={source}
                style={styles.imageNail}
              />*/}
              <Text style={styles.rowText}>
                {title}
              </Text>
            </View >
              {activity == false && needArrow && <View style={styles.arrowView}/>}
              {activity == true && <ActivityIndicator/>}
          </View>
        </TouchableHighlight>
      </AniView>
    );
  }

  handle:Object;
  _logout=()=>{
    //发送请求给服务器
    // this.setState({logoutLoad:true});
    // var self = this;
    // this.handle = request(logoutRequest, function(response){
    //     if(response.statu){
    //
    //       // NavigationManager.logout();//goToPage()
    //       self.props.logout();
    //       }
    //     this.setState({logoutLoad:false});
    //
    // });
     this.props.logout();
  };

  componentWillUnmount(){
      this.handle && this.handle.next();
  }



  render(){
      return(
        <ScrollView style={styles.list}>
          <View style={styles.groupSpace}/>

          {this._renderRow('意见反馈',true, false,() => {
            // NavigationManager.goToPage("Feedback");
              this.props.push("Feedback");
          })}
          {/*<View style={styles.groupSpace}/>*/}

          {/*{this._renderRow('手机测试',true,false, () => {
            // Actions.netTest();
            // NavigationManager.goToPage("NetTest");
            this.props.push("NetTest");
          })}*/}
          {/*<View style={styles.groupSpace}/>*/}

          {/*{this._renderRow('关于此刻',true,false, () => {
            // Actions.asWhiteBoard();
            // NavigationManager.goToPage("AsWhiteBoard");
            this.props.push("AsWhiteBoard");
          })}*/}
            <View style={styles.groupSpace}/>
          {this._renderRow('退出登录',false, this.state.logoutLoad,() => {
            // Actions.asWhiteBoard();
            this._logout();
          })}
        </ScrollView>
      );
  }
}


const mapStateToProps = (state) => {
  //从login reduce 中获取state的初始值。
  //console.log('state:',state);
	return {
     //state:state.login,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    push:(key)=>{
      dispatch(navigatePush(key))
    },
    logout:()=>{

      //TODO:用这种方法清除了多动画，但是动画并没有按照最后一个页面的动画方向行驶、
      //期待有更好的解决思路。

      //清除数据。
      // clearUserData();

      //清除中间route
      // dispatch(navigateClearMiddleScene('Setting'));
      // //
      // //返回到第一层
      dispatch(logout());
        // DeviceEventEmitter.emit("logout");


    }

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WBSetting)
