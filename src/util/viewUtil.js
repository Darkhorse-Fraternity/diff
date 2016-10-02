/*!
 *
 * vilewUtil模块 React Native module
 * 主要提供一些自定义的View
 * @flow
 */
import React from 'react';
import ReactNative, {View,Image,ActivityIndicatorIOS,StyleSheet, Platform} from "react-native";
import {pixel,screenWidth} from "./"
import WBButton from "../components/Base/WBButton"
import {mainColor,containingColor,lightMainColor,lightContainingColor} from '../configure'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons'
const AniView = Animatable.createAnimatableComponent(Icon);


//react-native-router-flux 新版本可以直接传入button
export function renderNavRightButton(title:string,tap:Function, image:any = undefined) {
   function tryRender(props:Object) {
     let disabled = props.scene.route.rightButtonDisabled;
     let isLoad = props.scene.route.rightButtonIsLoad;
     return(
       <WBButton
         ref='nav_right_button'
         onPress={tap}
         isLoad={isLoad}
         style={[{color:containingColor, flexDirection:'row'},styles.barRightButtonText]}
         styleDisabled={{color:lightContainingColor}}
         containerStyle= {styles.rightButton}
         disabled ={disabled}>
         {image?<Image source={image}/>:null}
         {title}
     </WBButton>
     )
   }

  return tryRender;
}

export function renderNavSenderButton(tap:Function) {
   function tryRender(props:Object) {
     let disabled = props.scene.route.rightButtonDisabled;
     let isLoad = props.scene.route.rightButtonIsLoad;
     return(
       <WBButton
         ref='nav_right_button'
         onPress={tap}
         isLoad={isLoad}
         style={[{color:containingColor, flexDirection:'row'},styles.barRightButtonText]}
         styleDisabled={{color:lightContainingColor}}
         containerStyle= {styles.rightButton}
         disabled ={disabled}>
           <AniView
             ref='sender'
             name='md-send'
             size={15}
             color={disabled?'gray':'black'}
             //backgroundColor="transparent"
             //resizeMode = 'contain'
             //source={image}
             style={styles.icon}/>
        </WBButton>
     )
   }

  return tryRender;
}



export function renderNavAddButton(tap:Function) {
   function tryRender(props:Object) {
     let disabled = props.scene.route.rightButtonDisabled;
     let isLoad = props.scene.route.rightButtonIsLoad;
     return(
       <WBButton
         ref='nav_right_button'
         onPress={tap}
         isLoad={isLoad}
         style={[{color:containingColor, flexDirection:'row'},styles.barRightButtonText]}
         styleDisabled={{color:lightContainingColor}}
         containerStyle= {styles.rightButton}
         disabled ={disabled}>
           <AniView
             ref='sender'
             name='ios-add'
             size={20}
             color='black'
             //backgroundColor="transparent"
             //resizeMode = 'contain'
             //source={image}
             style={styles.icon}/>
        </WBButton>
     )
   }

  return tryRender;
}



const styles = StyleSheet.create({

  rightButton: {
    width: 100,
    height: 37,
    // position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 2 : 5,
    right: 4,
    padding: 8,
    alignItems:'flex-end',
  },
  leftButton: {
    width: 100,
    height: 37,
    position: 'absolute',
    bottom: 4,
    left: 2,
    padding: 8,
  },
  barRightButtonText: {
    textAlign: 'right',
    fontSize: 17,
    fontWeight:'normal'
  },

  barLeftButtonText: {
    textAlign: 'left',
    fontSize: 17,
  },

  rightButtonIconStyle: {

  },
  icon: {
      // transform: [{rotate: '315deg'}],
    marginTop:3,
    // alignSelf:'center'
  },
});
