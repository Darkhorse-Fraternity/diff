/*@flow*/
'use strict'

import React, {Component} from 'react';


import ReactNative, {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  NavigationExperimental
} from 'react-native';


const {
  Header: NavigationHeader,
} = NavigationExperimental;

import type {
  NavigationSceneRenderer,
  NavigationSceneRendererProps
} from 'NavigationTypeDefinition';
//import NavigationManager from './NavigationManager';
import {mainColor,containingColor,lightMainColor,lightContainingColor} from '../../configure';

import {navigatePop} from '../../redux/actions/nav'
export default class NavBar extends Component {

  constructor(props:Object) {
    super(props);
  }


  _backEvent = ()=>{
    this.props.onNavigate({type:'back'});
  };

  //加载返回按钮
  _renderBackButton = (hide:bool)=>{
    if (hide) {
      return ()=>null;
    }else {
      return (props:Object)=>(
        // onPress={props.onNavigateBack}
        <TouchableOpacity style={styles.buttonContainer} onPress={this._backEvent.bind(this)}>
          {/*<Image style={styles.button}
              resizeMode = 'contain'
             source={require('../../source/img/xy_arrow/xy_arrow.png')} />*/}
             <View style={styles.arrowView}/>
        </TouchableOpacity>
      );
    }
  };

  //加载右边按钮
  _renderRightButton= ()=>{
    return ()=>(
      <TouchableOpacity style={styles.buttonContainer} onPress={() => alert("right")}>
        <Text>right</Text>
      </TouchableOpacity>
    )
  };


  _renderTitleComponent(props: NavigationSceneRendererProps) {

    let title = props.scene.route.title;
    // const index = props.scene.index;
    // const
    // console.log('title:',title);
    // console.log("props",JSON.stringify(props));
    if (title && title.length) {
      return (
        <NavigationHeader.Title textStyle={styles.navigationHeaderTitle}>
          {title}
        </NavigationHeader.Title>
      );
    }else{
      return null;
    }

  }


  render() {
    const {scene} = this.props;
    if (scene.route.hideNavBar) {
      return null;
    }
    const hideBackBtn = scene.route.hideBackBtn;
    let renderRightComponent = scene.route.renderRightComponent ?
                              scene.route.renderRightComponent : ()=>null;
    let renderLeftComponent = scene.route.renderLeftComponent ||  this._renderBackButton(scene.index === 0 || hideBackBtn);
    // renderRightComponent = this._renderRightButton();
    // console.log('scene.route.renderRightComponent', renderRightComponent);
    return (
        <NavigationHeader
        {...this.props}
        //ref={header=>NavigationManager.navigationHeader=header}
        renderTitleComponent={this._renderTitleComponent}
        style={styles.navigationHeader}
        renderRightComponent={renderRightComponent}
        renderLeftComponent={renderLeftComponent}
        onNavigateBack={this._backEvent}
      />
    );
  }



}


const styles = StyleSheet.create({
  navigationHeader: {
    backgroundColor: 'white',
    height:Platform.OS === 'ios' ? 64 : 48,
    borderBottomWidth:0,
  },
  navigationHeaderTitle: {
    color: 'black',
    textAlign: 'center',
    fontSize:13,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width:100,
  },
  arrowView: {
      borderBottomWidth: StyleSheet.hairlineWidth * 2,
      borderRightWidth: StyleSheet.hairlineWidth * 2,
      borderColor: '#8c8c85',
      transform: [{rotate: '135deg'}],
      marginLeft: 15,
      width: 10,
      height: 10,
  },
  button: {
    marginLeft:15,
    marginVertical:Platform.OS === 'ios' ? 14 : 16,
  }
});
