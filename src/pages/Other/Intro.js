/* @flow */
'use strict'

import React, {Component, PropTypes} from 'react'
import  {
    View,
    TouchableOpacity,
    Modal,
    Platform,
    StatusBar,
    AppRegistry, ScrollView, Text, Image, StyleSheet
} from 'react-native';
import Swiper from 'react-native-swiper'
import WBImage from '../../components/Base/WBImage'
import Icon from 'react-native-vector-icons/FontAwesome'
import {pixel} from '../../util'
import WBButton from '../../components/Base/WBButton'
import {connect} from 'react-redux'
import {screenWidth, screenHeight} from '../../util'
import {navigatePush, navigatePop} from '../../redux/actions/nav'
import {goCommit} from '../../redux/actions/intro'
import * as immutable from 'immutable';
import {BlurView} from 'react-native-blur';
import BaseListView from '../../components/Base/BaseListView';
const MyBlueView = Platform.OS == 'ios' ? BlurView : View;
import ShareModal, {shareModalKey} from '../../components/ShareModal'
const style = Platform.OS == 'ios' ? {} : {backgroundColor: 'rgba(0,0,0,0.9)'}
import {showModalSwiper, hiddenModelSwiper, tryIdea} from '../../redux/actions/intro'
import {iCommitListLoad, iCommitListLoadMore, selectChange} from '../../redux/actions/iCommit'
import {mainColor, containingColor, lightMainColor, lightContainingColor} from '../../configure';
import * as Animatable from 'react-native-animatable';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
// const AniView = Animatable.View;
// const myIcon = (<Icon name="rocket" size={30} color="#900" />)
// const customTextButton = (
//   <Icon.Button name="facebook" backgroundColor="#3b5998">
//     <Text style={{fontFamily: 'Arial', fontSize: 15}}>Login with Facebook</Text>
//   </Icon.Button>
// );
import StarRating from 'react-native-star-rating';
import {dataStorage} from '../../redux/actions/util'
const SwiperViewHight = screenWidth / 400 * 280
class intro extends Component {

    constructor(props: Object) {
        super(props);
        // this._renderHeader.bind(this)
    }

//图片轮播图
//中间文字介绍
//底部button
    static propTypes = {
        load: PropTypes.func.isRequired,
        loadMore: PropTypes.func.isRequired,
        loadStatu: PropTypes.string.isRequired,
        dataSource: PropTypes.array.isRequired,
    };

    _renderBackButton(): ReactElement<any> {
        return (
            <TouchableOpacity style={styles.buttonContainer} onPress={this.props.pop}>
                <View style={styles.arrowView}/>
            </TouchableOpacity>
        )
    }

    _renderModalSwiper(images: any): ReactElement<any> {
        const showModalSwiper = this.props.intro.get('showModalSwiper')
        return (
            <Modal
                transparent={true}
                animationType='fade'
                onRequestClose={() => {this.props.hiddenModelSwiper()}}
                visible={showModalSwiper}>
                <MyBlueView blurType="dark" style={style}>
                    <View style={{zIndex:2,top:20,width:100,position:'absolute'}}>
                        <Icon.Button name="close" backgroundColor="transparent"
                                     iconStyle={{marginLeft:20}} onPress={this.props.hiddenModelSwiper}/>
                    </View>
                    <Swiper style={styles.wrapper} height={screenHeight}
                            showsPagination={false} autoplayTimeout={20}
                            index={this.tapNum} onMomentumScrollEnd={(e,state,context)=>{
              // console.log(e,state,context);
              this.tapNum = state.index;
          }}
                            autoplay={true} removeClippedSubviews={true}>
                        {images.map((image, i)=> {
                            return (
                                <View
                                    key={'key_'+i} style={styles.slide}>
                                    <WBImage style={styles.image} resizeMode={'contain'}
                                             source={{uri: image.get('url')}}/>
                                </View>
                            )
                        })}
                    </Swiper>
                </MyBlueView>
            </Modal>
        );
    }

    tapNum: number = 0;

    _renderSwiper(images: any) {
        // console.log('tapNum:',this.tapNum);
        return (
            <Swiper
                index={this.tapNum}//这个第三方库设定，只有初次才有效，
                //其后只有在tatol 不同时候，才重设

                style={styles.wrapper} height={SwiperViewHight}
                showsPagination={false} autoplayTimeout={20}
                autoplay={true} removeClippedSubviews={true}>
                {images.map((image, i)=> {
                    const url = image.get('url')
                    return (
                        <TouchableOpacity
                            onPress={()=>{
                            this.tapNum = i
                            this.props.showModalSwiper()
                                 }}
                            key={'key_'+i}
                            style={styles.slide}>
                            <WBImage style={styles.image} source={{uri: url}}/>
                        </TouchableOpacity>
                    )
                })}
            </Swiper>
        )
    }

    __renderTopBtn(name: string, callback: Function): ReactElement<any> {

        return (
            <TouchableOpacity
                activeOpacity={0.5}
                key={name}
                onPress={()=>{
          // this.refs[name].bounceIn(1000);
            callback&&callback();
        }}>
                <View style={styles.topButton} ref={name}>
                    <EvilIcons
                        name={name}
                        size={23}
                        style={styles.icon}/>
                </View>
            </TouchableOpacity>
        )
    }

    componentWillMount() {
        // Platform.OS=='ios'&& StatusBar.setBarStyle('light-content', true);
    }

    componentWillUnmount() {
        // Platform.OS=='ios'&& StatusBar.setBarStyle('default', true);
    }


    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props.scene.route.idea, nextProps.scene.route.idea)
            || !immutable.is(this.props.intro, nextProps.intro)
            || !immutable.is(this.props.loadStatu, nextProps.loadStatu);
    }


    __renderPropView(): ReactElement<any> {
        const idea = this.props.scene.route.idea.toObject();
        const commmitType = idea.commitType
        const relyType = idea.type
        const sets = {
            phone: '电话',
            image: '图片',
            write: '文字',
            link: '链接'
        }
        return (
            <View>
                <View style={{marginHorizontal:20,marginBottom:20}}>
                    <View style={styles.propRow}>
                        <Text>提交类型</Text>
                        <Text>{sets[commmitType]}</Text>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.propRow}>
                        <Text>回复类型</Text>
                        <Text>{sets[relyType]}</Text>
                    </View>
                    <View style={styles.line}/>
                    <View style={styles.propRow}>
                        <Text>次数</Text>
                        <Text>一次</Text>
                    </View>
                    <View style={styles.line}/>
                </View>
                <View style={styles.line}/>
            </View>

        )
    }

    __renderHeaderView(): ReactElement<any> {
        const idea = this.props.scene.route.idea.toObject();
        const user = idea.user && idea.user.toObject();
        const price = idea.price == '0' ? '免费' : idea.price;

        let avatar = {}
        if (user.avatar) {
            avatar = user.avatar.toObject();
        }
        const images = idea.images.toArray();
        return (
            <View>
                {this._renderSwiper(images)}


                <View style={styles.titleView}>
                    <Text style={styles.title}>{idea.title}</Text>
                </View>
                <View style={styles.intro}>
                    <Text style={styles.introText}>{user.username}</Text>
                    <WBImage style={styles.avatar} source={{uri:avatar.url}}/>
                </View>
                <Text style={styles.infoText}>
                    {idea.contents}
                </Text>
                <View style={styles.label}>
                    <Text style={styles.price}>￥{price}⚡️</Text>
                </View>
                <View style={styles.titleView }/>
                {this.__renderPropView()}
                <View style={styles.topBtnView}>
                    {this.__renderTopBtn('comment', ()=> this.props.goCommit(idea))}
                    {this.__renderTopBtn('share-google', ()=> this.props.share())}
                    {/*{this.__renderTopBtn('heart', ()=> {})}*/}
                </View>
            </View>
        )
    }

    __renderRow(item: Object, sectionID: number, rowID: number): ReactElement<any> {

        const url = item.getIn(['images', 0, 'url'])
        const type = item.get('type')
        const replyType = this.props.scene.route.idea.get('type');
        const avtarImage = item.getIn(['user', 'avatar', 'url'])
        const name = item.getIn(['user', 'username'])
        const content = item.get('content')
        const __renderImageView = ()=> {
            return (<WBImage style={styles.rowImage} source={{uri:url}}/>)
        }
        const data = item.toObject()
        const title = data.idea.get('title')
        const statuView = ()=> {
            return (
                <View style={{marginRight:5}}>
                    <StarRating
                        starSize={15}
                        disabled={true}
                        maxStars={5}
                        starColor='rgba(0,0,0,0.3)'
                        rating={item.get('rate')}
                        selectedStar={() => {}}
                    />
                </View>
            )
        }
        return (
            <View style={[styles.row]}>

                <TouchableOpacity
                    onPress={()=>{
                this.props.selectChange(rowID)
                this.props.push({key:'introDetail',type:replyType})
                }}
                >
                    {type == 'image' && __renderImageView()}
                    <View style={styles.rowBottomView}>
                        <View >
                            <Text
                                numberOfLines={1}
                                style={styles.text}>
                                {data.content}
                            </Text>
                            <View style={styles.rowSubBottomView}>
                                {data.statu == 'done' && statuView()}
                                <Text style={styles.name}>{name}</Text>
                            </View>
                        </View>
                        <WBImage style={styles.subAvatar} source={{uri:avtarImage}}/>
                    </View>

                    <View style={styles.line}/>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        // console.log(this.props);
        const idea = this.props.scene.route.idea.toObject();
        const user = idea.user && idea.user.toObject();
        const type = idea.type
        const disabled = type != 'link' && user.objectId == this.props.user.objectId
        const images = idea.images.toArray();
        return (
            <View style={styles.box}>
                <ShareModal/>
                <BaseListView
                    renderHeader={this.__renderHeaderView.bind(this)}
                    style={styles.list}
                    removeClippedSubviews={Platform.OS == 'ios'} //安卓这边如果是为true会导致头的swiper子视图出不来。
                    loadStatu={this.props.loadStatu}
                    loadData={this.props.load}
                    noDataPrompt="还没有人购买."
                    dataSource={this.props.dataSource}
                    loadMore={this.props.loadMore}
                    renderRow={this.__renderRow.bind(this)}
                />
                {this._renderModalSwiper(images)}
                {this._renderBackButton()}
                <WBButton
                    style={{color:'white'}}
                    disabled={disabled}
                    onPress={()=>{this.props.try(idea)}}
                    containerStyle={styles.tryButton}
                    containerStyleDisabled={[styles.tryButton,{backgroundColor:'rgba(52,52,52,0.3)'}]}
                >
                    试一下
                </WBButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    box: {
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: 'white',
    },
    list: {
        backgroundColor: 'white',
        // marginBottom:50,
    },
    wrapper: {
        backgroundColor: 'transparent'
        // width:screenWidth,
    },
    titleView: {
        marginHorizontal: 20,
        borderBottomWidth: pixel,
        borderBottomColor: 'rgba(52,52,52,0.3)',
    },
    title: {
        fontSize: 25,
        marginTop: 20,
        marginBottom: 20,
        lineHeight: 35,
    },
    label: {
        position: 'absolute',
        top: SwiperViewHight - 70,
        width: 100,
        height: 40,
        backgroundColor: 'rgba(52,52,52,0.5)',
        borderBottomRightRadius: 3,
        borderTopRightRadius: 3,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    slide: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#9DD6EB',
    },

    price: {
        color: 'white',
        marginRight: 10,
        fontSize: 16

    },

    intro: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20,
    },

    introText: {
        fontSize: 20,
    },
    infoText: {
        fontSize: 15,
        marginTop: 15,
        marginBottom: 30,
        marginHorizontal: 20,
        lineHeight: 25,
    },
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30,
    },
    subAvatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    image: {
        flex: 1,
    },
    tryButton: {
        backgroundColor: '#f26355',
        justifyContent: 'center',
        height: 50,
    },
    buttonContainer: {
        width: 60,
        position: 'absolute',
        top: 20,
        height: 40,
        // backgroundColor:'red',
        zIndex: 100,
    },
    arrowView: {
        borderBottomWidth: StyleSheet.hairlineWidth * 4,
        borderRightWidth: StyleSheet.hairlineWidth * 4,
        borderColor: 'white',
        transform: [{rotate: '135deg'}],
        marginLeft: 20,
        marginTop: 15,
        width: 10,
        height: 10,
    },
    topBtnView: {
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 2,
        right: 5,
        top: SwiperViewHight - 17,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start'
    },
    topButton: {
        marginRight: 10,
        backgroundColor: 'white',
        height: 35,
        width: 35,
        borderRadius: 35,
        justifyContent: 'center',
        shadowColor:'rgb(200,200,200)',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity:0.5,
        shadowRadius:1,
        elevation:1,
    },
    icon: {
        // backgroundColor:'transparent',
        alignSelf: 'center',
        color: 'black'
    },
    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    rowImage: {
        marginTop: 20,
        height: 200,
    },
    row: {
        marginHorizontal: 20,
        backgroundColor: 'white'
    },
    text: {
        marginBottom: 5,
        fontSize: 17,
    },
    rowBottomView: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowSubBottomView: {
        flexDirection: 'row',
    },
    name: {
        color: 'rgba(0,0,0,0.5)'
    },
    propRow: {
        marginTop: 15,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
const mapStateToProps = (state) => {

    // const data = state.ideaList.get('data');
    // const index = state.ideaList.get('index');
    return {
        // idea:data.get(index),
        intro: state.intro,
        loadStatu: state.iCommit.get('loadStatu'),
        dataSource: state.iCommit.get('data').toArray(),
        user: state.login.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        push: (key)=> {
            dispatch(navigatePush(key));
        },
        pop: ()=> {
            dispatch(navigatePop());
        },
        goCommit: (idea)=> {
            dispatch(goCommit(idea))
        },
        showModalSwiper: ()=> {
            dispatch(showModalSwiper())
        },
        hiddenModelSwiper: ()=> {
            dispatch(hiddenModelSwiper())
        },

        try: (idea: Object)=> {
            dispatch(tryIdea(idea))
        },
        load: ()=> {
            dispatch(iCommitListLoad());
        },
        loadMore: ()=> {
            dispatch(iCommitListLoadMore());
        },
        selectChange: (index)=> {
            dispatch(selectChange(index))
        },
        share:()=>{
            dispatch(dataStorage(shareModalKey, true))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(intro)
