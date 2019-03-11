
// 申明全局变量 
var productId ;
var productName;
var productImg;
var index1;
var index2;
var biaoti;


$(function() {
    var tenBrand = new TenBrand();
    tenBrand.getBrand();
    tenBrand.getBrandProductList();
    tenBrand.getProductCom();
   
   
})
var TenBrand = function() {

};

TenBrand.prototype = {
    baseUrl: 'http://localhost:9090/api/',
    // 获取brandtitleid 的方法
    brandtitleid: function() {
        var href = location.href;
        var brandtitleid;
        var id = href.substr(-2);
        if (id[0] != '=') {
            brandtitleid = id;
        } else {
            brandtitleid = id.substr(-1);
        }
        // 获取title= 在地址栏路径字符串的下标
         index1=href.indexOf('title=');
         // 获取& 在地址栏路径字符串的下标
         index2=href.indexOf('&');
        console.log(123,index1,index2);
        // 根据下标截取地址栏路径的brandtitleid
         biaoti=href.substring(index1+6, index2)
         // 转码成中文
         biaoti=decodeURI(biaoti);

        console.log(biaoti,decodeURI(biaoti));
        $('#nav >span').text(biaoti+'哪个牌子好');
       

        return brandtitleid;
    },
    // 获取十大品牌的方法
    getBrand: function() {

        $.ajax({
            url: this.baseUrl + 'getbrand',
            data: { brandtitleid: this.brandtitleid() },
            success: function(data) {
                data.biaoti=biaoti;
                var html = template('tenBrandtpl', data);
                console.log(1111111111);
                 console.log(html);
                 
                $('.brandList').html(html);
                console.log($('.brandList i'));
                // 修改前三个品牌的样式
                $('.brandList i').eq(0).css('backgroundColor', 'red');
                $('.brandList i').eq(1).css('backgroundColor', 'yellow');
                $('.brandList i').eq(2).css('backgroundColor', 'green');


            }
        })
    },
   // 获取销量前十的产品列表的方法
    getBrandProductList: function() {
        $.ajax({
            url: this.baseUrl + 'getbrandproductlist',
            async: false,
            data: { brandtitleid: this.brandtitleid(), pagesize: 5 },
            success: function(data) {
                 console.log(222,data);
                 // 判断是否获得数据
                 if(data.result[0]){
                    productId = data.result[0].productId;
                    console.log(333,productId);
                    productName=data.result[0].productName;
                    productImg=data.result[0].productImg;
                 }else{
                    ;
                 }
                
                 // 往data 对象中添加属性,模板中用到此属性
                data.biaoti=biaoti;
                var html = template('getBrandListtpl', data);
                $('#main>.sales').html(html);


            }
        })
    },
    // 获取销量第一的产品的用户评论
    getProductCom: function() {
        console.log(44444,productId);
        $.ajax({
            url: this.baseUrl + 'getproductcom',
            data: { productid: productId},
            success: function(data) {
                console.log(55555,data);
                // 往data 对象中添加属性,模板中用到的三个属性
                data.productName=productName;
                data.productImg=productImg;
                data.biaoti=biaoti;
                console.log(6666,data);
                var html = template('getproductcomtpl', data);
                $('#main>.comment').html(html);
            }
        })
    }

}
