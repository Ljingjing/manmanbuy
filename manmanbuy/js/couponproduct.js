$(function () {
    var mmb = new Manmanbuy();
    mmb.getcouponproduct();
    mmb.slidePic();
    
    // console.log(params.indexOf('='));
    // params.replace(/[^0-9]/g,"");
    // console.log(couponid);
});
var Manmanbuy = function () {

}
var str = '';
Manmanbuy.prototype = {

    // 获取优惠券的API
    getcouponproduct: function () {
        var params=location.search;
    var n=params.indexOf('=');
    var couponid=params.substring(n+1,params.length);
        $.ajax({
            url: "http://localhost:9090/api/getcouponproduct",
            data: {
                "couponid":couponid
            },
            dataType: 'json',
            success: function (data) {
                str = data;
                // console.log(str.result[3].couponProductImg);
                console.log(data);
                var html = template('couponProduct', data);
                $('#main .mui-table-view').html(html);

                // var html1 = template('swiperProduct', data);
                // $('.swiper-container .swiper-slide').html(html1);
            }
        });
    },
    slidePic: function () {
        window.onload = function () {
            var liList = document.getElementsByClassName('mui-table-view-cell');
            // console.log(liList.length);
            for (var i = 0; i < liList.length; i++) {
                // 给每一个li添加索引
                liList[i].index = i;
                // console.log(liList[i].index);
                liList[i].onclick = function (e) {
                    document.querySelector('.mask').style.display = 'block';
                    document.querySelector('.swiper-container').style.display = 'block';
                    var li = e.target.parentNode.parentNode.parentNode;

                    for (var i = 0; i < 4; i++) {
                        var divHtml = "<div class='swiper-slide'>";
                        divHtml += str.result[li.index].couponProductImg;
                        divHtml += "</div>";
                        // console.log(divHtml);
                        $('.swiper-wrapper').append(divHtml);
                    }
                }
                document.querySelector('.mask').onclick=function(){
                    document.querySelector('.mask').style.display = 'none';
                    document.querySelector('.swiper-container').style.display = 'none';
                    $('.swiper-wrapper').empty();
                }


            };
            // 初始化轮播图
            var swiper = new Swiper('.swiper-container', {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                
                loop: true,
                observer: true,
                observerParents: true,
                speed:100,
                autoplay:true
            });
        }
    }


}