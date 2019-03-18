import hogan from 'hogan.js'


(function () {
    $.extend({
        renderTemplate: function () {
            let template = '<div>Hey! I am {{name}}!</div>';
            let data = {
                name: 'tsgd'
            }
            let result = hogan.compile(template).render(data);
            console.log('result', result)
        }
    })
})($)
