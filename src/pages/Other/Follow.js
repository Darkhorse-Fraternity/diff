/**
 * Created by lintong on 2017/3/28.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {mainColor} from '../../configure';
import {send} from '../../request'
import {friendshipAdd,friendshipDelete} from '../../request/leanCloud'
import {bindActionCreators} from 'redux';

//static displayName = Follow
@connect(
    state =>({
        //state:state.util.get()
        user:state.login.data
    }),
    dispatch =>({
        follow:()=>{
            const param =  friendshipAdd()

        }
        //...bindActionCreators({},dispatch),
    })
)
export  default  class Follow extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};


    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }

    componentDidMount() {

    }

    render(): ReactElement<any> {
        const user = this.props.scene.route.user;

        let avatar = {}
        if (user.avatar) {
            avatar = user.avatar.toObject();
        }
        const selfFlag = user.objectId == this.props.user.objectId
        console.log('test:', user);
        console.log('test:', this.props.user);
        return (
            <View style={[this.props.style,styles.wrap]}>
                <View style={styles.head}>
                    <Image style={styles.avatar} source={{uri:avatar.url}}/>
                    <Text style={styles.userName}>{user.username}</Text>
                    <TouchableOpacity style={styles.followBtn} onPress={()=>{
                        //关注

                    }}>
                        <Text style={styles.follow1}>{"+ "}</Text>
                        <Text style={styles.follow2}>{"关注"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    head: {
        backgroundColor: 'white',
        alignItems: 'center'
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30,
    },
    userName: {
        marginTop: 10,
        fontSize: 17,
    },
    follow1:{
        fontSize:23,
        color:mainColor,
        marginBottom:4,
    },
    follow2:{
        fontSize:17,
        color:mainColor,
    },
    followBtn:{
        paddingHorizontal:10,
        borderRadius:5,
        borderColor:mainColor,
        borderWidth:StyleSheet.hairlineWidth,
        marginTop:20,
        marginBottom:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    }

})
