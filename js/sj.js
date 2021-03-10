const { Model } = require("echarts");

function ajax(url,Type,){

}
    $.ajax({
        url: "http://www.cmtthz.com/DataV/v1", //请求的url地址
        dataType: "json", //返回格式为json
        async: true,//请求是否异步，默认为异步，这也是ajax重要特性
        type: "post", //请求方式
        beforeSend: function () {
            //请求前的处理
        },
        success: function (res) {
            //请求成功时处理   
            console.log(res)
        },
        error: function (err) {
            //请求出错处理
            console.log(err)
        }
    });

