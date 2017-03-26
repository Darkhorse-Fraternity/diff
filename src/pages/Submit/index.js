/* @flow */
'use strict';
import React,{Component,PropTypes} from 'react';
import  {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import * as immutable from 'immutable';
import {connect} from 'react-redux'
import {navigateRefresh,navigatePop,navigatePush} from '../../redux/actions/nav'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome  from 'react-native-vector-icons/FontAwesome'
// import {mainColor, textInputTextColor, placeholderTextColor, grayFontColor} from '../../configure'
import {screenWidth} from '../../util'
import {changeReplyType,changeCommitType} from '../../redux/actions/contribute'
const mainColor = 'rgba(0,0,0,0.5)'
 class Submit extends Component{

     constructor(props:Object){
          super(props);

      }

      static propTypes = {

      };

      __renderProBtn(name:string,title:string,type:string = 'EvilIcons'):ReactElement<any>{
        let Icon = EvilIcons;

        let size = 100;
        if(type == 'FontAwesome'){
          Icon = FontAwesome;
          size = 60;
        }

        return(
          <TouchableOpacity
            style={styles.proButton}
            onPress={()=>{
              this.props.push(name);
             }}>
            <Icon
              name={name}
              size={size}
              color={mainColor}
              //backgroundColor="transparent"
              //resizeMode = 'contain'
              //source={image}
              style={styles.icon}/>
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        )
      }

      render():ReactElement<any>{
        return(
          <View style={styles.main}>
            <ScrollView style={styles.list}>
              <View style={styles.content}>
                {/*{this.__renderProBtn('map-o','地图模式',"FontAwesome")}*/}
                {this.__renderProBtn('image','图片模式')}
                {this.__renderProBtn('pencil','文字模式')}
                {this.__renderProBtn('phone','电话模式','FontAwesome')}
                {this.__renderProBtn('share-google','链接模式')}
              </View>

            </ScrollView>
            <Text style={styles.tip}>注：图片模式即为给用户回复图片的服务,其他雷同。模式选定提交后不可更改.</Text>
         </View>
        )
      }
}

const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:'white',
    justifyContent:'space-between',
  },
  list:{
    flex:1,

  },
  content:{
    top:20,
    flexWrap:'wrap',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:(screenWidth-250)/2,
  },
  proButton:{
    // flex:1,
    marginTop:30,
    // marginLeft:40,
    // marginRight:40,
    alignItems:'center',
    height:140,
    width:100,
    // backgroundColor:'gray'
  },
  title:{
    color:mainColor,
    fontSize:17,
    // alignSelf:'center'
  },
  icon:{
    height:100,
    // alignSelf:'center'
  },
  tip:{
    marginHorizontal:15,
    color:'rgba(0,0,0,0.5)',
    fontSize:13,
    marginBottom:15,
  }
})



const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    push:(key:string)=>{
      switch (key) {
        case 'image':{
          dispatch(changeReplyType('image'));
          dispatch(changeCommitType('image'));
          dispatch(navigatePush('Normal'))
        }
          break;
        case 'pencil':{
          dispatch(changeReplyType('text'));
          dispatch(changeCommitType('image'));
          dispatch(navigatePush('Normal'))
        }
          break;
        case 'phone':{
          dispatch(changeReplyType('phone'));
          dispatch(changeCommitType('phone'));
          dispatch(navigatePush('Normal'))
        }
          break;
        case 'share-google':{
          dispatch(changeReplyType('link'));
          dispatch(navigatePush('Contribute'))
        }
          break;
        case 'map-o':{
          dispatch(changeReplyType('image'));
          dispatch(changeCommitType('image'));
          dispatch(navigatePush({key:'Normal',type:'map'}))
        }
          break;
        default:

      }
    }
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Submit)
