import '../../../components/menu-tree'
import '../../../components/table'
import '../../../components/pagination'

import '../../../libs/api'
import '../../../libs/loading'

import '../../../common/common.less'
import './index.less'


class MenuPage {

    constructor() {
        this.menuArr = this.mockTreeData()
    }

    static random (start,end){
        if(!end){
            return Math.floor(Math.random()*start);
        }else{
            return Math.floor(Math.random()*(end-start)+start);
        }
    }

    init() {
        // 设置高度
        $('.left-content-view').css('height', `${$(window).height() - 120}px`)
    }

    getChildItem(firstArr, secondArr) {
        firstArr.forEach(item => {
            let child = secondArr.filter(secondItem => {
                return secondItem.parentId === item.id
            });
            if (child.length > 0) {
                item.child = child
            }
            let lastArr = secondArr.filter(secondItem => secondItem.parentId !== item.id);
            if (child.length > 0 && lastArr.length > 0) {
                this.getChildItem(item.child, lastArr);
            }
        })
    }
    formatMenu([...arr]) {
        let firstMenu = arr.filter(item => {
            return !item.parentId
        });
        let otherMenu = arr.filter(item => item.parentId);
        if (otherMenu.length > 0) {
            this.getChildItem(firstMenu, otherMenu)
        }
        return firstMenu
    }

    getFatherItem(ele) {
        let item = ele.parent();
        return item[0]
    }


    mockTreeData() {
        let arr = [];
        const a = ['物流管控过渡', '终端盘库', '财务管理平台', '行政办公费用预算', '中台系统', '云学堂培训系统', 'DMS系统', '费用系统'];
        for(let i = 0; i < a.length; i++) {
            arr[i] = {
                name: a[i],
                child: [],
                id: 'fir' + i,
                parentId: null,
                level: 1,
                checked: false
            };
            let secondListLength = MenuPage.random(4, 6)
            for (let j = 0; j < secondListLength; j++) {
                arr[i].child[j] = {
                    id: 'fir' + i + '-second' + j,
                    name: `${a[i]}-${j+1}`,
                    child: [],
                    parentId: arr[i].id,
                    level: 2,
                    checked: false
                }
                let thirdListLength = MenuPage.random(3, 8)
                for (let k = 0; k < thirdListLength; k++) {
                    arr[i].child[j].child[k] = {
                        id: 'fir' + i + '-second' + j + '-third' + k,
                        name: `${a[i]}-${j+1}-${k+1}`,
                        parentId: arr[i].child[j].id,
                        level: 3,
                        checked: false
                    }
                }
            }
        }
        return arr;
    }

    mockFun(head, arr, tableView) {
        // 生成树
        $('#menuTree').createTree({
            data: arr
        })
        // 生成表格
        tableView.createTable({
            data: [{
                name: '名称',
                id: '1',
                checked: false,
                encode: 'utf-8',
                permission: '权限',
                label: '前台',
                url: 'https',
                instance: '实例',
                onlineNumber: '2434',
                authorizationNumber: '2434',
                totalNumber: '2434',
                everyDayNumber: '2434'
            }, {
                name: '名称',
                id: '2',
                checked: false,
                encode: 'utf-8',
                permission: '权限',
                label: '前台',
                url: 'https',
                instance: '实例',
                onlineNumber: '2434',
                authorizationNumber: '2434',
                totalNumber: '2434',
                everyDayNumber: '2434'
            }],
            head: head
        })
        $('#paginationView').createPagination({
            total: 3
        })
    }

    dynamicFun(head, arr, tableView) {
        $.sendReq({
            url: '/menu/find',
            data: {
                currentPage: 1,
                pageSize: 10
            },
            success: function (json) {
                console.log('json', json)
                let data = json.data.content
                data.forEach(item => {
                    item.checked = false;
                })
                arr = data;
                // 生成树
                $('#menuTree').createTree({
                    data: MenuPage.formatMenu(data),
                    afterClickEvent: (ele) => {
                        // 生成表格
                        tableView.createTable({
                            data: MenuPage.formatMenu(data),
                            head: head,
                            callback: () => {
                                tableView.find('tr').each((index, ele) => {
                                    let stateCode = ele.dataset.state;
                                    if (stateCode === '0') {
                                        $(ele).addClass('disabled-cls')
                                    }
                                })
                            }
                        })

                        console.log('json.data.totalElements', json.data.totalElements)

                        // 生成pagination
                        $('#paginationView').createPagination({
                            total: json.data.totalElements
                        })
                        // 生成按钮
                        $('#enabledBtn').html(`<a class="clicked" data-prop="disabled">!&nbsp;禁用</a>
                                <a data-prop="enabled">
                                    <i class="active-icon"></i>
                                    <span>激活</span>
                                </a>`)
                    }
                })

                // 显示禁用行
                //
            }
        })
    }
}




$(function () {

    let menuPage = new MenuPage();
    menuPage.init()


    let arr = menuPage.mockTreeData();
    let tableView = $('#tableView');
    let head = [[{
        label: '选择',
        prop: 'checked',
        width: '40'
    }, {
        label: '服务定义',
        colspan: 4,
    }, {
        label: '服务部署',
        colspan: 2
    }, {
        label: '服务访问',
        colspan: 4
    }], [{
        template: '<input type="checkbox">',
        prop: 'checked',
        content: '<input type="checkbox">',
        headAlign: 'center',
        bodyAlign: 'center',
    }, {
        label: '编码',
        prop: 'encode'
    }, {
        label: '描述',
        prop: 'name'
    }, {
        label: '权限',
        prop: 'permission'
    }, {
        template: '<span>标签</span><i class="select-cls"></i>', // 下拉菜单
        prop: 'label'
    }, {
        label: '地址',
        prop: 'url',
    }, {
        label: '实例',
        prop: 'instance',
    }, {
        label: '在线人数',
        prop: 'onlineNumber',
    }, {
        label: '授权人数',
        prop: 'authorizationNumber',
    }, {
        label: '总计人次',
        prop: 'totalNumber',
    }, {
        label: '日均人次',
        prop: 'everyDayNumber',
    }]]

    menuPage.mockFun(head, arr, tableView)

    // menuPage.dynamicFun(head, arr, tableView)


    // 监听复选框点击事件
    tableView.on('click', 'input[type="checkbox"]', function (e) {
        let target = $(e.target);
        let selectedVal = target.prop('checked');

        if (target.parent()[0].nodeName === 'TH') {
            let tbodyInputs = target.parent().parent().parent().next().find('input[type="checkbox"]');
            tbodyInputs.prop('checked', selectedVal);
            arr.forEach(item => {
                item.checked = selectedVal;
            })
        } else if (target.parent()[0].nodeName === 'TD') {
            let id = target.parent().parent()[0].dataset.id;
            let checkAllBox = tableView.find(`th input[type="checkbox"]`);
            arr.forEach(item => {
                console.log(id, item.id)
                if (item.id == id) {
                    item.checked = selectedVal
                }
            })
            if (arr.filter(item => !item.checked).length === 0) { // 全选
                checkAllBox.prop('checked', true)
            }  else { // 取消全选
                checkAllBox.prop('checked', false)
            }
        }
    })

    // 点击
    $('#enabledBtn').on('click', 'a', function (e) {
        console.log('arr', arr)
        let target = e.target;

        if (target.nodeName === 'I' && target.nodeName === 'SPAN') {
            target = $(target).parent()[0]
        }
        console.log('target.innerHTML', target.dataset.prop);
        let aimArr = arr.filter(item => item.checked);
        let stateCode = 1;
        if (target.dataset.prop === 'disabled') { // 禁用
            if (aimArr.filter(item => item.stateCode === '1').length === 0) {
                alert('选中数据没有可以禁用的数据，请重新选择')
                return
            }
        } else {
            if (aimArr.filter(item => item.stateCode === '0').length === 0) {
                alert('选中数据没有可以激活的数据，请重新选择')
                return
            }
        }
        console.log(aimArr)
        if (aimArr[0].stateCode === 1) {
            stateCode = 0
        }
        let temp = [];
        aimArr.forEach(item => {
            console.log(typeof item.id)
            temp.push(item.id)
        });
        console.log('temp', temp)
        $.sendReq({
            url: '/menu/update',
            type: 'POST',
            data: {
                stateCode: stateCode,
                ids: temp.join()
            },
            success: function (json) {
                console.log('json', json)
            }
        })
    })
})
