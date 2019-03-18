import '../../libs/render'

import '../../common/common.less'
import './home.less'

$(function() {
    $('#routeBtn').click(function() {
        window.location = '../permission/menu_permission.html'
    })
    $('#testBtn').click(function() {
        window.location = '../table.html'
        console.log('window.history.length', window.history.length)
        console.log('window.history.state', window.history.state)
    })
    $.renderTemplate()
})
