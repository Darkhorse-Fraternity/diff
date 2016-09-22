/**
 * Created by lintong on 8/31/16.
 * @flow
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    ListView,
    InteractionManager,
    RefreshControl,
    ActivityIndicator,
    Text,
    Platform,
} from 'react-native'
import {mainColor, backViewColor} from '../../configure';
import ExceptionView, {ExceptionType} from '../ExceptionView';
const delay = () => new Promise((resolve) => InteractionManager.runAfterInteractions(resolve));

export const LIST_FIRST_JOIN = 'LIST_FIRST_JOIN'
export const LIST_NO_DATA = 'LIST_NO_DATA'
export const LIST_LOAD_DATA = 'LIST_LOAD_DATA'
export const LIST_LOAD_MORE = 'LIST_LOAD_MORE'
export const LIST_LOAD_NO_MORE = 'LIST_LOAD_NO_MORE'
export const LIST_LOAD_ERROR = 'LIST_LOAD_ERROR'
export const LIST_NORMAL = 'LIST_NORMAL'

export default class BaseListView extends Component {
    constructor(props:Object) {
        super(props);
        this.state = {};
        this._dataSource = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });
    }

    static propTypes = {
      loadData: PropTypes.func.isRequired,
      loadMore: PropTypes.func,
      refreshable: PropTypes.bool,
      loadStatu: PropTypes.string.isRequired,
      needDelay: PropTypes.bool,
      noDataImg: PropTypes.number,
      noDataPrompt: PropTypes.string,
      noDataTips: PropTypes.string,
      dataSource:PropTypes.array,
    };

    static defaultProps = {
      refreshable: true,
      loadStatu: LIST_FIRST_JOIN,
      needDelay: true,
      // noDataImg: require('../../../source/img/xy_course/xy_course.png'),
      noDataPrompt: "没有新内容",
    };

    state:{};
    shouldShowloadMore:boolean;
    _dataSource:ListView.DataSource;
    onScroll(e:Object) {
      let nativeEvent = e.nativeEvent;
      this.shouldShowloadMore = nativeEvent.contentSize.height > nativeEvent.layoutMeasurement.height;
      this.props.onScroll && this.props.onScroll(arguments);
    }

    componentDidMount() {
      this._handleRefresh();
    }


    _handleRefresh = ()=>{
      if (this.props.loadStatu === LIST_LOAD_DATA) {
        return;
      }
      this.props.loadData && this.props.loadData();
    };

    _handleloadMore = ()=> {
      if (this.props.loadStatu === LIST_LOAD_MORE
        || this.props.loadStatu === LIST_LOAD_NO_MORE
        || !this.shouldShowloadMore) {
        return;
      }
      this.props.loadMore && this.props.loadMore();
    };

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

    renderFooter() {

      if (this.props.loadStatu == LIST_LOAD_MORE ) {
        return (
          <View style={styles.footer}>
            <ActivityIndicator style={{marginTop:8, marginBottom:8}} size='small' animating={true}/>
          </View>
        );
      }else if (this.props.loadStatu == LIST_LOAD_NO_MORE){
        return (
          <View style={styles.footer}>
            <Text>没有更多了</Text>
          </View>
        );
      }else {
        return null;
      }
    }


    render() {
      const refreshable = this.props.refreshable && this.props.loadData;
      if (this.props.loadStatu === LIST_FIRST_JOIN ) {
        return (
          <ExceptionView
            exceptionType={ExceptionType.Loading}
            style={this.props.style}
            />
        );
      }else if (this.props.loadStatu === LIST_NO_DATA) {
        return (
          <ExceptionView
            style={this.props.style}
            exceptionType={ExceptionType.NoData}
            image={this.props.noDataImg}
            prompt={this.props.noDataPrompt}
            otherTips={this.renderNoDataTips()}
            refreshControl={
              refreshable ?
    					<RefreshControl
    						refreshing={this.props.loadStatu === LIST_LOAD_DATA}
    						onRefresh={this._handleRefresh}
    						/> : null
    				}/>
        );
      }else if(this.props.loadStatu === LIST_LOAD_ERROR &&
         this.props.dataSource.count == 0){
        //TODO:先不加，其他状态量判断太麻烦。
      }
        return (
          <ListView
            {...this.props}
            style={[styles.list,this.props.style]}
            enableEmptySections = {true}
            onScroll={this.onScroll.bind(this)}
            dataSource={this._dataSource.cloneWithRows(this.props.dataSource)}
            refreshControl={
              refreshable ?
              <RefreshControl
                refreshing={this.props.loadStatu === LIST_NO_DATA}
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
    list: {
        flex: 1,
        backgroundColor:backViewColor,
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

    footer: {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      height:30,
      marginBottom: 12
    },

})
