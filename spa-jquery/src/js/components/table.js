(function($) {
    let opts = {
        data: [{ // 表格数据
            code: '342143443'
        }],
        head: [{ // 多级表头传入二维数组，否则传入一维数组
            template: '<input type="checkbox">', // 表格head中th的值
            prop: 'checked',
            content: '<input type="checkbox">', // 表格body中td的值
            headAlign: 'center',
            bodyAlign: 'center',
            width: '20',
            colspan: 2,
            rowspan: 4
        }],
        tableCls: ['main-table-cls']
    }

    function initTbody(data, head) {
        let tbodyEle = '<tbody>';
        data.forEach(item => {
            tbodyEle += `<tr data-id="${item.id}">`
            head.forEach(col => {
                let hasValue = false
                for(let key in item) {
                    if (key === col.prop) {
                        hasValue = true;
                        let style = 'style="'
                        if (col.bodyAlign) {
                            style += `text-align:${col.bodyAlign}`
                        }
                        style += '"'
                        if (col.content) {
                            tbodyEle += `<td ${style}>${col.template}</td>`
                        } else {
                            let tdStr = item[key] || '';
                            if (typeof item[key] === "number") {
                                tdStr = item[key] || 0;
                            }
                            tbodyEle += `<td ${style}>${tdStr}</td>`
                        }
                    }
                }
                if (!hasValue) {
                    if (col.content) {
                        let style = 'style="'
                        if (col.bodyAlign) {
                            style += `text-align:${col.bodyAlign}`
                        }
                        style += '"'
                        tbodyEle += `<td ${style}>${col.content}</td>`
                    } else {
                        tbodyEle += `<td>  </td>`
                    }
                }
            })
            tbodyEle += '</tr>'
        })
        tbodyEle += '</tbody>'
        return tbodyEle
    }

    function groupHead(arr) {
        let headEle = '<tr>';
        arr.forEach(item => {
            let colspan = '';
            let rowspan = '';
            if (item.colspan) {
                colspan = `colspan="${item.colspan}"`
            }
            if (item.rowspan) {
                rowspan = `rowspan="${item.rowspan}"`
            }
            let style = 'style="'
            if (item.width) {
                style += `width:${item.width}px;`
            }
            if (item.headAlign) {
                style += `text-align:${item.headAlign};`
            }
            style += '"'
            headEle += `<th ${colspan} ${rowspan} ${style}>${item.label || item.template}</th>`
        })
        headEle += '</tr>'
        return headEle
    }
    
    function initThead(head) {
        let headObj = {};
        // 构造headEle
        let headEle = '<thead>';
        if (head[0] instanceof Array) {
            head.forEach(childArr => {
                headEle += groupHead(childArr)
            })
            let index = head.length - 1;
            headObj.headArr = head[index];
        } else if (head[0] instanceof Object){
            headEle += groupHead(head)
            headObj.headArr = head
        }
        headEle += '</thead>'
        headObj.headEle = headEle
        return headObj
    }

    $.fn.extend({
        createTable: function(options){
            if(!options){
                console.error('缺少配置参数options')
            }
            let tableCls = '';
            if (options.tableCls && options.tableCls.length > 0) {
                tableCls = options.tableCls.join(' ');
            } else {
                tableCls = 'table-common';
            }

            let tableEle = `<table class="${tableCls}">`;
            let headObj = initThead(options.head);
            tableEle += headObj.headEle;

            tableEle += initTbody(options.data, headObj.headArr);
            tableEle += '</table>'
            $(this).html(tableEle)
            if (options.callback) {
                options.callback()
            }
        }
    })
})($)