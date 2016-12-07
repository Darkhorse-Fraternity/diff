//昵称修改
'use strict';
import React from 'react';
import ReactNative, {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'
import {pixel,navbarHeight,Toast} from '../../util/';
// import {Actions} from "react-native-router-flux";
// import Button from 'react-native-button'
import {BCButton} from '../../components/Base/WBButton'
import {mainColor, textInputTextColor, placeholderTextColor} from '../../configure'
import {request} from '../../request'
// import {pwdRequest} from '../../request/info'
import {updatePassword} from '../../request/leanCloud'
// import NavigationManager from '../Route/NavigationManager'
import {renderNavSenderButton} from '../../util/viewUtil'

import {connect} from 'react-redux'
import {navigatePop,navigateRefresh} from '../../redux/actions/nav'
 class AlterPwd extends React.Component{


  constructor(props:Object){
       super(props);
       this.state = {
          oldPwd:"",
          newPwd:"",
          isnewPwd:"",
          requestHandle:{},
       };
   }
   state: {
        oldPwd:string,
        newPwd:string,
        isnewPwd:string,
        requestHandle: Object,
      };

  componentDidMount() {

    // Actions.refresh({onRight:this.tapRight.bind(this),rightTitle:"完成"});
    const rightBtn = renderNavSenderButton(this._tapRight)
    this.props.refresh({renderRightComponent:rightBtn,
       rightButtonDisabled:false,
        rightButtonIsLoad:false});
    // Actions.refresh({onRight:this.tapRight.bind(this),rightTitle:"完成"});
    //
    // https://facebook.github.io/react-native/docs/timers.html#content
    // var self = this;
    // this.timer =  setTimeout(()=>{
        // self.refs['1'].focus();
      // },500)
  }

  componentWillUnmount(){
    if (this.requestHandle) {
      this.requestHandle.next()
    }
    // this.timer && clearTimeout(this.timer);
  }


 _testPassword = ()=> {
   var reg = /^.{6,16}$/;
  return  reg.test(this.state.oldPwd) &&  reg.test(this.state.newPwd) &&
    reg.test(this.state.isnewPwd) && this.state.newPwd != this.state.isnewPwd
 }


 _tapRight=()=>{
   if(this.state != null){

     var reg = /^.{6,16}$/

     if(!reg.test(this.state.oldPwd)){
       Toast.show('旧密码不正确');
       this.refs['1'].focus();
       return;
     }
     if(!reg.test(this.state.newPwd)){
       Toast.show('请输入新密码');
       this.refs['2'].focus();
       return;
     }

     if(!reg.test(this.state.isnewPwd)){
       Toast.show('再次数据密码错误');
       this.refs['3'].focus();
       return;
     }
    if(this.state.newPwd != this.state.isnewPwd){
      this.refs['2'].focus();
      Toast.show('两次密码输入不同');
      return;
    }



    //接下就这里提交请求
      this.props.refresh({rightButtonIsLoad:true})
      var self = this;
      // pwdRequest.params.old_password = this.state.oldPwd;
      // pwdRequest.params.new_password = this.state.newPwd;
      const param = updatePassword(this.props.objectId,this.state.oldPwd,this.state.newPwd)
      let handle = request(param, function(response){
           if(response.statu){
            self.props.pop();
           Toast.show(response.msg)
           }
        self.props.refresh({rightButtonIsLoad:false})
      });
      this.setState({requestHandle:handle});
    }
   }

 _renderRowMain(title:string,placeholder:string,ref:string,onChangeText:Function,
   autoFocus:bool = false,keyboardType:string = 'default'){

     return(
         <TextInput
           ref={ref}
           placeholderTextColor={placeholderTextColor}
           autoFocus = {autoFocus}
           maxLength={16}
           keyboardType={keyboardType}
           secureTextEntry={true}
           style={styles.textInputStyle}
           placeholder={placeholder}
           underlineColorAndroid='transparent'
           onChangeText={onChangeText}
           selectTextOnFocus ={false}
           returnKeyType= {ref== '3'?'done':'next'}
           selectionColor= {mainColor}
           clearButtonMode = 'while-editing'
           onSubmitEditing={() =>this.focusNextField(ref)}
           />
     )
 }

 focusNextField(nextField:string) {

   if(nextField == '1'){
     this.refs['2'].focus();
   }else if(nextField == '2'){
      this.refs['3'].focus();
   }else if(nextField == '3'){
     this._tapRight();
   }
 }

  render(){
      return(
      <View style={styles.container}>
          <View style={styles.rowStyle}>
            {this._renderRowMain('旧密码:','输入旧密码','1',
              (text) =>{
                this.setState({oldPwd:text});
                // NavigationManager.refresh({rightButtonDisabled:!this._testPassword(), })
            },true,'default'
            )}
          </View>
          <View style={styles.rowStyle}>
            {this._renderRowMain('新密码:','输入新密码','2',
              (text) => {
                this.setState({newPwd:text});
                // NavigationManager.refresh({rightButtonDisabled:!this._testPassword(), })
            },false,'default'
            )}
          </View>
          <View style={styles.rowStyle}>
            {this._renderRowMain('确认密码:','再次输入新密码','3',
              (text) => {
                this.setState({isnewPwd:text});
                // NavigationManager.refresh({rightButtonDisabled:!this._testPassword(), })
            },false,'default'
            )}
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:navbarHeight,
    flex:1
  },
  rowStyle: {
    marginTop:29/2,
    flexDirection:'row',
    alignItems:'center',
    height:40,
    backgroundColor:'white',
    marginHorizontal:29/2,
    borderRadius:3,
  },
  //  rowMainStyle: {
  //    flex:1,
  //    padding:15,
  //    alignItems:'center',
  //    flexDirection:'row'
  //  },
  //  textStyle:{
  //    // width:65,
  //    fontSize: 14,
  //    color:'#262324',
  //  },
   textInputStyle:{
     fontSize: 13,
     marginLeft:15,
     height:40,
     flex:1 ,
     borderColor: 'gray',
     backgroundColor: '#00000000',
     color: textInputTextColor,
   },

})


const mapStateToProps = (state) => {
	return {
    objectId:state.login.data.objectId,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    pop:()=>{
        dispatch(navigatePop())
    },

    refresh:(obj)=>{
      dispatch(navigateRefresh(obj))
    },
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AlterPwd)
