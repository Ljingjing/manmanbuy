$(function () {
    var bijia = new Bijia();
    bijia.closebanner();
    bijia.getproduct();
    bijia.getSecondTit();
    console.log(getUrlParam('productCom').replace(/[^0-9]/ig,""));
    console.log(getUrlParam('productPrice').substring(2));

    bijia.getlowerprice(getUrlParam('productPrice').substring(2),getUrlParam('productCom').replace(/[^0-9]/ig,""));

    bijia.getproductcom(Number(getUrlParam('productId')));
    bijia.moreincom();
});

var Bijia = function () {

}
var categoryID = 0;

Bijia.prototype = {
    //广告 点击关闭
    closebanner: function () {
        $('.appbanner .btn').on('click', function () {
            $('.appbanner').hide();
        });
        $('.app-promotion-bar .closefix').on('click', function () {
            $('.app-promotion-bar').hide();
        });
    },
    //获取商品的详细信息
    getproduct:function(){
        $.ajax({
            url:"http://localhost:9090/api/getproduct",
            data:{productid:Number(getUrlParam('productId'))},
            async: false, //设为同步
            success:function(obj){
                // console.log(obj);
                if(obj.result.length > 0){
                    categoryID = obj.result[0].categoryId;
                    var str = obj.result[0].productName;
                    $('.nav').html('<a href="bijia.html?productId='+ categoryID +'" class="f12">&nbsp;'+ str.trim().split(' ')[0] +'</a>');
                    $('.detail-head .pic').prepend(obj.result[0].productImg);
                    $('.detail-head .tit').html(obj.result[0].productName);
                    $('.plist > a').html(obj.result[0].bjShop);
                    $('.plist > a >table > tbody >tr >td').attr('href',"javascript:void(0);");
                }else{
                    window.location.href = "category.html";
                }
                
            }
        });
    },
    //面包屑导航中的二级菜单
    getSecondTit:function(){
        $.ajax({
            url: 'http://localhost:9090/api/getcategorybyid',
            data: {
                categoryid:categoryID
            },
            success: function (obj) {
                // console.log(obj);
                if(obj.result.length > 0 ){
                    $('#main .nav').prepend('<a href="index.html" class="f12">首页</a> &gt;<a href="prolist.html?categoryid=' + categoryID + '&pageid=1" class="f12">&nbsp;'+ obj.result[0].category +'</a> &gt;'); //二级菜单
                }else{
                    window.location.href = "category.html";
                }
            }

        });
    },
    //当前最低价和最佳优选
    getlowerprice:function(productPrice,productCom){
       $('.inf ul li.price em i').html(productPrice);
       $('.inf ul li.comment em i').html(productCom);
    },
    //获取商品评论
    getproductcom:function(productid){
        $.ajax({
            url:"http://localhost:9090/api/getproductcom",
            data:{productid:productid},
            success:function(obj){
                console.log(obj);
                if(obj.result.length > 0){
                    var html = template('getproductcomTpl', {
                        'result': obj.result
                    });
                    $('.pj_list').html(html);
                }else{
                    window.location.href = "category.html";
                }
                
            }
        });
    },
    //查看更多评价
    moreincom:function(){
        $('.more .morein').on('click',function(){
            alert('抱歉，暂无查看更多评价功能！');
        });
    }
}
//根据地址栏地址，传入键，获取值
var getUrlParam = function(name) {
    var reg = new RegExp("(^|&)" +
        name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}