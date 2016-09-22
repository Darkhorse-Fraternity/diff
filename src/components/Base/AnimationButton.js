/*@flow*/
'use strict';
import Button from 'react-native-button';
import React, {Component, PropTypes} from 'react';
import ReactNative, {
  StyleSheet,
  View,
  Animated,

} from 'react-native';

import {mainColor,containingColor,lightMainColor,lightContainingColor} from '../../configure';

const styles = StyleSheet.create({
  WBbuttonStyle: {
    color:containingColor,
  },
  WBDisabledStyle: {
    color:lightContainingColor,
  },
  WBContainerStyle: {
    backgroundColor:mainColor,
    borderRadius:3
  },
  WBContainerDisabledStyle: {
    backgroundColor:lightMainColor,
    borderRadius:3
  },
});

export default class AnimationButton extends Component {

  constructor(props:Object){
    super(props);
    this.state = {
        bounceValue : new Animated.Value(0),
    };
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
      var  disabled =  this.props.disabled || this.props.isLoad
      var  containerStyle =  this.props.containerStyle;
      if (this.props.containerStyleDisabled != null) {
         containerStyle =   disabled ? this.props.containerStyleDisabled
         : this.props.containerStyle;
      }
      return (
        <Button
          onPress={this.props.onPress}
          style={this.props.style}
          styleDisabled={this.props.styleDisabled}
          containerStyle= {containerStyle}
          disabled ={disabled}>
          {this.props.isLoad?<Spinner color={containingColor}/>:this.props.children}
      </Button>
      )
   }
}

//设定默认背景图片
export class BCButton extends Component {

  constructor(props:Object){
    super(props);
    this.state = {
        bounceValue : new Animated.Value(0),
    };
  }

  loadAnimation(){
    this.state.bounceValue.setValue(1.1);
    Animated.spring(                          // 可选的基本动画类型: spring, decay, timing
         this.state.bounceValue,                 // 将`bounceValue`值动画化
         {
           toValue: 1,                         // 将其值以动画的形式改到一个较小值
           friction: 5,                  // Bouncier spring
         }
       ).start();                                // 开始执行动画
   }

  static propTypes = {
     ...AnimationButton.propTypes,
  };
   render() {
      return (
        <Animated.View style={{height:48,flex:1,transform:[{scale:this.state.bounceValue}]}}>
          <AnimationButton
            {...this.props}
            onPress={()=>{
              this.loadAnimation();
              this.props.onPress;
            }}
            style={[styles.WBbuttonStyle,this.props.style]}
            styleDisabled={[styles.WBDisabledStyle,this.props.styleDisabled]}
            containerStyle= {[styles.WBContainerStyle,this.props.containerStyle]}
            containerStyleDisabled={[styles.WBContainerDisabledStyle,this.props.containerStyleDisabled || this.props.containerStyle]}
            disabled ={this.props.disabled}>
            {this.props.children}
          </AnimationButton>
      </Animated.View>
      )
   }
}
