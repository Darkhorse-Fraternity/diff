/* @flow */
'use strict';
import React,{Component,PropTypes} from 'react';
import  {
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Platform,
  LayoutAnimation
} from 'react-native'
import * as immutable from 'immutable';
import Dimensions from "Dimensions";
import {pixel,screenWidth,screenHeight,navbarHeight,Toast} from '../../util/';
import {renderNavSenderButton} from '../../util/viewUtil'
import Button from 'react-native-button'
import {backViewColor, blackFontColor,textInputTextColor, placeholderTextColor, grayFontColor} from '../../configure'
import {connect} from 'react-redux'
import {navigateRefresh,navigatePop} from '../../redux/actions/nav'
import {
  putMyIdea,
  addContent,
  addTitle,
  addPrice,
  addLink} from '../../redux/actions/contribute'
import ImageSelectView from '../../components/ImageSelectView'
import {showSelector} from '../../components/Selector'
import {commitImage,deleteImage,changeCommitType,showModal} from '../../redux/actions/contribute'
const typeDic = {
  '图片':'image',
  '文字':'write'
};

 class Normal extends Component{

  constructor(props:Object){
       super(props);

   }





    componentDidMount() {
      const rightBtn = renderNavSenderButton(this._tapRight)
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

  __renderUserCommit():ReactElement<any>{
    const type = this.props.state.get('replyType')
    if(type == 'phone') return (<View/>)
    return(
      <View>
        <Text style={styles.tip}>用户提交</Text>

          <TouchableOpacity onPress={()=>{
              if(Platform.OS == 'ios'){
                this.props.showModal(true)
              }else{
                showSelector(['文字','图片'],(text,i)=>{
                  this.type = text;
                  const type = typeDic[text];
                  this.props.changeCommitType(type);
                })
              }
            }} >
              <View style={styles.row}>

                <Text style={styles.rowText}>
                    {this.type}
                  </Text>
               <View style={styles.arrowView}/>
              </View>
          </TouchableOpacity>
      </View>
    )
  }

  type:string = '图片';
  render():ReactElement<any> {
    const type = this.props.state.get('replyType')
    // this.props.refresh({rightButtonIsLoad:loaded});
    const commitType = this.props.state.get('commitType')

    return (

      <ScrollView style={styles.containerStyle}>
        {Platform.OS === 'ios' && showSelector(['文字','图片'],(text,i)=>{
          this.type = text;
          const type = typeDic[text];
          this.props.changeCommitType(type);
        },this.props.state.get('showModal'),()=>{
          this.props.showModal(false)

        })}
        <TextInput
          placeholderTextColor={placeholderTextColor}
          style={styles.line}
          placeholder={"一句话介绍"}
          maxLength={100}
          underlineColorAndroid='transparent'
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
          underlineColorAndroid='transparent'
          clearButtonMode = 'while-editing'
          enablesReturnKeyAutomatically= {true}
          returnKeyType='next'
          onChangeText={(text) => this.props.addContent(text)}
        />
      <Text style={styles.textStyle}>{this.props.state.get('content').length}/500</Text>

        {/*<TextInput
          placeholderTextColor={placeholderTextColor}
          style={styles.line}
          placeholder={"价格"}
          maxLength={50}
          keyboardType='numeric'
          clearButtonMode = 'while-editing'
          enablesReturnKeyAutomatically= {true}
          returnKeyType='next'
          onChangeText={(text) => this.props.addPrice(text)}
        />*/}

        {this.__renderUserCommit()}

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

  },
  tip:{
    color:grayFontColor,
    marginTop:15,
    marginLeft:15,
    marginBottom:5,
  },
  row: {
      top:3,
      backgroundColor: 'white',
      paddingLeft:3,
      paddingRight:15,
      paddingVertical: 10 ,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal:12,
      alignItems:'center',
  },
  rowText: {
      marginLeft: 10,
      fontSize: 14,
      color: blackFontColor,
  },
  arrowView: {
      borderBottomWidth: pixel * 2,
      borderRightWidth: pixel * 2,
      borderColor: '#8c8c85',
      transform: [{rotate: '315deg'}],
      marginRight: 5,
      width: 10,
      height: 10,
  },
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

    addPrice:(price)=>{
      dispatch(addPrice(price))
    },
    changeCommitType:(type:string)=>{
      dispatch(changeCommitType(type));
    },
    showModal:(show:bool)=>{
      dispatch(showModal(show))
    }

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Normal)
