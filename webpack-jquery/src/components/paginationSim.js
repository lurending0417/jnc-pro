(function($) {
    $.fn.extend({
        createPagination: function(options){
            if(!options){
                console.error('缺少配置参数options')
            }
            if (!options.total) {
                console.error('缺少配置参数total')
            }
            options.currentDom = this;
            let page = new Page(options);
            page.init();
        }
    })

    class Page{
        constructor(opts) {
            this.currentPage = 1; // 当前页
            this.currentRecord = 1; // 当前条数
            this.total = opts.total; // 总条数
            this.size = opts.size || 10; // 每页显示条目数
            this.pageCount = Math.ceil(this.total/this.size); // 总共页码数
            this._PageNum = 'pageNum';
            this._RecordNum = 'recordNum';
            this.currentDom = opts.currentDom; // jquery实例
        }
        init() {
            let paginationEle = `<div>
                                    <span>页数：</span>
                                    <span class="num">${this.currentPage}/${this.pageCount}</span>
                                    <input type="text" class="input-page" data-type="${this._PageNum}">
                                </div>
                                <div>
                                    <span>记录：</span>
                                    <span class="num">${this.currentRecord}/${this.total}</span>
                                    <input type="text" class="input-page" data-type="${this._RecordNum}">
                                </div>`
            $(this.currentDom).html(paginationEle)
            this.watchClick()
            this.watchKeyDown()
        }
        watchClick() {
            $(this.currentDom).on('click', '.num', function (e) {
                let {target} = e;
                let val = target.innerText.split('/')[0];
                $(target).css('display', 'none')
                $(target).next().css('display', 'inline-block').attr('value', val).select()
            })
        }
        watchKeyDown() {
            let _this = this;
            $(this.currentDom).on('keyup', '.input-page', function (e) {
                if (e.key === 'Enter') {
                    let {target} = e;
                    let val = $(target).val();

                    // 判断val是否有效
                    let isContinue = _this.isValid(val, e.target.dataset.type);
                    if (!isContinue) {
                        $(target).select()
                        return
                    }
                    let showTotal = 0;
                    if (e.target.dataset.type === _this._PageNum) {
                        showTotal = _this.pageCount;
                        _this.currentPage = val;
                    } else if (e.target.dataset.type === _this._RecordNum) {
                        showTotal = _this.total;
                        _this.currentRecord = val;
                    }
                    $(target).css('display', 'none')
                    $(target).prev().css('display', 'inline-block').text(val + '/' + showTotal)
                }

            })
        }
        isValid(val, type) {
            let num = parseInt(val)
            if (!num || num < 1) {
                alert('无效的输入');
                return false
            }
            if (type === this._RecordNum) {
                // todo
            } else if (type === this._PageNum) {
                if (num > this.pageCount) {
                    alert('无效的输入');
                    return false
                }
            }
            return true
        }
    }
})($)
