/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import {config} from '../../components/Route/pageConfig'
// *** Action Types ***
export const NAVIGATE = 'NAVIGATE'
export const NAV_PUSH = 'NAV_PUSH'
export const NAV_POP = 'NAV_POP'
export const NAV_JUMP_TO_KEY = 'NAV_JUMP_TO_KEY'
export const NAV_JUMP_TO_INDEX = 'NAV_JUMP_TO_INDEX'
export const NAV_RESET = 'NAV_RESET'
export const NAV_REFRESH = 'NAV_REFRESH'
export const NAV_POP_TO_INDEX = 'NAV_POP_TO_INDEX'
export const NAV_REPLACE_INDEX = 'NAV_REPLACE_INDEX'

// *** Action Creators ***
// The following action creators were derived from NavigationStackReducer
//

/**
 * 将数据处理成一致的类型，并将action 做分发处理。react-redux 会将返回的action 数据
 * 在reduce 中处理，大概是通过dispatch 实现，暂时不清楚，如果直接调用dispatch.
 */


export function navigatePush(state:any,animation:bool = true) {
	// const config = {};
	state = typeof state === 'string' ?{...config(state),animationStyle:animation?undefined:null}
											: {...config(state.key),...state,};
	return {
		type: NAV_PUSH,
		state,
	}
}

export function navigatePop(state:any) {
	return {
		type: NAV_POP,
    state,
	}
}

export function navigatePopToIndex(index:number) {
	return {
		type: NAV_POP_TO_INDEX,
		index
	}
}

//保留传入的key和初始页面组合的routes。
export function navigateClearMiddleScene(key:string){
  const loginView =  config('LoginView');
  const currentView =  config(key);
  const routes = [loginView,currentView];//?
   return {
     type:NAV_RESET,
     index:1,
     routes:routes,
   }
}


export function navigateJumpToKey(key:string) {
	return {
		type: NAV_JUMP_TO_KEY,
		key
	}
}

export function navigateJumpToIndex(index:number) {
	return {
		type: NAV_JUMP_TO_INDEX,
		index
	}
}

export function navigateReplaceIndex(replaceKey:string,index:number = 0) {
	return {
		type: NAV_REPLACE_INDEX,
		index,
    replaceKey
	}
}



export function navigateReset(routes:any, index:number) {
	return {
		type: NAV_RESET,
		index,
		routes
	}
}


/**
 * 用于当前页面重diff渲染
 * @param  {[type]} route:Object [description]
 * @return {[type]}              [description]
 */
export function navigateRefresh(route:Object) {
	return {
		type: NAV_REFRESH,
		route,
	}
}
