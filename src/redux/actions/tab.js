/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

/**
 * 这类项目 在第二个页面是被隐藏的，
 * 所以只需要一个Route栈来做管理就可以了。
 * 所以这边的tab和TabView就是一个普通的View.
 */


export const TAB_SWITCH = 'TAB_SWITCH'

/**
 * 切换tab 的index 这边和传统的ios一直 用number 来控制。
 * @param  {[type]} Param:Object [description]
 * @return {[type]}              [description]
 */
export function tabSwitch(index:number) {



	return {
		type: TAB_SWITCH,
    index,
	}
}
