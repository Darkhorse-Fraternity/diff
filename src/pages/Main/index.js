/**
 * Created by lintong on 9/21/16.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  findNodeHandle,
  Image,
} from 'react-native';
const { BlurView, VibrancyView } = require('react-native-blur');
const uri = 'https://d13yacurqjgara.cloudfront.net/users/632930/screenshots/2883377/__3.jpg'
export default class Main extends Component {

  constructor(props:Object){
      super(props);
      this.state={
        viewRef:0,
      }
    }
    state:{
      viewRef:number
    };

  imageLoaded() {
    this.setState({viewRef: findNodeHandle(this.refs.backgroundImage)||0})
  }
  componentDidMount(){

  }

  render() {
    return (
      <Image source={{uri}}
         ref={'backgroundImage'}
         onLoadEnd={this.imageLoaded.bind(this)}
        style={styles.container}>
        {/*<BlurView blurType="light" style={styles.blur}>
          <Text>Hi, I am a tiny menu item</Text>
        </BlurView>*/}
        {/*<BlurView
         blurRadius={10}
         downsampleFactor={5}
         overlayColor={'rgba(255, 255, 255, 0.1)'}
         style={styles.blurView}
         viewRef={this.state.viewRef}
       />*/}
        <Text style={styles.welcome}>Blur component</Text>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blur: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF',
  },
  blurView: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  },
});
