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


export const APP_LOGIN = 'APP_LOGIN'

/**
 * [tabSwitch description]
 * @param  {[type]} Param:Object [description]
 * @return {[type]}              [description]
 */
export function userlogin() {

	return {
		type: APP_LOGIN,
	}
}
