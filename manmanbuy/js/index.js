$(function () {
    var mmb = new MMB();

    mmb.getIndexMenu();
    mmb.getMoneyCtrl();
    mmb.getMoreMenu();
    mmb.goToTop();
    mmb.toTop();
    mmb.saveProduct();
    // mmb.initScroll();
});

var MMB = function () {

}

MMB.prototype = {
    baseURL: "http://localhost:9090/api/",
    // 首页菜单栏api
    getIndexMenu: function () {
        $.ajax({
            url: this.baseURL + "getindexmenu",
            success: function (obj) {
                console.log(obj);
                var html = template('getindexmenuTpl', obj);
                $('#nav ul').html(html);
            }
        });
    },
    // 首页的折扣列表中的数据
    getMoneyCtrl: function () {
        $.ajax({
            url: this.baseURL + "getmoneyctrl",
            success: function (obj) {
                console.log(obj);
                var html = template('getmoneyctrlTpl', obj);
                $('#main .content ul').html(html);
            }
        });
    },
    // 点击更多，显示最后四个菜单
    getMoreMenu: function () {
        var flag = true;
        //因为数据是请求来的，类名是动态添加的，因此需要事件委托
        //jQuery中：
        // $('#id').siblings() //当前元素所有的兄弟节点
        // $('#id').prev() //当前元素前一个兄弟节点
        // $('#id').prevaAll() //当前元素之前所有的兄弟节点
        // $('#id').next() //当前元素之后第一个兄弟节点
        // $('#id').nextAll() //当前元素之后所有的兄弟节点
        $('#nav').on('tap', '.moremenu', function () {
            $(this).children().attr('href',"javascript:void(0);");//阻止跳转
            if (flag) {
                $(this).next().show().next().show().next().show().next().show();
                flag = false;
            } else {
                $(this).next().hide().next().hide().next().hide().next().hide();
                flag = true;
            }
        });
    },
    //回到顶部的小图标显示和隐藏
    goToTop: function () {
        window.addEventListener('scroll', function () {
            //获取滚动出去的高度
            var scrollTop = document.documentElement.scrollTop;
            if (scrollTop >= 300) {
                $('.foot_fixed .totop').show();
            } else {
                $('.foot_fixed .totop').hide();
            }
        });
    },
    //点击回到顶部
    toTop: function () {
        $('#footer .foot_fixed .totop').on('tap', function () {
            // console.log(1);
            //$("html,body").animate({scrollTop:0},500);//没有动画效果
            // document.body.scrollTop = document.documentElement.scrollTop = 0;////可实现，没有动画
            // $("html,body").scrollTop(0);//可实现，没有动画
            goTop();
        });
    },
    //滚动初始化函数
    initScroll:function(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration:0.0005
        });
    },
    //点击商品对象存入本地存储中
    saveProduct:function(){
        $('#main .content ul').on('tap','li',function(){
            // console.log($(this).children().children());
            var pic = $(this).children().children().children();
            var dec = $(this).children().children().children();
            // console.log($.trim($(dec[1]).html()).replace(/\s+/g,""));
            // console.log($(dec[1])[0]);
            // console.log($(dec[2])[0]);
            // console.log($.trim($(dec[2]).html()).replace(/\s+/g,""));
            var product = {
                productImg:pic[0].src,//img标签
                productTitle:$.trim($(dec[1]).html()),
                productOther:$.trim($(dec[2]).html()),
            };
            var productArray = JSON.parse(localStorage.getItem('historyproduct')) || [];
            productArray.unshift(product);
            //保证只能存入一个对象
            productArray.length = 1;
            console.log(productArray);
            localStorage.setItem('historyproduct',JSON.stringify(productArray));
        });
    }
}


//回到顶部封装的函数
function goTop(acceleration, time) {
    acceleration = acceleration || 0.1;
    time = time || 16;
    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var x3 = 0;
    var y3 = 0;
    if (document.documentElement) {
        x1 = document.documentElement.scrollLeft || 0;
        y1 = document.documentElement.scrollTop || 0;
    }
    if (document.body) {
        x2 = document.body.scrollLeft || 0;
        y2 = document.body.scrollTop || 0;
    }
    var x3 = window.scrollX || 0;
    var y3 = window.scrollY || 0;
    // 滚动条到页面顶部的水平距离
    var x = Math.max(x1, Math.max(x2, x3));
    // 滚动条到页面顶部的垂直距离
    var y = Math.max(y1, Math.max(y2, y3));
    // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
    var speed = 1 + acceleration;
    window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
    // 如果距离不为零, 继续调用迭代本函数
    if (x > 0 || y > 0) {
        var invokeFunction = "goTop(" + acceleration + ", " + time + ")";
        window.setTimeout(invokeFunction, time);
    }
}