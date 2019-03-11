$.ajax({
    url:'http://localhost:9090/api/getsitenav',
    success:function (obj) { 
        console.log(obj);
        var html = template('tpl',obj);
        console.log(html);
        $('#main .box').html(html);
     }
})