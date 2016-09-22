'use strict'
import React, {Component} from 'react';
import ReactNative, {
  Image,
  Platform,
  StyleSheet,
} from 'react-native';
export default class WBImage extends Component {
  state: {
    loaded:boolean,
  };
  constructor(props:Object) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  onLoad() {
    this.setState({loaded:true});
  }

  onError(obj){
    console.log(obj.nativeEvent.error);
  }

  render() {
    if (Platform.OS === 'ios') {
      return <Image onError={this.onError} {...this.props}/>
    }

    let propsAndroid = Object.assign({}, this.props);
    propsAndroid.source = propsAndroid.defaultSource;
    // alert(this.props.defaultSource);
    // alert(JSON.stringify(this.props.style));
    return (
      <Image {...this.props}  onLoad={this.onLoad.bind(this)}>
        {this.state.loaded ? null : <Image {...propsAndroid} style={[this.props.style, styles.defaultImage, {borderRadius:this.props.style.borderRadius || 0}]}/>}
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  defaultImage: {
    flex:1,
    marginTop: 0,
    marginLeft: 0,
    marginBottom: 0,
    marginRight: 0,
  }
});
