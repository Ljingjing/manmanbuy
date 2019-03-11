$(function () {
      var mmb = new MMB();
      mmb.getmoneyctrlproduct()

});

var MMB = function () {

};
MMB.prototype = {
      baseURL: 'http://localhost:9090/api/',

      getmoneyctrlproduct: function () {
            // console.log(location.href);
            var arr1 = (location.href).split('=');
            // console.log(arr2);
            var arr2 = arr1[1];
            console.log(arr2);

            // console.log(this.baseURL);
            $.ajax({
                  // type:'get',
                  url: this.baseURL + 'getmoneyctrlproduct',
                  data: {
                        productid: arr2
                  },
                  dataType: "json",
                  success: function (obj) {
                        console.log(obj.result[0].productComCount);
                        var html1 = '<div class="smallPc">'+
                        '<a href="#">'+  
                             '' +obj.result[0].productImgSm+''+
                       '</a>'+
              '    </div>'  +
                  '<p class="coment">'+obj.result[0].productFrom+' | '+obj.result[0].productTime+' | '+obj.result[0].productTips+''  +
                  '   <a href="#">'+obj.result[0].productComCount+'</a>'  +
                  '   </p>'  +
                  '   <h4>'+obj.result[0].productName+'</h4>'  +
                  '  <h3>'+obj.result[0].productPinkage+'</h3>'  +
                  '  <button type="button" class="mui-btn mui-btn-outlined">直达链接</button>'  +
                  '  <p class="cont">'  +
                  '   '+obj.result[0].productInfo2+'</p>'+
      
                  '  <p class="cont">天猫商城目前售价39.9元，可领一张10元优惠券，实付29.9元包邮，近期好价，需要可入~</p>'  +
                  '' +obj.result[0].productImg2+'';
                        // console.log(html1);
                        $('#contian').html(html1);

                  var data = obj.result[0];
                  // console.log(data.productComment);
                  $('#comment').html(data.productComment);
                        var html2 = template('getHottpl',obj);
                        console.log(html2);
                        
                  }
            })


      },
}