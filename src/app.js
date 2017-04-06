/**
 * Created by lintong on 9/21/16.
 * @flow
 */
'use strict';


import React, {Component} from 'react'
import { Provider } from 'react-redux'
import {AppRegistry} from 'react-native';
import configureStore from './redux/configureStore'
import Route from './components/Route'
import {preConfig} from './redux/config'
//启动初始配置
configureStore.dispatch(preConfig())
// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

export default class App extends Component {
	render() {
		return (
			<Provider store={configureStore}>
				<Route/>
			</Provider>
		)
	}
}

// var WhiteBoardRN = require('../example_advanced');
AppRegistry.registerComponent('diff', () => App);
