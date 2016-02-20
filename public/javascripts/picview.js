$(function(){
    var url = window.location.href;

    for(var i=0;i<500;i++){
        if($("#cx"+i).html()){
            var ht =  $("#cx"+i).html();
            ht = ht.replace(/&lt;/g,"<");
            ht = ht.replace(/&gt;/g,">");
            $("#cx"+i).html(ht);
        }
    }

    for(var i=0;i<500;i++){
        if($("#cxa"+i).html()){
            var ht =  $("#cxa"+i).html();
            ht = ht.replace(/&lt;/g,"<");
            ht = ht.replace(/&gt;/g,">");
            $("#cxa"+i).html(ht);
        }
    }

    var l1 = Number($("#divlen").val());
    if(l1<6){
        $("#jianpd").attr("src","images/right_1.png");
    }

    for(var i=5;i<100;i++){
        if($("#ppp"+i)){
            $("#ppp"+i).css("display","none");
        }
    }

    for(var i=6;i<1000;i++){
        if($("#tableid"+i)){
            $("#tableid"+i).css("display","none");
        }
    }

    if($("#txtPlace").html()){
        var comno = $("#txtPlace").val();

        var txth = "<option value='*'>全部</option>";
        var tmp1 = $("#x1").val().split(";");
        var tmp2 = $("#x2").val().split(";");
        var tmp3 = $("#x3").val().split(";");
        var tmp4 = $("#x4").val().split(";");

        for(var i=0;i<tmp2.length;i++){
            if(tmp2[i]==comno){
                for(var j=0;j<tmp3.length;j++){
                    if(tmp3[j]==tmp1[i]){
                        txth = txth + "<option value='"+tmp4[j]+"'>"+tmp4[j]+"</option>";
                    }
                }
            }
        }
        $("#txtPort").html(txth);
    }

    document.onselectstart = function(e) {
        //return false;
    }
    document.oncontextmenu = function(e) {
        //return false;
    }

    $("#pse1").change(function(){
          var pl = $("#pl").val();
          var u = 0;
          var tmpp = pl.split(";");
          var html1 = $("#plist1").html();
          var tmph =  html1.split("@");
          var newh = "";
          if($(this).val()=="1"){
              for(var i=1;i<tmpp.length;i++){
                  if(tmpp[i]!="电询"){
                      newh = newh + tmph[i-1];
                      u = u + 1;
                  }
              }
              $("#plist").html(newh);
          }else{
              for(var i=1;i<tmpp.length;i++){
                  if(tmpp[i]=="电询"){
                      newh = newh + tmph[i-1];
                      u = u + 1;
                  }
              }
              $("#plist").html(newh);
          }
          $("#totals").html(u);

    });

  var menulist = "";
  var txt = "";
  var h_1 = $("#homepage_div").css("height");

  var sid = "";
  var parentid = "";





    var tmpq = url.split("&q=");
    for(var i=0;i<100;i++){
        if($("#dat"+i)){
            if($("#dat"+i).html()==tmpq[1]){
                changetab('2');
                //alert(i);
                if(i>4 && i<10){

                    pageDown();
                }else if(i>9 && i<15){

                    pageDown();pageDown();
                }else if(i>14 && i<20){
                    pageDown();pageDown();pageDown();

                }else if(i>19){

                    pageDown();pageDown();pageDown();pageDown();
                }
                changeprice($("#aca"+i).html(),$("#acb"+i).html(),$("#acc"+i).html(),$("#acd"+i).html(),i,$("#ace"+i).html());
            }
        }
    }
    if(url.indexOf("&r=cx")>0){
        changetab('6');
    }

  if(url.indexOf("mycurise")>0){$("#m1").css("color","#41AFD2"); }
  else if(url.indexOf("destination")>0){$("#m2").css("color","#41AFD2"); }
  else if(url.indexOf("curisecompany")>0){$("#m3").css("color","#41AFD2"); }
    else if(url.indexOf("share")>0){$("#m5").css("color","#41AFD2"); }
  else if(url.indexOf("theme")>0){$("#m4").css("color","#41AFD2"); }
  else if(url.indexOf("sales")>0){$("#m6").css("color","#41AFD2"); }
  else if(url.indexOf("help")>0){$("#m7").css("color","#41AFD2"); }
  
  if(h_1){
    $("#myfoot").css("background-color","#FFFFFF");
    $("#myfoot_1").attr("src","images/homepage_footer_2.png");
    $("#myfoot_2").attr("src","images/homepage_footer_1.png");
  }
  $("#menu").css("display","none");
  $(".tdfooter_1").click(function(){
      if($(this).html()=="我的度假邮轮"){window.location="loading?page=mycurise";}
      else if($(this).html()=="邮轮度假目的地"){window.location="loading?page=destination";}
      else if($(this).html()=="邮轮公司荟萃"){window.location="loading?page=curisecompany";}
      else if($(this).html()=="邮轮度假主题"){window.location="loading?page=theme";}
      else if($(this).html()=="邮轮生活分享"){window.location="loading?page=share";}
      else if($(this).html()=="邮轮促销信息"){window.location="loading?page=sales";}
      else if($(this).html()=="帮助"){window.location="loading?page=help?p=a1";}
  });
    $(".port").hover(function(){
        $(this).css("color","#41AFD2");
    },function(){
        $(this).css("color","#F15A24");
    });

    $("#p13").hover(function(){
        $(this).css("background-image","url('/images/p13.png')").css("width","175px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","158px").css("height","154px");
    });

    $("#p12").hover(function(){
        $(this).css("background-image","url('/images/p12.png')").css("width","175px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","158px").css("height","154px");
    });

    $("#p11").hover(function(){
        $(this).css("background-image","url('/images/p11.png')").css("width","343px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","316px").css("height","154px");
    });

    $("#p10").hover(function(){
        $(this).css("background-image","url('/images/p10.png')").css("width","343px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","316px").css("height","154px");
    });

    $("#p9").hover(function(){
        $(this).css("background-image","url('/images/p9.png')").css("width","175px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","158px").css("height","154px");
    });

    $("#p8").hover(function(){
        $(this).css("background-image","url('/images/p8.png')").css("width","175px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","158px").css("height","154px");
    });

    $("#p7").hover(function(){
        $(this).css("background-image","url('/images/p7.png')").css("width","175px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","158px").css("height","154px");
    });

    $("#p6").hover(function(){
        $(this).css("background-image","url('/images/p6.png')").css("width","343px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","316px").css("height","154px");
    });

    $("#p3").hover(function(){
        $(this).css("background-image","url('/images/p3.png')").css("width","343px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","316px").css("height","154px");
    });

    $("#p4").hover(function(){
        $(this).css("background-image","url('/images/p4.png')").css("width","343px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","316px").css("height","154px");
    });

    $("#p5").hover(function(){
        $(this).css("background-image","url('/images/p5.png')").css("width","175px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","158px").css("height","154px");
    });

    $("#p2").hover(function(){
        $(this).css("background-image","url('/images/p2.png')").css("width","175px").css("height","170px");
    },function(){
        $(this).css("background-image","none").css("width","158px").css("height","154px");
    });

    $(".cx").hover(function(){
        $(this).css("color","#C6D92C");
    },function(){
        $(this).css("color","#DFDFDF");
    });

    $(".tohq").hover(function(){
        $(this).css("font-weight","bold");
    },function(){
        $(this).css("font-weight","normal");
    });

    $("#totop").hover(function(){
          $("#totop1").attr("src","images/to top_2.png");
    },function(){
          $("#totop1").attr("src","images/to top_1.png");
    });

    for(var i=1;i<100;i++){
       if($("#cxtableid"+i)){
           $("#cxtableid"+i).hover(function(){
               $(this).css("border-color","#F15A24");
           },function(){
               $(this).css("border-color","#DFDFDF");
           });
       }
    }

  $(".tdfooter_1").hover(function(){
            $(this).css("color","#41AFD2"); 
      if($(this).html()=="我的度假邮轮"){$("#menu").fadeOut();}
            else if($(this).html()=="邮轮促销信息"){$("#menu").fadeOut();}
      else{
        
        $("#menu").fadeIn();
        txt = "<div style='margin:0 auto;width:864px'><table height='25' border='0'><tr>";
        if($(this).html()=="邮轮度假目的地"){
          menulist = "地中海;欧洲;加勒比海;阿拉斯加;澳洲新西兰;日韩;东南亚;台湾;夏威夷;更多";
          sid = "hq";
          parentid = "destination";
        }else if($(this).html()=="邮轮公司荟萃"){
          menulist = "皇家加勒比;歌诗达邮轮;丽星邮轮;公主邮轮;NCL挪威邮轮;MSC地中海;水晶邮轮;更多";
          sid = "V0";
          parentid = "curisecompany";
        }else if($(this).html()=="邮轮度假主题"){
          menulist = "家庭邮轮;老年邮轮;奢华邮轮;会议邮轮;探险邮轮;环球邮轮;更多";
          sid = "the";
          parentid = "theme";
        }else if($(this).html()=="邮轮生活分享"){
          menulist = "邮轮入门;邮轮资讯;邮轮游记;邮轮视频";
          sid = "sha";
          parentid = "share";
        }else if($(this).html()=="帮助"){
          menulist = "关于我们;如何预订;常见问题;联系我们";
          sid = "hel";
          parentid = "help";
        }
        var tmp = menulist.split(";");
                if(sid=="sha"){
                    for(var i=0;i<tmp.length;i++){
                       txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=sharetheme_sec?id=S000"+(i+1)+"\"'>"+tmp[i]+"</td>";
                    }
                }else if(sid=="hel"){
                    for(var i=0;i<tmp.length;i++){
                        if(i==0){
                            txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=help?p=a1\"'>"+tmp[i]+"</td>";
                        }else if(i==1){
                            txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=help?p=a2\"'>"+tmp[i]+"</td>";
                        }else if(i==2){
                            txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=help?p=a3\"'>"+tmp[i]+"</td>";
                        }else if(i==3){
                            txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=help?p=a4\"'>"+tmp[i]+"</td>";
                        }

                    }
                }else if(sid=="the"){
                    for(var i=0;i<tmp.length;i++){
                        if(i == tmp.length-1){
                            txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page="+parentid+"\"'>"+tmp[i]+"</td>";
                        }else{
                       txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page=theme_sec?id=T000"+(i+1)+"\"'>"+tmp[i]+"</td>";
                        }
                    }
                }else{
                    for(var i=0;i<tmp.length;i++){
                        if(i == tmp.length-1){
                            txt = txt + "<td class='menu_2' onclick='window.location=\"loading?page="+parentid+"\"'>"+tmp[i]+"</td>";
                        }else{
                            txt = txt + "<td class='menu_2' onclick='clickmenu_2(\""+parentid+"\",\""+sid+(i+1)+"\")'>"+tmp[i]+"</td>";
                        }
                    }
                }
        txt = txt + "</tr></table></div>";
        $("#menu").html(txt);
      }
    },function(){
            $(this).css("color","#1A1A1A");  
      if(url.indexOf("mycurise")>0){$("#m1").css("color","#41AFD2"); }
  else if(url.indexOf("destination")>0){$("#m2").css("color","#41AFD2"); }
  else if(url.indexOf("curisecompany")>0){$("#m3").css("color","#41AFD2"); }
  else if(url.indexOf("theme")>0){$("#m4").css("color","#41AFD2"); }
  else if(url.indexOf("share")>0){$("#m5").css("color","#41AFD2"); }
  else if(url.indexOf("sales")>0){$("#m6").css("color","#41AFD2"); }
  else if(url.indexOf("help")>0){$("#m7").css("color","#41AFD2"); }
    });

    $("#txtCuriseCompany").change(function(){
        var comno = this.value;
        var txth = "<option value='*'>全部</option>";
        var tmp1 = $("#shipNo").val().split(";");
        var tmp2 = $("#shipName").val().split(";");
        var tmp3 = $("#shipComNo").val().split(";");
        for(var i=0;i<tmp3.length;i++){
             if(tmp3[i]==comno){
                 txth = txth + "<option value='"+tmp1[i]+"'>"+tmp2[i]+"</option>";
             }
        }
        $("#txtCurise").html(txth);
    });

    $("#txtPlace").change(function(){
        var comno = this.value;

        var txth = "<option value='*'>全部</option>";
        var tmp1 = $("#x1").val().split(";");
        var tmp2 = $("#x2").val().split(";");
        var tmp3 = $("#x3").val().split(";");
        var tmp4 = $("#x4").val().split(";");

        for(var i=0;i<tmp2.length;i++){
            if(tmp2[i]==comno){
                for(var j=0;j<tmp3.length;j++){
                    if(tmp3[j]==tmp1[i]){
                        txth = txth + "<option value='"+tmp4[j]+"'>"+tmp4[j]+"</option>";
                    }
                }
            }
        }
        $("#txtPort").html(txth);
    });

    $("#pse2").change(function(){
        if($(this).val()=="1"){
             $("#orderby1").val("1");
        }else{
             $("#orderby1").val("2");
        }
        document.forms[0].submit();
    });

  
  $("#btn_search").click(function(){
    $(this).attr("src","/images/searchbutton_2.png");
    document.forms[0].submit();
  });
  
  $("#btn_search_r").click(function(){
        document.all.numStart.value = "0";
    document.forms[0].submit();
  });
  
  $("#tohome").click(function(){
    window.location="/";
  });

    $("#login").click(function(){
        //if($("#txtUserName").val()=="huiyou" && $("#txtPwd").val()=="youlunshidai123"){
        //    window.location="admin";
        //}else{
        //    alert("用户名密码错误！");$("#txtUserName").val("");$("#txtPwd").val("");
        //}
    });
  
  $("#btn_search").hover(function(){
       $(this).attr("src","/images/searchbutton_2.png");
  },function(){
           $(this).attr("src","/images/searchbutton_1.png");
    });

    var png1 = "images/map_location_shinning.png";
    var png2 = "images/map_location.png";


        $("#pointDZH1").hover(function(){
            $("#pd1").attr("src",png1);
            //$(this).css("color","#FFFFFF");
            $("#pointDZH1").addClass("pointmap1");
        },function(){
            $("#pd1").attr("src",png2);
            $("#pointDZH1").removeClass("pointmap1");
        });

    $("#pointDZH2").hover(function(){
        $("#pd2").attr("src",png1);
        //$(this).css("color","#FFFFFF");
        $("#pointDZH2").addClass("pointmap1");
    },function(){
        $("#pd2").attr("src",png2);
        $("#pointDZH2").removeClass("pointmap1");
    });

    $("#pointDZH3").hover(function(){
        $("#pd3").attr("src",png1);
        //$(this).css("color","#FFFFFF");
        $("#pointDZH3").addClass("pointmap1");
    },function(){
        $("#pd3").attr("src",png2);
        $("#pointDZH3").removeClass("pointmap1");
    });

    $("#pointDZH4").hover(function(){
        $("#pd4").attr("src",png1);
        //$(this).css("color","#FFFFFF");
        $("#pointDZH4").addClass("pointmap1");
    },function(){
        $("#pd4").attr("src",png2);
        $("#pointDZH4").removeClass("pointmap1");
    });

    $("#pointDZH5").hover(function(){
        $("#pd5").attr("src",png1);
        //$(this).css("color","#FFFFFF");
        $("#pointDZH5").addClass("pointmap1");
    },function(){
        $("#pd5").attr("src",png2);
        $("#pointDZH5").removeClass("pointmap1");
    });

    $("#pointDZH6").hover(function(){
        $("#pd6").attr("src",png1);
        //$(this).css("color","#FFFFFF");
        $("#pointDZH6").addClass("pointmap1");
    },function(){
        $("#pd6").attr("src",png2);
        $("#pointDZH6").removeClass("pointmap1");
    });

    $("#pointDZH7").hover(function(){
        $("#pd7").attr("src",png1);
        //$(this).css("color","#FFFFFF");
        $("#pointDZH7").addClass("pointmap1");
    },function(){
        $("#pd7").attr("src",png2);
        $("#pointDZH7").removeClass("pointmap1");
    });

    $("#pointDZH8").hover(function(){
        $("#pd8").attr("src",png1);
        //$(this).css("color","#FFFFFF");
        $("#pointDZH8").addClass("pointmap1");
    },function(){
        $("#pd8").attr("src",png2);
        $("#pointDZH8").removeClass("pointmap1");
    });

    $("#pointDZH9").hover(function(){
        $("#pd9").attr("src",png1);
        //$(this).css("color","#FFFFFF");
        $("#pointDZH9").addClass("pointmap1");
    },function(){
        $("#pd9").attr("src",png2);
        $("#pointDZH9").removeClass("pointmap1");
    });


  
  $("#changetab_1").click(function(){
    $("#form_szq").css("background-image","url(/images/searchbox_china.png)");
  });
  
  $("#changetab_2").click(function(){
    $("#form_szq").css("background-image","url(/images/searchbox_global.png)");
  });


  var winlen = $(window).width();
    if(url.indexOf("curiseship")>0){
        $("#focus ul li img").css("width",650).css("height",366);
        $("#focus").css("width",650).css("height",366);
        $(".preNext next").css("top",150);
    }else if(url.indexOf("curisecship_sec")>0){
        $("#focus ul li img").css("width",864).css("height",380);
        $("#focus").css("width",864).css("height",380);
        $(".preNext next").css("top",150);
    }else{
      $("#focus").css("width",winlen);
      $("#focus ul li img").css("width",winlen);
    }
  $("#destion").css("width",winlen);
  $("#show_1").css("left",(winlen-950)/2);
  $("#form_1").css("left",(winlen-950)/2+5);
  $("#menu_path").css("left",(winlen-950)/2+50);
  $("#form_2").css("left",(winlen-318)/2);
  
  
  var sWidth = $("#focus").width(); //获取焦点图的宽度（显示面积）
  var len = $("#focus ul li").length; //获取焦点图个数
    var lengthd =  len/50;
  var index = 0;
    var indexd = 25;
  var picTimer;



    //$("#focus ul").css("left",-indexd*sWidth);

    setCookie("indexd",25);
    setCookie("label",0);

    if(url.indexOf("destination")>0){
        lengthd = len/100;
        indexd = 50;
        setCookie("indexd",50);
    }else if(url.indexOf("curisecompany")>0){
        lengthd = len/40;
        indexd = 20;
        setCookie("indexd",20);
    }else if(url.indexOf("theme")>0){
        lengthd = len/40;
        indexd = 20;
        setCookie("indexd",20);
    }

  //以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
  //var btn = "<div class='btnBg'></div>";
  var btn = "<div class='btn'>";
  for(var i=0; i < lengthd; i++) {
    btn += "<span></span>";
  }
  btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
  $("#focus").append(btn);
  $("#focus .btnBg").css("opacity",0.5);

  //为小按钮添加鼠标滑入事件，以显示相应的内容
  $("#focus .btn span").css("opacity",0.4).mouseover(function() {
    index = $("#focus .btn span").index(this);
        //indexd = $("#focus .btn span").index(this);
       //if(getCookie("indexd")){
        indexd = index + Number(getCookie("indexd"))*lengthd;
        //}else{
        //    indexd = index;
        //}
        if(Number(getCookie("label")) == 0){
            showPics1(index,indexd,lengthd,sWidth);
        }else{
            showPics(index,indexd,lengthd,sWidth);
        }


  }).eq(0).trigger("mouseover");

  //上一页、下一页按钮透明度处理
  $("#focus .preNext").css("opacity",0.4).hover(function() {
    $(this).stop(true,false).animate({"opacity":"0.5"},300);
  },function() {
    $(this).stop(true,false).animate({"opacity":"0.4"},300);
  });

  //上一页按钮
  $("#focus .pre").click(function() {
    index -= 1;
        indexd -= 1;
    if(index == -1) {index = lengthd - 1;}
        if(index == 499) {index = lengthd - 1;}

        //if(indexd < 0){alert("已经是第一张图片!");return false;}
    showPics(index,indexd,lengthd,sWidth);
  });

  //下一页按钮
  $("#focus .next").click(function() {
    index += 1;
        indexd += 1;
    if(index == lengthd) {index = 0;}
    showPics(index,indexd,lengthd,sWidth);
  });

  //本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
  $("#focus ul").css("width",sWidth * (len));


    var picTimer = setInterval(function() {
        if(indexd ==len){
            window.location.reload();
        }
        showPics(index,indexd,lengthd,sWidth);
        index++;
        indexd++;
        if(index == lengthd) {index = 0;}
    },5000); //此5000代表自动播放的间隔，单位：毫秒

  //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
    /*
  $("#focus").hover(function() {
    clearInterval(picTimer);
  },function() {
    picTimer = setInterval(function() {
            if(indexd ==len){
                window.location.reload();
            }
      showPics(index,indexd,lengthd,sWidth);
      index++;
            indexd++;
      if(index == lengthd) {index = 0;}
    },5000); //此5000代表自动播放的间隔，单位：毫秒
  }).trigger("mouseleave");
  */


  
  $(".btn").css("left",(winlen)/2-50);
  
  
  if(url.indexOf("destination")>0){
        menulist = "地中海;欧洲;加勒比海;阿拉斯加;澳洲新西兰;日韩;东南亚;台湾;夏威夷;更多";
        var sid = "hq";
        parentid = "destination";
        var tmp = menulist.split(";");
        txt = "<div style='margin:0 auto;width:864px'><table height='25' border='0'><tr>";
        for(var i=0;i<tmp.length;i++){
                    if(i == tmp.length-1){
                        txt = txt + "<td class='menu_2' onclick='window.location=\""+parentid+"\"'>"+tmp[i]+"</td>";
                    }else{
                        txt = txt + "<td class='menu_2' onclick='clickmenu_2(\""+parentid+"\",\""+sid+(i+1)+"\")'>"+tmp[i]+"</td>";
                    }

        }
        txt = txt + "</tr></table></div>";
        $("#menu").html(txt);
        $("#menu").fadeIn();
  }else if(url.indexOf("curisecompany")>0|url.indexOf("curisecship")>0){
        menulist = "皇家加勒比;歌诗达邮轮;丽星邮轮;公主邮轮;NCL挪威邮轮;MSC地中海;水晶邮轮;更多";
        var sid = "V0";
        parentid = "curisecompany";
        var tmp = menulist.split(";");
        txt = "<div style='margin:0 auto;width:864px'><table height='25' border='0'><tr>";
        for(var i=0;i<tmp.length;i++){
            if(i == tmp.length-1){
                txt = txt + "<td class='menu_2' onclick='window.location=\""+parentid+"\"'>"+tmp[i]+"</td>";
            }else{
                txt = txt + "<td class='menu_2' onclick='clickmenu_2(\""+parentid+"\",\""+sid+(i+1)+"\")'>"+tmp[i]+"</td>";
            }

        }
        txt = txt + "</tr></table></div>";
        $("#menu").html(txt);
        $("#menu").fadeIn();
    }else if(url.indexOf("share")>0){
        menulist = "邮轮入门;邮轮资讯;邮轮游记;邮轮视频";
        var sid = "sha";
        parentid = "share";
        var tmp = menulist.split(";");
        txt = "<div style='margin:0 auto;width:864px'><table height='25' border='0'><tr>";
        for(var i=0;i<tmp.length;i++){
            for(var i=0;i<tmp.length;i++){
                txt = txt + "<td class='menu_2' onclick='window.location=\"sharetheme_sec?id=S000"+(i+1)+"\"'>"+tmp[i]+"</td>";
            }
        }
        txt = txt + "</tr></table></div>";
        $("#menu").html(txt);
        $("#menu").fadeIn();
    }else if(url.indexOf("theme")>0){
        menulist = "家庭邮轮;老年邮轮;奢华邮轮;会议邮轮;探险邮轮;环球邮轮;更多";
        var sid = "the";
        parentid = "theme";
        var tmp = menulist.split(";");
        txt = "<div style='margin:0 auto;width:864px'><table height='25' border='0'><tr>";
        for(var i=0;i<tmp.length;i++){
            if(i == tmp.length-1){
                txt = txt + "<td class='menu_2' onclick='window.location=\""+parentid+"\"'>"+tmp[i]+"</td>";
            }else{
                txt = txt + "<td class='menu_2' onclick='window.location=\"theme_sec?id=T000"+(i+1)+"\"'>"+tmp[i]+"</td>";
            }
        }
        txt = txt + "</tr></table></div>";
        $("#menu").html(txt);
        $("#menu").fadeIn();
    }else if(url.indexOf("help")>0){
        menulist = "关于我们;如何预订;常见问题;联系我们";
        var sid = "hel";
        parentid = "help";
        var tmp = menulist.split(";");
        txt = "<div style='margin:0 auto;width:864px'><table height='25' border='0'><tr>";
        for(var i=0;i<tmp.length;i++){
            if(i==0){
                txt = txt + "<td class='menu_2' onclick='window.location=\"help?p=a1\"'>"+tmp[i]+"</td>";
            }else if(i==1){
                txt = txt + "<td class='menu_2' onclick='window.location=\"help?p=a2\"'>"+tmp[i]+"</td>";
            }else if(i==2){
                txt = txt + "<td class='menu_2' onclick='window.location=\"help?p=a3\"'>"+tmp[i]+"</td>";
            }else if(i==3){
                txt = txt + "<td class='menu_2' onclick='window.location=\"help?p=a4\"'>"+tmp[i]+"</td>";
            }

        }
        txt = txt + "</tr></table></div>";
        $("#menu").html(txt);
        $("#menu").fadeIn();
    }

    if($(".myp1").html()){
        var ht =  $(".myp1").html();
        ht = ht.replace(/&lt;/g,"<");
        ht = ht.replace(/&gt;/g,">");
        ht = ht.replace(/@/g,"<br/>&nbsp;&nbsp;&nbsp;&nbsp;");

        $(".myp1").html(ht);
    }

    if($(".myp2").html()){
        var ht =  $(".myp2").html();
        ht = ht.replace(/&lt;/g,"<");
        ht = ht.replace(/&gt;/g,">");
        ht = ht.replace(/@/g,"<br/>&nbsp;&nbsp;&nbsp;&nbsp;");

        $(".myp2").html(ht);
    }

    for(var i=0;i<500;i++){
        if($("#yjS000"+i).html()){
            var ht =  $("#yjS000"+i).html();
            ht = ht.replace(/&lt;/g,"<");
            ht = ht.replace(/&gt;/g,">");
            $("#yjS000"+i).html(ht);
        }
    }


    for(var k=0;k<3;k++){
    if($("#txtText_"+k).html()){
        var ht =  $("#txtText_"+k).html();
        //alert(ht);
        ht = ht.replace(/&lt;/g,"<");
        ht = ht.replace(/&gt;/g,">");
        $("#txtText_"+k).html(ht);
    }
    }



    if(url.indexOf("curiseship")>0){
        $(".preNext").css("top",150);
        $(".btn").css("left",275).css("top",15);
    }else if(url.indexOf("curisecship_sec")>0){
        $(".preNext").css("top",140);
        $(".btn").css("left",400);
    }

    for(var i=1;i<5;i++){
        if(url.indexOf("a"+i)>0){
            changetab(i);
        }
    }

    if($("#info").val()){
        if($("#info").val()!="null" && $("#info").val()!="undefined"){
            alert($("#info").val());
        }
    }
    if($("#infor").val()){
        if($("#infor").val()!="null" && $("#infor").val()!="undefined"){
            alert($("#infor").val());
            window.parent.closeAndReloadWin();
        }
    }
    if($("#userid").val()){
        if($("#userid").val()=="null" || $("#userid").val()=="undefined"){
            alert("用户身份验证失败，请重新登录！");
            window.location = "/";
        }
    }

});

//显示图片函数，根据接收的index值显示相应的内容
function showPics(index,indexd,lengthd,sWidth) { //普通切换
    //alert(Math.floor(indexd/lengthd));
    setCookie("indexd",Math.floor(indexd/lengthd));
    if($("#namelist").html()){
        //setCookie("indexd",indexd);
        var txt_dzh_cn = $("#namelist").html();
        var txt_dzh = $("#ennamelist").html();
        var tmp = txt_dzh.split(";");
        var tmp1 = txt_dzh_cn.split(";");
        $("#pname").html(tmp1[index]+"<br/><div class='pname_en'>"+tmp[index]+"</div>");
    }
    var nowLeft = -indexd*sWidth; //根据index值计算ul元素的left值
    $("#focus ul").stop(true,false).animate({"left":nowLeft},1500); //通过animate()调整ul元素滚动到计算出的position
    //$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
    $("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},1500); //为当前的按钮切换到选中的效果
}

function showPics1(index,indexd,lengthd,sWidth) { //普通切换
    //alert(Math.floor(indexd/lengthd));
    setCookie("indexd",Math.floor(indexd/lengthd));
    setCookie("label",1);
    if($("#namelist").html()){
        //setCookie("indexd",indexd);
        var txt_dzh_cn = $("#namelist").html();
        var txt_dzh = $("#ennamelist").html();
        var tmp = txt_dzh.split(";");
        var tmp1 = txt_dzh_cn.split(";");
        $("#pname").html(tmp1[index]+"<br/><div class='pname_en'>"+tmp[index]+"</div>");
    }
    var nowLeft = -indexd*sWidth; //根据index值计算ul元素的left值
    $("#focus ul").stop(true,false).animate({"left":nowLeft},100); //通过animate()调整ul元素滚动到计算出的position
    //$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
    $("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},1500); //为当前的按钮切换到选中的效果
}

function clickmenu_2(parent,id) {
  window.location = "loading?page="+parent+"/"+id;
}

function changetab(i){
  if(i=="1"){
    $("#tabl1").attr("class","tb1");$("#tab1").css("display","inline");
    $("#tabl2").attr("class","tb2");$("#tab2").css("display","none");
    $("#tabl3").attr("class","tb2");$("#tab3").css("display","none");
        $("#tabl4").attr("class","tb2");$("#tab4").css("display","none");
        $("#tabl5").attr("class","tb2");$("#tab5").css("display","none");
        $("#tabl6").attr("class","tb2");$("#tab6").css("display","none");
  }else if(i=="2"){
    $("#tabl2").attr("class","tb1");$("#tab2").css("display","inline");
    $("#tabl1").attr("class","tb2");$("#tab1").css("display","none");
    $("#tabl3").attr("class","tb2");$("#tab3").css("display","none");
        $("#tabl4").attr("class","tb2");$("#tab4").css("display","none");
        $("#tabl5").attr("class","tb2");$("#tab5").css("display","none");
        $("#tabl6").attr("class","tb2");$("#tab6").css("display","none");
  }else if(i=="3"){
    $("#tabl3").attr("class","tb1");$("#tab3").css("display","inline");
    $("#tabl2").attr("class","tb2");$("#tab2").css("display","none");
    $("#tabl1").attr("class","tb2");$("#tab1").css("display","none");
        $("#tabl4").attr("class","tb2");$("#tab4").css("display","none");
        $("#tabl5").attr("class","tb2");$("#tab5").css("display","none");
        $("#tabl6").attr("class","tb2");$("#tab6").css("display","none");
  }else if(i=="4"){
        $("#tabl3").attr("class","tb2");$("#tab3").css("display","none");
        $("#tabl2").attr("class","tb2");$("#tab2").css("display","none");
        $("#tabl1").attr("class","tb2");$("#tab1").css("display","none");
        $("#tabl4").attr("class","tb1");$("#tab4").css("display","inline");
        $("#tabl5").attr("class","tb2");$("#tab5").css("display","none");
        $("#tabl6").attr("class","tb2");$("#tab6").css("display","none");
    }else if(i=="5"){
        $("#tabl3").attr("class","tb2");$("#tab3").css("display","none");
        $("#tabl2").attr("class","tb2");$("#tab2").css("display","none");
        $("#tabl1").attr("class","tb2");$("#tab1").css("display","none");
        $("#tabl5").attr("class","tb1");$("#tab5").css("display","inline");
        $("#tabl4").attr("class","tb2");$("#tab4").css("display","none");
        $("#tabl6").attr("class","tb2");$("#tab6").css("display","none");
    }else if(i=="6"){
        $("#tabl3").attr("class","tb2");$("#tab3").css("display","none");
        $("#tabl2").attr("class","tb2");$("#tab2").css("display","none");
        $("#tabl1").attr("class","tb2");$("#tab1").css("display","none");
        $("#tabl5").attr("class","tb2");$("#tab5").css("display","none");
        $("#tabl4").attr("class","tb2");$("#tab4").css("display","none");
        $("#tabl6").attr("class","tb1");$("#tab6").css("display","inline");
    }
}

function CenterImgPlay() {
    this.list = $(".imgbox").children(":first").children();
    this.indexs = [];
    this.length = this.list.length;
    //图片显示时间
    this.timer = 3000;
    this.showTitle = $(".title");

    var index = 0, self = this, pre = 0, handid, isPlay = false, isPagerClick = false;

    this.Start = function () {
        this.Init();
        //计时器，用于定时轮播图片
        handid = setInterval(self.Play, this.timer);
    };
    //初始化
    this.Init = function () {
        var o = $(".pager ul li"), _i;

        for (var i = o.length - 1, n = 0; i >= 0; i--, n++) {
            this.indexs[n] = o.eq(i).click(self.PagerClick);
        }
    };
    this.Play = function () {
        isPlay = true;
        index++;
        if (index == self.length) {
            index = 0;
        }
        //先淡出，在回调函数中执行下一张淡入
        self.list.eq(pre).fadeOut(300, "linear", function () {
            var info = self.list.eq(index).fadeIn(500, "linear", function () {
                isPlay = false;
                if (isPagerClick) { handid = setInterval(self.Play, self.timer); isPagerClick = false; }
            }).attr("title");
            //显示标题
            self.showTitle.text(info);
            //图片序号背景更换
            self.indexs[index].css("background-color", "#FF70Ad");
            self.indexs[pre].css("background-color", "#6f4f67");

            pre = index;
        });
    };
    //图片序号点击
    this.PagerClick = function () {
        if (isPlay) { return; }
        isPagerClick = true;

        clearInterval(handid);

        var oPager = $(this), i = parseInt(oPager.text()) - 1;

        if (i != pre) {
            index = i - 1;
            self.Play();
        }
    };
};

function changeprice(p1,p2,p3,p4,p5,p6){
    changetab('2');
    for(var i=0;i<4;i++){
        $("#un"+i).html(p6);
        $("#unt"+i).html("/人起");
    }

    $("#jg0").html(p1);
    $("#jg1").html(p2);
    $("#jg2").html(p3);
    $("#jg3").html(p4);
    if(p1=="99999" || p1=="null" || p1=="0"){
        $("#jg0").html("电询");
        $("#un0").html("");
        $("#unt0").html("");
    }
    if(p2=="99999" || p2=="null" || p2=="0"){
        $("#jg1").html("电询");
        $("#un1").html("");
        $("#unt1").html("");
    }
    if(p3=="99999" || p3=="null" || p3=="0"){
        $("#jg2").html("电询");
        $("#un2").html("");
        $("#unt2").html("");
    }
    if(p4=="99999" || p4=="null" || p4=="0"){
        $("#jg3").html("电询");
        $("#un3").html("");
        $("#unt3").html("");
    }
    if(p1=="-1"){
        $("#jg0").html("售罄");
        $("#un0").html("");
        $("#unt0").html("");
    }
    if(p2=="-1"){
        $("#jg1").html("售罄");
        $("#un1").html("");
        $("#unt1").html("");
    }
    if(p3=="-1"){
        $("#jg2").html("售罄");
        $("#un2").html("");
        $("#unt2").html("");
    }
    if(p4=="-1"){
        $("#jg3").html("售罄");
        $("#un3").html("");
        $("#unt3").html("");
    }
    for(var i=0;i<100;i++){
        if($("#ppp"+i)){
            $("#ppp"+i).css("background-image","url('images/datebg_1.png')");
        }
    }
    $("#ppp"+p5).css("background-image","url('images/datebg_2.png')");
}

function pageDown(){
    var l1 = Number($("#divlen").val());
    var nowpage = Number($("#nowpage").val());
    nowpage = nowpage + 5;
    if(nowpage>=l1){
        $("#jianpd").attr("src","images/right_1.png");
        //alert("已到最前页!");
        return false;
    }
    $("#nowpage").val(nowpage);
    for(var i=0;i<100;i++){
        if($("#ppp"+i)){
            if(i>nowpage-1 && i<nowpage+5){
                $("#ppp"+i).css("display","inline-block");
            }else{
                $("#ppp"+i).css("display","none");
            }
        }
    }

    $("#jianpl").attr("src","images/left_2.png");
    $("#jianpd").attr("src","images/right_2.png");

    if(nowpage+5>=l1){
        $("#jianpd").attr("src","images/right_1.png");
    }
}

function pageUp(){
    var nowpage = Number($("#nowpage").val());
    $("#jianpl").attr("src","images/left_2.png");
    $("#jianpd").attr("src","images/right_2.png");
    var l1 = Number($("#divlen").val());
    if(nowpage == 0){
        $("#jianpl").attr("src","images/left_1.png");
        //alert("已到最前页!");
        if(nowpage+5>=l1){
            $("#jianpd").attr("src","images/right_1.png");
        }
        return false;
    }

    if(nowpage+5>=l1){
        $("#jianpd").attr("src","images/right_1.png");
    }
    nowpage = nowpage - 5;
    if(nowpage == 0){
        $("#jianpl").attr("src","images/left_1.png");
    }
    $("#nowpage").val(nowpage);
    for(var i=0;i<100;i++){
        if($("#ppp"+i)){
            if(i>nowpage-1 && i<nowpage+5){
                $("#ppp"+i).css("display","inline-block");
            }else{
                $("#ppp"+i).css("display","none");
            }
        }
    }

}

function loadNextsix(){
    var nowpage = Number($("#nowpage").val());
    nowpage = nowpage + 6;
    for(var i=0;i<nowpage+6;i++){
        if($("#tableid"+i)){
            $("#tableid"+i).css("display","inline");
        }
    }
    for(var i=nowpage+6;i<1000;i++){
        if($("#tableid"+i)){
            $("#tableid"+i).css("display","none");
        }
    }
    $("#nowpage").val(nowpage);
    var total1 = Number($("#pronum1").val());
    if(nowpage+6>total1){
         $("#loadings").css("display","none");
    }
}

function jt(i){
    if($("#jt"+i).attr("src")== "/images/04up.gif"){
        $("#jtb"+i).css("display","none");
        $("#jt"+i).attr("src","/images/03down.gif");
    }else{
        $("#jtb"+i).css("display","inline");
        $("#jt"+i).attr("src","/images/04up.gif");
        for(var j=0;j<200;j++){
            if(j!=i){
                $("#jt"+j).attr("src","/images/02.png");
                $("#jtb"+j).css("display","none");
            }
        }
    }

}

function submitYD(){
    if($("input[name='input1']").val()==""){
        alert('姓名不能为空！');return false;
    }
    if($("input[name='input2']").val()==""){
        alert('联系电话不能为空！');return false;
    }
    if($("input[name='input3']").val()==""){
        alert('E-Mail不能为空！');return false;
    }
    if($("textarea[name='input4']").val()==""){
        alert('内容不能为空！');return false;
    }
    alert('信息递交成功，我们会尽快与您联系！');
    document.forms[0].submit();
}

function login(){
    if($("#name").val()==""|$("#pwd").val()==""){
        alert("请填写用户名及密码！");
        return false;
    }
    document.forms[0].submit();
}

function listpageDown(){
    var num1 = Number(document.all.numStart.value);
    num1 = num1+6;
    if(num1>Number($("#pronum1").val())){
        alert("没有下一页，已经到底！");return false;
    }
    document.all.numStart.value = num1;
    document.forms[0].submit();
}

function listpageUp(){
    var num1 = Number(document.all.numStart.value);
    if(num1 == 1){
        alert("没有上一页，已经到头！");return false;
    }
    num1 = num1-6;
    document.all.numStart.value = num1;
    document.forms[0].submit();
}

function retferto(){
    var num1 = Number($("#numNo1").val());
    num1 = (num1-1)*6;
    document.all.numStart.value = num1;
    document.forms[0].submit();
}