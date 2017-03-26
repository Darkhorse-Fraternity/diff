import {request} from './actions/req'
import {relationExist} from '../request/leanCloud'


export function userAddRelation():Function {
    return (dispatch,getState) => {
        const params = relationExist()
    }
}