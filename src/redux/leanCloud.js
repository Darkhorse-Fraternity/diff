import {request} from './actions/req'
import {relationExist,relationAdd,relationRemove,relationList} from '../request/leanCloud'
import {send} from '../request'
import {dataStorage} from './actions/util'
import {Toast} from '../util'
import {listLoad,listLoadMore} from './actions/list'

export function userAddRelation(classId):Function {
    return async (dispatch,getState) => {
        try {
            const state = getState()
            if(!state.login.data){return}
            const uid = state.login.data.id
            const params = relationAdd('TodoObject',classId,"_User",uid,'collects')
            const res = await send(params)
            console.log('res:', res);
            dispatch(dataStorage('idea_collect',true))
            Toast.show("收藏成功")
        }catch(e){
            Toast.show(e.message)
        }

    }
}

export function userRemoveRelation(classId):Function {
    return async (dispatch,getState) => {

        try {
            const state = getState()
            if(!state.login.data){return}
            const uid = state.login.data.id
            const params = relationRemove('TodoObject',classId,"_User",uid,'collects')
            const res = await send(params)
            dispatch(dataStorage('idea_collect',false))
            Toast.show("取消收藏成功")
        }catch (e){
            Toast.show(e.message)
        }

    }
}


export function collectExist(classId) {
    return async (dispatch,getState) =>{
        try {
            const state = getState()
            dispatch(dataStorage('idea_collect',false))
            if(!state.login.data){return}
            const uid = state.login.data.id
            const params = relationExist('TodoObject',classId,"users",uid,'collects')
            const res = await send(params)
            dispatch(dataStorage('idea_collect',res.results.length >0))
        }catch (e){
            Toast.show(e.message)
        }

    }
}

export function collectsList(more) {
    return async (dispatch,getState) =>{
        try {
            const state = getState()
            const uid = state.login.data.id
            const params = relationList('TodoObject',"users",uid,'collects',0)
            !more?dispatch(listLoad('collectsList',params)):dispatch(listLoadMore(('collectsList',params)))
            // const res = await send(params)
        }catch (e){
            Toast.show(e.message)
        }

    }
}

