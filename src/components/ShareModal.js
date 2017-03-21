/**
 * Created by lintong on 2016/12/21.
 * @flow
 */
'use strict';


import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    Modal,
    Clipboard
} from 'react-native'
import {connect} from 'react-redux'
import {mainColor} from '../configure'
import {dataStorage} from '../redux/actions/util'
import {bindActionCreators} from 'redux';
import {
    shareToWechat,
    shareToQQ,
    SHARE_TO_QQ,
    SHARE_TO_SESSION,
    SHARE_TO_TIMELINE,
    Share_TO_ZONE
} from '../redux/actions/share'
import {Toast} from '../util'
export const shareModalKey = 'Share_Modal_Show'
@connect(
    state =>({
        show: state.util.get(shareModalKey),
    }),
    dispatch =>({
        showModal: (value)=> {
            dispatch(dataStorage(shareModalKey, value))
        },
        ...bindActionCreators({shareToQQ,shareToWechat},dispatch),
    })
)
export  default  class MyComponet extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};


    show = ()=> {
        this.props.showModal(true)
    }


    __showModal = ()=> {
        // console.log('testss:',this.state.mut)
        // const flag =
        const item = (title, image, onPress)=> {
            return (
                <TouchableOpacity
                    onPress={()=>{
                        onPress()
                        this.props.showModal(false)
                    }}
                    style={{alignItems:'center'}}>
                    <Image style={{height:50,width:50,marginTop:10,marginHorizontal:20,}} source={image}/>
                    <Text style={{marginTop:10,color:'rgb(150,150,150)'}}>{title}</Text>
                </TouchableOpacity>
            )
        }
        const parma = {
            webpageUrl:this.props.webpageUrl,
            description:this.props.description,
            imageUrl:this.props.imageUrl,
            title:this.props.title,
            thumbImage:this.props.thumbImage,
        }
        return (
            <Modal
                transparent={true}
                animationType='fade'
                onRequestClose={() => {
                   this.props.showModal(false)
                }}
                visible={this.props.show || false}>
                <TouchableOpacity onPress={()=>this.props.showModal(false)} style={styles.close}>
                    <Image style={{flex:1}} source={require('../../source/img/invite/zhong-close.png')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>{
                        this.props.showModal(false)
                    }}
                    style={styles.modal}>
                    <View
                        onStartShouldSetResponder={()=>true}
                        style={styles.modalSub}>
                        <Text style={{textAlign:'center',marginTop:10,color:'rgb(150,150,150)'}}>好东西一定要记得分享给好友</Text>
                        <View style={{padding:15,flexDirection:'row',
                        alignItems:'center',flexWrap:'wrap'}}>
                            {item('微信好友', require('../../source/img/invite/share-1.png'),
                                ()=> this.props.shareToWechat(SHARE_TO_SESSION,parma))}
                            {item('朋友圈', require('../../source/img/invite/share-2.png'),
                                ()=>this.props.shareToWechat(SHARE_TO_TIMELINE,parma))}
                            {item('QQ好友', require('../../source/img/invite/share-3.png'),
                                ()=>this.props.shareToQQ(SHARE_TO_QQ,parma))}
                            {item('QQ空间', require('../../source/img/invite/share-4.png'),
                                ()=>this.props.shareToQQ(Share_TO_ZONE,parma))}
                            {item('复制', require('../../source/img/invite/share-5.png'),
                                ()=>{
                                    Toast.show("已复制")
                                    {/*console.log('test:', parma.title);*/}
                                    Clipboard.setString(parma.title+' '+parma.webpageUrl)}
                                    )}
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
            // this.props.select('车辆故障')
        )
    }

    render(): ReactElement<any> {
        return (
            <View>
                {this.__showModal()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        // pointerEvents:'box-only',
    },

    modalSub: {

        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 5,
        marginHorizontal: 10,
    },
    selectMulBtn: {
        marginTop: 10,
        marginLeft: 35,
        flexDirection: 'row',
        alignItems: 'center',
    },

    buttonContainerStyle: {
        marginTop: 20,
        marginBottom: 10,
        height: 40,
        justifyContent: 'center',
        marginHorizontal: 15,
    },
    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgb(200,200,200)',
        marginHorizontal: 20,
        marginBottom: 10,
        marginTop: -5,
    },
    tip: {
        marginTop: 15,
        marginBottom: 15,
        fontSize: 15,
    },
    tip2: {
        marginBottom: 10,
        fontSize: 13,
        color: 'rgb(150,150,150)'
    },
    close:{
        zIndex:100,
        position:'absolute',
        right:50,
        top:Dimensions.get('window').width/2-80 ,
    },
})

