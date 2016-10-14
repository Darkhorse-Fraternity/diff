/* @flow */
'use strict';
import React, {Component,PropTypes} from 'react';
import {Modal,View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import { BlurView} from 'react-native-blur';
import Icon from 'react-native-vector-icons/FontAwesome'
// export function showSelector(items:Array<string>,callBack:Function,title:string =''){
//
//     const data =   {
//         items: items,
//         title: title,
//         itemsCallback: callBack,
//         negativeText: "取消",
//     }
//     // const DialogAndroid = require('react-native-dialogs')
//     // const dialog = new DialogAndroid();
//     // dialog.set(data);
//     // dialog.show();
// }


export function showSelector(items:Array<string>,callBack:Function,visible:bool, closeCallBack:Function ):ReactElement<any>{
  return (
    <Modal
      transparent={true}
      animationType='fade'
      //onRequestClose={() => {this.props.hiddenModelSwiper()}}
      visible={visible}>
      <BlurView blurType="dark" style={{flex:1}} >
        <View style={{zIndex:2,top:20,width:100,position:'absolute'}}>
          <Icon.Button name="close" backgroundColor="transparent"
            iconStyle={{marginLeft:20}} onPress={closeCallBack} />
        </View>
        <View style={styles.main}>
        {items.map((item,i)=>{
          return  (
            <TouchableOpacity key = {item} style={{alignItems:'center',top:-30}} onPress={()=>{
                callBack && callBack(item,i);
                closeCallBack()
              }}>
              <Text style={styles.text} key={item}>
                {item}
             </Text>
             <View style={styles.line}/>
           </TouchableOpacity>
        )})}
        </View>


     </BlurView>
    </Modal>
  );
}
const styles = StyleSheet.create({
  main:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    marginTop:20,
    marginBottom:8,
    color:'white',
    fontSize:17,
    borderBottomWidth:1,
    borderColor:'white',
    fontWeight:'bold',
  },
  line:{
    backgroundColor:'white',
    height:StyleSheet.hairlineWidth,
    width:200,

  }
})
