(function($) {

    let itemClsArr = ['nav-first-item-wrap', 'nav-second-item-wrap', 'nav-third-item-wrap'];
    let number = ['second-wrap', 'third-wrap', 'four-wrap', 'five-wrap', 'six-wrap'];
    let visibleCls = 'visible-cls';
    let clickedShowCls = 'clicked-show-item';
    let clickedHideCls = 'clicked-hide-item';
    let showChildCls = 'show-child';

    function initTreeData(arr, trees, entrance) {
        if (!entrance) {
            trees.push(`<div class="${number[arr[0].level -2]} ${visibleCls}">`) //  ${visibleCls}
        }
        arr.forEach((item, index) => {
            let hasChild = false;
            let parentStr= '';
            if (item.child && item.child.length > 0) {
                hasChild = true;
            }
            if (item.parentId) {
                parentStr = `data-parentid="${item.parentId}"`
            }
            let treeEle = `<div class="nav-item-wrap ${itemClsArr[item.level - 1]}" data-id="${item.id}" ${parentStr}> 
                                <span class="nav-first-item" >${item.name}</span>
                                ${hasChild ? '<i class="down-icon"></i>' : ''}
                            </div>`;
            trees.push(treeEle);
            if (hasChild) {
                initTreeData(item.child, trees)
            }
        })
        if (!entrance) {
            trees.push('</div>')
        }
    }

    function hasChildItem(childEle) {
        let hasChild = false;
        for (let i = 0; i < number.length; i++) {
            if (childEle.hasClass(number[i])) {
                hasChild = true;
                break;
            }
        }
        return hasChild
    }

    $.fn.extend({
        opts: {
            data: [{
                name: '权限控制',
                id: 'fir0',
                level: 0,
                parentId: null,
                child: [{
                    name: '菜单权限',
                    id: 'fir0-second0',
                    level: 1,
                    parentId: 'fir0'
                }, {
                    name: '功能权限',
                    id: 'fir0-second1',
                    level: 1,
                    parentId: 'fir0'
                }, {
                    name: '统计数据',
                    id: 'fir0-second2',
                    level: 1,
                    parentId: 'fir0',
                    child: [{
                        name: '查询',
                        id: 'fir0-second2-third0',
                        level: 2,
                        parentId: 'fir0-second2',
                    }, {
                        name: '统计',
                        id: 'fir0-second2-third1',
                        level: 2,
                        parentId: 'fir0-second2',
                    }]
                }]
            }], // 数据来源示例
            initStatus: 'SHOW_ALL' // 'SHOW_ALL'：表示展开所有子集， 'SHOW_FIRST'：表示仅展开一级菜单
        },
        createTree: function(options){
            if(!options){
                console.error('缺少配置参数options')
            }
            if (!options.data || options.data.length === 0) {
                console.error('缺少data或者data长度为0')
            }

            // 生成树
            let trees = [];
            initTreeData(options.data, trees, true);
            let treeEle = trees.join(' ');
            // console.log('treeEle', trees.length)
            // console.log('treeEle', treeEle)
            $(this).html(treeEle);

            let _this = this;
            // 监听菜单点击事件
            $(this).on('click', `.nav-item-wrap`, function (e) {
                // 获取准确的目标元素以及id
                let target = e.target;
                let id = '';
                if (!e.target.dataset.id) {
                    target = $(e.target).parent()[0];
                }
                id = target.dataset.id;

                // 添加点击后的样式
                $(_this).find('.nav-item-wrap').each((index, ele) => {
                    if ($(ele).hasClass(clickedShowCls) || $(ele).hasClass(clickedHideCls)) {
                        $(ele).removeClass(clickedShowCls)
                        $(ele).removeClass(clickedHideCls)
                        // 判断当前元素是否有子菜单，以及子菜单是否展开
                        let nextEle = $(ele).next();
                        if (hasChildItem(nextEle)) {
                            if (nextEle.hasClass(visibleCls)) { // 隐藏时，箭头向右
                                $(ele).removeClass(showChildCls)
                            } else {
                                $(ele).addClass(showChildCls)
                            }
                        }
                    }
                })

                // 判断当前点击的菜单是否有下一级菜单（class)
                let childEle = $(target).next();
                let hasChild = false;
                if ($(target).hasClass(itemClsArr[0])) {
                    hasChild = true;
                }
                hasChild = hasChildItem(childEle);
                if (hasChild) {
                    // 如果当前点击的菜单有下一级， 判断它此时子菜单是否展开，用来改变箭头图标的指向

                    // 显示、隐藏对应子集菜单
                    $(target).removeClass(showChildCls)
                    if (childEle.hasClass(visibleCls)) {  // 子菜单隐藏
                        $(target).addClass(clickedShowCls)

                        childEle.removeClass(visibleCls)
                    } else {
                        $(target).addClass(clickedHideCls)
                        // $(target).addClass(showChildCls)
                        childEle.addClass(visibleCls)
                    }
                } else {
                    $(target).addClass(clickedShowCls);
                    if (options.afterClickEvent) {
                        options.afterClickEvent(target)
                    }
                }
            })
        }
    })
})($)