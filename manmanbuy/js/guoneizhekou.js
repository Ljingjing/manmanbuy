window.addEventListener('load', function () {
    var gnZheKou = new GnZheKou();
    gnZheKou.headerNavSlide();
    gnZheKou.requestProduct();
    gnZheKou.headerNavClick();

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

    //请求商品数据
    requestProduct: function () {
        function reques() {
            $.ajax({
                url: 'http://localhost:9090/api/getinlanddiscount',
                success: function (data) {
                    // var html = template('navTpl', data);
                    
                    var ul = '';
                    for (var i = 0; i < data.result.length; i++) {
                        if (data.result[i].productImg.indexOf('amp;') == -1) {
                            ul += "<li><a href='guoneixiangqing.html?productid=" + data.result[i].productId + "'><img class='lazyload' src='' alt='' data-src='" + data.result[i].productImg.replace(data.result[i].productImg.slice(data.result[i].productImg.indexOf('alt') - 2), '').replace(data.result[i].productImg.slice(0, data.result[i].productImg.indexOf('=') + 2), '') + "'><p class='title'>" + data.result[i].productName + "</p><div class='subtit'>" + data.result[i].productPrice + "</div><span class='info'>" + data.result[i].productFrom + "|" + data.result[i].productTime + "</span></a></li>";
                        } else {
                            ul += "<li><a href='guoneixiangqing.html?productid=" + data.result[i].productId + "'><img class='lazyload' src='' alt='' data-src='" + data.result[i].productImg.replace(data.result[i].productImg.slice(data.result[i].productImg.indexOf('alt') - 2), '').replace(data.result[i].productImg.slice(0, data.result[i].productImg.indexOf('=') + 2), '').replace(
                                data.result[i].productImg.replace(data.result[i].productImg.slice(data.result[i].productImg.indexOf('alt') - 2), '').replace(data.result[i].productImg.slice(0, data.result[i].productImg.indexOf('=') + 2), '').slice(
                                    data.result[i].productImg.replace(data.result[i].productImg.slice(data.result[i].productImg.indexOf('alt') - 2), '').replace(data.result[i].productImg.slice(0, data.result[i].productImg.indexOf('=') + 2), '').indexOf('&') + 1, data.result[i].productImg.replace(data.result[i].productImg.slice(data.result[i].productImg.indexOf('alt') - 2), '').replace(data.result[i].productImg.slice(0, data.result[i].productImg.indexOf('=') + 2), '').indexOf(';') + 1), '') + "'><p class='title'>" + data.result[i].productName + "</p><div class='subtit'>" + data.result[i].productPrice + "</div><span class='info'>" + data.result[i].productFrom + "|" + data.result[i].productTime + "</span></a></li>"
                        }
                    }
                    $("#main ul").append(ul);

                    //懒加载
                    var imgArr = document.querySelectorAll('#one img')
                    // console.log(imgArr);
                    var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历
                    lazyLoad(); 
                    window.onscroll = lazyLoad; //监听页面滚动事件
                    function lazyLoad() {
                        var seeHeight = document.documentElement.clientHeight; //可见区域高度
                        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop; //滚动条距离顶部高度
                        for (var i = n; i < imgArr.length; i++) {
                            //判断图片距离页面顶部的位置是否小于屏幕可见高度+页面滚动高度，即元素是否从下滚动到眼球可见位置
                            if (imgArr[i].offsetTop < seeHeight + scrollTop - 150) {
                                if (imgArr[i].getAttribute('src') == '') {
                                    imgArr[i].src = imgArr[i].getAttribute('data-src');
                                }
                                n = i + 1;
                            }
                        }
                    };
                }
            });
        }
        reques();
        $(window).scroll(function () {
                //滚动条的滚动高度，不可见的部分 + 窗口，可见部分的高度
                var height = $(this).scrollTop() + $(window).height();
                //整个文档的高度，（可见+不可见)
                var sumHeight = $(document).height();
                if (height == sumHeight) {
                    $('#footer .upload').show()
                    reques();
                }else {
                $('#footer .upload').hide()
                }
            });      
    }
    
}




