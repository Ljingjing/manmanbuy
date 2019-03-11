
$(function () {
    var prolist = new ProList();
    //三级菜单
    prolist.getcategorybyid(getUrlParam('categoryid'));
    //二级菜单
    prolist.getsecondtitle();

    var menuThree = prolist.getcategorybyid(); //三级菜单的id

    prolist.getproductlist(getUrlParam('categoryid'), getUrlParam('pageid'));
    
    //关闭底部的广告
    prolist.closebanner();
});


var ProList = function () {

}
// var globalCateID = 0;
var titleId = 0;

ProList.prototype = {
        //获取面包屑导航中的三级菜单
        getcategorybyid: function (cateID) {
            $.ajax({
                url: 'http://localhost:9090/api/getcategorybyid',
                data: {
                    categoryid: Number(cateID)
                },
                success: function (obj) {
                    titleId = obj.result[0].titleId;
                    $('.breadcrumb .getcategorybyid a')[0].innerHTML = obj.result[0].category; //三级菜单
                    //相关链接中的文字变化
                    $('.rellink .numTop')[0].innerHTML = obj.result[0].category + "十大品牌";
                    $('.rellink .numAll')[0].innerHTML = obj.result[0].category + "口碑大全";
                }

            });
        },
        // 获取面包屑导航中的二级菜单
        getsecondtitle: function () {
            var title; //二级菜单
            $.ajax({
                url: 'http://localhost:9090/api/getcategorytitle',
                success: function (obj) {
                    for (var i = 0; i < obj.result.length; i++) {
                        if (obj.result[i].titleId == titleId) {
                            titleid = obj.result[i].titleId;
                            title = obj.result[i].title;
                        }
                    }
                    $('.breadcrumb .getsecondtitle')[0].innerHTML = title;
                }

            });
        },

        //获取商品列表的数据
        getproductlist: function (globalCate, currentpageID) {
            //在这里需要判断是否超过页码范围内禁用
            $.ajax({
                    url: 'http://localhost:9090/api/getproductlist',
                    data: {
                        categoryid: globalCate,
                        pageid: currentpageID
                    },
                    success: function (obj) {
                        console.log(obj);
                        for(var i = 0;i<obj.result.length;i++){
                            document.cookie='{"productPrice":"'+obj.result[i].productPrice+'","productCom":"'+obj.result[i].productCom+'"}';
                        }
                        if(obj.result.lenght < 0){
                            return false;
                        }
                        var html = template('getProlistTpl', {
                            'result': obj.result
                        });
                        $('.mui-table-view').html(html);
                        //分页
                        var pageCount = Math.ceil(obj.totalCount / obj.pagesize); //总页数
                        
                        var paginationHtml = '<span class="w33">' + '<a class="prev" href="prolist.html?categoryid=' + globalCate + '&pageid=' + Math.max((currentpageID - 1),1) + '">上一页</a></span>';

                        paginationHtml += '<span class="w33"> <select name="select" id="selectPage" selected style="border: 1px solid #bababa; font-size: 16px; padding:8px 15px;height: 36px">';
                        for (var i = 0; i < pageCount; i++) {
                            if (currentpageID == i + 1) {
                                paginationHtml += '<option value="' + Number(i + 1) + '" selected>' + Number(i + 1) + '/' + Number(pageCount) + '</option>';
                            } else {
                                paginationHtml += '<option value="' + Number(i + 1) + '">' + Number(i + 1) + '/' + Number(pageCount) + '</option>';
                            }
                        }
                        paginationHtml += '</select></span>'
                        paginationHtml += '<span class="w33"><a class="next" href="prolist.html?categoryid=' + globalCate + '&pageid=' + Math.min((Number(currentpageID) + 1),pageCount) + '" >下一页</a></span>'
                        $('.page').html(paginationHtml);
                        if(currentpageID == 1){
                            //如果是第一页，上一页按钮禁用
                            $('.prev').css({'color':"#b9b9b9"});
                            $('.prev').on('click',function(){
                                return false;
                            });
                        }
                        if(currentpageID == pageCount){
                            //如果是最后一页，下一页按钮禁用
                            $('.next').css({'color':"#b9b9b9"});
                            $('.next').on('click',function(){
                                return false;
                            });
                        }
                        $('#selectPage').on('change', function (e) {
                            window.location.href = 'prolist.html?categoryid=' + globalCate + '&pageid=' + $(this).val();
                            $(this).attr('selected', "selected");
                        })
                    }
            });

    },


    //广告 点击关闭
    closebanner: function () {
        $('.app-promotion-bar .closefix').on('click', function () {
            $('.app-promotion-bar').hide();
        });
    }
}

    //根据地址栏，传入键，返回值
    var getUrlParam = function(name) {
        var reg = new RegExp("(^|&)" +
            name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
