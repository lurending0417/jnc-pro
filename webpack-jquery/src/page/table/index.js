import '../../common/common.less'
import './index.less'

import '../../components/table'
import '../../components/contextMenu'
import '../../components/menu-tree'
import '../../components/paginationSim'
import Lodash from '../../../test'


class Main{
    createTree() {
        $('#menuTree').createTree()
    }
    createTable() {
        $('#tableView').createTable({
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
            head: [[{
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
        })
    }
    watchTableHead() {
        $('#tableView').on("contextmenu" , 'table thead tr th',function(e){
            console.log('e', e);
            let clientX = e.clientX;
            let clientY = e.clientY;
            $.showContextMenu({
                clientX,
                clientY
            });
            return false;
        });
    }
    createPagination() {
        $('#paginationWrap').createPagination({
            total: 67,
            size: 9
        })
    }
    createIconGroup() {
        let iconNameArr = [{
            name: 't-add-icon',
            cName: '添加'
        }, {
            name: 't-delete-icon',
            cName: '删除'
        }, {
            name: 't-edit-icon',
            cName: '编辑'
        }, {
            name: 't-group-icon',
            cName: '分组'
        }, {
            name: 't-lock-icon',
            cName: '锁定'
        }, {
            name: 't-order-icon',
            cName: '排序'
        }, {
            name: 't-refresh-icon',
            cName: '刷新'
        }, {
            name: 't-save-icon',
            cName: '保存'
        }, {
            name: 't-search-icon',
            cName: '搜索'
        }, {
            name: 't-send-icon',
            cName: '提交'
        }]
        let iconList = ``;
        iconNameArr.forEach(item => {
            iconList += `<i class="table-icon ${item.name}" title="${item.cName}"></i>`
        })
        $('#tableIconWrap').html(iconList);
    }
    watchTableIcon() {
        $('#tableIconWrap').on('click', 'i', function (e) {
            let target = e.target;
        })
    }
}




$(function () {
    const main = new Main();
    main.createTree();
    main.createTable();
    main.watchTableHead();
    main.createPagination();
    main.createIconGroup();
    main.watchTableIcon();


    let lodash = new Lodash();
    $('#debounce').click(lodash.debounce(lodash.say))
    window.addEventListener('resize', lodash.throttle(lodash.sayHi));
    let s1 = new Set(['aa', 'nn', 'cc', 'aa'])
    console.log('s1', s1)
})
