(function () {
    $.extend({
        random: function (start,end){
        if(!end){
            return Math.floor(Math.random()*start);
        }else{
            return Math.floor(Math.random()*(end-start)+start);
        }
    }
    })
})($)
