export default {
    /**
     * 如果填写的filename则返回文件，如果填写的target则跳转页面
     */
    openFile(url, filename, target) {
        const link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        link.href = url;
        if(target && Object.prototype.toString.call(target) == '[object String]')
            link.target = target;
        else
            link.target = '_blank';
        if(filename)
            link.download = filename;

        const event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(event);
    },
    setTitle(param = 'XXX'){
        window.document.title = param;
    }
}
