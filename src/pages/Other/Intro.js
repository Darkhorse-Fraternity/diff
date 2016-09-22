/* @flow */
'use strict'

import React, {Component} from 'react'
import  {View,
  TouchableOpacity,
  Modal,
  Platform,
  StatusBar,
  AppRegistry,ScrollView,Text,Image,StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper'
import WBImage from '../../components/Base/WBImage'
import Icon from 'react-native-vector-icons/FontAwesome'
import {pixel} from '../../util'
import WBButton from '../../components/Base/WBButton'
import {connect} from 'react-redux'
import {screenWidth,screenHeight} from '../../util'
import { navigatePush ,navigatePop} from '../../redux/actions/nav'
import * as immutable from 'immutable';
import { BlurView} from 'react-native-blur';
const MyBlueView = Platform.OS == 'ios' ?BlurView:View;

const style = Platform.OS == 'ios'?{}:{backgroundColor:'rgba(0,0,0,0.9)'}
import {showModalSwiper,hiddenModelSwiper} from '../../redux/actions/intro'

// const myIcon = (<Icon name="rocket" size={30} color="#900" />)
// const customTextButton = (
//   <Icon.Button name="facebook" backgroundColor="#3b5998">
//     <Text style={{fontFamily: 'Arial', fontSize: 15}}>Login with Facebook</Text>
//   </Icon.Button>
// );

const SwiperViewHight = screenWidth/400*280
class intro extends Component{


//图片轮播图
//中间文字介绍
//底部button

_renderBackButton():ReactElement<any>{
    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={this.props.pop}>
           <View style={styles.arrowView}/>
      </TouchableOpacity>
    )
}

_renderModalSwiper(images:any):ReactElement<any>{
  const showModalSwiper = this.props.intro.get('showModalSwiper')
  return (
    <Modal
      transparent={true}
      animationType='fade'
      onRequestClose={() => {this.props.hiddenModelSwiper()}}
      visible={showModalSwiper}>
      <MyBlueView blurType="dark" style={style} >
        <View style={{zIndex:2,top:20,width:100,position:'absolute'}}>
          <Icon.Button name="close" backgroundColor="transparent"
            iconStyle={{marginLeft:20}} onPress={this.props.hiddenModelSwiper} />
        </View>
        <Swiper style={styles.wrapper} height={screenHeight}
          showsPagination={false} autoplayTimeout	={20}
          index={this.tapNum} onMomentumScrollEnd={(e,state,context)=>{
              // console.log(e,state,context);
              this.tapNum = state.index;
          }}
         autoplay={true} removeClippedSubviews={true}>
         {images.map((image,i)=>{
           return(
           <View
             key = {'key_'+i} style={styles.slide}>
             <WBImage style={styles.image} resizeMode={'contain'} source={{uri: image.get('url')}}/>
           </View>
         )})}
       </Swiper>
     </MyBlueView>
    </Modal>
  );
}

tapNum:number =0;
_renderSwiper(images:any){
  // console.log('tapNum:',this.tapNum);
  return (
    <Swiper
      index = {this.tapNum}//这个第三方库设定，只有初次才有效，
                          //其后只有在tatol 不同时候，才重设
      style={styles.wrapper} height={SwiperViewHight}
        showsPagination={false} autoplayTimeout	={20}
       autoplay={true} removeClippedSubviews={true}>
       {images.map((image,i)=>{
         return(
         <TouchableOpacity
           onPress={()=>{
             this.tapNum = i;
             this.props.showModalSwiper();
           }}
           key = {'key_'+i} style={styles.slide}>
           <WBImage style={styles.image} source={{uri: image.get('url')}}/>
         </TouchableOpacity>
       )})}
    </Swiper>
  )
}

componentWillMount() {
  Platform.OS=='ios'&& StatusBar.setBarStyle('light-content', true);
}

componentWillUnmount(){
  Platform.OS=='ios'&& StatusBar.setBarStyle('default', true);
}


shouldComponentUpdate(nextProps:Object) {
  return !immutable.is(this.props.idea, nextProps.idea) ||
        !immutable.is(this.props.intro,nextProps.intro);
}

render() {
    const idea = this.props.idea.toObject();
    const user = idea.user.toObject();
    const price = idea.price == '0' ?'免费':idea.price;

    let avatar = {}
    if(user.avatar){
       avatar = user.avatar.toObject();
    }
    const images = idea.images.toArray();
    return (
      <View style={styles.box}>
        {this._renderModalSwiper(images)}
        {this._renderBackButton()}
        <ScrollView>
          {this._renderSwiper(images)}
          <View style={styles.label}>
            <Text style={styles.price}>￥{price}⚡️</Text>
          </View>
          <View style={styles.titleView}>
            <Text style={styles.title}>{idea.title}</Text>
          </View>
          <View style={styles.intro}>
            <Text style={styles.introText}>{user.username}</Text>
            <WBImage style={styles.avatar} source={{uri:avatar.url}}/>
          </View>
          <Text style={styles.infoText}>
            {idea.contents}
          </Text>
        </ScrollView>
        <WBButton
          style={{color:'white'}}
          onPress={()=>{this.props.push({'key':'WebView','url':idea.link})}}
          containerStyle={styles.tryButton}>
          试一下
        </WBButton>
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

  wrapper:{
    // backgroundColor:'transparent'
  },
  titleView:{
    marginHorizontal:20,
    borderBottomWidth:pixel*2,
    borderBottomColor:'rgba(52,52,52,0.3)',
  },
  title:{
    fontSize:25,
    marginTop:20,
    marginBottom:20,
    lineHeight:35,
  },
  label:{
    position:'absolute',
    top:SwiperViewHight- 70,
    width:100,
    height:40,
    backgroundColor:'rgba(52,52,52,0.5)',
    borderBottomRightRadius:3,
    borderTopRightRadius:3,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#9DD6EB',
  },

  price:{
    color:'white',
    marginRight:10,
    fontSize:16

  },

  intro:{
    justifyContent:'space-between',
    alignItems: 'center',
    flexDirection:'row',
    marginHorizontal:20,
    marginTop:20,
  },

  introText:{
    fontSize:20,
  },
  infoText:{
    fontSize:15,
    marginTop:15,
    marginBottom:30,
    marginHorizontal:20,
    lineHeight:25,
  },
  avatar:{
    height:60,
    width:60,
    borderRadius:30,
  },
  image:{
    flex:1
  },
  tryButton:{
    backgroundColor:'#f26355',
    justifyContent: 'center',
    height:50,
  },
  buttonContainer: {
    width:60,
    position:'absolute',
    top:20,
    height:40,
    // backgroundColor:'red',
    zIndex:100,
  },
  arrowView: {
      borderBottomWidth: StyleSheet.hairlineWidth * 4,
      borderRightWidth: StyleSheet.hairlineWidth * 4,
      borderColor: 'white',
      transform: [{rotate: '135deg'}],
      marginLeft: 20,
      marginTop:15,
      width: 10,
      height: 10,
  },
});
const mapStateToProps = (state) => {
    const data = state.ideaList.get('data');
    const index = state.ideaList.get('index');
    return {
      idea:data.get(index),
      intro:state.intro,
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
      showModalSwiper:()=>{
        dispatch(showModalSwiper())
      },
      hiddenModelSwiper:()=>{
        dispatch(hiddenModelSwiper())
      }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(intro)
