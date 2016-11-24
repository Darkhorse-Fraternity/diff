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
} from 'react-native'
import ImageSelectView from '../../components/ImageSelectView'
import {backViewColor, blackFontColor,textInputTextColor, placeholderTextColor, grayFontColor} from '../../configure'
import * as immutable from 'immutable';
import {connect} from 'react-redux'
import {navigateRefresh,navigatePop} from '../../redux/actions/nav'
import {
  iCommitContentChange,
  iCommitAdd,
  changePhoneNumber,
  commitImage,
  deleteImage,
} from '../../redux/actions/iCommit'

import {renderNavSenderButton} from '../../util/viewUtil'
class Commit extends Component{
 constructor(props:Object){
      super(props);

  }








   componentDidMount() {
     const rightBtn = renderNavSenderButton(this._tapRight)
     this.props.refresh({renderRightComponent:rightBtn});


      const  phoneNumber =  this.props.state.get('phoneNumber')
       if(phoneNumber){
           phoneNumber.length == 0 &&
           this.props.changePhoneNumber(this.props.phoneNumber);
       }



   }


  shouldComponentUpdate(nextProps:Object) {
    return !immutable.is(this.props.state, nextProps.state) ;
  }

 _tapRight = () => {

   // if(this.state.content != null && this.state.content.length > 0){
     // this.props.refresh({rightButtonIsLoad:true})
     this.props.iCommitAdd();

   // }else {
   //    Toast.show("提交内容不能为空");
   // }
 };


__renderImageCommit():ReactElement<any>{
  return (
    <ImageSelectView
      maxImage ={1}
      uris={this.props.state.get("uris")} callback={(response)=>{
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
  )
}

__renderPhoneNumberCommit():ReactElement<any>{
  return(
    <View>
      <Text style={styles.phoneTip}>给卖家的电话</Text>
      <TextInput
        placeholderTextColor={placeholderTextColor}
        defaultValue={this.props.state.get('phoneNumber')}
        style={styles.phone}
        maxLength={13}
        clearButtonMode = 'while-editing'
        keyboardType= 'number-pad'
        onSubmitEditing={this._tapRight}
        returnKeyType='send'
        enablesReturnKeyAutomatically= {true}
        onChangeText={(text) => this.props.changePhoneNumber(text)}
        />
    </View>
  )
}

 render():ReactElement<any> {
   const type = this.props.state.get('type')

   return (

     <ScrollView style={styles.containerStyle}>


       <TextInput
         multiline={true}
         placeholderTextColor={placeholderTextColor}
         style={styles.content}
         placeholder={"给卖家留言..."}
         maxLength={500}
         clearButtonMode = 'while-editing'
         enablesReturnKeyAutomatically= {true}
         returnKeyType='next'
         onChangeText={(text) => this.props.addContent(text)}
       />
     <Text style={styles.textStyle}>{this.props.state.get('content').length}/500</Text>

     {type == 'image' && this.__renderImageCommit()}
     {type == 'phone' && this.__renderPhoneNumberCommit()}
     </ScrollView>
   );
 }
}


const styles = StyleSheet.create({

  containerStyle:{
    flex: 1,
    backgroundColor:backViewColor,
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
  phone:{
    paddingHorizontal:12,
    marginTop:8,
    fontSize:14,
    marginHorizontal:12,
    backgroundColor:'white',
    height:30,
    color:textInputTextColor,
  },
  phoneTip:{
    fontSize:12,
    marginTop:25,
    marginHorizontal:15,
    color:grayFontColor,
  }

})

const mapStateToProps = (state) => {

	return {
     state:state.iCommit,
     phoneNumber:state.login.data.mobilePhoneNumber
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    refresh:(obj)=>{
      dispatch(navigateRefresh(obj))
    },


    commitImg:(uri)=>{
      dispatch(commitImage(uri))
    },
    deleteImg:(uri)=>{
      dispatch(deleteImage(uri));
    },

    addContent:(content)=>{
      dispatch(iCommitContentChange(content))
    },
    iCommitAdd:()=>{
      dispatch(iCommitAdd())
    },

    changePhoneNumber:(phoneNumber:string)=>{
      dispatch(changePhoneNumber(phoneNumber))
    }

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Commit)
