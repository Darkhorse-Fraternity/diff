/*@flow*/
'use strict'
/**
 * 根据找到的key 正确绘制对应的componet 视图。UI conpoment 类
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {PageMap} from './page'

export default class Scene extends Component {
  constructor(props:Object) {
    super(props);
  }


//主渲染页面。
  render() {
    const {onNavigate, scene} = this.props;
    var MyComponent = null;
    if (scene.route.key){
      let pageKey = scene.route.key.split('-')[0];
      MyComponent = PageMap[pageKey];
    }
    // console.log(this.props);
    if (MyComponent) {
      return (
        <MyComponent style={{flex:1}} scene={scene}/>
      )
    }else {
      return null;
    }
  }
}

const styles = StyleSheet.create({

  tabContent: {
    flex: 1,
  },

});
