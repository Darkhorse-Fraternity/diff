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
  Linking
} from 'react-native'
import ImageSelectView from '../../components/ImageSelectView'
import WBImage from '../../components/Base/WBImage'
import {backViewColor, blackFontColor,textInputTextColor, placeholderTextColor, grayFontColor} from '../../configure'
import * as immutable from 'immutable';
import {connect} from 'react-redux'
import {navigateRefresh,navigatePop} from '../../redux/actions/nav'
import {
  iServeContentChange,
  commitImage,
  deleteImage,
  iServeAdd
} from '../../redux/actions/iServe'
import FontAwesome  from 'react-native-vector-icons/FontAwesome'
import {renderNavSenderButton} from '../../util/viewUtil'
import {Toast} from '../../util/'
class Commit extends Component{
 constructor(props:Object){
      super(props);

  }


   componentDidMount() {
     const rightBtn = renderNavSenderButton(this._tapRight)
     this.props.refresh({renderRightComponent:rightBtn});
   }


  shouldComponentUpdate(nextProps:Object) {
    return !immutable.is(this.props.state, nextProps.state)||
        !immutable.is(this.props.uris, nextProps.uris)||
        !immutable.is(this.props.content, nextProps.content);
  }

 _tapRight = () => {

   // if(this.state.content != null && this.state.content.length > 0){
     // this.props.refresh({rightButtonIsLoad:true})
     this.props.iServeAdd();

   // }else {
   //    Toast.show("提交内容不能为空");
   // }
 };


__renderImageCommit():ReactElement<any>{
  return (
    <ImageSelectView
      maxImage ={1}
      uris={this.props.uris} callback={(response)=>{
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




__renderPhoneView():ReactElement<any>{
  const mobilePhoneNumber = this.props.state.get('mobilePhoneNumber')
  const user = this.props.state.get('user')
  const url = user.get('avatar').get('url')
  const name = user.get('username')
  return (
    <View style={styles.phoneView}>
      <View style={{flexDirection:'row'}}>
        <WBImage style={styles.avtar} source={{uri:url}}/>
        <Text style={styles.nickName}>客户昵称:{name}</Text>
      </View>
      <TouchableOpacity
        style={styles.proButton}
        onPress={()=>{
          //给用户拨打电话。
          if(Linking.canOpenURL('tel:'+ mobilePhoneNumber)){
            Linking.openURL('tel:'+ mobilePhoneNumber)
          }else{
            Toast.show('无法拨打')
          }

         }}>
        <FontAwesome
          name={'phone'}
          size={50}
          color={'rgba(0,0,0,0.5)'}
          //backgroundColor="transparent"
          //resizeMode = 'contain'
          //source={image}
          style={styles.icon}/>
      </TouchableOpacity>
    </View>
  )
}

 render():ReactElement<any> {
   const type = this.props.state.get('type')
   return (

     <ScrollView style={styles.containerStyle}>

       {type == 'phone' && this.__renderPhoneView()}

       <TextInput
         multiline={true}
         placeholderTextColor={placeholderTextColor}
         style={styles.content}
         placeholder={"给客户留言..."}
         maxLength={500}
         underlineColorAndroid='transparent'
         clearButtonMode = 'while-editing'
         enablesReturnKeyAutomatically= {true}
         returnKeyType='next'
         onChangeText={(text) => this.props.addContent(text)}
       />
     <Text style={styles.textStyle}>{this.props.content.length}/500</Text>

     {type == 'image' && this.__renderImageCommit()}
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
  proButton:{
    // flex:1,
    // marginLeft:40,
    // marginRight:40,
    alignItems:'center',
    // backgroundColor:'gray'
  },
  icon:{
    // height:100,
    // alignSelf:'center'
  },
  avtar:{
    height:60,
    width:60,
    borderRadius:30,
  },
  phoneView:{
    marginTop:30,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginHorizontal:15,
    backgroundColor:'white',
    padding:10,
    borderRadius:5,
  },
  nickName:{
    marginLeft:15,
    marginTop:20,
  }

})

const mapStateToProps = (state) => {
  const data = state.iServe.get('data')
  const page = state.iServe.get('page')

	return {
     state:data.get(page),
     uris:state.iServe.get('uris'),
     content:state.iServe.get('content')
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
      dispatch(iServeContentChange(content))
    },
    iServeAdd:()=>{
      dispatch(iServeAdd())
    },



	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Commit)
