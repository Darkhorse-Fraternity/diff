//昵称修改
'use strict';
import React from 'react';
import  {
  StyleSheet,
  Text,
  View,
  TextInput,
  findNodeHandle
} from 'react-native'
import {pixel,navbarHeight,Toast} from '../../util/';
// import {Actions} from "react-native-router-flux";
// import Button from 'react-native-button'
import {BCButton} from '../../components/Base/WBButton'
import Button from 'react-native-button'
import {backViewColor,mainColor, textInputTextColor, placeholderTextColor} from '../../configure'
import {request} from '../../request'
import {updateUserName} from '../../request/leanCloud'
import {userManager} from '../../util/XGlobal'
// import NavigationManager from '../Route/NavigationManager'
import {renderNavSenderButton} from '../../util/viewUtil'
// import TimerMixin from 'react-timer-mixin';
import {connect} from 'react-redux'
import {navigateRefresh,navigatePop} from '../../redux/actions/nav'
import {updateUserData} from '../../redux/actions/login'
class NickName extends React.Component{


  constructor(props:Object){
       super(props);
       this.state = {
         loaded:false,
         nickName:this.props.userData.username,
       }
   }
   state : {
     loaded:bool,
     nickName:string,
   }

  componentDidMount() {
    const rightBtn = renderNavSenderButton(this._tapRight)
    // NavigationManager.refresh({renderRightComponent:rightBtn,
    //    rightButtonDisabled:this.state.nickName.length==0,
    //     rightButtonIsLoad:this.state.loaded});
    this.props.refresh({renderRightComponent:rightBtn,
       rightButtonDisabled:this.props.userData.username.length==0,
        rightButtonIsLoad:this.state.loaded});
    // Actions.refresh({onRight:this.tapRight.bind(this),rightTitle:"完成"});
    //
    // https://facebook.github.io/react-native/docs/timers.html#content
    // var self = this;
    // this.timer =  setTimeout(()=>{
    //     this.refs.nameInput.focus();
    //   },500)
  }
  requestHandle:Object;
  componentWillUnmount(){
    if (this.requestHandle) {
      this.requestHandle && this.requestHandle.next()
    }
    this.timer && clearTimeout(this.timer);
  }


 _tapRight = () =>{
   if(this.state != null){
     if(this.state.nickName.length == 0) {
       Toast.show('昵称不能为空');
        this.refs.nameInput.focus();
       return;
     }
     this.refs.nameInput.blur();
     //接下就这里提交请求
     this.props.refresh({rightButtonIsLoad:true})
       var self = this;
       const params = updateUserName(this.props.userData.objectId,this.state.nickName);
      this.requestHandle = request(params, function(response){
            if(response.statu){
              Toast.show('修改成功');
              //修改store
              self.props.pop()
              self.props.update({username:self.state.nickName});
            }else{
              self.props.refresh({rightButtonIsLoad:false})
            }
       });
     }
   }

 renderRowMain(title:string, placeholder:string, onChangeText:Function,
   keyboardType:string='default', autoFocus:bool=false){

     return(
      //  <View style={styles.rowMainStyle} >
         <TextInput
           ref="nameInput"
           placeholderTextColor={placeholderTextColor}
            placeholder={placeholder}
            style={styles.textInputStyle}
            onChangeText={onChangeText}
            maxLength={16}
            defaultValue={this.props.userData.username}
            clearButtonMode = 'while-editing'
            enablesReturnKeyAutomatically= {true}
            returnKeyType='done'
            selectionColor= {mainColor}
            onSubmitEditing={this._tapRight}
            selectTextOnFocus ={false}
            autoFocus = {true}
           />
      //  </View>
     )
 }

  render(){
      return(
        <View style={styles.container}
          onStartShouldSetResponderCapture={(e) => {
　　　　　　　　const target = e.nativeEvent.target;
　　　　　　　　if (target !== findNodeHandle(this.refs.nameInput)) {
　　　　　　　　　　this.refs.nameInput.blur();
　　　　　　　　}}}>
          <View style={styles.rowStyle}>
            {this.renderRowMain('昵称修改:',"请输入的昵称",
              (text) => {
                this.setState({nickName:text});
                this.props.refresh({rightButtonDisabled:text.length==0, })
              },'default'
            )}
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: backViewColor,
  },
   rowStyle: {
     marginTop:navbarHeight + 29/2,
     flexDirection:'row',
     alignItems:'center',
     height:40,
     backgroundColor:'white',
     marginHorizontal:29/2,
     borderRadius:3,
   },


   textInputStyle:{
    //  padding:15,
     marginLeft:15,
     fontSize: 13,
     height:40,
     flex:1 ,
     borderColor: 'gray',
     backgroundColor: '#00000000',
     color: textInputTextColor,
   },

})


const mapStateToProps = (state) => {

	return {
    userData:state.login.data,

	}
}



const mapDispatchToProps = (dispatch) => {
	return {
    refresh:(obj)=>{
      dispatch(navigateRefresh(obj))
    },
    pop:()=>{
        dispatch(navigatePop())
    },
    update:(data:Obejct)=>{
      dispatch(updateUserData(data))
    }
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NickName)
