/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

/**
 * 工具类，
 */
import {request} from '../../request';
// import {qiniuTokenRequest, saveHeadimgRequest} from '../../request/info';
// import {Rpc} from 'react-native-qiniu';
import Toast from "../../util/Toast";
import {bindingFileToUser, deleteFile} from '../../request/leanCloud'
import {upload} from '../../util/uploadAVImage'

export const LOAD_AVATAR = 'LOAD_AVATAR'
export const VOICE_TEST = 'VOICE_TEST'
export const NET_TEST = 'NET_TEST'
export const CHANGEAVATAR = 'CHANGEAVATAR'

// export function reuqestQiuNiuToken(uri:string, callback:Function = ()=> {
// }):Function {
//
//     return dispatch => {
//         //单个文件直接qiniuTokenRequest的参数用默认值就好了。
//         return request(qiniuTokenRequest, (response)=> {
//             if (response.statu) {
//                 const keys = response.data.keys;
//                 const token = response.data.token;
//                 // keys.values
//                 //将获取到的keys 和token 以及uri 提交给七牛。
//                 //返回的是一个pormise
//                 // console.log('asd',ret);
//                 const key = {
//                     'key': Object.values(keys)[0],
//                 };
//                 Rpc.uploadFile(uri, token, key).then((response)=>response.json())
//                     .then((ret)=> {
//                         console.log('asd', ret);
//                         if (ret.retcode == 1) {
//                             const fil = {
//                                 'pic': Object.values(keys),//就这么简单处理好了。
//                             }
//                             saveHeadimgRequest.params.filenames = JSON.stringify(fil);
//                             request(saveHeadimgRequest, (rret)=> {
//                                 // if(rret.statu){
//                                 //
//                                 // }
//                                 callback(rret.statu)
//                             })
//                         }
//                     }).catch((error)=> {
//                     callback(false);
//                     console.log('qiniuTokenRequest_error', error);
//                     Toast.show("图片上传失败");
//                 });
//
//
//                 // dispatch(_reuqestQiuNiuTokenSucceed(response));
//                 // dispatch(navigatePush('TabView'));
//             } else {
//                 callback(false);
//                 // dispatch(_loginFailed(response));
//             }
//         });
//     }
// }


function uploadLeanCloud(uri:string, callBack:Function = ()=> {
}):Function {

    // 首先提交图片
    // 如果已经有图片需要先删除。
    // 最后绑定新的图片。

    return (dispatch, getState) => {
        return upload(uri, (statu, res)=> {
            if (statu) {
                //绑定user
                // console.log('res', res);
                const userData = getState().login.data;
                const userID = userData.objectId;
                const bindUserParam = bindingFileToUser(userID, res.id, 'avatar');
                request(bindUserParam, (response)=> {
                    if (!response.statu) {
                        //绑定失败
                        callBack(false);

                    } else {
                        //绑定成功

                        //如果存在,则删除原来的文件
                        if (userData.avatar) {
                            const oldAvatarID = userData.avatar.objectId;
                            request(deleteFile(oldAvatarID), (response)=> {
                                !response.statu && console.warn("图片删除失败。");
                            });
                        }
                        //告知本地跟换login.avatar
                        //简单的替换id 和url 就好了。
                        const avatar = {
                            objectId: res.id,
                            url: res.url(),
                        }
                        // console.log('test:', avatar);
                        callBack(true, avatar);

                    }

                })

            } else {
                callBack(false);
            }
        });
    }
}

export function uploadAvatar(uri:string):Function {
    return dispatch => {
        // dispatch(_loadAvatar('wait'))
        return dispatch(uploadLeanCloud(uri, (statu, avatar)=> {
            if (statu) {
                // dispatch(_loadAvatar('success'));
                dispatch(_changeAvatar(avatar));
            } else {
                // dispatch(_loadAvatar('fail'));
            }
        }));
        // dispatch(upload(uri));
    };
}

function _loadAvatar(statu:string):Object {
    return {
        type: LOAD_AVATAR,
        statu: statu,
    };
}

function _changeAvatar(avatar:Object):Object {
    return {
        type: CHANGEAVATAR,
        avatar: avatar,
    };
}


export function voiceTestResult(result:string):Object {
    return {
        type: VOICE_TEST,
        voiceTest: result,
    };
}

export function netTestResult(result:string):Object {
    return {
        type: NET_TEST,
        netTest: result,
    };
}
