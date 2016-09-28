




export function addParams(url:string, params:Object) {
  if (url.indexOf('?') == -1) {
    return url+'?'+toQueryString(params);
  }else {
    return url + '&' + toQueryString(params);
  }

};


/**
 * 将对象转换成query字符串形式
 * @param  {[type]} obj 参数
 * @return {[type]} string key1=value1&key2=value2
 */
export function toQueryString(obj:Object) {
  return obj?Object.keys(obj).sort().map(function(key){
    let val = obj[key];
    if (typeof val === 'object') val = JSON.stringify(val);
    if (Array.isArray(val)) {
      return val.sort().map(function(val2){
        return encodeURIComponent(key)+ '=' + encodeURIComponent(val2);
      }).join('&');
    }
    return encodeURIComponent(key) + '=' + encodeURIComponent(val);
  }).join('&'):'';
};
