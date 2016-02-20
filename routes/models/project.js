var mysql,LIMIT;
    mysql = require('../models/db');
    LIMIT = 10;

exports.sqldo = function (req, res) {
    var _sql = req.params.sql;
    if(_sql == "insert"){sql_insert(req,res);}
    else if(_sql == "delinfo"){sql_delete(req,res);}
    else if(_sql == "update"){sql_update(req,res);}
    else if(_sql == "getinfo"){sql_select(req,res);}
    else if(_sql == "chekuserlogin"){chekuserlogin(req,res);}
    else if(_sql == "louout"){logout(req,res);}
    else if(_sql == "regUser"){regUser(req,res);}
    else if(_sql == "chekwxuserlogin"){chekwxuserlogin(req,res);}
    else if(_sql == "unbind"){unbind(req,res);}
    else if(_sql == "regwxUser"){regwxUser(req,res);}
    else if(_sql == "setSpecial"){setSpecial(req,res);}
};

function logout(req,res){
    req.session.cuser = null;
    res.redirect("/");
}

function sql_insert(req, res) {
    var proname = req.param('proname');
    var proaddress = req.param('proaddress');
    var salesoffice = req.param('salesoffice');
    var developer = req.param('developer');
    var opening = req.param('opening');
    var others = req.param('others');
    var property = req.param('property');
    var households = req.param('households');
    var parking = req.param('parking');
    var decoration = req.param('decoration');
    var buildingtype = req.param('buildingtype');
    var propertytype = req.param('propertytype');
    var reference = req.param('reference');
    var insertSql = "insert into project (proname,proaddress,salesoffice,developer,opening,others,property,households,parking,decoration,buildingtype,propertytype,reference) values ('"+
      proname+"','"+proaddress+"','"+salesoffice+"','"+developer+"','"+opening+"','"+others+"',"+property+","+households+",'"+parking+"','"+decoration+"','"+buildingtype+"','"+propertytype+"',"+reference+
      ")";
    mysql.query(insertSql ,function(error,obj){
        if(error){console.log(error);return false;}
        req.session.infor = "新建成功！";
        res.send("200");
    });
};

function regUser(req, res) {
    var name = req.param('name');
    var password = req.param('password');
    var username = req.param('username');
    var sql1 = "select id from user where username = '"+username+"'";
    mysql.query(sql1 ,function(error1,obj1){
          if(error1){console.log(error1);return false;}
          if(obj1[0]){
            res.send("300");
          }else{
            var sql2 = "insert into user (username,name,password) values ('"+username+"','"+name+"','"+password+"')";
            mysql.query(sql2 ,function(error2,obj2){
              if(error2){console.log(error2);return false;}
                req.session.cuser = name;
                req.session.cid =  obj2.insertId;
                req.session.ctel =  username;
                req.session.favorable = "首单优惠";
                res.send("200");
            });
          }
    });
};

function regwxUser(req, res) {
    var name = req.param('name');
    var password = req.param('password');
    var username = req.param('username');
    var sql1 = "select id from user where username = '"+username+"'";
    mysql.query(sql1 ,function(error1,obj1){
          if(error1){console.log(error1);return false;}
          if(obj1[0]){
            res.send("300");
          }else{
            var sql2 = "insert into user (username,name,password,openid) values ('"+username+"','"+name+"','"+password+"','"+req.session.openid+"')";
            mysql.query(sql2 ,function(error2,obj2){
              if(error2){console.log(error2);return false;}
                req.session.cuser = name;
                req.session.cid =  obj2.insertId;
                req.session.ctel =  username;
                req.session.favorable = "首单优惠";
                res.send("200");
            });
          }
    });
};

function setSpecial(req, res) {
    var id = req.param('id');
    var sepical = req.param('sepical');
    var sql1 = "update house set sepical = "+sepical+" where id = "+id;
    mysql.query(sql1 ,function(error,obj){
          if(error){console.log(error);return false;}
          req.session.infor = "操作成功！";
          res.send("200");
    });
};

function sql_delete(req, res) {
    var id = req.param('id');
    var state = req.param('state');
    var deleteSql = "update house set state = '"+state+"' where id = "+id;
    mysql.query(deleteSql ,function(error,obj){
          if(error){console.log(error);return false;}
          req.session.infor = "操作成功！";
          res.send("200");
    });
};

function sql_select(req, res) {
    var id = req.param('id');
    var delSql = "select * from project where pid = "+id;
    mysql.query(delSql ,function(error,rows1){
          if(error){console.log(error);return false;}
          res.send(rows1);
    });
};

function sql_update(req, res) {
    var proname = req.param('proname');
    var proaddress = req.param('proaddress');
    var salesoffice = req.param('salesoffice');
    var developer = req.param('developer');
    var opening = req.param('opening');
    var others = req.param('others');
    var property = req.param('property');
    var households = req.param('households');
    var parking = req.param('parking');
    var decoration = req.param('decoration');
    var buildingtype = req.param('buildingtype');
    var propertytype = req.param('propertytype');
    var reference = req.param('reference');
    var id = req.param('docid');
    var updateSql = "update project set proname = '"+proname
     +"',proaddress ='"+proaddress
     +"',salesoffice ='"+salesoffice
     +"',developer ='"+developer
     +"',opening ='"+opening
     +"',others ='"+others
     +"',property ="+property
     +",households ="+households
     +",parking ='"+parking
     +"',decoration ='"+decoration
     +"',buildingtype ='"+buildingtype
     +"',propertytype ='"+propertytype
     +"',reference ="+reference
     +"  where pid = "+id;
    mysql.query(updateSql ,function(error,obj){
          if(error){console.log(error);return false;}
          req.session.infor = "修改成功！";
          res.send("200");
    });
};

exports.sql_list = function (req, res) {
    var _info = req.session.infor;
    req.session.infor = null;

    var page = parseInt(req.query.p);
    page = (page && page > 0) ? page : 1;
    var limit = (limit && limit > 0) ? limit : LIMIT;
    var sql1 = "select * from project limit "+(page-1)*limit+","+limit;
    var sql5 = "select count(*) as count from project";
    mysql.query(sql1,function (err, rows1) {
        if(err){console.log(err);return false;}
        mysql.query(sql5,function (err1, rows5) {
              if(err1){console.log(err1);return false;}
              var total = rows5[0].count;
              var totalpage = Math.ceil(total/limit);
              var isFirstPage = page == 1 ;
              var isLastPage = ((page -1) * limit + rows1.length) == total;
                  res.render('cms/project', {url:req.url,record:rows1,page:page,total:total,totalpage:totalpage,isFirstPage:isFirstPage,isLastPage:isLastPage,info:_info});
        });
        
    });
};

function chekuserlogin (req, res) {
  var username = req.param('username');
  var password = req.param('password');
    var Sql = "select id,username,password,name,favorable from user where username = '"+username+"'";
    mysql.query(Sql ,function(error,obj){
      if(error){console.log(error);return false;}
      if(obj[0]){
        if(obj[0].password == password){
            req.session.cuser = obj[0].name;
            req.session.cid =  obj[0].id;
            req.session.ctel =  obj[0].username;
            req.session.favorable = obj[0].favorable;
            res.send("200");
        }else{
            res.send("300");
        }
      }else{
        res.send("300");
      }
      
  });
}

function chekwxuserlogin (req, res) {
  var username = req.param('username');
  var password = req.param('password');
    var Sql = "select id,username,password,name,favorable from user where username = '"+username+"'";
    mysql.query(Sql ,function(error,obj){
      if(error){console.log(error);return false;}
      if(obj[0]){
        if(obj[0].password == password){
            req.session.cuser = obj[0].name;
            req.session.cid =  obj[0].id;
            req.session.ctel =  obj[0].username;
            req.session.favorable = obj[0].favorable;
            //bind openid
            var sql2 = "select openid from user where id = "+obj[0].id;
            mysql.query(sql2 ,function(error,obj2){
                if(obj2[0].openid){
                  res.send("500");
                }else{
                  var sql1 = "update user set openid = '"+req.session.openid+"' where id = "+obj[0].id;
                  mysql.query(sql1 ,function(error,obj1){
                    if(error){console.log(error);return false;}
                    res.send("200");
                  });
                }
            });
        }else{
            res.send("400");
        }
      }else{
        res.send("300");
      }
      
  });
}

function unbind (req, res) {
  //unbind openid
  var sql1 = "update user set openid = Null where openid = '"+req.session.openid + "'";
  mysql.query(sql1 ,function(error,obj1){
      if(error){console.log(error);return false;}
      res.send("200");
  });       
}