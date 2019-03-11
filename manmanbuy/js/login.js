$(function () {
    var gnZheKou = new GnZheKou();
    gnZheKou.usersLogin();


});


var GnZheKou = function () {

}

GnZheKou.prototype = {
    //登录判断是否为空
    usersLogin: function () {
        document.getElementById('btn').onclick=function(){
            var usName = document.getElementById('userName');
            var pwd = document.getElementById('password');
            if(usName.value||pwd.value == '') {
                document.getElementById('wrong').style.display = "block";
            }else {
                document.getElementById('wrong').style.display = "none"; 
            } 
        };

    }
}