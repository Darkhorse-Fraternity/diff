/*@flow*/
'use strict'


import React, {Component,PropTypes} from 'react';
import ReactNative, {
  NavigationExperimental,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Platform,
  LayoutAnimation,
} from 'react-native';
import imagePicker from '../util/imagePicker'
import Button from 'react-native-button'
import {screenWidth} from '../util'
const source = require('../../source/img/pic_upload/pic_upload.png');
import * as immutable from 'immutable';

export default class ImageSelectView extends Component {
  constructor(props:Object){
       super(props);
       this.state = {
         content:"",
       };
   }

   state:{
     content:string,
   }

   static propTypes={
     maxImage:PropTypes.number,
     uris:PropTypes.object,
     callback:PropTypes.func,
     deleteImage:PropTypes.func,
   };
   static defaultProps={
     maxImage:8,
   };

  _selectImage=()=>{

    const opt = {
      title: '添加图片',
      maxWidth: 1000, // photos only
      maxHeight: 1000, // photos only
    }
    imagePicker(opt,(response)=>{
        LayoutAnimation.spring();
        this.props.callback(response);
    })
  };



  _renderLastButton(){
    if(this.props.uris.size < this.props.maxImage ){
      return(
          <Button onPress={this._selectImage}>
            <Image style={styles.image} source={source}/>
          </Button>
      );
    }
  }

  shouldComponentUpdate(nextProps:Object, nextState:Object):bool{
    return this.state !== nextState || !immutable.is(this.props.uris, nextProps.uris);
  }

  render(){
    const uris = this.props.uris.toJS();
    return (
      <View style={[styles.imageBackView,this.props.style]}>
        {
          uris && uris.map((uri,i)=>{
              if(i<this.props.maxImage){
                return(
                  <Button key={i}
                    onPress={()=>{
                      // LayoutAnimation.spring();
                      this.props.deleteImage && this.props.deleteImage(uri)
                    }}>
                    <Image style={[styles.image]}
                       source={{uri:uris[i]}}/>
                  </Button>
                )
              }else{
                return null;
              }
          })
        }
       {this._renderLastButton()}
      </View>
    );
  }

}

const styles = StyleSheet.create({

  imageBackView:{
    marginTop:30,
    height:100,
    flexDirection:'row',
    flexWrap:'wrap'
    // backgroundColor:'red',
  },
  image:{
    height:70,
    width:70,
    marginLeft:15,
  }
});
