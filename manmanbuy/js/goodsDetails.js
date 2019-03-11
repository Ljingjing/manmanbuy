$(function () {
    var MMb_detail = new MMB_detail();
    // 当滚出去一定距离时,头部变化
    MMb_detail.headVariate();
    // 点击样式改变
    MMb_detail.unlineChange();
    // 从本地存储中获取数据
    MMb_detail.getproDetail();
})

var MMB_detail = function () {}
MMB_detail.prototype = {
    headVariate: function () {
        $(window).on('scroll', function () {
            // // 滚出去的距离
            var scrollInstan = $(window).scrollTop();
            if (scrollInstan > $('#header').height()) {
                $('#header').css("background-color", "#fff");
                $('header .startHead').hide();
                $('header .laterHead').show();
            } else {
                $('#header').css("background-color", "rgba(255,255,255,0)");
                $('header .laterHead').hide();
                $('header .startHead').show();
            }
        })

    },

    unlineChange: function () {
        $('.laterHead ul>li').on("click", function () {
            $(this).addClass('active').siblings().removeClass('active');
        })
    },

    getproDetail: function () {
        var dataItem = JSON.parse(localStorage.getItem('detailPro'));
        $("#banner .tmbanner>img").attr('src', dataItem[0]);
        $("#banner .recommend>p").html(dataItem[1]);
        $("#banner .recommend .sale i").html(dataItem[2]);
    }
}