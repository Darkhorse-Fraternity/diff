import {combineReducers} from 'redux'
// import {userManager} from '../../util/XGlobal'
import {
    TAB_SWITCH,
} from '../actions/tab'
//import {checkPhoneNum} from '../../util';
import {
    LOGIN_SUCCEED,
    LOGOUT,
} from '../actions/login'


//TODO:这边要做统一的tab 上 navBar 的管理，不让装载的view 做特殊处理。

/**
 * tabs:装载的view 的key
 * @type {Object}
 */

    // const my_lesson = require('../../../source/img/xy_courses/xy_courses.png');
    // const my_lesson_hover = require('../../../source/img/xy_courses_hover/xy_courses_hover.png');
    // const person_center = require('../../../source/img/xy_person/xy_person.png');
    // const person_center_hover = require('../../../source/img/xy_person_hover/xy_person_hover.png');
const unLoginTabs = [
        {
            key: 'IdeaList', selectImage: 0,
            unSelectImage: 0, title: 'logo-freebsd-devil'
        },
        {
            key: 'PersonCenter', selectImage: 0,
            unSelectImage: 0, title: 'ios-happy'
        },
    ]

const loginTabs = [
    {
        key: 'IdeaList', selectImage: 0,
        unSelectImage: 0, title: 'logo-freebsd-devil'
    },
    {
        key: 'iPurchase', selectImage: 0,
        unSelectImage: 0, title: 'ios-bulb'
    },
    {
        key: 'PersonCenter', selectImage: 0,
        unSelectImage: 0, title: 'ios-happy'
    },
]

const initialTabState = {
    index: 0,
    tabs: unLoginTabs,
}

function tabState(state = initialTabState, action) {
    switch (action.type) {
        case TAB_SWITCH:
            if (action.index == state.index) {
                return state
            }
            return {
                ...state,
                index: action.index,
            }
        case LOGIN_SUCCEED:

            return {
                ...state,
                tabs: loginTabs,
                index:state.index ==0?0:2
            }
        case LOGOUT:
            return {
                ...state,
                tabs: unLoginTabs,
                index:0,
            }

        default:
            return state;

    }


}


const tabReducers = combineReducers({
    tabState
})

export default tabReducers
