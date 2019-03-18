(function($) {
    let options = {
        msg: '加载中，请稍后',
        gif: './img/loading.gif'
    }

    $.fn.extend({
        openLoadForm:function(msg, callback){
            if(typeof msg=="function"){
                callback=msg;
                msg={};
            }
            $(this).on("click",function(){
                var index=$.openLoadForm(msg);
                if(typeof callback=="function"){
                    callback(index);
                }
            });
        }
    })

    $.extend({
        startProgress: function() {
            // uuid
            let uuid='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });

            let maskTag = `<div id="progress${uuid}" class="progress"><span></span></div>`
            $('body').append(maskTag);
            $({property: 0}).animate({property: 80}, {
                duration: 500,
                step: function() {
                    let percentage = Math.round(this.property);
                    $(`#progress${uuid}`).css('width',  percentage + "%");
                }
            });
            return uuid;
        },
        stopProgress: function(idNum) {
            // if (!idNum) {
            //     $('.loading-mask').remove();
            // }
            // $(`#progress${idNum}`).remove();

            $({property: 80}).animate({property: 100}, {
                duration: 200,
                step: function() {
                    let percentage = Math.round(this.property);
                    let progress = $(`#progress${idNum}`);
                    progress.css('width',  percentage+"%");
                    if(percentage === 100) {
                        progress.addClass("done");// 完成，隐藏进度条
                    }
                }
            });
        }
    })
})($)
