/**
 * Created by lintong on 2017/2/25.
 * @flow
 */
'use strict';

import React from 'react';
import topView from 'rn-topview';
import PopContainer from './PopContainer';

let popupInstance;

export default {
    show(content, options = {
        animationType: 'fade',
        maskClosable: true,
        onMaskClose() {},
    }) {
        topView.set(
            <PopContainer
                ref={i => popupInstance = i}
                animationType={options.animationType}
                maskClosable={options.maskClosable}
                onMaskClose={options.onMaskClose}
                onAnimationEnd={visible => { if (!visible) { topView.remove(); } }}
                visible
            >
                {content}
            </PopContainer>,
        );
    },
    hide() {
        if (popupInstance) {
            popupInstance.hide();
        }
    },
};