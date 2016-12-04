/**
 * Created by lintong on 8/29/16.
 * @flow
 */
'use strict';


import React, {Component,PropTypes} from 'react';
import {iCommentListLoad,iCommentListLoadMore} from '../../redux/actions/iComment'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import * as immutable from 'immutable';
import WBImage from '../../components/Base/WBImage'
import {connect} from 'react-redux'
import BaseListView from '../../components/Base/BaseListView';
import { navigatePush,navigateRefresh } from '../../redux/actions/nav'
import Icon from 'react-native-vector-icons/FontAwesome'
import {renderNavAddButton} from '../../util/viewUtil'

var moment = require('moment'); //load moment module to set local language
require('moment/locale/zh-cn'); //for import moment local language file during the application build
moment.locale('zh-cn');//set moment local language to zh-cn
var TimeAgo = require('react-native-timeago');
class IComment extends Component {
    constructor(props:Object) {
        super(props);
        // this._renderHeader.bind(this)
    }

    static propTypes = {
       load: PropTypes.func.isRequired,
       loadMore:PropTypes.func.isRequired,
       loadStatu:PropTypes.string.isRequired,
       dataSource:PropTypes.array.isRequired,
    };




    _tapRight=()=>{
      this.props.push('AddComment')
    }


    componentDidMount() {
      const rightBtn = renderNavAddButton(this._tapRight)
      this.props.refresh({renderRightComponent:rightBtn});
    }




    shouldComponentUpdate(nextProps:Object) {
      return !immutable.is(this.props.loadStatu, nextProps.loadStatu)||
            !immutable.is(this.props.dataSource,nextProps.dataSource);
    }


    renderRow(idea:Object, sectionID:number, rowID:number) {
      const data = idea.toObject()
      const user = data.user;
      const date = Date.parse(data.createdAt);
      const avatar = user.get('avatar')
      // console.log(user);
      // console.log(date);
      return (
        <View style={[styles.row]} >

            <WBImage style={styles.avatar} source={{uri:avatar.get('url')}}/>
            <View style={styles.subRow}>
              <Text style={styles.name}>{user.get('username')}</Text>
              <Text
                style={styles.text}>
                {data.content}
              </Text>
              <View style={styles.subBottom}>
                <TimeAgo time={data.createdAt}  style={styles.date}/>
              </View>
              <View style={styles.line}/>
            </View>

        </View>
      )
    }

    render() {
        return (
          <BaseListView
            style= {styles.list}
            noDataPrompt="第一个评论吧！"
            loadStatu={this.props.loadStatu}
    				loadData={this.props.load}
            dataSource={this.props.dataSource}
            loadMore={this.props.loadMore}
    				renderRow={this.renderRow.bind(this)}
    				/>
        );
    }
}

const styles = StyleSheet.create({
    row:{
      marginHorizontal:20,
      backgroundColor:'white',
      flexDirection:'row'
    },
    subRow:{
      marginTop:10,
      flex:1,
      marginLeft:15,
    },

    headView:{
      height:180,
    },
    headViewText:{
      marginTop:30,
      marginHorizontal:20,
      fontSize:50,
      fontWeight:'bold',
    },
    headViewSubText:{
      marginTop:10,
      marginHorizontal:20,
      fontSize:14,
    },
    list:{
      backgroundColor:'white',
    },
    wrap: {
        flex: 1,
    },
    line:{
      height:StyleSheet.hairlineWidth,
      backgroundColor:'rgba(0,0,0,0.2)',
    },

    name:{
      fontWeight:'bold',
      fontSize:15,
    },
    text:{
      marginTop:5,
      fontSize:14,
    },
    avatar:{
      marginTop:10,
      width:30,
      height:30,
      borderRadius:15,
    },
    subBottom:{
      flexDirection:'row',
        marginBottom:10,
    },
    date:{
      marginTop:5,
      fontSize:12,
      color:'rgba(0,0,0,0.5)'
    }
})

const mapStateToProps = (state) => {
    return {
      loadStatu:state.iComment.get('loadStatu'),
      dataSource:state.iComment.get('data').toArray(),
      user:state.login.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      load:()=>{
        dispatch(iCommentListLoad());
      },
      loadMore:()=>{
        dispatch(iCommentListLoadMore());
      },
      push:(key)=>{
        dispatch(navigatePush(key));
      },
      refresh:(obj)=>{
        dispatch(navigateRefresh(obj))
      },

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IComment)
