/*@flow*/
'use strict'


/**
 * 底部tabbar 的UI。
 */

import React, {Component} from 'react';
import ReactNative, {
  NavigationExperimental,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Platform,
} from 'react-native';
import {mainColor,containingColor,lightMainColor,lightContainingColor} from '../../configure';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons'
const AniView = Animatable.createAnimatableComponent(Icon);
// const {
//   JumpToAction,
// } = NavigationReducer.TabsReducer;

// import {grayFontColor, blackFontColor} from '../configure'
import { BlurView} from 'react-native-blur';

// {/*<View style={styles.line}/>*/}
export default class TabBar extends Component {

  render () {
    const MyBlueView = Platform.OS == 'ios' ?BlurView:View;
    return (
      <MyBlueView blurType="light" style={{backgroundColor:'white', zIndex:2}}>
        <View style={styles.line}/>
        <View style={styles.tabBar}>
          {this.props.tabs.map(this._renderTab)}
        </View>
      </MyBlueView>
    );
  }

  // iconForTab(tab:Object, selected:bool):Object {
  //   switch (tab.key) {
  //     case 'tab1':
  //       return {image:selected ? my_lesson : my_lesson_hover, title:"我的课程"};
  //     case 'tab2':
  //       return {image:selected ? person_center : person_center_hover, title:"个人中心"};
  //   }
  //   return {};
  // }

  _renderTab = (tab:Object, index:number) =>{
    const {title,selectImage,key,unSelectImage} = tab;
    // let image = unSelectImage;
    // // let textStyle = [styles.tabButtonText];
    // if (this.props.index === index) {
    //   // textStyle.push(styles.selectedTabButtonText);
    //   // image = selectImage;
    //
    // }
    const color = this.props.index === index ?mainColor:"rgba(0,0,0,0.3)"
    // let {image, title} = this.iconForTab(tab, this.props.index === index);
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.tabButton}
        key={key}
        onPress={()=>{
          this.refs[title].bounceIn(1000);
          this.props.onNavigate(index)}}>
        <AniView
          ref={title}
          name={title}
          size={30}
          color={color}
          //backgroundColor="transparent"
          //resizeMode = 'contain'
          //source={image}
          style={styles.icon}/>
        {/*<Text style={textStyle}>
          {title}
        </Text>*/}
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  line: {
    // elevation:5,
    height:StyleSheet.hairlineWidth*2,
    // shadowColor:'black',
    // shadowOpacity:.5,
    backgroundColor:'rgba(0,0,0,0.1)',
    // shadowOffset:{width:0,height:1},
  },
  tabBar: {
    height: 50,
    flexDirection: 'row',
    // backgroundColor: 'white',
  },
  tabButton: {
    flex:1,
    justifyContent:'center'
  },
  // tabButtonText: {
  //   textAlign: 'center',
  //   fontSize: 13,
  //   fontWeight: '500',
  //   marginTop: 5,
  //   color: grayFontColor
  // },
  // selectedTabButtonText: {
  //   color:  blackFontColor
  // },
  icon: {
    alignSelf:'center'
  }
})
