/*@flow*/
import React, {Component,PropTypes, isValidElement} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native';

// import Spinner from 'react-native-gifted-spinner';
import {screenHeight} from '../util';

import {backViewColor} from '../configure';

export const ExceptionType = {
  Loading:'exceptionTypeLoading',
  NoData :'exceptionTypeNoData',
  NetError:'exceptionTypeError',
};


export default class ExceptionView extends Component {

  static propTypes = {
    exceptionType:PropTypes.string,
    prompt:PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    image:PropTypes.number,
    otherTips:PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  };
  static defaultProps = {
    exceptionType: ExceptionType.Loading,
  };
  constructor(props:Object) {
    super(props);
  }

  renderPrompt() {
    if (isValidElement(this.props.prompt)) {
      return this.props.prompt;
    }
    return (
      <Text style={styles.text}>
        {this.getPromptText(this.props.exceptionType)}
      </Text>
    );
  }

  renderOtherTips() {
    if (!this.props.otherTips) {
      return null;
    }
    if (isValidElement(this.props.otherTips)) {
      return this.props.otherTips;
    }
    return (
      <Text style={styles.otherTips}>{this.props.otherTips}</Text>
    );
  }

  render() {
    let prompt = this.getPromptText(this.props.exceptionType);
    return (
      <ScrollView
        style={this.props.style}
        contentContainerStyle={styles.container}
        refreshControl={this.props.refreshControl}
        >
        {this._renderPromptIndicator(this.props.exceptionType)}
        {this.renderPrompt()}
        {this.renderOtherTips()}
      </ScrollView>
    );
  }

  _renderPromptIndicator = (type:string) => {
    switch (type) {
      case ExceptionType.Loading:
        return (
          <ActivityIndicator color="#9e9e9e" style={styles.spinner} size="large" styleAttr="Large"/>
        );
      case ExceptionType.NoData:
      case ExceptionType.NetError:
        return (
          <Image resizeMode = 'contain' source={this.props.image} style={styles.image}/>
        );
    }
  };

  getPromptText(type:string):string {
    if (this.props.prompt) {
      return this.props.prompt
    }
    var prompt;
    switch (type) {
      case ExceptionType.Loading:
        prompt = '正在加载...';
        break;
      case ExceptionType.NoData:
        prompt = '没有数据';
        break;
      case ExceptionType.NetError:
        prompt = '网络异常';
        break;
      default:
        prompt = 'there is nothing to show';
    }
    return prompt;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: backViewColor,
  },
  image: {
    // position:'absolute',
    marginTop:screenHeight*.15,
  },
  text: {
    marginTop:18,
    fontSize: 14,
    color:'#262324',
  },
  otherTips: {
    marginTop:27,
    marginLeft:43,
    marginRight:43,
    fontSize:13,
    color:'#9e9e9e',
    lineHeight:26,
  },
  spinner: {
    marginTop: 130
  }
});
