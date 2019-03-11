$(function () {
    var MMb_etam = new MMB_etam();
    // 轮播图
    MMb_etam.getSlider();
    // 横向滑动
    MMb_etam.getSwiper();
    // 头部菜单的隐藏和显示
    MMb_etam.listMenu();
    // 动态获取隐藏菜单的分类标题数据
    MMb_etam.getTitle();
    // 动态获取页面中超级人气榜的数据
    MMb_etam.getCampusList();
    // 动态获取页面中的优惠商品数据
    MMb_etam.getDiscountPro();
    
    window.MMb_etam = MMb_etam;

})

var MMB_etam = function () {}
MMB_etam.prototype = {
    dateURL: "http://localhost:9090/api/",
    getSlider: function () {
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
    },
    getSwiper: function () {
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            freeMode: true,
            direction: 'horizontal',
            // setWrapperSize: true,
        })
    },
    listMenu: function () {
        $('#header .icon').on("click", function () {
            $('#table_list').show();

        })
        $(".category_close").on("click", function () {
            $('#table_list').hide();
        })
    },
    getTitle: function () {
        $.ajax({
            url: this.dateURL + "getbaicaijiatitle",
            success: function (obj) {
                var html = template("getTitle-tpl", obj);
                $('#table_list .mui-row').html(html);

            }
        })
    },
    getCampusList: function () {
        $.ajax({
            url: this.dateURL + "getcouponproduct",
            data: {
                couponid: 0
            },
            success: function (obj) {
                console.log(obj);
                var html = template("campusList-tpl", obj);
                $('#hot .swiper-slide >ul').html(html);
               
                // 点击每个商品将商品信息存储到本地
                $("#hot .swiper-slide >ul>li").on('click', function () {
                    var img = $(this).find('img').attr('src');
                    var titleName = $(this).find('p.titleName').html();
                    var saleMon = $(this).find('.top i').html();
                    var totalSell=$(this).find(".top em").html();
                    var arr=[img,titleName,saleMon,totalSell];
                    localStorage.setItem('pro',JSON.stringify(arr));
                    window.location.href="../discountCoup.html";
                })
            }
        })
    },
    getDiscountPro: function () {
        $.ajax({
            url: this.dateURL + "getbaicaijiaproduct",
            data: {
                titleid: 1
            },
            success: function (obj) {
                console.log(obj);
                var html = template("discountPro-tpl", obj);
                $("#main .content>ul").html(html);
                $('#main .test-lazyload').picLazyLoad({
                    threshold: 50,
                });

                $('#products .content li').on('click',function () {
                    var imgs=$(this).find('img').attr('src');
                    var titleN=$(this).find('p').html();
                    var mon = $(this).find('.money i').html();
                    var dataB=[imgs,titleN,mon];
                    localStorage.setItem('detailPro',JSON.stringify(dataB));
                    window.location.href="../goodsDetails.html";
                })
            }
        })
    },

}