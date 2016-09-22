/**
 * Created by lintong on 9/17/16.
 * @flow
 */
'use strict';

let LeanCloud_APP_ID = '';
let LeanCloud_APP_KEY = '';
if(__DEV__){
       LeanCloud_APP_ID = 'hd16vijfry1s8lpklrhbqpccl77erki0836v4vlrilnl35ui';
       LeanCloud_APP_KEY = 'gz0v89hdmstmq3x4swyuhpxdi5lyg4wtcjq1iuxxcaziwobb';
}else {

      LeanCloud_APP_ID = 'XRPJYCFolp4c2RAcvyR9iOHN-gzGzoHsz';
     LeanCloud_APP_KEY = 'jaFau6aFf0nhWt4Ea4oYKBpd';
}


module.exports = {
    LeanCloud_APP_ID,
    LeanCloud_APP_KEY
};
