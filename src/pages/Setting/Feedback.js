/* @flow */
'use strict';
import React,{Component,PropTypes} from 'react';
import  {
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

import Dimensions from "Dimensions";
import {pixel,screenWidth,screenHeight,navbarHeight,Toast} from '../../util/';
import {renderNavSenderButton} from '../../util/viewUtil'
import Button from 'react-native-button'
import {backViewColor, textInputTextColor, placeholderTextColor, grayFontColor} from '../../configure'
import {request} from '../../request'
// import {feedBackRequest} from '../../request/info'
import {feedbackParam} from '../../request/leanCloud'
import {connect} from 'react-redux'
import {navigateRefresh,navigatePop} from '../../redux/actions/nav'
 class Feedback extends Component{

  constructor(props:Object){
       super(props);
       this.state = {
         content:"",
       };
   }

   requestHandle:Object;

   state: {
        content:string,
      };


    componentDidMount() {
      const rightBtn = renderNavSenderButton(this._tapRight)
      this.props.refresh({renderRightComponent:rightBtn});

    }



  _tapRight = () => {
    this.props.refresh({rightButtonIsLoad:true})
    if(this.state.content != null && this.state.content.length > 0){
      var self = this;
      // feedBackRequest.params.content = this.state.content;
      const params = feedbackParam(this.state.content,this.props.data.mobilePhoneNumber);

      this.requestHandle = request(params, function(response){

        self.props.refresh({rightButtonIsLoad:false})
           if(response.statu){
             self.props.pop();
             Toast.show('您的意见我们收到啦.');
           }

      });
    }else {
       Toast.show("提交内容不能为空");
    }
  };

  componentWillUnmount(){
    this.requestHandle && this.requestHandle.next()
	}

  render() {

    return (
      <View style={styles.containerStyle}>
        <TextInput
          multiline={true}
          placeholderTextColor={placeholderTextColor}
          style={styles.account}
          underlineColorAndroid='transparent'
          placeholder={"请填写您的宝贵意见。"}
          maxLength={200}
          onChangeText={(text) => this.setState({content:text})}
        />
      <Text style={styles.textStyle}>{this.state.content.length}/200</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({

  containerStyle:{
    flex: 1,
    marginTop:navbarHeight ,
    backgroundColor:backViewColor,
  },

  viewStyle:{
      backgroundColor: '#ffffff',
      height:240,

  },

  account: {
    marginLeft:12,
    marginRight:12,
    backgroundColor: 'white',
    height: 168,
    color:textInputTextColor,

    fontSize:14,
    marginTop: 15,
    textAlignVertical:'top',
    paddingHorizontal:12,
    paddingTop:14,
  },
  textStyle:{
    marginTop:5,
    marginRight:12,
    textAlign:'right',
    color:grayFontColor,
  }
});


const mapStateToProps = (state) => {

	return {
     data:state.login.data,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    refresh:(obj)=>{
      dispatch(navigateRefresh(obj))
    },
    pop:()=>{
      dispatch(navigatePop())
    }
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Feedback)
