$(function () {
    var cate = new Catrgory();
    cate.getCategoryTitle();
    cate.getCategory();
});

var Catrgory = function () {}
var titleNum = 0;
Catrgory.prototype = {
    // 获取分类标题
    getCategoryTitle: function () {
        $.ajax({
            url: 'http://localhost:9090/api/getcategorytitle',
            async: false, //设为同步
            success: function (obj) {
                titleNum = obj.result.length;
                var html = template('categorytitleTpl', obj);
                $('.mui-table-view').html(html);
            }
        });
    },
    // 获取分类
    getCategory: function () {
        //页面刚打开时，需要请求的数据
        for (var i = 0; i < titleNum; i++) {
            firstAjax(i);
        }
        //当某个被点击一次时，这个折叠起来，再次点击这个时，其他兄弟全部折叠,即，第一次点击，只有自己的active类删除，第二次及以后点击均其他删除active，自己保留active
        var flag = 1;
        $('.mui-table-view').on('tap', '.mui-table-view-cell', function () {
            //点击第二次以后 
            if (flag == 2) {
                $('.mui-table-view li').toggleClass('mui-active');
                $(this).toggleClass('mui-active');
            }
            flag++;
        });
    }
}
//页面一打开便需要请求各个标题的数据显示在页面上
function firstAjax(index) {
    $.ajax({
        url: 'http://localhost:9090/api/getcategory',
        data: {
            titleid: index
        },
        success: function (obj) {
            console.log(obj.result);
            var html = template('titleTpl', obj);
            $(".mui-table-view-cell[index= '" + index + "' ] .mui-collapse-content").html(html);
        }
    });
}