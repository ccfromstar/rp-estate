_checkIE();

function _checkIE(){
    var browser=navigator.appName; 
    var b_version=navigator.appVersion; 
    if(b_version.indexOf(';') == -1){
        return false;
    }
    var version=b_version.split(";"); 
    var trim_Version=version[1].replace(/[ ]/g,""); 
    if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE6.0") { 
        //alert("IE 6.0"); 
        _showNotAllow();
    } else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0") { 
        //alert("IE 7.0"); window.location.href="http://xxxx.com";
        _showNotAllow();
    } else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0") { 
        //alert("IE 8.0"); 
        _showNotAllow();
    } else if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0") { 
        //alert("IE 9.0"); 
        _showNotAllow();
    }else{
        //your code goes here
    }
}

function _showNotAllow(){
    alert("对不起，您的浏览器版本过低，请升级IE或改用其他浏览器访问！");
    window.location = "/page/ieupdate.html";
}

function toLocation(page){
    window.location = page;
}

var url = window.location.href;

function login(i) {
    if($("#login_name").val()==""){
        $.alert({title: '提示信息',content: '手机号码必填！'});return false;
    }
    if($("#pwd").val()==""){
        $.alert({title: '提示信息',content: '登陆密码必填！'});return false;
    }

    //判断是否记住
    if(document.getElementById("txtRememberKey").checked){
        setCookie("username",document.getElementById("login_name").value,30);
        setCookie("password",document.getElementById("pwd").value,30);
        setCookie("remember",document.getElementById("txtRememberKey").checked,30);
    }else{
        deleteCookie("username");
        deleteCookie("password");
        deleteCookie("remember");
    }
    $.ajax({ type:"POST" , url: "/role/chekuserlogin", data:{
        username:$("#login_name").val(),
        password:$("#pwd").val()
        }, success: function(data){
        if(data==200){
            $('#loginModal').modal('hide');
            if(i == 0){
                toLocation("/");  
            }else if(i == 2){
                var key = $("#address_s").val();
                toLocation("booking?p="+key);    
            }else{
                toLocation("booking");    
            }
            
        }else{
            $.alert({title: '提示信息',content: '手机号或密码错误！'});return false;
        }
    }});
}

function showlogin(i){
    //是否记住用户名，密码
    var remember = getCookie("remember");
    if (remember) {
        $("#login_name").val(getCookie("username"));
        $("#pwd").val(getCookie("password"));
        $("#txtRememberKey").attr("checked","checked");
    }
    if(i == 0){
        $("#login1").attr("onclick","login(0)");
    }else if(i == 2){
        $("#login1").attr("onclick","login(2)");
    }else{
        $("#login1").attr("onclick","login(1)");
    }
    
    $('#loginModal').modal('show');
}