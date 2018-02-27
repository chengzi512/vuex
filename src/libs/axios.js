import axios from 'axios';
import Qs from 'qs';

const isDevMode = process.env.NODE_ENV === 'development';

const options = {
  // `url` is the server URL that will be used for the request
  url: '/get',
  baseURL: '',
  // `method` is the request method to be used when making the request
  method: 'POST',
  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  // You may modify the headers object.
  transformRequest: [
    function (data, headers) {
      // 为了避免qs格式化时对内层对象的格式化先把内层的对象转为
      // data.strSQL = base64encode(data.strSQL);
      // 由于使用的form-data传数据所以要格式化
      data = JSON.stringify(data);
      return data;
    }
  ],
  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [
    function (data) {
      return data;
    }
  ],
  // `headers` are custom headers to be sent
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {},
  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function (params) {
    return Qs.stringify(params)
  },
  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data: {
    // eid: "514403",
    // currentPage: 1,
    // ItemsOfPage: 99999,
    // type: 0,
    // strSQL: ""
  },
  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 300000,
  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default
  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  // `Authorization` custom headers you have set using `headers`.
  auth: {
    username: '',
    password: ''
  },
  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // 将upload事件注释掉，防止跨域状态下发起option请求

  // onUploadProgress: function(progressEvent) {
  //     // Do whatever you want with the native progress event
  // },


  // onDownloadProgress: function(progressEvent) {
  //     // Do whatever you want with the native progress event
  // },
  // `maxContentLength` defines the max size of the http response content allowed
  maxContentLength: 600000,
  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
    return status >= 200 && status <= 511; // default
  },
  // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  maxRedirects: 5 // default

}

function responseInterceptor(res){
  if (res.status === 200) {
    if(typeof res.data === 'string') res.data = JSON.parse(res.data)
    return res.data;
  } else {
    console.log(res)
  }
}

const instance = axios.create(options);

// 响应拦截器
instance.interceptors.response.use(responseInterceptor);

const respont = {
  /** conf 配置项或原结构输出
   * @returns {Object}
   */
  conf:()=>{
    return instance;
  },
  /**
   * get 简单对象
   * @param {string} url - 请求路径
   * @param {Object} options - 参数
   * @returns {promise}
   */
  get: (url, options) => {
    return instance.get(url, options)
  },
  /**
   * post 简单对象
   * @param {string} url - 请求路径
   * @param {Object} options - 参数
   * @returns {promise}
   */
  post: (url, options) => {
    if(options)
      options.headers = {'Content-Type': 'application/json'};
    return instance.post(url, {}, options);
  },
  /**
   * 多个请求合并
   * @param {iterable} iterable - 请求路径
   * @returns {promise}
   */
  all: (iterable)=>{
    return axios.all(iterable);
  },
  /**
   * delete 简单对象
   * @param {string} url - 请求路径
   * @param {Object} options - 参数
   * @returns {promise}
   */
  delete: (url, options) => {
    return instance.delete(url, options)
  }
}

export default respont;

/**
 * base64encode 字符串转换成base64格式
 * @param {string} str - 请求路径
 * @param {Object} data - 数据
 * @returns {Deferred}
 */
function base64encode(str) {
  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3 = "";
  var enc1, enc2, enc3, enc4 = "";
  var i = 0;
  var input = utf16to8(str);
  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);
  return output;

}

function utf16to8(str) {
  var out, i, len, c;
  out = "";
  len = str.length;
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    }
  }
  return out;
}
// export default instance;
