import  store from './configureStore'
import * as nav from './actions/nav'

export function push(key) {
    store.dispatch(nav.navigatePush(key))
}

export function pop(key) {
    store.dispatch(nav.navigatePop(key))
}


export function refresh(route) {
    store.dispatch(nav.navigateRefresh(route))
}