/*@flow*/
import React, {Component, PropTypes, isValidElement} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';

// import Spinner from 'react-native-gifted-spinner';
import {screenHeight} from '../util';

import {backViewColor} from '../configure';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons'
const AniView = Animatable.createAnimatableComponent(Icon);

export const ExceptionType = {
    Loading: 'exceptionTypeLoading',
    NoData: 'exceptionTypeNoData',
    NetError: 'exceptionTypeError',
};


export default class ExceptionView extends Component {

    static propTypes = {
        renderHeader: PropTypes.func,
        exceptionType: PropTypes.string,
        prompt: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        image: PropTypes.number,
        otherTips: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        onRefresh: PropTypes.func,
    };
    static defaultProps = {
        exceptionType: ExceptionType.Loading,
    };

    constructor(props: Object) {
        super(props);
    }

    renderPrompt() {
        if (isValidElement(this.props.prompt)) {
            return this.props.prompt;
        }
        return (
            <Text style={styles.text}>
                {this.getPromptText(this.props.exceptionType)}
            </Text>
        );
    }

    renderOtherTips() {
        if (!this.props.otherTips) {
            return null;
        }
        if (isValidElement(this.props.otherTips)) {
            return this.props.otherTips;
        }
        return (
            <Text style={styles.otherTips}>{this.props.otherTips}</Text>
        );
    }

    render() {
        // let prompt = this.getPromptText(this.props.exceptionType);
        return (
            <ScrollView style={[{flex:1},this.props.style]}>
                {this.props.renderHeader && this.props.renderHeader()}
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={()=>{
                        this.props.onRefresh()
                    }}>
                    {this._renderPromptIndicator(this.props.exceptionType)}
                    {this.renderPrompt()}
                    {this.renderOtherTips()}
                </TouchableOpacity>
            </ScrollView>
        );
    }

    _renderPromptIndicator = (type: string) => {
        switch (type) {
            case ExceptionType.Loading:
                return (
                    <ActivityIndicator color="#9e9e9e" style={styles.spinner} size="large" styleAttr="Large"/>
                );
            case ExceptionType.NoData:
            case ExceptionType.NetError:
                return (
                    // <Image resizeMode = 'contain' source={this.props.image} style={styles.image}/>
                    <AniView
                        ref='icon'
                        name='logo-freebsd-devil'
                        size={100}
                        color='rgb(180,180,180)'
                        style={styles.image}/>
                );
        }
    };

    getPromptText(type: string): string {
        if (this.props.prompt) {
            return this.props.prompt
        }
        let prompt;
        switch (type) {
            case ExceptionType.Loading:
                prompt = '正在加载...';
                break;
            case ExceptionType.NoData:
                prompt = '没有数据';
                break;
            case ExceptionType.NetError:
                prompt = '网络异常';
                break;
            default:
                prompt = 'there is nothing to show';
        }
        return prompt;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        // position:'absolute',
        alignSelf: 'center',
        marginTop: 50,
    },
    text: {
        fontSize: 14,
        color: 'rgb(180,180,180)',
        alignSelf: 'center',
    },
    otherTips: {
        marginTop: 27,
        marginLeft: 43,
        marginRight: 43,
        fontSize: 13,
        color: '#9e9e9e',
        lineHeight: 26,
    },
    spinner: {
        marginTop: 130
    }
});
