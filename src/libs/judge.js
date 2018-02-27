export default {
    /**
     * 判读是否是字符串
     */
    isString: (param)=> {
        return Object.prototype.toString.call(param) == '[object String]';
    },
    /**
     * 判读是否是方法类型
     */
    isFunction: function(param) {
        return Object.prototype.toString.call(param) == '[object Function]';
    },
    /**
     * 判读是否是数字类型
     */
    isNumber: function(param) {
        return Object.prototype.toString.call(param) == '[object Number]';
    },
    /**
     * 判读是否是布尔类型
     */
    isBoolean: function(param) {
        return Object.prototype.toString.call(param) == '[object Boolean]';
    },
    /**
     * 判读是否是日期类型
     */
    isDate: function(param) {
        return Object.prototype.toString.call(param) == '[object Date]';
    },
}
