$(function(){
	var brand=new Brand();
	brand.getBrandTitle();
	
	toTop();
})
var Brand=function(){

}
Brand.prototype={
	baseUrl:'http://localhost:9090/api/',
	getBrandTitle:function(){
		$.ajax({
			url:this.baseUrl+'getbrandtitle',
			success:function(data) {
				console.log(data);
				var html=template('getbrandtpl',data)
				$('#brandList ul').html(html);
			}
		})
	}
}
// 返回顶部
function toTop() {
	$('#footer .top a').eq(2).click(function(e){
     var e=e||window.event;
     e.preventDefault();
     document.body.scrollTop=0;
   
	})
}
