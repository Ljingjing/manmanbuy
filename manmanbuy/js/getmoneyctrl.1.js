$(function(){
      var mmb = new MMB();
      var currentPage;
      mmb.getmoneyctrl(1);
      mmb.changeyema();
      mmb.lastfenye();
      mmb.nextfenye();
});

var MMB=function(){
      
};
MMB.prototype = {
      baseURL:'http://localhost:9090/api/',

      getmoneyctrl:function(pageid){
            // console.log(this.baseURL);
            $.ajax({
                  url:this.baseURL+'getmoneyctrl',
                  data:{pageid:pageid},
                  dataType:"json",
                  success:function(obj){
                        // console.log(obj);
                        var html = template('getMoneyCtrltpl',obj);
                        // console.log(html);
                        $('#contain').html(html); 
                        var totalPage = Math.ceil(obj.totalCount/obj.pagesize);
                        // console.log(totalPage);
                        var html2 =template('getMoneyCPagetpl',{totalPage:totalPage});
                        // console.log(html2);
                        $('#page').html(html2);
                        var x = document.getElementById("pageList");
                        x.selectedIndex = -1;
                        currentPage=pageid;
                        $(window).scrollTop(0);                                     
                  }
            })
            

      },
      //分页选择
      changeyema:function(){
            var that =this;
            $('#page').on('change','#pageList',function(){
                  that.getmoneyctrl(this.value);
                  currentPage=this.value;          
            });
      },
      lastfenye:function(){
            var that =this
            $('#page').on('click','#last',function(){
                 
            //      console.log(window.location.search);
            var page1 = currentPage -1;
                  console.log(currentPage);
                 if(page1>0){
                  that.getmoneyctrl(page1);
                 }else{
                       alert('已经是第一页');
                 }
                 currentPage =currentPage -1;
            })
            
      },
      nextfenye:function(){
            var that= this;
            $('#page').on('click','#next',function(){
                  // alert(window.location.search);
                  var arr1 =window.location.search.split('=');
                  // console.log(arr1[1]);
                  var page1 = currentPage +1;
            //      console.log(page1);                
                 if(page1>0&& page1<16){
                  that.getmoneyctrl(page1);
                  // window.location.href="http://127.0.0.1:5500/%E6%85%A2%E6%85%A2%E4%B9%B0%E9%A1%B9%E7%9B%AE/manmanbuy/moneyctrl.html?tPage="+page1+"";               
                 }else if(page1>=15){
                  // window.location.href="http://127.0.0.1:5500/%E6%85%A2%E6%85%A2%E4%B9%B0%E9%A1%B9%E7%9B%AE/manmanbuy/moneyctrl.html?tPage="+15+"";
                  alert('已经是第最后一页');
                 }else{
                  currentPage=1;
                  that.getmoneyctrl(currentPage+1);
                  // window.location.href="http://127.0.0.1:5500/%E6%85%A2%E6%85%A2%E4%B9%B0%E9%A1%B9%E7%9B%AE/manmanbuy/moneyctrl.html?tPage="+2+"";
                 }
                 currentPage =currentPage +1;
            })
      }
}
