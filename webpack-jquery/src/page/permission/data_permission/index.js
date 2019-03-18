import '../../../components/menu-tree'
import '../../../components/table'
import '../../../components/pagination'
import '../../../components/modal'

import '../../../common/common.less'
import './data_permission.less'

let random = function(start,end){
    if(!end){
        return Math.floor(Math.random()*start);
    }else{
        return Math.floor(Math.random()*(end-start)+start);
    }
}

let modalBody = `<div>
                   <form class="form-horizontal" id="dataSetForm">
                      <div class="form-group">
                        <label class="col-sm-2 control-label">集合序号</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" name="order">
                        </div>
                      </div>
                      <div class="form-group">
                        <label  class="col-sm-2 control-label">集合名称</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" name="name">
                        </div>
                      </div>
                      <div class="form-group">
                        <label  class="col-sm-2 control-label">集合编码</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" name="encode">
                        </div>
                      </div>
                      <div class="form-group">
                        <label  class="col-sm-2 control-label">前缀编码</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" name="preCode">
                        </div>
                      </div>
                      <div class="form-group">
                        <label  class="col-sm-2 control-label">后缀编码</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" name="extCode">
                        </div>
                      </div>
                    <div class="form-group">
                        <label  class="col-sm-2 control-label">生命周期</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" name="lifeCircle">
                        </div>
                      </div>
                    <div class="form-group">
                        <label  class="col-sm-2 control-label">类别归属</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" name="type">
                        </div>
                      </div>
                    <div class="form-group">
                        <label  class="col-sm-2 control-label">关联约束</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" name="ref">
                        </div>
                      </div>
                    <div class="form-group">
                        <label  class="col-sm-2 control-label">访问频率</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" name="times">
                        </div>
                      </div>
                    <div class="form-group">
                        <label  class="col-sm-2 control-label">适用服务</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" name="service">
                        </div>
                      </div>
                    <div class="form-group">
                        <label  class="col-sm-2 control-label">集合备注信息</label>
                        <div class="col-sm-10">
                          <textarea class="form-control" rows="3" name="remark"></textarea>
                        </div>
                      </div>
                    </form>
                </div>`

function mockDataSet() {
    let arr = [];
    const a = ['关系模型', '文档模型', '图论模型'];
    const b = ['a模型', 'b模型', 'c模型'];
    for(let i = 0; i < 5; i++) {
        arr[i] = {
            name: '集合' + (i+1),
            child: [],
            id: 'fir' + i,
            parentId: null,
            level: 1,
            checked: false,
            url: '',
            order: 0,
            encode: 'utf-8',
            preCode: '前缀',
            extCode: '后缀',
            lifeCircle: '生命周期',
            type: '类型',
            ref: '22321',
            times: '123',
            service: '适用服务'
        };
        let secondListLength = random(1, 4);
        for (let j = 0; j < secondListLength; j++) {
            arr[i].child[j] = {
                id: 'fir' + i + '-second' + j,
                name: '集合' + (i+1) + '-' + (j+1),
                child: [],
                parentId: arr[i].id,
                level: 2,
                checked: false,
                url: '',
                order: 0,
                encode: 'utf-8',
                preCode: '前缀',
                extCode: '后缀',
                lifeCircle: '生命周期',
                type: '类型',
                ref: '22321',
                times: '123',
                service: '适用服务'
            }
        }
    }
    return arr;
}

function modalFunc(arr) {
    // 模态框
    $.createModal({
        modalId: 'myModal',
        modalTitle: '新增数据集合',
        modalBody: modalBody,
        modalFooter: '<a class="btn btn-default">取消</a> <a class="btn btn-danger">保存</a>',
        afterMount: (modalId) => {
            $(`#${modalId}`).on('show.bs.modal', function (event) {
                let button = $(event.relatedTarget) // Button that triggered the modal
                let title = button.data('title')
                let modal = $(this)
                modal.find('.modal-title').text(title)
                modal.find('.modal-body').val(title)
            })
        }
    });

    // 模态框点击事件
    $(document).on('click', '#myModal a.btn', function (e) {
        console.log('e', e.target)
        let form = $("#dataSetForm");
        if (e.target.innerText.indexOf('保存') !== -1) { // 点击保存按钮
            let formData = form.serializeArray()
            arr.push(formData);
            console.log('arr',arr)
        } else {

        }
        form[0].reset()
        $('#myModal').modal('hide')
    })
}

function openUpdateModal(e) {
    console.log('e', e.target)
}

function createDataField(e) {
    let target = $(e.target).parent()[0]
    console.log('target', target)

    let id = target.dataset.id;
    let dataFieldArr = [{
        id: 1,
        parentId: '',
        type: 'Number',
        order: 1,
        name: 'create_name',
        encode: '字段编码',
        length: 4,
        accuracy: '5',
        fieldEncode: '编码规则', // 编码规则，前后缀， 初始值，最大值，增量值，随机值，当前值
        refresh: '字段更新',
        enabled: '开关状态',
        times: '5343',
        remark: '映射编码表值域',
        dbEncode: 'utf-8',
        dbName: '数据表名',
        dbScheme: '数据表模式',
    }, {
        id: 1,
        parentId: '',
        type: 'Number',
        order: 2,
        name: 'create_name',
        encode: '字段编码',
        length: 4,
        accuracy: '5',
        fieldEncode: '前后缀', // 编码规则，前后缀， 初始值，最大值，增量值，随机值，当前值
        refresh: '字段更新',
        enabled: '开关状态',
        times: '5343',
        remark: '映射编码表值域',
        dbEncode: 'utf-8',
        dbName: '数据表名',
        dbScheme: '数据表模式',
    }]
    // todo 根据id查找对应的数据
    $('#dataFieldTableView').createTable({
        head: [ {
            label: '字段序号',
            prop: 'order'
        }, {
            label: '字段名称',
            prop: 'name'
        },{
            label: '字段类型',
            prop: 'type'
        }, {
            label: '字段编码',
            prop: 'encode'
        }, {
            label: '字段长度',
            prop: 'length'
        }, {
            label: '字段精度',
            prop: 'accuracy'
        }, {
            label: '字段值域编码',
            prop: 'fieldEncode'
        }, {
            label: '字段更新',
            prop: 'refresh'
        }, {
            label: '字段启用',
            prop: 'enabled'
        }, {
            label: '字段备注信息',
            prop: 'remark'
        }, {
            label: '数据表编码',
            prop: 'dbEncode'
        }, {
            label: '数据表名称',
            prop: 'dbName'
        }, {
            label: '数据表模式',
            prop: 'dbScheme'
        }, {
            label: '操作',
            content: '<input type="button" class="btn btn-default" data-toggle="modal" data-opration="update" data-title="修改数据字段"  data-target="#myModal1" value="编辑"/> <input type="button" class="btn btn-default" value="删除"/>'
        }],
        data: dataFieldArr
    })
    $('#dataFieldPage').createPagination({
        total: 14
    })
    $('#dataFieldBtn').html(`<button class="btn btn-danger" id="addDataField" data-title="新增数据字段" data-toggle="modal" data-target="#myModal1">新增</button>`)
}

function dataFieldModal() {
    $('#myModal1').on('show.bs.modal', function (event) {
        let button = $(event.relatedTarget) // Button that triggered the modal
        let title = button.data('title')
        let modal = $(this)
        modal.find('.modal-title').text(title)
    })
    $('#myModal1').on('click', 'button', function (e) {
        let formEle = $('#dataFieldForm');
        if ($(e.target).text() === '保存') {
            let formData = formEle.serializeArray();
            console.log('formData', formData)
        } else {

        }
        formEle[0].reset()
        $('#myModal1').modal('hide')
    })
}

$(function () {


    let arr = mockDataSet();
    let dataSetTableView = $('#dataSetTableView')

    // 新增数据集合弹窗
    modalFunc(arr);

    // 新增数据字段弹窗
    dataFieldModal()

    $('#menuTree').createTree({
        data: arr,
        afterClickEvent: (ele) => {
            let id = ele.dataset.id;
            // 根据点击的item创建集合table
            // todo
            let tableItem = [{
                name: '集合1',
                id: 111,
                order: 1,
                encode: 'utf-8',
                preCode: '前缀',
                extCode: '后缀',
                lifeCircle: '生命周期',
                remark: '备注',
                type: '类型',
                ref: '22321',
                times: '123',
                service: '适用服务'
            }, {
                name: '集合2',
                id: 111,
                order: 2,
                encode: 'utf-8',
                preCode: '前缀',
                extCode: '后缀',
                lifeCircle: '生命周期',
                remark: '备注',
                type: '类型',
                ref: '22321',
                times: '123',
                service: '适用服务'
            }]
            dataSetTableView.createTable({
                head: [{
                    label: '集合序号',
                    prop: 'order'
                }, {
                    label: '集合名称',
                    prop: 'name'
                }, {
                    label: '集合编码',
                    prop: 'encode'
                }, {
                    label: '前缀编码',
                    prop: 'preCode'
                }, {
                    label: '后缀编码',
                    prop: 'extCode'
                }, {
                    label: '集合备注信息',
                    prop: 'remark'
                }, {
                    label: '生命周期',
                    prop: 'lifeCircle'
                }, {
                    label: '类别归属',
                    prop: 'type'
                }, {
                    label: '关联约束',
                    prop: 'ref'
                }, {
                    label: '访问频率',
                    prop: 'times'
                }, {
                    label: '适用服务',
                    prop: 'service'
                }, {
                    label: '操作',
                    bodyAlign: 'center',
                    content: '<input type="button" class="btn btn-default" data-toggle="modal" data-opration="update" data-title="修改数据集合"  data-target="#myModal" value="编辑"/> <input type="button" class="btn btn-default" value="删除"/>'
                }],
                data: tableItem
            })
            $('#dataSetPage').createPagination({
                total: arr.length
            })
            $('#dataSetBtn').html(`<button class="btn btn-danger" id="addDataSet" data-title="新增数据集合" data-opration="add" data-toggle="modal" data-target="#myModal">新增</button>`)
        }
    });

    dataSetTableView.on('click', 'tbody tr', function (e) {
        if (e.target.nodeName === 'INPUT') {
            openUpdateModal(e)
        } else {
            createDataField(e)
        }
    })
})
