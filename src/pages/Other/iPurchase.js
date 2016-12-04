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
import { navigatePush } from '../../redux/actions/nav'
import * as immutable from 'immutable';
import BaseListView from '../../components/Base/BaseListView';
import StarRating from 'react-native-star-rating';
import {iPurchaseListLoad,iPurchaseListLoadMore,selectChange} from '../../redux/actions/iPurchase'


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
 return !immutable.is(this.props.loadStatu,nextProps.loadStatu)||
    !immutable.is(this.props.dataSource,nextProps.dataSource);
}

__renderHeaderView():ReactElement<any>{
  return (
    <View style={styles.headView} >
      <Text style={styles.headViewText}>
         我的购买
      </Text>
      <View style={styles.headLine}/>
    </View>
  )
}


__renderRow(item:Object, sectionID:number, rowID:number):ReactElement<any> {

    const url = item.getIn(['images',0,'url'])
    const type = item.getIn(['idea','type'])
    const  content = item.get('replyContent')
    const __renderImageView = ()=>{
     return  (<WBImage style={styles.rowImage} source={{uri:url}}/>)
    }

    const data = item.toObject()
    const title = data.idea.get('title')

    let statu = '--';
    let color = {color:'grey'}
    let statuView = ()=>{}
    if (data.statu == 'publish') {
      statu = '!'
      color = {color:'red'}
    }

    if(data.statu == 'done'){
       statuView = ()=>{
        return (
            <StarRating
              starSize={20}
              disabled={true}
              maxStars={5}
              starColor='rgba(0,0,0,0.5)'
              rating={item.get('rate')}
              selectedStar={() => {}}
             />
        )
      }
    }else {
      statuView = ()=>{
       return (
         <Text style={[styles.rowStatu,color]}>{statu}</Text>
       )
     }
    }

     return (
       <View  style={[styles.row]}>
         <TouchableOpacity
           onPress={
             ()=>{
                 this.props.push({key:'Intro',idea:data.idea})
             }
           }
           style={styles.rowHeadView}>
           <Text style={styles.rowTitle}>{title.trimRight()}  中的购买:</Text>
           {statuView()}
         </TouchableOpacity>
           <TouchableOpacity

              onPress={()=>{
                // if(data.statu == 'publish'){
                  this.props.selectChange(rowID)
                  this.props.push("iRate")}}
                //}
              >
             <View>
               {type == 'image' && __renderImageView()}
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
         renderHeader={this.__renderHeaderView.bind(this)}
         style= {styles.list}
         noDataPrompt="您还没有购买呢."
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
     marginBottom:Platform.OS == 'ios'?0:20,
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


 image:{
   flex:1
 },

 line:{
   height:StyleSheet.hairlineWidth,
   backgroundColor:'rgba(0,0,0,0.2)',
 },
 rowImage:{
   marginTop:15,
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
     loadStatu:state.iPurchase.get('loadStatu'),
     dataSource:state.iPurchase.get('data').toArray(),
     user:state.login.data
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
     push:(key)=>{
       dispatch(navigatePush(key));
     },


     load:()=>{
       dispatch(iPurchaseListLoad());
     },
     loadMore:()=>{
       dispatch(iPurchaseListLoadMore());
     },
     selectChange:(page:number)=>{
       dispatch(selectChange(page))
     }
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(iPurchase)
