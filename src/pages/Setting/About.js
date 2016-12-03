/**
 * Created by lintong on 2016/12/1.
 * @flow
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native'
import * as Animatable from 'react-native-animatable';
import {mainColor} from '../../configure';
import Icon from 'react-native-vector-icons/Ionicons'
const AniView = Animatable.createAnimatableComponent(Icon);
export default class About extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {};
    }

    state: {};
    static propTypes = {};
    static defaultProps = {};

    render() {
        return (
            <View style={[this.props.style,styles.wrap]}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={()=>{
                    this.refs.icon.bounceIn(1000)}}>

                    <AniView
                        ref='icon'
                        name='logo-freebsd-devil'
                        size={100}
                        color={mainColor}
                        style={styles.icon}/>
                </TouchableOpacity>

                <Text style={styles.text}>
                    {"   "}  diff是一款简单的应用,希望大家可以发挥各自的想象力，将想象力变成虚拟商品。
                    这也是我们对游戏化的一个小小的尝试，希望它能让你觉得有趣。对了，我们的QQ群是:
                    595508017，欢迎加入我们。
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: 'white',
    },
    icon: {
        alignSelf: 'center'
    },
    text:{
        paddingHorizontal:20,
        lineHeight:25,
        color:'rgba(0,0,0,0.7)'
    }
})