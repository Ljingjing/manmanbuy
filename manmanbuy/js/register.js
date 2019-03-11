$(function() {
    $('#mpanel1').codeVerify({

        width : '66px',
        height : '38px',
        fontSize : '18px',
        codeLength : 4,
        ready : function() {
        },
        success : function() {
            alert('验证匹配！');
        },
        error : function() {
            alert('验证码不匹配！');
        }
        
    });
});