/**
 * Created by lintong on 2017/2/25.
 * @flow
 */
'use strict';

import React from 'react';
import Modal from 'rc-dialog/lib/Modal';



import { StyleSheet, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
    wrapStyle: {
        justifyContent: 'center',
    }
});

export default class PopupContainer extends React.Component<any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible || false,
        };
    }

    hide() {
        this.setState({
            visible: false,
        });
    }

    onMaskClose = () => {
        const onMaskClose = this.props.onMaskClose;
        if (onMaskClose) {
            const res = onMaskClose();
            if (res && res.then) {
                res.then(() => {
                    this.hide();
                });
            } else {
                this.hide();
            }
        }
    }

    render() {
        return (
            <Modal
                animateAppear
                onAnimationEnd={this.props.onAnimationEnd}
                animationType={this.props.animationType}
                wrapStyle={styles.wrapStyle}
                visible={this.state.visible}
                maskClosable={this.props.maskClosable}
                onClose={this.onMaskClose}
                style={{backgroundColor:'transparent'}}
            >
                {this.props.children}
            </Modal>
        );
    }
}