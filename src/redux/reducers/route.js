/* @flow */

'use strict';

import {config} from '../../components/Route/pageConfig'
import { combineReducers } from 'redux'
import * as NavigationStateUtils from 'NavigationStateUtils'

import { NAV_PUSH, NAV_POP,
				NAV_JUMP_TO_KEY,
			 	NAV_JUMP_TO_INDEX,
				NAV_RESET,NAV_REFRESH,
				NAV_POP_TO_INDEX,
			 	NAV_REPLACE_INDEX
			}from '../actions/nav'
import {LOGOUT} from '../actions/login'
//生成原始单页配置数据。
const originalRoute =  config('LoginView');
const originalRoute2 =  config('TabView');
const initialNavState = {
	index: 0,
	routes: [
		originalRoute,
	]
}

const initialNavLoginState = {
	index:1,
	routes:[
		originalRoute,
		originalRoute2
	]
}



/**
 * 以下的所有处理 最后return 返回的都是一个标准的类initialNavState 的数据格式。
 * combineReducers 会把 state 返回到store 中。
 * 可以不写，如果写了 在statemap 要记得里面有进一步分类。
 * navigationState，有默认值initialNavState，以后则默认返回上次一次存的值，
 */

function navigationState(state :Object =initialNavState, action) {
	switch (action.type) {
	case NAV_PUSH:
		if (state.routes[state.index].key === (action.state && action.state.key)) return state
		return NavigationStateUtils.push(state, action.state)

	case NAV_POP:
		if (state.index === 0 || state.routes.length === 1) return state
		// 将action.state 导入倒数state第二个的数据。
		//
			const popRoutes = state.routes.slice(0, -1);
			let popLastOne  = popRoutes[popRoutes.length -1];
			Object.assign(popLastOne, action.state);
		  return {
		    ...state,
		    index: popRoutes.length -1,
		    routes:popRoutes,
		  }


	case NAV_JUMP_TO_KEY:
		return NavigationStateUtils.jumpTo(state, action.key)

	case NAV_JUMP_TO_INDEX:
		return NavigationStateUtils.jumpToIndex(state, action.index)

//TODO:目前这样替换经过测试，是没有动画的。猜想有动画可以这样做，先移动过去，动画结束后reset.
	case NAV_REPLACE_INDEX :
		return NavigationStateUtils.replaceAtIndex(state, action.index || state.index,
				config(action.replaceKey))

	case NAV_RESET:
		return {
			...state,
			index: action.index,
			routes: action.routes
		}
		// return NavigationStateUtils.reset(state,action.routes,action.index)

	case NAV_REFRESH:

		let lastOne  = state.routes[state.index];
		Object.assign(lastOne, action.route);
		return {
			...state,
		}



	case  LOGOUT:
	case	NAV_POP_TO_INDEX:

		const routes =  state.routes.slice(0,action.index+1);
		return {
			index: action.index,
			routes:routes,
		}

	default:
		return state
	}
}

const navReducers = combineReducers({
	navigationState
})

export default navReducers
