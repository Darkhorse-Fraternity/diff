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
  Image,
  Alert,
} from 'react-native'
import * as immutable from 'immutable';
import Dimensions from "Dimensions";
import {pixel,screenWidth,screenHeight,navbarHeight,Toast} from '../../util/';
import {renderNavRightButton} from '../../util/viewUtil'
import Button from 'react-native-button'
import {backViewColor, textInputTextColor, placeholderTextColor, grayFontColor} from '../../configure'
import {request} from '../../request'
import {connect} from 'react-redux'
import {navigateRefresh,navigatePop} from '../../redux/actions/nav'
import {
  putMyIdea,
  addContent,
  addTitle,
  addPrice,
  addLink} from '../../redux/actions/contribute'
import ImageSelectView from '../../components/ImageSelectView'

import {commitImage,deleteImage} from '../../redux/actions/contribute'

 class Contribute extends Component{

  constructor(props:Object){
       super(props);

   }





    componentDidMount() {
      const rightBtn = renderNavRightButton('发送',this._tapRight)
      this.props.refresh({renderRightComponent:rightBtn});
    }


   shouldComponentUpdate(nextProps:Object) {
     return !immutable.is(this.props.state, nextProps.state) ;
   }

  _tapRight = () => {

    // if(this.state.content != null && this.state.content.length > 0){
      // this.props.refresh({rightButtonIsLoad:true})
      this.props.putMyIdea();

    // }else {
    //    Toast.show("提交内容不能为空");
    // }
  };




  render() {
    // const loaded = this.props.state.get('loaded')
    // this.props.refresh({rightButtonIsLoad:loaded});
    return (
      <ScrollView style={styles.containerStyle}>
        <TextInput
          placeholderTextColor={placeholderTextColor}
          style={styles.line}
          placeholder={"一句话介绍"}
          maxLength={100}
          clearButtonMode = 'while-editing'
          enablesReturnKeyAutomatically= {true}
          returnKeyType='next'
          onChangeText={(text) => this.props.addTitle(text)}
        />
        <TextInput
          multiline={true}
          placeholderTextColor={placeholderTextColor}
          style={styles.content}
          placeholder={"有趣，或有收获。"}
          maxLength={500}
          clearButtonMode = 'while-editing'
          enablesReturnKeyAutomatically= {true}
          returnKeyType='next'
          onChangeText={(text) => this.props.addContent(text)}
        />
      <Text style={styles.textStyle}>{this.props.state.get('content').length}/500</Text>

        <TextInput
          placeholderTextColor={placeholderTextColor}
          style={styles.line}
          placeholder={"价格"}
          maxLength={50}
          keyboardType='numeric'
          clearButtonMode = 'while-editing'
          enablesReturnKeyAutomatically= {true}
          returnKeyType='next'
          onChangeText={(text) => this.props.addPrice(text)}
        />

        <TextInput
          placeholderTextColor={placeholderTextColor}
          style={styles.line}
          placeholder={"链接"}
          clearButtonMode = 'while-editing'
          enablesReturnKeyAutomatically= {true}
          returnKeyType='next'
          maxLength={1000}
          onChangeText={(text) => this.props.addLink(text)}
        />

        <ImageSelectView uris={this.props.state.get("uris")} callback={(response)=>{
              if(response.uri && response.uri.length>0){
                this.props.commitImg(response.uri);
              }

          }}
          deleteImage={(uri)=>{
            Alert.alert('提示', '是否要删除？', [
              {text: '是', onPress: ()=>{this.props.deleteImg(uri);}},
              {text: '否', onPress: ()=>{}},
            ]);

          }}/>
      </ScrollView>
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

  line:{
    marginLeft:12,
    marginRight:12,
    backgroundColor: 'white',
    height: 35,
    color:textInputTextColor,

    fontSize:14,
    marginTop: 15,
    // textAlignVertical:'top',
    paddingHorizontal:12,
    // paddingTop:14,
  },

  content: {
    marginLeft:12,
    marginRight:12,
    backgroundColor: 'white',
    height: 250,
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
  },
  imageBackView:{
    marginTop:20,
    height:100,
    flexDirection:'row',
    // backgroundColor:'red',
  },
  image:{
    height:60,
    width:60,
    marginTop:20,
    marginLeft:15,

  }
});


const mapStateToProps = (state) => {

	return {
     state:state.contribute,
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

    commitImg:(uri)=>{
      dispatch(commitImage(uri))
    },
    deleteImg:(uri)=>{
      dispatch(deleteImage(uri));
    },
    putMyIdea:(content:string)=>{
      dispatch(putMyIdea(content));
    },
    addContent:(content)=>{
      dispatch(addContent(content))
    },
    addTitle:(title)=>{
      dispatch(addTitle(title))
    },
    addLink:(link)=>{
      dispatch(addLink(link))
    },
    addPrice:(price)=>{
      dispatch(addPrice(price))
    }

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Contribute)
