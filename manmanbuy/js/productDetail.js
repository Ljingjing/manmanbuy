$(function () {
    var mmb = new Mmb();
    mmb.loadProductList();
    mmb.loadProductCity();
    mmb.publishComment();
});

var Mmb = function () {

};
Mmb.prototype = {

    loadProductList: function () {
        that = this;
        var id = that.getQueryString("productid");
        $.ajax({
            url: "http://localhost:9090/api/getmoneyctrlproduct",
            data: { productid: id },
            success: function (data) {
                console.log(data);
                var productHtml = template("productTmp", data);
                $("#main .productInfo").html(productHtml);
            }
        })
    },
    loadProductCity: function () {
        $("#main .productInfo").on("tap", ".goBuy", function () {
            var productid = $(this).data("id");
            $.ajax({
                url: "http://localhost:9090/api/getmoneyctrlproduct",
                data: { productid: productid },
                success: function (data) {
                    console.log(data);

                    var productCityHtml = template("cityTmp", data);
                    $("#main .productCity").append(productCityHtml);

                }
            })

        })
    },

    publishComment: function () {
        var that = this;
        var id = that.getQueryString("productid");
        $.ajax({
            url: "http://localhost:9090/api/getmoneyctrlproduct",
            data: { productid: id },
            success: function (data) {
                console.log(data);
                $("#main .comment").html(data.result[0].productComment);
            }
        })

    },
    //专门获取地址栏参数的方法
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

}