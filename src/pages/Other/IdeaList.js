/**
 * Created by lintong on 8/29/16.
 * @flow
 */
'use strict';


import React, {Component,PropTypes} from 'react';
import {ideaListLoad,ideaListLoadMore} from '../../redux/actions/ideaList'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native'
import * as immutable from 'immutable';
import WBImage from '../../components/Base/WBImage'
import {connect} from 'react-redux'
import BaseListView from '../../components/Base/BaseListView';
import { navigatePush } from '../../redux/actions/nav'
import {ideaListSelcet} from '../../redux/actions/ideaList'
class IdeaList extends Component {
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


    componentDidMount() {
    }

    shouldComponentUpdate(nextProps:Object) {
      return !immutable.is(this.props.loadStatu, nextProps.loadStatu)||
          this.props.user !== nextProps.user ;
    }

    _renderHeader=()=>{
      const name = this.props.user.username||'陌生人'
      return (
        <View style={styles.headView}>
          <Text style={styles.headViewText}>
               -{name},您好！
          </Text>
          <Text style={styles.headViewSubText}>想尝试什么?</Text>
        </View>
      )
    }
    renderRow(idea:Object, sectionID:number, rowID:number) {
      const data = idea.toObject()
      // console.log(data.imageFile|| null  );
        let url = 'http://facebook.github.io/react/img/logo_og.png'
      try {

        if(data.images) {
          const images = data.images.toArray();
           url = images[0].get('url')
          // const newURL = data.images.get('url')
          // url = newURL.length == 0 ?url:newURL;
        }
      } catch (e) {
        console.warn(e.message);
      }

      return (
        <TouchableOpacity
          style={[styles.row]}
          onPress={()=>{
            // this.props.select(rowID);
            const idea = this.props.dataSource[rowID]
            // console.log('idea:',idea);
            this.props.push({key:"Intro",idea:idea})
          }} >
          <View>
            <WBImage style={styles.image} source={{uri:url}}/>
            <Text
              numberOfLines = {1}
              style={styles.text}>
              {data.title}
            </Text>
          </View>
          <View style={styles.line}/>
        </TouchableOpacity>
      )
    }

    render() {
        return (
          <BaseListView
            renderHeader={this._renderHeader}
            style= {styles.list}
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
      marginTop:30,
      marginHorizontal:20,
      backgroundColor:'white'
    },
    text:{
      marginTop:15,
      marginBottom:20,
      fontSize:17,
    },
    headView:{
      // height:180,
      // marginBottom:30,
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
        marginBottom:Platform.OS == 'ios'?0:20,
        marginTop:Platform.OS == 'ios'?20:0,
    },
    wrap: {
        flex: 1,
    },
    line:{
      height:StyleSheet.hairlineWidth,
      backgroundColor:'rgba(0,0,0,0.2)',
    },
    image:{
      height:200,
    },
})

const mapStateToProps = (state) => {
    return {
      loadStatu:state.ideaList.get('loadStatu'),
      dataSource:state.ideaList.get('data').toArray(),
      user:state.login.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      load:()=>{
        dispatch(ideaListLoad());
      },
      loadMore:()=>{
        dispatch(ideaListLoadMore());
      },
      push:(key)=>{
        dispatch(navigatePush(key));
      },
      select:(index:number)=>{
        dispatch(ideaListSelcet(index));
      }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IdeaList)
