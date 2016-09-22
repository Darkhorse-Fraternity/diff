/* @flow */
//注册页面
'use strict';
import React, {Component, PropTypes} from 'react';
import ReactNative, {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    Picker,
    LayoutAnimation,
    TouchableOpacity,
    NativeModules
} from 'react-native'
const AppSourceAndroid = NativeModules.AppSourceAndroid
import {saveUserData} from '../../util/XGlobal'
import DialogAndroid from 'react-native-dialogs'
import {pixel, navbarHeight, Toast, OS, checkPhoneNum} from '../../util/';
// import {Actions} from "react-native-router-flux";

import {BCButton} from '../../components/Base/WBButton'
import Button from 'react-native-button'
import {request} from '../../request'
import {requestSmsCode, requestUsersByMobilePhone} from '../../request/leanCloud'
import {deepFontColor, backViewColor, blackFontColor, mainColor} from '../../configure'
import {connect} from 'react-redux'
import {navigateReplaceIndex, navigatePush} from '../../redux/actions/nav'
import {register} from '../../redux/actions/login'

const webUrl = 'https://static.dayi.im/static/fudaojun/rule.html?version=20160603182000';
class RegPhone extends Component {
    constructor(props:Object) {
        super(props);
        this.state = {
            time: 60,
            codeName: '',
            phone: "", //号码
            ymCode: "", //验证码
            setPwd: "", //设置密码
            isTap: false,
            timeLoad: false,
        };
    }

    state:{
        phone:string,
        time:number,
        codeName:string,
        ymCode:string,
        setPwd:string,
        isTap:bool, // 用于time 是否在走。
        timeLoad:bool,
    };


    requestHandle:Object;
    id:number = 0;

    _onClickCode() {
        //发送验证码请求
//没注册过手机号 13517238595
        this.setState({timeLoad: true});
        var self = this;
        requestSmsCode.params.mobilePhoneNumber = this.state.phone;
        this.requestHandle = request(requestSmsCode, function (response) {
            if (response.statu) {
                Toast.show("发送成功!");
                if (self.state.isTap == false) {
                    self.setState({isTap: true});
                    self.id = setInterval(function () {
                        self.time()
                    }, 1000)
                }
            }
            self.setState({timeLoad: false});
        });
    }


    time() {
        if (this.state.time == 0) {
            clearInterval(this.id);
            // this.isTap = false;
            this.setState({isTap: false});
        }

        this.setState({
            time: this.state.time == 0 ? 60 : --this.state.time,
        })
    }

    _gowebView = ()=> {


        this.props.pushWebView({key: 'WebView', title: '微著网络服务协议', url: webUrl});
    };

    _goRegist() {
        // 判断手机号的正则
        if (!checkPhoneNum(this.state.phone)) {
            Toast.show('不是正确的手机号码');
            this.refs['1'].focus();
            return;
        }
        //判断验证码的正则
        var reg = /^\d{6}$/;
        var flag = reg.test(this.state.ymCode)
        if (!flag) {
            Toast.show('不是正确验证码');
            this.refs['2'].focus();
            return;
        }

        //判断设置密码是否正确 6到16位
        reg = /^.{6,16}$/
        flag = reg.test(this.state.setPwd)
        if (!flag) {
            Toast.show('密码设置不正确');
            this.refs['3'].focus();
            return;
        }

        //判断年级是否进行了选择。


        // var self = this;
        //
        // const params = requestUsersByMobilePhone(this.state.phone,this.state.ymCode,
        // this.state.setPwd);
        //
        // this.requestHandle = request(params, function(response){
        //     if(response.statu){
        //       Toast.show(response.msg);
        //       saveUserData(response.data,registerRequest.params.user_name);//保存到本地。
        //       self.setState({
        //          setPwd:"",
        //       });
        //       self.props.push();
        //     }
        //     self.setState({loaded:false});
        // });
        this.props.mRegister(this.state);

    }


    componentWillUnmount() {
        this.id && clearInterval(this.id);
        this.requestHandle && this.requestHandle.next();
    }


    focusNextField(nextField:string) {

        if (nextField == '1') {
            this.refs['2'].focus();
        } else if (nextField == '2') {
            this.refs['3'].focus();
        } else {

        }
    }

    _renderRowMain(title:string, placeholder:string, onChangeText:Function,
                   boardType:PropTypes.oneOf = 'default', autoFocus:bool = false, maxLength:number = 16,
                   ref:string) {

        return (
            <View style={styles.rowMainStyle}>
                <Text style={styles.textStyle}>{title}</Text>
                <TextInput
                    ref={ref}
                    selectionColor={mainColor}
                    returnKeyType='next'
                    autoFocus={autoFocus}
                    maxLength={maxLength}
                    keyboardType={boardType}
                    style={styles.textInputStyle}
                    placeholder={placeholder}
                    clearButtonMode='while-editing'
                    enablesReturnKeyAutomatically={true}
                    onSubmitEditing={() =>this.focusNextField(ref)}
                    onChangeText={onChangeText}/>
            </View>
        )
    }

    render() {
        console.log('--', this.props.state);
        var codeEnable = checkPhoneNum(this.state.phone) &&
            this.state.time == 60 && !this.state.isTap;
        return (
            <View style={styles.container}>
                <ScrollView
                    keyboardShouldPersistTaps={true}
                    keyboardDismissMode='on-drag'>

                    <View style={[styles.rowStyle,{marginTop:29/2}]}>
                        {this._renderRowMain('手机号码:', '请填入手机号',
                            (text) => this.setState({phone: text}), 'default', true, 11, "1"
                        )}
                        <BCButton containerStyle={styles.buttonContainerStyle}
                                  disabled={!codeEnable}
                                  loaded={this.state.timeLoad}
                            //styleDisabled={{fontWeight:'normal'}}
                                  onPress={this._onClickCode.bind(this)}
                                  style={{fontWeight:'100',fontSize:14}}
                        >
                            {this.state.time == 60 || this.state.time == 0 ? '获取验证码' :
                            this.state.time.toString() + '秒'}
                        </BCButton>
                    </View>

                    <View style={styles.rowStyle}>
                        {this._renderRowMain('验证码:', '输入您收到的验证码',
                            (text) => this.setState({ymCode: text}), 'numbers-and-punctuation'
                            , false, 6, "2"
                        )}
                    </View>
                    <View style={styles.rowStyle}>
                        {this._renderRowMain('设置密码:', '6-16个字符,区分大小写',
                            (text) => this.setState({setPwd: text}), 'numbers-and-punctuation'
                            , false, 16, "3"
                        )}
                    </View>

                    <BCButton
                        isLoad={this.props.state.loaded}
                        onPress={this._goRegist.bind(this)}
                        containerStyle={styles.buttonContainerStyle2}>
                        提 交
                    </BCButton>
                    <View style={styles.rowMainStyle}>
                        <Text style={styles.protocolPre}>注册代表您已经阅读</Text>
                        <Button
                            onPress={this._gowebView}
                            style={styles.protocolSuf}>
                            《微著网络服务协议》
                        </Button>
                    </View>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: navbarHeight,
        // flexDirection:'row',
        flex: 1,
        backgroundColor: backViewColor
    },
    rowStyle: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        marginTop: 7,
        marginLeft: 29 / 2,
        marginRight: 29 / 2,
        borderRadius: 3,
        height: 40,
        alignItems: 'center',
        // flexDirection:'row'
    },

    rowMainStyle: {
        flex: 1,
        // padding:15,
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonContainerStyle: {
        marginRight: 5,
        height: 25,
        paddingHorizontal: 6,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        // flex: ,
        width: 65,
        fontSize: 14,
        color: blackFontColor,
    },
    textInputStyle: {
        marginLeft: 29 / 2,
        textAlign: 'left',
        fontSize: 13,
        flex: 1,
        height: 40,
        borderColor: 'gray',
        backgroundColor: '#00000000',
    },
    buttonSelectStyle: {
        marginLeft: OS == 'ios' ? 29 / 2 : 27,
        flex: 1,
        height: 30,
        justifyContent: 'center',
    },
    buttonTextStyle: {
        fontSize: 14,
        color: '#9ba0a2'
    },
    buttonMainTextStyle: {
        fontSize: 14,
        color: deepFontColor,
    },
    buttonContainerStyle2: {
        marginLeft: 29 / 2,
        marginRight: 29 / 2,
        marginTop: 7,
        height: 40,
        justifyContent: 'center',
    },
    arrowView: {
        borderBottomWidth: pixel * 2,
        borderRightWidth: pixel * 2,
        borderColor: '#8c8c85',
        transform: [{rotate: '315deg'}],
        marginRight: 20,
        width: 10,
        height: 10,
    },
    arrowView2: {
        borderBottomWidth: pixel * 2,
        borderRightWidth: pixel * 2,
        borderColor: '#8c8c85',
        transform: [{rotate: '45deg'}],
        marginRight: 20,
        width: 10,
        height: 10,
    },

    protocolPre: {
        marginTop: 8,
        fontSize: 11,
        color: '#9e9e9e',
    },
    protocolSuf: {
        marginTop: 8,
        fontSize: 11,
        color: mainColor,
    }

})


const mapStateToProps = (state) => {
    //从login reduce 中获取state的初始值。
    //console.log('state:',state);
    return {
        state: state.login,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        push: ()=> {
            //index 为空 则为当前index
            dispatch(navigateReplaceIndex('TabView'));
        },
        mRegister: (state)=> {
            dispatch(register(state));
        },
        pushWebView: (params)=> {
            dispatch(navigatePush(params));
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegPhone)
