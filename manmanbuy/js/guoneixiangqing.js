window.addEventListener('load', function () {
    var gnZheKou = new GnZheKou();
    gnZheKou.headerNavSlide();
    gnZheKou.headerNavClick();
    gnZheKou.requestDetails();

});


var GnZheKou = function () {

}

GnZheKou.prototype = {
    // 导航栏滑动效果
    headerNavSlide: function () {
        var swiper = new Swiper('.header-nav .swiper-container', {
            direction: 'horizontal',
            slidesPerView: 'auto',
            freeMode: true,
        });
    },
    //导航栏的点击事件 
    headerNavClick: function () {
        $('#header .swiper-slide li').click(function () {
            $('#header .swiper-slide li').removeClass('active');
            $(this).addClass('active');
        });
    },
    //请求商品详情
    requestDetails: function() {
        var productId = location.search.substring(11);
        // console.log(productId);
        $.ajax({
            url:'http://localhost:9090/api/getdiscountproduct',
            data: { productid : productId },
            success: function(data) {
                // console.log(data);
                var html = template('detailTpl',data);
                $('.container form').html(html);
                var html2 = template('locationTpl',data);
                $('#footer .location').html(html2);
            }
        });
    } 

}