var mysql = require('./models/db');
var role = require('./models/role.js');
var finrole = require('./models/finrole.js');
var user = require('./models/user.js');
var brokers = require('./models/brokers.js');
var entrust = require('./models/entrust.js');
var house = require('./models/house.js');
var fund = require('./models/fund.js');
var houserecord = require('./models/houserecord.js');
var project = require('./models/project.js');
var LIMIT = 10;

/**通用函数BEGIN**/
function getToday(){
    var date = new Date(); //日期对象
    var now = "";
    now = date.getFullYear()+"-";
    var m =  (date.getMonth()+1)+"";
    if(m.length==1){m="0"+m;}
    now = now + m+"-";//取月的时候取的是当前月-1如果想取当前月+1就可以了
    var d =  date.getDate()+"";
    if(d.length==1){d="0"+d;}
    now = now + d;
    return now;
}

function getNow(){
var date = new Date(); //日期对象
var now = "";
now = date.getFullYear()+"-";
now = now + (date.getMonth()+1)+"-";//取月的时候取的是当前月-1如果想取当前月+1就可以了
now = now + date.getDate()+" ";
now = now + date.getHours()+":";
now = now + date.getMinutes()+":";
now = now + date.getSeconds()+"";
return now;
}

function getClientIp(req) {
    var ipAddress;
    var forwardedIpsStr = req.header('x-forwarded-for');
    if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
};

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function getClientIp(req) {
    var ipAddress;
    var forwardedIpsStr = req.header('x-forwarded-for');
    if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
};

function setLog (page,req) {
    if(getClientIp(req)!="127.0.0.1"){
        mysql.query("insert into log(page,time,ip) values('"+page+"',now(),'"+getClientIp(req)+"')",function (err, rows) {

        });
    }
}

/**通用函数END**/


/**前端BEGIN**/
exports.home = function (req, res) {
    res.render('front/home', {layout:"layout",url:req.url});
};

exports.estate_home = function (req, res) {
    var sql1 = "select * from house where sepical = 1 limit 0,4";
    mysql.query(sql1,function (err, rows1) {
        if(err){console.log(err);return false;}
        res.render('front/estate_home', {layout:"layout",url:req.url,rows1:rows1});
    });
};

exports.estate_company = function (req, res) {
    res.render('front/estate_company', {layout:"layout",url:req.url});
};

exports.estate_list = function (req, res) {
    var page = parseInt(req.query.p);

    var key = req.query.q;
    var region = req.query.region;
    var type = req.query.type;
    var subway = req.query.subway;
    var orderby = req.query.orderby;
    var price = req.query.price;

    key = key ? key : "";
    region = region?region:"";
    type = type?type:"";
    orderby = orderby?orderby:"1";
    subway = subway?subway:"";
    price = price?price:"";

    res.locals.key = key;
    res.locals.class1 = region;
    res.locals.class3 = type;
    res.locals.orderby = orderby;
    res.locals.class2 = subway;
    res.locals.class4 = price;

    page = (page && page > 0) ? page : 1;
    var limit = (limit && limit > 0) ? limit : LIMIT;

    var condition = "(region like '%"+key+"%' or village like '%"+key+"%') and region like '%"+region+"%' and type like '%"+type+"%' and subway like '%"+subway+"%' and state = '上线'";
    if(price == "500万以下"){
        condition = condition + " and price < 500";
    }else if(price == "500万-1000万"){
        condition = condition + " and price < 1000 and price > 500";
    }else if(price == "1000万-2000万"){
        condition = condition + " and price < 2000 and price > 1000";
    }else if(price == "2000万-3500万"){
        condition = condition + " and price < 3500 and price > 2000";
    }else if(price == "3500万-6000万"){
        condition = condition + " and price < 6000 and price > 3500";
    }else if(price == "6000万以上"){
        condition = condition + " and price > 6000";
    }
    if(orderby == "1"){
        condition = condition + " order by id desc";
    }else if(orderby == "2"){
        condition = condition + " order by unitPrice asc";
    }
    var sql1 = "select * from house where "+condition+" limit "+(page-1)*limit+","+limit;
    var sql2 = "select name from area";
    var sql5 = "select count(*) as count from house  where "+condition;
    mysql.query(sql1,function (err, rows1) {
        if(err){console.log(err);return false;}
        mysql.query(sql2,function (err2, rows2) {
            if(err2){console.log(err2);return false;}
            mysql.query(sql5,function (err1, rows5) {
                if(err1){console.log(err1);return false;}
                var total = rows5[0].count;
                var totalpage = Math.ceil(total/limit);
                var isFirstPage = page == 1 ;
                var isLastPage = ((page -1) * limit + rows1.length) == total;
                    res.render('front/estate_list', {rows2:rows2,layout:"layout",url:req.url,record:rows1,page:page,total:total,totalpage:totalpage,isFirstPage:isFirstPage,isLastPage:isLastPage});
            });
        });
    });
};

exports.estate_detail = function (req, res) {
    var id = parseInt(req.query.id);
    var sql1 = "select * from house_brokers where id = " + id;
    mysql.query(sql1,function (err, rows1) {
        if(err){console.log(err);return false;}
        res.render('front/estate_detail', {layout:"layout",url:req.url,record:rows1});
    });
};

exports.estate_loan = function (req, res) {
    res.render('front/estate_loan', {layout:"layout",url:req.url});
};

exports.estate_broker = function (req, res) {
    var page = parseInt(req.query.p);
    page = (page && page > 0) ? page : 1;
    var limit = (limit && limit > 0) ? limit : LIMIT;
    var sql1 = "select * from brokers limit "+(page-1)*limit+","+limit;
    var sql5 = "select count(*) as count from brokers";
    mysql.query(sql1,function (err, rows1) {
        if(err){console.log(err);return false;}
        mysql.query(sql5,function (err1, rows5) {
            if(err1){console.log(err1);return false;}
            var total = rows5[0].count;
            var totalpage = Math.ceil(total/limit);
            var isFirstPage = page == 1 ;
            var isLastPage = ((page -1) * limit + rows1.length) == total;
                res.render('front/estate_broker', {layout:"layout",url:req.url,record:rows1,page:page,total:total,totalpage:totalpage,isFirstPage:isFirstPage,isLastPage:isLastPage});
        });
    });
};

exports.financing_home = function (req, res) {
    var key = req.query.q;
    var page = parseInt(req.query.p);

    key = key ? key : "";
    page = (page && page > 0) ? page : 1;
    res.locals.key = key;
    
    var limit = (limit && limit > 0) ? limit : LIMIT;
    var sql1 = "select * from fund where sepical = 1 limit "+(page-1)*limit+","+limit;
    var sql5 = "select count(*) as count from fund where sepical = 1";
    mysql.query(sql1,function (err, rows1) {
        if(err){console.log(err);return false;}
        mysql.query(sql5,function (err1, rows5) {
            if(err1){console.log(err1);return false;}
            var total = rows5[0].count;
            var totalpage = Math.ceil(total/limit);
            var isFirstPage = page == 1 ;
            var isLastPage = ((page -1) * limit + rows1.length) == total;
                res.render('front/financing_home', {layout:"layout",url:req.url,record:rows1,page:page,total:total,totalpage:totalpage,isFirstPage:isFirstPage,isLastPage:isLastPage});
        });
    });
};

exports.financing_introduce = function (req, res) {
    res.render('front/financing_introduce', {layout:"layout",url:req.url});
};

exports.financing_list = function (req, res) {
    var key = req.query.q;
    var page = parseInt(req.query.p);

    key = key ? key : "";
    page = (page && page > 0) ? page : 1;
    res.locals.key = key;
    
    var limit = (limit && limit > 0) ? limit : LIMIT;
    var sql1 = "select * from fund where name like '%"+key+"%' limit "+(page-1)*limit+","+limit;
    var sql5 = "select count(*) as count from fund where name like '%"+key+"%'";
    mysql.query(sql1,function (err, rows1) {
        if(err){console.log(err);return false;}
        mysql.query(sql5,function (err1, rows5) {
            if(err1){console.log(err1);return false;}
            var total = rows5[0].count;
            var totalpage = Math.ceil(total/limit);
            var isFirstPage = page == 1 ;
            var isLastPage = ((page -1) * limit + rows1.length) == total;
                res.render('front/financing_list', {layout:"layout",url:req.url,record:rows1,page:page,total:total,totalpage:totalpage,isFirstPage:isFirstPage,isLastPage:isLastPage});
        });
    });
};

exports.financing_detail = function (req, res) {
    var id = parseInt(req.query.id);
    var sql1 = "select * from fund where id = " + id;
    mysql.query(sql1,function (err, rows1) {
        if(err){console.log(err);return false;}
        res.render('front/financing_detail', {layout:"layout",url:req.url,record:rows1});
    });
};

exports.reg = function (req, res) {
    res.render('front/reg', {layout:"layout",url:req.url});
};

exports.option_info = function (req, res) {
    if(!res.locals.cuser){
        res.redirect("/");
        return false;
    }
    res.render('front/option_info', {layout:"layout",url:req.url});
};

exports.option_estate1 = function (req, res) {
    if(!res.locals.cuser){
        res.redirect("/");
        return false;
    }
    var page = parseInt(req.query.p);
    page = (page && page > 0) ? page : 1;
    var limit = (limit && limit > 0) ? limit : LIMIT;
    var sql1 = "select * from concerned_house where userid = "+req.session.cid+" limit "+(page-1)*limit+","+limit;
    var sql5 = "select count(*) as count from concerned_house  where userid = "+req.session.cid;
    mysql.query(sql1,function (err, rows1) {
        if(err){console.log(err);return false;}
        mysql.query(sql5,function (err1, rows5) {
            if(err1){console.log(err1);return false;}
            var total = rows5[0].count;
            var totalpage = Math.ceil(total/limit);
            var isFirstPage = page == 1 ;
            var isLastPage = ((page -1) * limit + rows1.length) == total;
                res.render('front/option_estate1', {layout:"layout",url:req.url,record:rows1,page:page,total:total,totalpage:totalpage,isFirstPage:isFirstPage,isLastPage:isLastPage});
        });
    });
};

exports.option_estate2 = function (req, res) {
    if(!res.locals.cuser){
        res.redirect("/");
        return false;
    }
    var sql1 = "select * from houserecord_brokers where usermobile = '"+req.session.ctel+"'";
    mysql.query(sql1,function (err, rows1) {
        if(err){console.log(err);return false;}
        res.render('front/option_estate2', {layout:"layout",url:req.url,record:rows1});
    });    
};

exports.option_estate3 = function (req, res) {
    if(!res.locals.cuser){
        res.redirect("/");
        return false;
    }
    var sql1 = "select * from entrust where userid = " + req.session.cid + " order by createtime desc";
    mysql.query(sql1,function (err, rows1) {
        if(err){console.log(err);return false;}
        for(var i in rows1){
            rows1[i].createtime = (rows1[i].createtime).Format("yyyy-MM-dd");
        }
        res.render('front/option_estate3', {layout:"layout",url:req.url,rows1:rows1});
    });
};

exports.option_financing1 = function (req, res) {
    if(!res.locals.cuser){
        res.redirect("/");
        return false;
    }
    var page = parseInt(req.query.p);
    page = (page && page > 0) ? page : 1;
    var limit = (limit && limit > 0) ? limit : LIMIT;
    var sql1 = "select * from fconcerned_fund where userid = "+req.session.cid+" limit "+(page-1)*limit+","+limit;
    var sql5 = "select count(*) as count from fconcerned_fund  where userid = "+req.session.cid;
    mysql.query(sql1,function (err, rows1) {
        if(err){console.log(err);return false;}
        mysql.query(sql5,function (err1, rows5) {
            if(err1){console.log(err1);return false;}
            var total = rows5[0].count;
            var totalpage = Math.ceil(total/limit);
            var isFirstPage = page == 1 ;
            var isLastPage = ((page -1) * limit + rows1.length) == total;
                res.render('front/option_financing1', {layout:"layout",url:req.url,record:rows1,page:page,total:total,totalpage:totalpage,isFirstPage:isFirstPage,isLastPage:isLastPage});
        });
    });
};

exports.option_financing2 = function (req, res) {
    if(!res.locals.cuser){
        res.redirect("/");
        return false;
    }
    res.render('front/option_financing2', {layout:"layout",url:req.url});
};

exports.checkuserLogin = function(req,res,next){
    if(!req.session.cuser){
        res.locals.cuser = null;
        res.locals.ctel = null;
        res.locals.cemail = null;
        res.locals.cid = null;
    }else{
        res.locals.cuser = req.session.cuser;
        res.locals.ctel = req.session.ctel;
        res.locals.cemail = req.session.cemail;
        res.locals.cid = req.session.cid;
    }
    next();
}
/**前端END**/


/**后台BEGIN**/
exports.checkLogin = function(req,res,next){
    if(!req.session.user){
        res.locals.user = null;
        res.locals.role = null;
        res.locals.id = null;
        res.redirect("/cms");
    }else{
        res.locals.user = req.session.user;
        res.locals.role = req.session.role;
        res.locals.id = req.session.id;
    }
    next();
}

exports.logindo = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var Sql = "select * from role where username = '"+username+"'";
    mysql.query(Sql ,function(error,obj){
          if(error){console.log(error);return false;}
          if(obj[0] && obj[0].password == password){
            if(obj[0].active == 0){
                req.session.infor = "账号已被禁用！";
                res.redirect("/cms");
            }else{
              req.session.id = obj[0].id;
              req.session.user = obj[0].name;
              req.session.role = obj[0].role;
              res.redirect("/cms/home");
            }
          }else{
            req.session.infor = "用户名密码错误！";
            res.redirect("/cms");
          }
    });
};

exports.cms_home = function (req, res) {
    res.render('cms/home', {layout:false,url:req.url});
};

exports.role = function (req, res) {
    role.sql_list(req,res);
};

exports.finrole = function (req, res) {
    finrole.sql_list(req,res);
};

exports.roledo = function (req, res) {
    role.sqldo(req,res);
};

exports.user = function (req, res) {
    user.sql_list(req,res);
};

exports.userdo = function (req, res) {
    user.sqldo(req,res);
};

exports.brokers = function (req, res) {
    brokers.sql_list(req,res);
};

exports.brokersdo = function (req, res) {
    brokers.sqldo(req,res);
};

exports.fund = function (req, res) {
    fund.sql_list(req,res);
};

exports.funddo = function (req, res) {
    fund.sqldo(req,res);
};

exports.houserecord = function (req, res) {
    houserecord.sql_list(req,res);
};

exports.houserecorddo = function (req, res) {
    houserecord.sqldo(req,res);
};

exports.house = function (req, res) {
    house.sql_list(req,res);
};

exports.housedo = function (req, res) {
    house.sqldo(req,res);
};

exports.project = function (req, res) {
    project.sql_list(req,res);
};

exports.projectdo = function (req, res) {
    project.sqldo(req,res);
};

exports.entrust = function (req, res) {
    entrust.sql_list(req,res);
};

exports.login = function (req, res) {
    req.session.user = null;
    var _infor = req.session.infor;
    req.session.infor = null;
    res.render('cms/login', {layout:false,url:req.url,info:_infor});
};

exports.upload = function (req, res) {
    res.render('cms/upload');
};

exports.uploadsuccess = function (req, res) {
    var p = req.query.p;
    res.render('cms/uploadsuccess',{url:req.url,p:p});
};

exports.uploaddo = function (req, res) {
    var fname = req.files.img_url.path.replace("public\\files\\", "").replace("public/files/", "");
    res.redirect("/cms/uploadsuccess?p="+fname);
};
/**后台END**/


/**通用页面BEGIN**/

/**通用页面END**/


/**接口BEGIN**/

/**接口END**/
exports.User_getByUserName = function (req, res) {
    var u = req.query.u;
    var sql = "select * from user where username = '"+u+"'";
    mysql.query(sql,function (err, rows) {
        if(err){console.log(err);res.send(err);return false;}
        res.send(rows);
    }); 
}

exports.House_getAll = function (req, res) {
    var sql = "select * from house";
    mysql.query(sql,function (err, rows) {
        if(err){console.log(err);res.send(err);return false;}
        res.send(rows);
    }); 
}

exports.House_getById = function (req, res) {
    var id = req.query.id;
    var sql = "select * from house where id = " + id;
    mysql.query(sql,function (err, rows) {
        if(err){console.log(err);res.send(err);return false;}
        res.send(rows);
    }); 
}

exports.House_getProjectById = function (req, res) {
    var id = req.query.id;
    var sql = "select * from project where pid = " + id;
    mysql.query(sql,function (err, rows) {
        if(err){console.log(err);res.send(err);return false;}
        res.send(rows);
    }); 
}

exports.User_getConcernedByUserId = function (req, res) {
    var id = req.query.id;
    var sql = "select * from concerned where userid = " + id;
    mysql.query(sql,function (err, rows) {
        if(err){console.log(err);res.send(err);return false;}
        res.send(rows);
    }); 
}

exports.User_getHouserecordByUserId = function (req, res) {
    var id = req.query.id;
    var sql = "select * from houserecord_brokers where usermobile = " + id;
    mysql.query(sql,function (err, rows) {
        if(err){console.log(err);res.send(err);return false;}
        res.send(rows);
    }); 
}

exports.User_getEntrustByUserId = function (req, res) {
    var id = req.query.id;
    var sql = "select * from entrust where userid = " + id;
    mysql.query(sql,function (err, rows) {
        if(err){console.log(err);res.send(err);return false;}
        res.send(rows);
    }); 
}

exports.House_getByKey = function (req, res) {
    var page = parseInt(req.query.p);

    var key = req.query.q;
    var region = req.query.region;
    var type = req.query.type;
    var subway = req.query.subway;
    var orderby = req.query.orderby;
    var price = req.query.price;

    key = key ? key : "";
    region = region?region:"";
    type = type?type:"";
    orderby = orderby?orderby:"1";
    subway = subway?subway:"";
    price = price?price:"";

    res.locals.key = key;
    res.locals.class1 = region;
    res.locals.class3 = type;
    res.locals.orderby = orderby;
    res.locals.class2 = subway;
    res.locals.class4 = price;

    page = (page && page > 0) ? page : 1;
    var limit = (limit && limit > 0) ? limit : LIMIT;

    var condition = "(region like '%"+key+"%' or village like '%"+key+"%') and region like '%"+region+"%' and type like '%"+type+"%' and subway like '%"+subway+"%' and state = '上线'";
    if(price == "100万以下"){
        condition = condition + " and price < 100";
    }else if(price == "100万-200万"){
        condition = condition + " and price < 200 and price > 100";
    }else if(price == "200万-500万"){
        condition = condition + " and price < 500 and price > 200";
    }else if(price == "500万以上"){
        condition = condition + " and price > 500";
    }
    if(orderby == "1"){
        condition = condition + " order by id desc";
    }else if(orderby == "2"){
        condition = condition + " order by unitPrice asc";
    }
    var sql1 = "select * from house where "+condition+" limit "+(page-1)*limit+","+limit;
    var sql2 = "select name from area";
    var sql5 = "select count(*) as count from house  where "+condition;
    mysql.query(sql1,function (err, rows1) {
        if(err){console.log(err);return false;}
        mysql.query(sql2,function (err2, rows2) {
            if(err2){console.log(err2);return false;}
            mysql.query(sql5,function (err1, rows5) {
                if(err1){console.log(err1);return false;}
                var total = rows5[0].count;
                var totalpage = Math.ceil(total/limit);
                var isFirstPage = page == 1 ;
                var isLastPage = ((page -1) * limit + rows1.length) == total;
                    res.send(rows1);
                    //res.render('front/estate_list', {rows2:rows2,layout:"layout",url:req.url,record:rows1,page:page,total:total,totalpage:totalpage,isFirstPage:isFirstPage,isLastPage:isLastPage});
            });
        });
    });
}