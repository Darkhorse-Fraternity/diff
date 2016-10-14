/* @flow */

'use strict';


import {
 DELETE_IMAGE,
 COMMIT_IMAGE,
 CLEAR_CONTRIBUTE,
 CLEAN_MY_IDEA_DATA,
 ADD_MY_IDEA_TITLE,
 ADD_MY_IDEA_CONTENT,
 ADD_MY_IDEA_LINK,
 ADD_MY_IDEA_PRICE,
 CHANGE_REPLY_TYPE,
 CHANGE_COMMIT_TYPE,
 SHOW_CONTRIBUTE_MODAL
}from '../actions/contribute'


import * as immutable from 'immutable';

const initialDrawState = immutable.fromJS({
    uris: [],
    title:'',
    content:'',
    price:'0',
    link:'',
    loaded:false,
    commitType:'image',
    replyType:'image',
    showModal:false,
});
export default function drawState(state:immutable.Map<string,Object> = initialDrawState, action:Object) {
    switch (action.type) {
      case COMMIT_IMAGE:
        // const uris  =  state.get("uris").withMutations((list)=>{
        //   list.push(action.uri);
        // })
        const uris = state.get("uris").push(action.uri);
        return state.mergeDeep({uris:uris});
      case DELETE_IMAGE:
        const uris2  =  state.get("uris").withMutations((list)=>{
          list.pop(action.uri);
        })
        return state.setIn(['uris'],uris2);
      case CLEAR_CONTRIBUTE:
        return initialDrawState;
      case CLEAN_MY_IDEA_DATA:
        return initialDrawState;
      case ADD_MY_IDEA_TITLE:
        return state.mergeDeep({title:action.title});
      case ADD_MY_IDEA_CONTENT:
        return state.mergeDeep({content:action.content})
      case ADD_MY_IDEA_LINK:
        return state.mergeDeep({link:action.link})
      case ADD_MY_IDEA_PRICE:
        return state.mergeDeep({price:action.price})
      case CHANGE_REPLY_TYPE:
        return state.setIn(['replyType'], action.replyType)
      case CHANGE_COMMIT_TYPE:
        return state.setIn(['commitType'], action.commitType)
      case SHOW_CONTRIBUTE_MODAL:
        return state.setIn(['showModal'],action.showModal)
      default:
        return state
    }

}
