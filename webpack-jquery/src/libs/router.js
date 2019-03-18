import menuPermission from'../pages/permission/menu_permission/menu_permission.js'
import dataPermission from'../pages/permission/data_permission/data_permission.js'
import home from'../../pages/home/home.js'

$(function(){

    router.start({
        view: '#ui-view',
        errorTemplateId: '#error', // 可选
        router: {
            'home': {
                templateUrl: './pages/home/home.html',
                controller: home,
                animate:''
            },
            'menuPermission': {
                templateUrl: './pages/permission/menu_permission/menu_permission.html',
                controller: menuPermission,
                animate:''
            },
            'dataPermission': {
                templateUrl: './pages/permission/data_permission/data_permission.html',
                controller: dataPermission,
                animate:''
            },
            'test': {
                templateUrl: 'http://192.168.20.199:3001/permission/data_permission/data_permission.html',
                controller: dataPermission,
                animate:''
            },
            'defaults': 'dataPermission' //默认路由
        }
    });
});
