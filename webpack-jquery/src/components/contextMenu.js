

class contextMenu {
    constructor(options = {}) {
        $.extend(this, options)
        this.init()
    }
    init() {
        // contextMenu样式
        let cMCls = 'context-menu';
        if (this.cls) {
            cMCls += ' ' + this.cls
        }
        let contextMenuEle = `<ul class="${cMCls}" id="">
                                    <li>菜单一</li>
                                    <li>菜单二</li>
                                    <li>菜单三</li>
                                    <li>菜单四</li>
                                </ul>`
        $('body').append(contextMenuEle);
    }
}


(function () {
    $.extend({
        showContextMenu: function(options){
            if(!options) {
                console.error('缺少配置参数options')
            }
            let body = $('body');

            // contextMenu样式
            let cMCls = 'context-menu';
            if (options.cls) {
                cMCls += ' ' + options.cls
            }

            // 鼠标的位置
            if (!options.clientX || !options.clientY) {
                return
            }

            // 判断是否生成了list
            let cMW = $('#contextMenuWrap');
            if (cMW.length > 0) {
                cMW.css('visibility', 'visible')
            } else {
                let contextMenuEle = `<ul class="${cMCls}" id="contextMenuWrap">
                                        <li>菜单一</li>
                                        <li>菜单二</li>
                                        <li>菜单三</li>
                                        <li>菜单四</li>
                                    </ul>`
                body.append(contextMenuEle)
            }

            body.click(function () {
                console.log('body click', cMW)
                console.log(cMW.css('visibility'))
                if (cMW.css('visibility') === 'visible') {
                    cMW.css('visibility', 'hidden')
                }
            })
        }
    })
})($)
