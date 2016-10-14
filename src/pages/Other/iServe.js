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

import {iServeListLoad,iServeListLoadMore,pageChange} from '../../redux/actions/iServe'


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
 return !immutable.is(this.props.intro,nextProps.intro)||
       !immutable.is(this.props.loadStatu,nextProps.loadStatu)||
       !immutable.is(this.props.dataSource,nextProps.dataSource);
}


__renderImgageTypeView(url:string):ReactElement<any>{
  return(
    <WBImage style={styles.rowImage} source={{uri:url}}/>
  )

}



__renderRow(item:Object, sectionID:number, rowID:number):ReactElement<any> {
    const data = item.toObject()
    const title = data.idea.get('title')
    const type = data.idea.get('type')
    let url = ''
    if(type == 'image'){
       url =  data.images.get(0).get('url')
    }
    let statu = '!';
    let color = {color:'red'}
    if(data.statu == 'done'){
      statu = '√'
      color = {color:'green'}
    }else if (data.statu == 'publish') {
      statu = '--'
      color = {color:'grey'}
    }

     return (
       <View  style={[styles.row]}>
         <TouchableOpacity
           onPress={
             ()=>{
                 const idea = data.idea.setIn(['user'],
                 immutable.fromJS(this.props.user))
                  this.props.push({key:'Intro',idea:idea})
             }
           }
           style={styles.rowHeadView}>
           <Text style={styles.rowTitle}>{title.trimRight()}  中的购买:</Text>
           <Text style={[styles.rowStatu,color]}>{statu}</Text>
         </TouchableOpacity>
           <TouchableOpacity

              onPress={()=>{
                if(data.statu == 'wait'){
                  this.props.pageChange(rowID,type,data.objectId)
                  this.props.push("iReply")}}
                }
              >
             <View>
               {type == 'image' && this.__renderImgageTypeView(url)}
               <Text
                 numberOfLines = {1}
                 style={styles.text}>
                 {data.content}
               </Text>
             </View>
             <View style={styles.line}/>
           </TouchableOpacity>
       </View>
    )
}

render() {

   return (
     <View style={styles.box}>

       <BaseListView
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
   marginTop:20,
   height:200,
 },
 row:{
   marginTop:10,
   marginHorizontal:20,
   backgroundColor:'white'
 },
 text:{
   marginTop:15,
   marginBottom:20,
   fontSize:17,
 },
 rowTitle:{
   color:'rgba(0,0,0,0.3)'
 },
 rowHeadView:{
   flexDirection:'row',
   justifyContent:'space-between'
 },
 rowStatu:{
   fontSize:18,
 }

});
const mapStateToProps = (state) => {

   // const data = state.ideaList.get('data');
   // const index = state.ideaList.get('index');
   return {
     // idea:data.get(index),
     loadStatu:state.iServe.get('loadStatu'),
     dataSource:state.iServe.get('data').toArray(),
     user:state.login.data,
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
       dispatch(iServeListLoad());
     },
     loadMore:()=>{
       dispatch(iServeListLoadMore());
     },
     pageChange:(page:number,type:string,id:string)=>{
       dispatch(pageChange(page,type,id))
     },

   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(iPurchase)
