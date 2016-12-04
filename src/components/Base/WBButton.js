/*@flow*/
'use strict';
import Button from 'react-native-button';
import React, {Component, PropTypes} from 'react';
import ReactNative, {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
// import Spinner from 'react-native-gifted-spinner';

import {mainColor,containingColor,lightMainColor,lightContainingColor} from '../../configure';

const styles = StyleSheet.create({
  WBbuttonStyle: {
    color:containingColor,
  },
  WBDisabledStyle: {
    color:'#999999'//lightContainingColor,
  },
  WBContainerStyle: {
    backgroundColor:mainColor,
    borderRadius:3
  },
  WBContainerDisabledStyle: {
    backgroundColor:'#dddddd',
    borderRadius:3,
  }
});

export default class WBButton extends Component {

  constructor(props:Object){
    super(props);
  }

   static propTypes = {
      ...Button.PropTypes,
      containerStyleDisabled:View.propTypes.style,
      isLoad:PropTypes.bool,
      // children:PropTypes.Object
   };

  //  _renderSpinner(){
  //    return(
   //
  //    )
  //  }

   render() {

      var  disabled =  this.props.disabled;
      var  containerStyle =  this.props.containerStyle;
      if (this.props.containerStyleDisabled != null) {
         containerStyle =   disabled ? this.props.containerStyleDisabled
         : this.props.containerStyle;
      }
      // console.log('child',this.props.children);
      // console.log("disabled",disabled,"isLoad",this.props.isLoad);
      return (
        <Button
          onPress={this.props.onPress}
          style={this.props.style}
          styleDisabled={this.props.styleDisabled}
          containerStyle= {containerStyle}
          disabled ={disabled || this.props.isLoad}>
          {this.props.isLoad?<ActivityIndicator color='gray'/>:this.props.children}
      </Button>
      )
   }
}

//设定默认背景图片
export  class BCButton extends Component {

  static propTypes = {
     ...WBButton.propTypes,
  };
   render() {
      return (
        <WBButton
          {...this.props}
          onPress={this.props.onPress}
          style={[styles.WBbuttonStyle,this.props.style]}
          styleDisabled={[styles.WBDisabledStyle,this.props.styleDisabled]}
          containerStyle= {[styles.WBContainerStyle,this.props.containerStyle]}
          containerStyleDisabled={[styles.WBContainerDisabledStyle,this.props.containerStyleDisabled || this.props.containerStyle]}
          disabled ={this.props.disabled}>
          {this.props.children}
      </WBButton>
      )
   }
}
