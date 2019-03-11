$(function(){
    var product = new Product();
    product.getSaveData();
    product.initScroll();
});

var Product = function(){
} 
Product.prototype = {
    //获取本地存储的数据
    getSaveData:function(){
        var productArr = JSON.parse(localStorage.getItem('historyproduct')) || [];
        // console.log(productArr[0]);
        // console.log(productArr[0].productImg);
        // console.log(productArr[0].productTitle);
        // console.log(productArr[0].productOther);

        if(productArr.length >0){
            var productHTML = "<a href='javascript:void(0);'><div class='pic'><img src='"+ productArr[0].productImg +"' alt=''></div><div class='desc'><div class='title'>"+ productArr[0].productTitle.replace(/\s+/g,"") +" </div><div class='other'>"+  productArr[0].productOther +"</div></div></a>";
            $('.productOne').html(productHTML);
        }else{
            window.location.href = 'history.html';
        }
    },
        //初始化区域滚动
    initScroll: function() {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }
}