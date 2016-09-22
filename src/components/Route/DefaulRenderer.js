/* @flow */

'use strict'

import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Animated,
  NavigationExperimental,
  View,
  StyleSheet,
} from 'react-native';
// import {BACK_ACTION} from '../actions/ActionTypes'
import type {
  NavigationSceneRendererProps,
} from 'NavigationTypeDefinition';

import Scene from './Scene'
import NavBar from './NavBar'

const {
  Transitioner: NavigationTransitioner,
  CardStack: NavigationCardStack,
  Card: NavigationCard,
} = NavigationExperimental;

const {
  CardStackPanResponder: NavigationCardStackPanResponder,
  CardStackStyleInterpolator: NavigationCardStackStyleInterpolator,
} = NavigationCard;



const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  sceneStyle: {
    flex: 1,
  },
});


export default class DefaultRenderer extends Component {

  static propTypes = {
    navigationState: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
  };

  static childContextTypes = {
    navigationState: PropTypes.any,
  };



  constructor(props:Object) {
    super(props);
  }


  _renderHeader(props: NavigationSceneRendererProps):ReactElement<any> {
    return (
      <NavBar {...props} {...this.props}/>
    );
  }

  //主渲染页面。
    _renderScene(props: NavigationSceneRendererProps) {
      return (
        <Scene {...props} />
      );
    }

  renderCard(/* NavigationSceneRendererProps */ props:Object):ReactElement<any>{
    const { key, direction } = props.scene.route;
    let { panHandlers, animationStyle } = props.scene.route;
    const isVertical = direction === 'vertical';
    if (typeof(animationStyle) === 'undefined') {
      animationStyle = (isVertical ?
        NavigationCardStackStyleInterpolator.forVertical(props) :
        NavigationCardStackStyleInterpolator.forHorizontal(props));
    }

    if (typeof(panHandlers) === 'undefined') {
      //WARMING:新版本变了这么写不行，多了一个参数。参考源码，这边做默认值处理
      // panHandlers = panHandlers || (isVertical ?
      //     NavigationCardStackPanResponder.forVertical(props,{type:'BackAction'}) :
      //     NavigationCardStackPanResponder.forHorizontal(props,{type:'BackAction'}));
    }
    return (
      <NavigationCard
        {...props}
        key={'card_'+key}
        style={animationStyle}
        //style={{flex:1}}
        panHandlers={panHandlers}
        onNavigateBack={()=>this.props.onNavigate({type:'back'})}
        renderScene={this._renderScene}
      />
    );
  }



  render():ReactElement<any> {
    const { navigationState, onNavigate } = this.props;
    if (!navigationState || !onNavigate) {
      console.error('navigationState and onNavigate property should be not null');
      return <View/>;
    }
    const optionals = {};
    const selected = navigationState.routes[navigationState.index];
    const applyAnimation = selected.applyAnimation || navigationState.applyAnimation;
    const style = selected.style || navigationState.style;

    if (applyAnimation) {
      optionals.applyAnimation = applyAnimation;
    } else {
      let duration = selected.duration;
      if (duration === null || duration === undefined) duration = navigationState.duration;
      if (duration !== null && duration !== undefined) {
        optionals.applyAnimation = (pos, navState) => {
          if (duration === 0) {
            pos.setValue(navState.index);
          } else {
            Animated.timing(pos, { toValue: navState.index, duration }).start();
          }
        };
      }
    }

      let { direction,key,panHandlers } = selected;
    return (

      <NavigationCardStack
        //key = {key}

        navigationState={navigationState}
        onNavigateBack={()=>onNavigate({type:'back'})}
        style={[styles.animatedView, style, this.props.style]}
        //style={{flex:1}}
        panHandlers={panHandlers}
        direction={direction}
        renderHeader={this._renderHeader.bind(this)}
        //render={ret=>console.log('asd',ret)}
        //renderScene={this.renderCard.bind(this)}
        //onNavigate={onNavigate}
        renderScene={this._renderScene}
        //render={props =>(
        //  <View style={{flex:1}}>
        //    {this.renderCard(props)}
        //    {this._renderHeader(props)}
        //  </View>
        //)}
        {...optionals}
      />
    );
  }
}
