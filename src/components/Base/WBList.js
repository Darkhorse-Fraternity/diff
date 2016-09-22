// @flow

'use strict'

import React, {Component, PropTypes} from 'react';
import ReactNative, {
  ListView,
  RefreshControl,
  InteractionManager,
  Platform,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Linking
} from 'react-native';
import ExceptionView, {ExceptionType} from '../ExceptionView';
import {connect} from 'react-redux';
import { navigatePush } from '../../redux/actions/nav';
import {mainColor, backViewColor} from '../../configure';

const delay = () => new Promise((resolve) => InteractionManager.runAfterInteractions(resolve));

class WBList extends Component {
  static propTypes = {
    loadData: PropTypes.func.isRequired,
    loadMore: PropTypes.func,
    refreshable: PropTypes.bool,
    isLoaded: PropTypes.bool,
    needDelay: PropTypes.bool,
    noDataImg: PropTypes.number,
    noDataPrompt: PropTypes.string,
    noDataTips: PropTypes.string,
  };

  static defaultProps = {
    refreshable: false,
    isLoaded: false,
    needDelay: true,
    noDataImg: require('../../../source/img/xy_course/xy_course.png'),
    noDataPrompt: "没有新内容",
  };

  state:{
    loaded: bool,
    isRefreshing: boolean,
    dataSource:ListView.DataSource,
    isLoadingMore: boolean,
    isNoMore: boolean,
  };
  datas:any;
  shouldShowloadMore:boolean;

  constructor(props:Object) {
    super(props);
    this.state = {
      loaded: false,
      isRefreshing: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      isLoadingMore: false,
      isNoMore: false,
    };
  }

  componentWillMount() {
      this._handleRefresh();
  }

  onScroll(e:Object) {
    let nativeEvent = e.nativeEvent;
    this.shouldShowloadMore = nativeEvent.contentSize.height > nativeEvent.layoutMeasurement.height;
    this.props.onScroll && this.props.onScroll(arguments);
  }

  _handleRefresh = ()=>{
    if (this.state.isRefreshing) {
      return;
    }
    this.setState({isRefreshing:true});
    var loadingPromise = new Promise((resolve, reject)=>{
      this.props.loadData(resolve, reject);
    });
    Promise.all([loadingPromise, this.props.needDelay && delay()])
    .then((results)=>{
      this.datas=results[0];
      this.setState({isRefreshing:false, dataSource:this.state.dataSource.cloneWithRows(results[0]),
      loaded:true, isNoMore:false});
    }).catch((err)=>{
      this.setState({loaded:true, isRefreshing:false});
    });
  };

  _handleloadMore = ()=> {
    if (this.state.isLoadingMore || this.state.isNoMore || !this.shouldShowloadMore) {
      return;
    }
    if (this.props.loadMore) {
      this.setState({isLoadingMore:true});
      new Promise((resolve, reject)=>{
        this.props.loadMore(resolve, reject);
      })
      .then((result)=>{
        if (Array.isArray(result) && result.length > 0) {
          this.datas = this.datas.concat(result);
          this.setState({isLoadingMore:false, dataSource:this.state.dataSource.cloneWithRows(this.datas)});
        }else {
          this.setState({isNoMore:true, isLoadingMore:false});
        }
      }).catch((err)=>{
        this.setState({isLoadingMore:false});
      });
    }
  };

  renderFooter() {
    if (this.state.isLoadingMore) {
      return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center', height:30, marginBottom: 12}}>
          <ActivityIndicator style={{marginTop:8, marginBottom:8}} size='small' animating={true}/>
        </View>
      );
    }else if (this.state.isNoMore){
      return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center', height:30, marginBottom: 12}}>
          <Text>没有更多了</Text>
        </View>
      );
    }else {
      return null;
    }
  }

  renderNoDataTips() {
    if (this.props.noDataTips) {
      return this.props.noDataTips;
    }
    return (
      <Text style={styles.otherTips}>
        哟，有意思~
      </Text>
    );
  }

  render() {
    if (!this.state.loaded) {
      return (
        <ExceptionView
          exceptionType={ExceptionType.Loading}
          style={this.props.style}
          />
      );
    }else if (this.state.dataSource.getRowCount() == 0) {
      return (
        <ExceptionView
          style={this.props.style}
          exceptionType={ExceptionType.NoData}
          image={this.props.noDataImg}
          prompt={this.props.noDataPrompt}
          otherTips={this.renderNoDataTips()}
          refreshControl={
            this.props.refreshable ?
  					<RefreshControl
  						refreshing={this.state.isRefreshing}
  						onRefresh={this._handleRefresh}
  						/> : null
  				}/>
      );
    }
    return (
      <ListView
        {...this.props}
        style={[styles.list, this.props.style]}
        enableEmptySections = {true}
        onScroll={this.onScroll.bind(this)}
        dataSource={this.state.dataSource}
        refreshControl={
          this.props.refreshable ?
					<RefreshControl
						refreshing={this.state.isRefreshing}
						onRefresh={this._handleRefresh}
						/> : null
				}
        onEndReached={this._handleloadMore}
        renderFooter={this.renderFooter.bind(this)}
        onEndReachedThreshold={Platform.OS == 'ios' ? -20 : 10}
        />
    );

  }
}

const styles = StyleSheet.create({
  list:{
    backgroundColor: backViewColor
  },
  otherTips: {
    marginTop:27,
    marginLeft:43,
    marginRight:43,
    fontSize:13,
    color:'#9e9e9e',
    lineHeight:26,
    textAlign:'center'
  },
  linkText: {
    color:mainColor,
    textDecorationLine:'underline'
  }
});

const mapDispatchToProps = (dispatch) => {
	return {
    push:(key)=>{
        dispatch(navigatePush(key))
    },
	}
}

export default connect(
	null,
	mapDispatchToProps
)(WBList)
