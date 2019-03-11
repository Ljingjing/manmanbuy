$(function () {
    var MMb_discount = new MMB_discount();
    // 动态获取推荐商品数据
    MMb_discount.recomCodit();
    // 动态获取当前商品的优惠券
    MMb_discount.getCurrentPro();
})

var MMB_discount=function () {  }
MMB_discount.prototype={
    dataUrl:"http://localhost:9090/api/",
    recomCodit: function () {
        $.ajax({
            url: this.dataUrl+"getcouponproduct",
            data: {couponid:0},
            success: function (obj) {
                var html = template("coupon-tpl",obj);
                $("#morePro .contPro>ul").html(html);
                $('#morePro .test-lazyload').picLazyLoad({
                    threshold: -30,
                });

                $("#morePro .contPro li").on("click",function () {
                    var image = $(this).find('img').attr("src");
                    var proName=$(this).find('p').html();
                    var currentSale = $(this).find('.top i').html();
                    var totalSell = $(this).find('.top em').html();
                    var data=[image,proName,currentSale,totalSell];
                    localStorage.setItem('pro',JSON.stringify(data));
                    location.reload();
                })
            }
        })
    },
    getCurrentPro: function () {
        var dataItem=JSON.parse(localStorage.getItem('pro'));
        var item1=dataItem[0];
        var item2=dataItem[1].replace("优惠券","");
        var item3=dataItem[2];
        var item4=dataItem[3];
        $("#header .discount .money>i").html((item3*1-3)/2+3);
        $("#aboutItem .left>img").attr("src",item1);
        $("#aboutItem .right>p").eq(0).html(item2);
        $("#aboutItem .right .money i").html((item3*1-3)/2);
        $("#aboutItem .mon").html(item3);
        $("#aboutItem .right .deal i").html(item4);
    }
}