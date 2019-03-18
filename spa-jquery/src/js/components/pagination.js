(function($) {
    $.fn.extend({
        createPagination: function(options){
            if(!options){
                console.error('缺少配置参数options')
            }
            if (!options.total) {
                console.error('缺少配置参数total')
            }
            let clickedCls = 'clicked'
            let currentPage = 1; // 当前页
            let pagerCount = 7; // 总共可显示的页码按钮数, 包括省略号
            let pagerShow = 7; // 实际需要显示的页码按钮数，可能小于7
            let total = options.total; // 总条数
            let size = options.size || 10; // 每页显示条目数
            let pageCount = Math.ceil(total/size); // 总共页码数
            if (pageCount < pagerCount) {
                pagerShow = pageCount;
            }
            let pageEle = `<ul data-total="${pageCount}" class="pagination-common">
                    <li data-tag="pre" class="disabled-cls"> &lt; </li>`;
            for(let i = 0; i < pagerShow; i++) {
                // class
                let classStr = ''
                if (currentPage === i+1) {
                    classStr = clickedCls
                }
                // 页码
                let pageText = i+1+''
                if (pageCount > 7) {
                    if (i === 5) {
                        pageText = '…'
                        classStr += ' ellipsis-cls'
                    } else if (i > 5) {
                        pageText = pageCount+''
                    }
                }

                pageEle += `<li class="${classStr}" data-tag="${pageText}">${pageText}</li>`
            }
            pageEle += '<li data-tag="next"> &gt; </li></ul>'
            $(this).html(pageEle)
            $(this).on('click', 'li', function (e) {
                let target = e.target;
                let clickTag = target.dataset.tag;
                let tagArr = ['next', 'pre']
                let clickedPage = 0;
                if (tagArr.indexOf(clickTag) !== -1) { // 当点击next、pre时
                    // 找出当前页码
                    let curPage = 0;
                    let totalPage = parseInt($(target).parent()[0].dataset.total)
                    $(target).siblings().each((index, ele) => {
                        if ($(ele).hasClass(clickedCls)) {
                            curPage = parseInt(ele.dataset.tag)
                            // 判断是否继续
                            if (clickTag === tagArr[0] && curPage < totalPage) {
                                $(ele).next().addClass(clickedCls)
                                $(ele).addClass(clickedCls)
                            } else if (clickTag === tagArr[1] && curPage > 1) {
                                $(ele).prev().addClass(clickedCls)
                                $(ele).addClass(clickedCls)
                            }
                            return false
                        }
                    })

                    // $(target).siblings().each((index, ele) => {
                    //     if ($(ele).hasClass(clickedCls)) {
                    //         clickedPage = parseInt(ele.dataset.tag);
                    //         if (clickTag === tagArr[0]) { // 下一页
                    //
                    //             target = $(ele).next()[0]
                    //         } else { // 上一页
                    //             target = $(ele).prev()[0]
                    //         }
                    //
                    //         return true
                    //     }
                    // })
                } else if (parseInt(clickTag)) { // 当点击中间的页码时
                    let clickedPage = parseInt(clickTag);
                    // 改变样式
                    $(target).siblings().not(':first-child, :last-child').each((index, ele) => {
                        if ($(ele).hasClass(clickedCls)) {
                            $(ele).removeClass(clickedCls)
                        }
                    })
                    $(target).addClass(clickedCls)
                    // 执行回调函数
                    if (options.afterClick) {
                        options.afterClick(clickedPage)
                    }
                }
            })
        }
    })
})($)