/* @flow */
'use strict'

import React, {Component,PropTypes} from 'react'
import  {View,
 TouchableOpacity,
 Modal,
 Platform,
 StatusBar,
 AppRegistry,ScrollView,Text,Image,StyleSheet} from 'react-native';
import WBImage from '../../components/Base/WBImage'
import WBButton from '../../components/Base/WBButton'
import {connect} from 'react-redux'
import { navigatePush ,navigatePop} from '../../redux/actions/nav'
import * as immutable from 'immutable';
import BaseListView from '../../components/Base/BaseListView';

import {iCommitListLoad,iCommitListLoadMore} from '../../redux/actions/iPurchase'


class iPurchase extends Component{

 constructor(props:Object) {
     super(props);
     // this._renderHeader.bind(this)
 }

//图片轮播图
//中间文字介绍
//底部button
static propTypes = {
  load: PropTypes.func.isRequired,
  loadMore:PropTypes.func.isRequired,
  loadStatu:PropTypes.string.isRequired,
  dataSource:PropTypes.array.isRequired,
};



shouldComponentUpdate(nextProps:Object) {
 return !immutable.is(this.props.loadStatu,nextProps.loadStatu);
}

__renderHeaderView():ReactElement<any>{
  return (
    <View style={styles.headView} >
      <Text style={styles.headViewText}>
          购买栏
      </Text>
      <View style={styles.headLine}/>
    </View>
  )
}

__renderRow(item:Object, sectionID:number, rowID:number):ReactElement<any> {
 const data = item.toObject()
 // console.log(data.imageFile|| null  );
 // try {
 //
 //   if(data.images) {
 //     const images = data.images.toArray();
 //      url = images[0].get('url')
 //     // const newURL = data.images.get('url')
 //     // url = newURL.length == 0 ?url:newURL;
 //   }
 // } catch (e) {
 //   console.warn(e.message);
 // }
     return (
       <TouchableOpacity
         style={[styles.row]}
         onPress={()=>{
           // this.props.select(rowID);
           const idea = this.props.dataSource[rowID]
           // console.log('idea:',idea);
          //  this.props.push({key:"Intro",idea:idea})
         }} >
         <View>
           {/*<WBImage style={styles.rowImage} source={{uri:url}}/>*/}
           <Text
             numberOfLines = {1}
             style={styles.text}>
             {data.content}
           </Text>
         </View>
         <View style={styles.line}/>
       </TouchableOpacity>
     )
}

render() {

   return (
     <View style={styles.box}>

       <BaseListView
         renderHeader={this.__renderHeaderView.bind(this)}
         style= {styles.list}
         loadStatu={this.props.loadStatu}
         loadData={this.props.load}
         dataSource={this.props.dataSource}
         loadMore={this.props.loadMore}
         renderRow={this.__renderRow.bind(this)}
         />
     </View>
   )
 }
}

const styles = StyleSheet.create({
 box:{
   justifyContent:'space-between',
   flex:1,
   backgroundColor:'white',
 },
 list:{
   backgroundColor:'white',
   // marginBottom:50,
 },
 wrapper:{
   // backgroundColor:'transparent'
 },
 titleView:{
   marginHorizontal:20,
   borderBottomWidth:StyleSheet.hairlineWidth,
   borderBottomColor:'rgba(52,52,52,0.3)',
 },
 title:{
   fontSize:25,
   marginTop:20,
   marginBottom:20,
   lineHeight:35,
 },

 slide: {
   flex: 1,
   // justifyContent: 'center',
   // alignItems: 'center',
   // backgroundColor: '#9DD6EB',
 },


 avatar:{
   height:60,
   width:60,
   borderRadius:30,
 },
 image:{
   flex:1
 },

 line:{
   height:StyleSheet.hairlineWidth,
   backgroundColor:'rgba(0,0,0,0.2)',
 },
 rowImage:{
   height:200,
 },
 row:{
   marginTop:30,
   marginHorizontal:20,
   backgroundColor:'white'
 },
 text:{
   marginTop:15,
   marginBottom:20,
   fontSize:17,
 },
 headViewText:{
   fontSize:50,
   fontWeight:'bold',
 },
 headView:{
   marginHorizontal:20,
   marginTop:60,

 },
 headLine:{
   marginTop:20,
   height:StyleSheet.hairlineWidth,
   backgroundColor:'black',
   width:60,
 }

});
const mapStateToProps = (state) => {

   // const data = state.ideaList.get('data');
   // const index = state.ideaList.get('index');
   return {
     // idea:data.get(index),
     loadStatu:state.iCommit.get('loadStatu'),
     dataSource:state.iCommit.get('data').toArray(),
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
     push:(key)=>{
       dispatch(navigatePush(key));
     },
     pop:()=>{
       dispatch(navigatePop());
     },

     load:()=>{
       dispatch(iCommitListLoad());
     },
     loadMore:()=>{
       dispatch(iCommitListLoadMore());
     },
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(iPurchase)
