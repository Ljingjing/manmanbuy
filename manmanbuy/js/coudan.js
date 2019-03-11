 $(function() {
    
    getgsshop();
    getgsshoparea();
    gsProductList({ "shopid": 0, "areaid": 0 });


});
   

  	function getgsshop () {
        $.ajax({
            url: "http://localhost:9090/api/" + "getgsshop",
            dataType: 'json',
            success: function(data) {
                // console.log(data);
                var html = template('gsShop', data);
                $('.popsort').html(html);
            },
        });

    }
    function getgsshoparea(data) {
        $.ajax({
            url: "http://localhost:9090/api/" + "getgsshoparea",
            success: function(data) {
                // console.log(data);
                var html = template('gsarea', data);
                $('.poparea').html(html);
            },

        });
    }

   function gsProductList(data) {
        $.ajax({
            url: "http://localhost:9090/api/" + "getgsproduct",
            data: { 'shopid': data.shopid || 0, 'areaid': data.areaid || 0 },
            success: function(data) {
                // console.log(data);
                var html = template('gsProductList', data);
                // console.log(html);
                $('.bd').html(html);
            }
        })
}



function delInpu(){
	if ($.trim($('.coudan-box .form .p input').val())!= '') {
		$('.coudan-box .form .p .a-delput').css('opacity','1');
	} else {
		$('.coudan-box .form .p .a-delput').css('opacity','0');
	}
}

function delInput() {
    if ($.trim($('.formsch input').val()) != '') {
        $('.formsch .a-delput').css('opacity', '1');
    } else {
        $('.formsch .a-delput').css('opacity', '0');
    }
}


function render() {
    $('.popfilter').width($('body').width());
    $('.coudan-box .list .pic img').width($(".coudan-box .list .pic").width());
    $('.coudan-box .list .pic img').height($(".coudan-box .list .pic").width());
    $('.popsearch input[type=search]').width($('body').width() - 116);
}
$(function(){

	
	$(".coudan-box .filter .a-filter").click(function(){
		$(this).parent().find('.popbox').toggle();
		$(this).toggleClass('on');
	})
	render();
	
	$(window).resize(function() {
		render();
	});
	
	$('.coudan-box .form .p .a-delput').click(function(){
		$(this).parent().find('input').attr('value','');
		$(this).css('opacity','0');
	})
    $('.formsch .a-delput').click(function () {

        $(this).parent().find('input').attr('value', '');
        $(this).css('opacity', '0');
    });
	$('.coudan-box .list .filter li').each(function(index){
		$(this).click(function(){
			$('.coudan-box .list .search').removeClass('on');
			$('.coudan-box .list .popsearch').hide();	
			$(this).toggleClass('on').siblings().removeClass("on");
			$(this).parent().parent().parent().find('.popbox').eq(index).toggleClass('on').siblings().removeClass("on");	
		})
	})
	$('.coudan-box .list .search').click(function(){
		$('.coudan-box .list .filter li').removeClass('on');
		$('.coudan-box .list .popbox').removeClass('on');
		$(this).toggleClass('on');
		$(this).parent().find('.popsearch').toggle();	
        if ($(".formsch input").val() != "") {
            $(".formsch .a-delput").css("opacity", "1");
        }
	})
})