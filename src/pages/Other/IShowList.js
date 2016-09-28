/**
 * Created by lintong on 8/29/16.
 * @flow
 */
'use strict';


import React, {Component,PropTypes} from 'react';
import {iShowListLoad,iShowListLoadMore} from '../../redux/actions/iShow'
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
import { navigatePush } from '../../redux/actions/nav'
import {iShowSelcet} from '../../redux/actions/iShow'
class ishowList extends Component {
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
      return !immutable.is(this.props.loadStatu, nextProps.loadStatu) ;
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
            this.props.select(rowID);
            this.props.push("Intro")}} >
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
            //renderHeader={this._renderHeader}
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
    image:{
      height:200,
    },
})

const mapStateToProps = (state) => {
    return {
      loadStatu:state.iShow.get('loadStatu'),
      dataSource:state.iShow.get('data').toArray(),
      user:state.login.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      load:()=>{
        dispatch(iShowListLoad());
      },
      loadMore:()=>{
        dispatch(iShowListLoadMore());
      },
      push:(key)=>{
        dispatch(navigatePush(key));
      },
      select:(index:number)=>{
        dispatch(iShowSelcet(index));
      }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ishowList)
