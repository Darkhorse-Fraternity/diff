/* @flow */
//修改密码
'use strict';
import React, {Component} from 'react';
import ReactNative, {
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    TextInput,
    Picker,
} from 'react-native'
import {saveUserData} from '../../util/XGlobal'
// import {Actions} from "react-native-router-flux";
import {pixel, navbarHeight, Toast, checkPhoneNum} from '../../util/';
import {OS} from '../../util';
import {BCButton} from '../../components/Base/WBButton'
import Button from 'react-native-button'
import {request} from '../../request'
// import { iforgotRequest} from '../../request/info'
import {requestPasswordResetBySmsCode,resetPasswordBySmsCode} from '../../request/leanCloud'
import {deepFontColor, lineColor, mainColor, backViewColor} from '../../configure'

import {connect} from 'react-redux'
import {navigateReplaceIndex,navigatePop} from '../../redux/actions/nav'
import {getUserByObjectID} from '../../redux/actions/login'
class FindPwd extends Component {
    constructor(props:Object) {
        super(props);
        this.state = {
            loaded: false,
            grade: '',
            time: 60,
            codeName: '',
            isTap: false,
            phone: "", //号码
            ymCode: "", //验证码
            setPwd: "", //设置密码
            requestHandle: {},
            showPicker: false,
            timeLoad: false,
        };
    }

    state:{
        loaded:bool,
        grade:string,
        phone:string,
        time:number,
        codeName:string,
        isTap:bool,
        ymCode:string,
        setPwd:string,
        requestHandle: Object,
        showPicker:bool,
        timeLoad:bool,
    };


    id:number = 0;
    codeHandle:Object;
    findHandle:Object;


    _onClickCode() {
        //发送验证码请求
//没注册过手机号 13517238595

        var self = this;
        this.setState({timeLoad: true});
        // loginCodeRequest.params.user_name = this.state.phone;
        // loginCodeRequest.params.for_register = 'no';
        const findPwdCode = requestPasswordResetBySmsCode(this.state.phone);
        this.codeHandle = request(findPwdCode, function (response) {

            if (response.statu) {
                Toast.show(response.msg);
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


    _login = ()=> {
        //判断手机号的正则
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

        //点击提交请求网络

        var self = this;
        // iforgotRequest.params.user_name = this.state.phone;
        // iforgotRequest.params.password = this.state.setPwd;
        // iforgotRequest.params.verify_code = this.state.ymCode;
        const resetPassword = resetPasswordBySmsCode(this.state.setPwd,this.state.ymCode);
        this.setState({loaded: true});
        this.findHandle = request(resetPassword, function (response) {
            if (response.statu) {
                // Toast.show(response.msg);
                // saveUserData(response.data, iforgotRequest.params.user_name);//保存到本地。

                // self.props.navigator.push({name:"main", component:MainTabView});
                // self.props.push();
                // response.data.objectId;
                self.props.getUserByID(response.data.objectId,(res)=>{
                  if(self.props.loginType != 'LOGIN_SUCCEED'){
                    res.statu && self.props.push();
                  }else{
                    res.statu && self.props.pop();
                  }

                });
            }
            self.setState({loaded: false});
        });

    }

    time() {
        if (this.state.time == 0) {
            clearInterval(this.id);
            this.setState({isTap: false});
        }

        this.setState({
            time: this.state.time == 0 ? 60 : --this.state.time,
        })
    }


    componentWillUnmount() {
        this.codeHandle && this.codeHandle.next();
        this.findHandle && this.findHandle.next();
        this.id && clearInterval(this.id);
    }


    focusNextField(nextField:string) {
        if (nextField == '2') {
            this.refs['3'].focus();
        } else if (nextField == '3') {
            this._login();
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

        var codeEnable = checkPhoneNum(this.state.phone) &&
            this.state.time == 60 && this.state.isTap == false;

        return (
            <View style={styles.container}>
                <ScrollView
                    keyboardShouldPersistTaps={true}
                    keyboardDismissMode='on-drag'>

                    <View style={[styles.rowStyle,{marginTop:29/2}]}>
                        {this._renderRowMain('手机号码:', '请填入手机号',
                            (text) => this.setState({phone: text}), 'numeric', true, 11, '1',
                        )}
                        <BCButton containerStyle={styles.buttonContainerStyle}
                                  disabled={!codeEnable}
                                  loaded={this.state.timeLoad}
                                  onPress={this._onClickCode.bind(this)}
                                  style={{fontWeight:'100',fontSize:14}}
                        >
                            {this.state.time == 60 || this.state.time == 0 ? '获取验证码' :
                                this.state.time.toString()}
                        </BCButton>
                    </View>

                    <View style={styles.rowStyle}>
                        {this._renderRowMain('验证码:', '输入验证码',
                            (text) => this.setState({ymCode: text}), 'numbers-and-punctuation',
                            false, 6, '2',
                        )}
                    </View>
                    <View style={styles.rowStyle}>
                        {this._renderRowMain('设置密码:', '6-16个字符,字母区分大小写',
                            (text) => this.setState({setPwd: text}), 'numbers-and-punctuation'
                            , false, 16, '3'
                        )}
                    </View>

                    <BCButton
                        isLoad={this.state.loaded|| this.props.load}
                        containerStyle={styles.buttonContainerStyle2}
                        onPress={this._login}>
                        提交
                    </BCButton>
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
        backgroundColor: backViewColor,
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
        // flex:1 ,
        width: 65,
        fontSize: 14,
        color: '#262324',
    },
    textInputStyle: {
        marginLeft: 29 / 2,
        textAlign: 'left',
        fontSize: 13,
        flex: 2,
        height: 40,
        borderColor: 'gray',
        backgroundColor: '#00000000',
    },
    buttonContainerStyle2: {
        marginTop: 7,
        height: 40,
        marginLeft: 29 / 2,
        marginRight: 29 / 2,
        justifyContent: 'center',
    },

})


const mapStateToProps = (state) => {
    //从login reduce 中获取state的初始值。
    //console.log('state:',state);
    return {
      load:state.login.loaded,
      loginType:state.login.type,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        push: ()=> {
            //index 为空 则为当前index
            dispatch(navigateReplaceIndex('TabView'));
        },
        pop:()=>{
           dispatch(navigatePop());
        },
        getUserByID:(id:string,callBack:Function)=>{
            dispatch(getUserByObjectID(id,callBack));
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FindPwd)
