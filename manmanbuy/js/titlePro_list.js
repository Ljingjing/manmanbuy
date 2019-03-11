$(function () {
    var MMb_titlePro = new MMB_titlePro();
    // 显示和隐藏menu
    MMb_titlePro.listMenu();
    // 动态获取各标题中商品的数据
    MMb_titlePro.getTitleSell();
    // 动态获取隐藏菜单的数据
    MMb_titlePro.getTitle();

})



var MMB_titlePro = function () {}
MMB_titlePro.prototype = {
    dateURL: "http://localhost:9090/api/",
    listMenu: function () {
        $('#header .icon-xiala').on("click", function () {
            $('#table_list').show();
        })
        $(".category_close").on("click", function () {
            $('#table_list').hide();
        })
    },

    getTitleSell: function () {
        var that = this;
        $titleid = window.location.search.slice(4);
        $titleList =["全部","热销","9.9包邮","19块邮","数码家电","居家","美食","男装","女装","鞋包配饰","文体","母婴","美妆"];
        $("#header .topTitle").html($titleList[$titleid]);
        ajaxRequest($titleid);
        $list=[];
        $list.push(parseInt($titleid));
        $listNew=[];
        
        for($i=0;$i<Infinity;$i++){
            $randomNum=Math.ceil(Math.random()*11);
            $list.push($randomNum);
            for( $j=0;$j<$list.length;$j++){
                if($listNew.indexOf($list[$j])==-1){
                    $listNew.push($list[$j]);
                } 
            }
            if($listNew.length == 4){
                break;    
            }
        }

        console.log($listNew);
        $(".title>a").on("click", function () {
            $(this).addClass("active").siblings().removeClass('active');
            $indx=$listNew[$(this).index()];
            $titleid = $indx;
            console.log($titleid);
            
            ajaxRequest($titleid);
        })

        function ajaxRequest($titleid) {
            $.ajax({
                url: that.dateURL + "getbaicaijiaproduct",
                data: {
                    titleid: $titleid
                },
                success: function (obj) {
                    var html = template("hotPro-tpl", obj);
                    $(".content").html(html);
                    $('#main .test-lazyload').picLazyLoad({
                        threshold: 50,
                    });



                    $('#main .content li').on('click',function () {
                        var imgs=$(this).find('img').attr('src');
                        var titleN=$(this).find('p').html();
                        var mon = $(this).find('.money i').html();
                        var dataB=[imgs,titleN,mon];
                        localStorage.setItem('detailPro',JSON.stringify(dataB));
                        window.location.href="../goodsDetails.html";
                    })
                }
            })
        }
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

}