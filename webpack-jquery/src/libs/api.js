import constConfig from './const'
(function () {
    $.extend({
        sendReq: function (options = {}) { // url, type, data, success
            if (!options) {
                console.error('缺少参数options')
            }
            if (!options.url) {
                console.error('缺少参数url')
            }
            options.path = constConfig.httpUrl + options.url;
            let idNum = $.openMask();

            $.ajax({
                url: options.path,
                type: options.type || 'GET',
                data: options.data || {},
                success: (data) => {
                    $.closeMask(idNum);
                    if (options.success) {
                        options.success(data)
                    }
                },
                fail: (err) => {
                    $.closeMask(idNum);
                    console.error(err.status);
                    console.error(err.responseText);
                }
            })
            // .success(function(data) {
            //     $.closeMask(idNum);
            //     if (options.success) {
            //         options.success(data)
            //     }
            // })
            // .fail(function(err) {
            //     $.closeMask(idNum);
            //     console.error(err.status);
            //     console.error(err.responseText);
            // })
        }
    })
})($)