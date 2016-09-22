/* @flow */
'use strict'
import { connect } from 'react-redux'
import { navigatePush, navigatePop } from '../../redux/actions/nav'
import DefaulRenderer from './DefaulRenderer'
// import { SCNENE_BACK } from '../actions/ActionTypes'

export default connect(

  /*
   * 从store 中取得所需的state
   */
	state => ({
		navigationState: state.route.navigationState,
	}),
  /**
   * 从UI 视图中 将回调方法取回，并通过action 告知正确的数据变动，系统组件，会自动
   * 根据reduce 返回的数据变化，做对应的视图与动画处理。
   * @param  {[type]} {    onNavigate: (action    所需的ation 的名称
   * @return {[type]}      无
   */
	dispatch => ({
		onNavigate: (action) => {
			// Two types of actions are likely to be passed, both representing "back"
			// style actions. Check if a type has been indicated, and try to match it.
			if (action.type &&
				action.type === 'back') {
				dispatch(navigatePop())
			} else {
				// Currently unused by NavigationExperimental (only passes back actions),
				// but could potentially be used by custom components.
				dispatch(navigatePush(action))
			}
		}
	})
)(DefaulRenderer)
