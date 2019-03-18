import createLockPage from './components/lock-page'
import './libs/api'
import {api} from './libs/const'

import '../css/common/common.less'
import '../css/header.less'
import '../css/lock-page.less'

// 权限控制（菜单权限、功能权限、数据权限：数据查询、数据分析、数据服务、数据科学）、
// 菜单控制（扩展配置、访问统计、异常告警）、
// 数据控制（数据字典、数据编码、数据同步）、
// 服务日志、
// 服务监控（静态接口：版本、文档、数据；动态链路）、
// 数据中心（数据分析：模式报表、专题分析、产品分析；数据服务、数据科学）

class IndexPage {
    constructor() {
        this.navBarHeight = 40; // 导航条高度
        this.bottomHeight = 40; // 底部高度

        // footer数据
        this.footerArr = [{
            title: 'list',
            url: ''
        }, {
            title: 'nav',
            url: ''
        }, {
            title: 'home',
            url: ''
        }, {
            title: 'test',
            url: ''
        }, {
            title: 'test',
            url: ''
        }];
        this.chosenFooterIndex = 0;
        this.limitTabs = 6;

        // 选中菜单类名
        this.choosedFirstCls = 'choosed-first';
        this.choosedSecondCls = 'choosed-second';
        this.choosedThirdCls = 'choosed-third';

        // 选中菜单的索引 （default）
        this.choosedFirstIndex = 0;
        this.choosedSecondIndex = 0;
        this.choosedThirdIndex = 0;

        // 菜单数组
        this.listArr = []
    }

    /**
     * 初始化页面
     */
    init() {
        this.lockFunc();

        this.setHeight();

        // 接口
        this.getListArr();

        // mock
        // this.mockListArr();

        this.testNavigationTiming();

        this.createFooter();

        this.bindEvent();
    }

    /**
     * 通过调用接口获取菜单数据
     */
    getListArr() {
        $.sendReq({
            url: api.FindMenuAll,
            type: 'get',
            data: {},
            success: (json) => {
                this.listArr = this.formatMenu(json.data);
                console.log('this.listArr ', this.listArr )
                this.afterGetMenuList()
            }
        })
    }

    /**
     * 模拟菜单数据
     */
    mockListArr() {
        this.listArr = [{
            name: '权限控制',
            id: 'fir0',
            child: [{
                name: '菜单权限',
                id: 'fir0-second0'
            }, {
                name: '功能权限',
                id: 'fir0-second1'
            }, {
                name: '统计数据',
                id: 'fir0-second2',
                child: [{
                    name: '查询',
                    id: 'fir0-second2-third0',
                }, {
                    name: '统计',
                    id: 'fir0-second2-third1',
                }]
            }]
        }, {
            name: '菜单控制',
            id: 'fir1',
            child: [{
                name: '扩展配置',
                id: 'fir1-second0'
            }, {
                name: '访问统计',
                id: 'fir1-second1'
            }, {
                name: '异常告警',
                id: 'fir1-second2'
            }]
        }, {
            name: '数据控制',
            id: 'fir2',
            child: [{
                name: '数据字典',
                id: 'fir2-second0'
            }, {
                name: '数据编码',
                id: 'fir2-second1'
            }, {
                name: '数据同步',
                id: 'fir3-second2'
            }]
        }, {
            name: '服务日志',
            id: 'fir3'
        }, {
            name: '服务监控',
            id: 'fir4',
            child: [{
                name: '静态接口',
                id: 'fir4-second0',
                child: [{
                    name: '查询',
                    id: 'fir4-second0-third0',
                }, {
                    name: '统计',
                    id: 'fir4-second0-third1',
                }]
            }, {
                name: '动态链路',
                id: 'fir4-second1'
            }]
        }, {
            name: '数据中心',
            id: 'fir5',
            child: [{
                name: '数据分析',
                id: 'fir5-second0',
                child: [{
                    name: '模式报表',
                    id: 'fir5-second0-third0',
                }, {
                    name: '专题分析',
                    id: 'fir5-second0-third1',
                }, {
                    name: '产品分析',
                    id: 'fir5-second0-third2',
                }]
            }, {
                name: '数据服务',
                id: 'fir5-second1'
            }, {
                name: '数据科学',
                id: 'fir5-second2'
            }]
        }]
        this.afterGetMenuList()
    }

    bindEvent() {
        this.watchIframe();
        this.bindSearch();
        this.watchListBtn();
        this.watchFooter();
    }

    /**
     * 获取菜单数据后执行的操作
     */
    afterGetMenuList() {
        this.createList();
        this.resetSearchBoxVal(this.getCrumbs())
    }

    /**
     * 创建页脚
     */
    createFooter() {
        let footerEle = '';
        for(let i = 0; i < this.footerArr.length; i ++) {
            if (i < this.limitTabs) {
                let chosenCls = '';
                if (this.chosenFooterIndex === i) {
                    chosenCls = 'chosen-item'
                }
                footerEle += `<div class="nav-item-wrap ${chosenCls}">
                                <span>${this.footerArr[i].title}</span>
                                <span class="close-icon">x</span>
                            </div>`
            } else {
                let otherEle = `<div class="more-item" id="morePageBtn">
                                <span class="more-item-trigger">…</span>
                                <ul class="detail-list">`;
                this.footerArr.forEach(item => {
                    otherEle += `<li>${item.title}</li>`
                })
                otherEle += `</ul> </div>`;
                footerEle += otherEle;
                break;
            }
        }
        $('.footer').html(footerEle)
    }

    /**
     * 监听页脚点击事件
     */
    watchFooter() {
        let _this = this;
        $('.footer').on('click', function (e) {
            let target = e.target;
            if ($(target).hasClass('close-icon')) { // 关闭按钮
                $(target).parent().hide();
            } else if ($(target).hasClass('more-item-trigger')) { // 折叠菜单
                $(target).next().css('visibility', 'visible')
            } else if (target.nodeName === 'LI') { //
                $(target).parent().css('visibility', 'hidden')
            } else { // 切换界面
                let item = target;
                if (!$(target).hasClass('nav-item-wrap')) {
                    item = $(target).parent()[0]
                }
                _this.refreshSelectCls($(item).siblings(), 'chosen-item', $(item))
            }
        })
    }

    /**
     * 测试监听iframe
     */
    watchIframe() {
        let ifr = $('#ifr')[0];
        ifr.onload = function (e) {
            console.log('iframe onload', e)
        };
        ifr.onreadystatechange = function () {
            console.log('iframe onreadystatechange ')
            if(ifr.readyState === "complete" || ifr.readyState === "loaded"){
                //代码能执行到这里说明已载入胜利完毕了
                //要清除掉事件
                // ifr.detachEvent( "onreadystatechange", arguments.ifr);
                //这里是回调函数
            }
        }
    }


    /**
     * 测试navigation timing
     */
    testNavigationTiming() {
        let now = new Date().getTime();
        let page_load_time = now - performance.timing.navigationStart;
        console.log("User-perceived page loading time: " + page_load_time);
    }

    /**
     * 创建一级菜单
     * @returns {string}
     */
    createFirstList() {
        let firstListArr = this.listArr;
        if (!firstListArr.length) {
            return ''
        }
        let firstListEle = '';
        firstListArr.forEach((item, index) => {
            let className = ''
            if (index === this.choosedFirstIndex) {
                className = this.choosedFirstCls;
            }
            firstListEle += `<a data-id="${item.id}" data-index="${index}" class="${className}">${item.name}</a>`
        })
        return firstListEle
    }

    /**
     * 创建二、三级菜单(根据点击的一级菜单创建)
     * @returns {string}
     */
    createSecondList() {
        let listArr = this.listArr;
        let secondListEle = '';
        if (listArr.length === 0) {
            return secondListEle
        }
        let secondItem = listArr[this.choosedFirstIndex]

        if (secondItem.child) {
            secondItem.child.forEach((item, index) => {
                let secondChosenCls = '';
                if (index === this.choosedSecondIndex) {
                    secondChosenCls = this.choosedSecondCls;
                }
                secondListEle += `<div class="third-level-list-wrap">
                            <h4 class="${secondChosenCls}" data-id="${item.id}" data-index="${index}">${item.name}</h4>`;
                let childEle = '';
                if (item.child) {
                    childEle += '<ul>'
                    item.child.forEach((childItem, childIndex) => {
                        let thirdChosenCls = '';
                        if (index === this.choosedSecondIndex && childIndex === this.choosedThirdIndex) {
                            thirdChosenCls = this.choosedThirdCls;
                        }
                        childEle += `<li data-id="${childItem.id}" data-index="${childIndex}" class="${thirdChosenCls}" title="${childItem.name}">${childItem.name}</li>`
                    })
                    secondListEle += `${childEle}</ul>`
                }
                secondListEle += `</div>`
            })
        }
        return secondListEle
    }

    /**
     * 获取面包屑文字
     * @returns {string}
     */
    getCrumbs() {
        let list = this.listArr;
        let cFI = this.choosedFirstIndex;
        let cSI = this.choosedSecondIndex;
        let cTI = this.choosedThirdIndex;
        let context = '';

        context += `${list[cFI].name} > `;
        if (list[cFI].child) {
            context += list[cFI].child[cSI].name + ' > ';
            if (list[cFI].child[cSI].child) {
                context += list[cFI].child[cSI].child[cTI].name
            }
        }
        return context
    }

    /**
     * 设置菜单列表高度
     */
    setHeight() {
        let listWrapEle = $('.list-wrap');
        let listHeight = $(window).height() - this.navBarHeight - this.bottomHeight;
        listWrapEle.css('height', `${listHeight}px`)
        $('.hidden-mask').css('height', `${listHeight}px`)

        let secondListWidth = $(window).width() * 0.67;
        $('.second-level-list-wrap').css('width', secondListWidth )
    }

    /**
     * 搜索框事件
     */
    bindSearch() {
        let _this = this;
        let searchBtn = $('#searchBtn');
        searchBtn.focus(function (e) {
            $(this).prev().addClass('focus-search-icon')
            $(this).parent().addClass('search-wrap-focus')
        })
        searchBtn.blur(function (e) {
            $(this).prev().removeClass('focus-search-icon')
            $(this).parent().removeClass('search-wrap-focus')
        })
        searchBtn.change(function (e) {
            let newVal = $(e.target).val()
            console.log('e', newVal)
            _this.searchMenuList(newVal);
        })
    }

    searchMenuList(val) {
        $.sendReq({
            url: api.FindMenuByName,
            type: 'get',
            data: {
                currentPage: 1,
                pageSize: 10,
                name: val
            },
            success: (json) => {
                let searchArr = json.data.content;
                let result = '';
                searchArr.forEach((item, index) => {
                    result += `<li data-index="${index}" data-id="${item.id}">${item.name}</li>`
                })
                $('#searchResultWrap').html(result).css('visibility', 'visible');
                $('#searchResultWrap').on('click', 'li', function (e) {
                    $('#searchBtn').val($(e.target).text())
                    $('#searchResultWrap').css('visibility', 'hidden')
                })
            }
        })
    }

    /**
     * 监听鼠标滑过菜单按钮
     */
    watchListBtn() {
        // $('.list-total-wrap').css('visibility', 'visible')
        $('#listControlBtn').hover(function (e) {
            $('.list-total-wrap').css('visibility', 'visible')
        })
        $('.list-total-wrap').mouseleave(function (e) {
            $(this).css('visibility', 'hidden')
        })
    }

    /**
     * 锁屏事件
     */
    lockFunc() {

        // 渲染锁屏界面
        createLockPage($('#lockPage'));

        // 判断是否锁屏
        if (localStorage['lockStatus'] === '1') {
            $('.lock-page').addClass('show-lock-page')
        }

        // 锁屏
        $('#lockBtn').click(function (e) {
            $('.lock-page').addClass('show-lock-page')
            localStorage['lockStatus'] = '1'
        })

        // 解锁
        $(document).keyup(function(event){
            if(event.keyCode === 13){
                let pwd = $("#lockPwd").val();
                let sessionPwd = '123';
                if (pwd === sessionPwd) {
                    $('.lock-page').removeClass('show-lock-page')
                    localStorage['lockStatus'] = '0'
                }
            }
        });
    }


    /**
     * 格式化从后台拿到的数据
     * @param arr
     * @returns {*}
     */
    formatMenu([...arr]) {
        let firstMenu = arr.filter(item => {
            return item.parentId === null
        });
        let otherMenu = arr.filter(item => item.parentId);
        const getChildItem = function(firstMenu, otherMenu) {
            firstMenu.forEach(item => {
                let child = otherMenu.filter(secondItem => {
                    return secondItem.parentId === item.id
                });
                if (child.length > 0) {
                    item.child = child
                }
                let lastArr = otherMenu.filter(secondItem => secondItem.parentId !== item.id);
                if (child.length > 0 && lastArr.length > 0) {
                    getChildItem(item.child, lastArr);
                }
            })
        }
        getChildItem(firstMenu, otherMenu)
        return firstMenu
    }

    /**
     * 生成菜单
     */
    createList() {
        let _this = this;
        let firstLevelListEle = $('#firstLevelList');
        let secondLevelListEle = $('#secondLevelList');

        firstLevelListEle.append(this.createFirstList());
        secondLevelListEle.append(this.createSecondList());

        // 监听一级菜单点击事件
        firstLevelListEle.on('click', 'a', function (e) {
            _this.choosedFirstIndex = parseInt(e.target.dataset.index);
            _this.choosedSecondIndex = 0;
            _this.choosedThirdIndex = 0;

            _this.refreshSelectCls($(this).siblings(),_this.choosedFirstCls, $(e.target))

            secondLevelListEle.html(_this.createSecondList());
            _this.resetSearchBoxVal(_this.getCrumbs())
        })

        // 监听二级菜单点击事件
        secondLevelListEle.on('click', 'h4', function (e) {
            _this.choosedSecondIndex = parseInt(e.target.dataset.index)
            _this.choosedThirdIndex = 0;

            _this.refreshSelectCls($(this).parent().parent().find('h4'), _this.choosedSecondCls, $(e.target))

            _this.resetSearchBoxVal(_this.getCrumbs())
        })

        // 监听三级菜单点击事件
        secondLevelListEle.on('click', 'li', function (e) {
            _this.choosedThirdIndex = parseInt(e.target.dataset.index);

            _this.refreshSelectCls($(this).siblings(), _this.choosedThirdCls, $(e.target))

            _this.resetSearchBoxVal(_this.getCrumbs())
        })
    }

    /**
     * 列表中点击某项改变样式， 并将上一个选中的样式去掉
     * @param $loop 列表组
     * @param chosenCls 选中的样式
     * @param $target 当前选中的元素
     */
    refreshSelectCls($loop, chosenCls, $target) {
        $loop.each(function (index, ele) {
            if ($(ele).hasClass(chosenCls)) {
                $(ele).removeClass(chosenCls);
                return false
            }
        })
        $target.addClass(chosenCls);
    }

    /**
     * 重置搜索框的值
     */
    resetSearchBoxVal(context) {
        $('#searchBtn').val(context)
    }

}

$(function() {
    let indexPage = new IndexPage()
    indexPage.init()
})






