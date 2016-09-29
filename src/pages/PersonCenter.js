/* @flow */
'use strict';

import {pixel, navbarHeight, screenWidth, screenHeight} from '../util'
import React, {Component, PropTypes} from 'react';
import ReactNative, {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    RefreshControl,
} from 'react-native'

import {blackFontColor, grayFontColor, backViewColor} from '../configure';
import {connect} from 'react-redux'
import {navigatePush} from '../redux/actions/nav'


var needRefresh = true;
class SettingIOS extends Component {
    state:{
        refreshing: bool,
    };
    requesetHandle:Object;

    constructor(props:Object) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }


    componentWillMount() {
        this._handleRefresh(needRefresh);
        // if(needRefresh)  needRefresh = false;
        // var self = this;
        // this.userListener = userManager.lestenUerInfo((info) => {
        //   // console.log('userCenterData', info);
        //   self.setState({userCenterData:info})
        // })
    }

    isLoading:bool;

    _handleRefresh = (animation:bool)=> {
        // if (this.isLoading) {
        //   return;
        // }
        // this.isLoading = true;
        // animation && this.setState({refreshing:true});
        // var self = this;
        // this.requesetHandle = request(userCenterRequest, function(response:Object){
        //   if (response.statu) {
        //
        //     if(self.props.avatar.statu == 'wait'){
        //       // console.log(self.props.avatar.statu);
        //       delete response.data.user_info.headimg;
        //       console.log(response.data.user_info);
        //     }
        //
        //     userManager.saveInfo({...response.data.user_info});
        //   }
        //   self.isLoading = false;
        //   animation && self.setState({refreshing:false});
        // });
    };

    componentWillUnmount() {

    }

    // courseSource = require('../../source/img/xy_start/xy_start.png');
    // recordSource = require('../../source/img/0531_xy_account/xy_account.png');
    // orderSource = require('../../source/img/0531_xy_order/xy_order.png');
    // setSource = require('../../source/img/0531_xy_set/xy_set.png');
    // balanceSource = require('../../source/img/xy_balance/xy_balance.png');
    // couponsSource = require('../../source/img/xy_mycoupon/xy_mycoupon.png');
    // buySource = require('../../source/img/xy_buy/xy_buy.png');

    render() {
        // let leftCourseTime = this.state.userCenterData.left_course_time || 0;
        // let courseTimeStr = '剩余课时: '+leftCourseTime+'课时';
        return (
            <ScrollView
                style={styles.list}
                //refreshControl={
					// <RefreshControl
					// 	refreshing={this.state.refreshing}
					// 	onRefresh={this._handleRefresh}
					// 	/>
				//}
            >
                {this._renderHeadRow(this.props.userData, () => {
                    this.props.push({key: 'PersonInfo'});
                })}
                {this._renderRow('设置', styles.group,  true, () => {
                    this.props.push('Setting');
                })}
                {this._renderRow('推荐我的创意服务', styles.group, true, () => {
                    this.props.push('Contribute');
                })}
                {this._renderRow('我的发布', styles.group, true, () => {
                    this.props.push('iShowList');
                })}


            </ScrollView>
        );
    }

    _renderRow(title:string, style:any,  isArraw:bool = false, onPress:Function = ()=> {
    }, description:any = null) {
        return (
            <TouchableOpacity onPress={onPress} style={style}>
                <View style={styles.row}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        {/*<Image
                            resizeMode='contain'
                            source={source}
                            style={styles.imageNail}
                        />*/}
                        <Text style={styles.rowText}>
                            {title}
                        </Text>
                    </View >
                    <View style={styles.row2}>
                        {description ? <Text style={styles.description}>{description}</Text> : null}
                        {isArraw ? <View style={styles.arrowView}/> : null}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }


    _renderHeadRow(data:Object, onPress:Function = ()=> {
    }) {
        // let {grade_str,connect_phone} = data;
        // console.log('test111:',data.avatar.url)
        const name = data.username
        return (
            <TouchableOpacity onPress={onPress} style={styles.group}>
                {/*<View style={styles.headerStyle}>
                    <Image
                        source={{uri: data.avatar && data.avatar.url||''}}
                        style={styles.thumbnail}
                    />
                    <View style={styles.infoContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{data.username}</Text>

                        </View>
                        <Text style={styles.teacherName}>
                            {data.mobilePhoneNumber}
                        </Text>
                    </View>
                    <View style={styles.arrowView}/>
                </View>*/}
                <View style={styles.headView}>
                  <Text style={styles.headViewText}>
                       -{name}
                  </Text>
                  <Text style={styles.headViewSubText}>查看或编辑个人资料</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

    group: {
        marginBottom: 7
    },
    emptyPageText: {
        margin: 10,
    },
    list: {
        flex:1,
        backgroundColor:backViewColor,
    },
    bottomLine: {
        borderBottomWidth: pixel,
        borderBottomColor: '#e4e4e4',
    },
    row: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10 ,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageNail: {
    // marginTop: 13,
    // marginBottom: 13,
        marginLeft: 10,
        width: 20,
        height: 20,
    },

    row2: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    rowNote: {
        fontSize: 17,
    },
    rowText: {
        marginLeft: 10,
        fontSize: 14,
        color: blackFontColor,
    },
    arrowView: {
        borderBottomWidth: pixel * 2,
        borderRightWidth: pixel * 2,
        borderColor: '#8c8c85',
        transform: [{rotate: '315deg'}],
        marginRight: 5,
        width: 10,
        height: 10,
    },

    headerStyle: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    description: {
        marginRight: 12,
        fontSize: 13,
        color: blackFontColor
    },

    headView:{
      height:170,
      backgroundColor:'white',
    },
    headViewText:{
      marginTop:60,
      marginHorizontal:20,
      fontSize:30,
      fontWeight:'bold',
    },
    headViewSubText:{
      marginTop:10,
      marginHorizontal:20,
      fontSize:13,
    },
});


const mapStateToProps = (state) => {
    //从login reduce 中获取state的初始值。
    //console.log('state:',state);
    return {
        avatar: state.util.get('loadAvatar').toObject(),
        userData: state.login.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        push: (key)=> {
            dispatch(navigatePush(key))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingIOS)
