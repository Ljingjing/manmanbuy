$(function() {
    var mmb = new Manmanbuy();
    mmb.getCouponList();
});

var Manmanbuy = function() {

}
Manmanbuy.prototype = {
    // 获取优惠券的API
    getCouponList: function() {
        $.ajax({
            url: "http://localhost:9090/api/getcoupon",
            success: function(data) {
                console.log(data);
                var html = template('couponBrandTmp', data);
                $('#main .mui-row').html(html);
            }
        })
    }
}
