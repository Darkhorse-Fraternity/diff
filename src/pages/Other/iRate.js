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
import WBImage from '../../components/Base/WBImage'
import {backViewColor, blackFontColor,textInputTextColor, placeholderTextColor, grayFontColor} from '../../configure'
import * as immutable from 'immutable';
import {connect} from 'react-redux'
import {navigateRefresh,navigatePop,navigatePush} from '../../redux/actions/nav'
import {
  rateChange,
  iRateAdd
} from '../../redux/actions/iPurchase'
import FontAwesome  from 'react-native-vector-icons/FontAwesome'
import {renderNavSenderButton} from '../../util/viewUtil'
import {Toast} from '../../util/'
import StarRating from 'react-native-star-rating';
class iRate extends Component{
 constructor(props:Object){
      super(props);

  }


   componentDidMount() {
     const statu = this.props.state.get('statu')
     if(statu == 'publish'){
       const rightBtn = renderNavSenderButton(this._tapRight)
       this.props.refresh({renderRightComponent:rightBtn});
     }

   }


  shouldComponentUpdate(nextProps:Object) {
    return !immutable.is(this.props.state, nextProps.state);
  }

 _tapRight = () => {
    this.props.iRateAdd()
 };







 __renderRating():ReactElement<any>{
   const statu = this.props.state.get('statu')
    return(
      <View style={styles.rating}>
        <StarRating
          disabled={statu != 'publish'}
          maxStars={5}
          rating={this.props.state.get('rate')}
          selectedStar={(rating) => this.props.rateChange(rating)}
         />
     </View>
    )
 }

 __renderImageView(url:string):ReactElement<any>{
   return (<WBImage style={styles.rowImage} source={{uri:url}}/>)
 }

 __renderReply():ReactElement<any>{
   const replyType = this.props.state.getIn(['idea','type'])
   const replyContent = this.props.state.get('replyContent')
   const replyImage = this.props.state.getIn(['replyImages',0,'url'])
   const statu = this.props.state.get('statu')
   if(statu == 'publish' || statu == 'done'){
     return (
       <View>
         {replyType == 'image' &&  this.__renderImageView(replyImage)}
           <Text
             style={styles.textContent}>
             {replyContent}
           </Text>
       </View>
     )
   }else{
      return (<Text>    暂无</Text>)
   }
 }

 render():ReactElement<any> {
   const commitType = this.props.state.getIn(['idea','commitType'])
   const idea = this.props.state.get('idea')
   const content = this.props.state.get('content')
   const image = this.props.state.getIn(['images',0,'url'])
   const statu = this.props.state.get('statu')


   return (

     <ScrollView style={styles.containerStyle}>
       {statu != 'wait' && this.__renderRating()}
       <TouchableOpacity
         onPress={
           ()=>{
               this.props.push({key:'Intro',idea:idea})
           }
         }>
         <Text style={styles.rowTitle}>{idea.get('title').trimRight()} -></Text>
       </TouchableOpacity>

       <View style = {styles.line}/>
       <Text style={styles.rowSubTitle}>我的提交</Text>
       {commitType == 'image' &&  this.__renderImageView(image)}
       <Text
         style={styles.textContent}>
         {content}
       </Text>
       <View style = {styles.line}/>
       <Text style={styles.rowSubTitle}>店家回复</Text>
       {this.__renderReply()}

     </ScrollView>
   );
 }
}


const styles = StyleSheet.create({

  containerStyle:{
    flex: 1,
    backgroundColor:'white' ,
  },
  rowTitle:{
    marginTop:10,
    alignSelf:'center',
    color:'rgba(0,0,0,0.7)'
  },
  line:{
    marginTop:20,
    backgroundColor:'rgba(0,0,0,0.2)',
    height:StyleSheet.hairlineWidth,
  },
  rowSubTitle:{
    marginTop:10,
    alignSelf:'center',
    color:'rgba(0,0,0,0.3)',
    fontSize:13,
  },
  textContent:{
    marginTop:10,
    marginHorizontal:15,
    color:'rgba(0,0,0,0.7)',
    fontSize:15,
  },
  rowImage:{
    height:200,
    marginTop:20,
    marginHorizontal:15
  },
  rating:{
    marginHorizontal:70,
  }

})

const mapStateToProps = (state) => {
  const data = state.iPurchase.get('data')
  const index = state.iPurchase.get('index')

	return {
     state:data.get(index),
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    refresh:(obj)=>{
      dispatch(navigateRefresh(obj))
    },

    push:(obj)=>{
      dispatch(navigatePush(obj))
    },

    rateChange:(rate)=>{
      dispatch(rateChange(rate))
    },
    iRateAdd:()=>{
      dispatch(iRateAdd())
    }

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(iRate)
