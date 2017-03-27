/**
 * Created by lintong on 2017/3/26.
 * @flow
 */
'use strict';


import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import {mainColor} from '../../configure'
import {connect} from 'react-redux'
import * as immutable from 'immutable';
import BaseListView from '../../components/Base/BaseListView';
import {listLoad, listLoadMore} from '../../redux/actions/list'
import {collectsList} from '../../redux/leanCloud'
const listKey = 'collectsList'
function myListLoad(more: bool = false) {
    return (dispatch, getState) => {

    }
}


@connect(
    state =>({
        data: state.list.get(listKey),
    }),
    dispatch =>({
        //...bindActionCreators({},dispatch),
        load: ()=>dispatch(collectsList(false)),
        loadMore: ()=>dispatch(collectsList(true)),
    })
)

export default class iCollect extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {
        load: PropTypes.func.isRequired,
        loadMore: PropTypes.func.isRequired,
    };

    static defaultProps = {
        data: immutable.fromJS({
            listData: [],
            loadStatu: 'LIST_NORMAL',
        })
    };

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
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

        const loadStatu = this.props.data.get('loadStatu')
        let listData = this.props.data.get('listData') && this.props.data.get('listData').toJS()

        return (
            <BaseListView
                //renderHeader={this._renderHeader}
                style={[this.props.style,styles.list]}
                loadStatu={loadStatu}
                loadData={this.props.load}
                dataSource={listData}
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




