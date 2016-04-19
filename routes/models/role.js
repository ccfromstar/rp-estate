var mysql, LIMIT;
mysql = require('../models/db');
LIMIT = 10;
var async = require('async');

exports.sqldo = function(req, res) {
	var _sql = req.params.sql;
	if (_sql == "insert") {
		sql_insert(req, res);
	} else if (_sql == "setinfo") {
		sql_set(req, res);
	} else if (_sql == "update") {
		sql_update(req, res);
	} else if (_sql == "getinfo") {
		sql_select(req, res);
	} else if (_sql == "chekuserlogin") {
		chekuserlogin(req, res);
	} else if (_sql == "louout") {
		logout(req, res);
	} else if (_sql == "regUser") {
		regUser(req, res);
	} else if (_sql == "appReg") {
		appReg(req, res);
	} else if (_sql == "checkusername") {
		checkusername(req, res);
	} else if (_sql == "chekwxuserlogin") {
		chekwxuserlogin(req, res);
	} else if (_sql == "unbind") {
		unbind(req, res);
	} else if (_sql == "regwxUser") {
		regwxUser(req, res);
	} else if (_sql == "insertEntrust") {
		insertEntrust(req, res);
	} else if (_sql == "setConcerned") {
		setConcerned(req, res);
	} else if (_sql == "setfConcerned") {
		setfConcerned(req, res);
	}
};

function logout(req, res) {
	req.session.cuser = null;
	res.redirect("/");
}

function sql_insert(req, res) {
	var username = req.param('username');
	var password = req.param('password');
	var name = req.param('name');
	var role = req.param('role');
	var insertSql = "insert into role (username,password,name,role) values ('" + username + "','" + password + "','" + name + "','" + role + "')";
	var sql2 = "insert into brokers (name) values ('" + name + "')";
	mysql.query(insertSql, function(error, obj) {
		if (error) {
			console.log(error);
			return false;
		}
		req.session.infor = "新建成功！";
		console.log(sql2);
		console.log(role);
		if (role == "地产经纪人" || role == "地产兼理财经纪人") {
			mysql.query(sql2, function(error, obj) {});
		}
		res.send("200");
	});
};

function setConcerned(req, res) {
	var userid = req.param('userid');
	var houseid = req.param('houseid');
	var sql1 = "select id from concerned where userid = " + userid + " and houseid = " + houseid;
	var insertSql = "insert into concerned (userid,houseid) values (" + userid + "," + houseid + ")";
	mysql.query(sql1, function(error1, obj1) {
		if (error1) {
			console.log(error1);
			return false;
		}
		if (obj1[0]) {
			res.send("300");
		} else {
			mysql.query(insertSql, function(error, obj) {
				if (error) {
					console.log(error);
					return false;
				}
				req.session.infor = "关注成功！";
				res.send("200");
			});
		}
	});
};

function setfConcerned(req, res) {
	var userid = req.param('userid');
	var fundid = req.param('fundid');
	var sql1 = "select id from fconcerned where userid = " + userid + " and fundid = " + fundid;
	var insertSql = "insert into fconcerned (userid,fundid) values (" + userid + "," + fundid + ")";
	mysql.query(sql1, function(error1, obj1) {
		if (error1) {
			console.log(error1);
			return false;
		}
		if (obj1[0]) {
			res.send("300");
		} else {
			mysql.query(insertSql, function(error, obj) {
				if (error) {
					console.log(error);
					return false;
				}
				req.session.infor = "关注成功！";
				res.send("200");
			});
		}
	});
};

function insertEntrust(req, res) {
	var userid = req.param('userid');
	var info = req.param('info');
	var insertSql = "insert into entrust (userid,info,createtime) values (" + userid + ",'" + info + "',now())";
	mysql.query(insertSql, function(error, obj) {
		if (error) {
			console.log(error);
			return false;
		}
		req.session.infor = "新建成功！";
		res.send("200");
	});
}

function regUser(req, res) {
	var name = req.param('name');
	var password = req.param('password');
	var username = req.param('username');
	var email = req.param('email');
	var brithday = req.param('brithday');
	var result_list = req.param('result_list');
	var sql2 = "insert into user (username,name,password,email,brithday,answer_list) values ('" + username + "','" + name + "','" + password + "','" + email + "','" + brithday + "','" + result_list + "')";
	mysql.query(sql2, function(error2, obj2) {
		if (error2) {
			console.log(error2);
			return false;
		}
		req.session.cuser = name;
		req.session.cid = obj2.insertId;
		req.session.ctel = username;
		req.session.cemail = email;
		res.send("200");
	});
};

function appReg(req, res) {
	var password = req.param('password');
	var username = req.param('username');
	
	async.waterfall([function(callback) {
		var sql1 = "select * from user where username = '" + username + "'";
		mysql.query(sql1, function(err, rows) {
			if (err) {
				console.log('err1:' + err);
				return;
			}
			callback((rows[0]?"400":null));
		});
	}, function(callback) {
		var sql2 = "insert into user (username,password,type) values ('" + username + "','" + password + "','app')";
		mysql.query(sql2, function(err, rows) {
			if (err) {
				console.log('err2:' + err);
				return;
			}
			callback(err, rows.affectedRows);
		});
	}], function(err, rows) {
		err ? res.send(err) : res.send("200");
	});
	/*
	mysql.query(sql2 ,function(error2,obj2){
	  if(error2){console.log(error2);return false;}
	    res.send("200");
	});*/
};

function checkusername(req, res) {
	var username = req.param('username');
	var sql1 = "select id from user where username = '" + username + "'";
	mysql.query(sql1, function(error1, obj1) {
		if (error1) {
			console.log(error1);
			return false;
		}
		if (obj1[0]) {
			res.send("300");
		} else {
			res.send("200");
		}
	});
}

function regwxUser(req, res) {
	var name = req.param('name');
	var password = req.param('password');
	var username = req.param('username');
	var sql1 = "select id from user where username = '" + username + "'";
	mysql.query(sql1, function(error1, obj1) {
		if (error1) {
			console.log(error1);
			return false;
		}
		if (obj1[0]) {
			res.send("300");
		} else {
			var sql2 = "insert into user (username,name,password,openid) values ('" + username + "','" + name + "','" + password + "','" + req.session.openid + "')";
			mysql.query(sql2, function(error2, obj2) {
				if (error2) {
					console.log(error2);
					return false;
				}
				req.session.cuser = name;
				req.session.cid = obj2.insertId;
				req.session.ctel = username;
				req.session.favorable = "首单优惠";
				res.send("200");
			});
		}
	});
};

function sql_set(req, res) {
	var id = req.param('id');
	var active = req.param('active');
	var Sql1 = "update role set active = " + active + " where id = " + id;
	mysql.query(Sql1, function(error, obj) {
		if (error) {
			console.log(error);
			return false;
		}
		req.session.infor = "操作成功！";
		res.send("200");
	});
};

function sql_select(req, res) {
	var id = req.param('id');
	var delSql = "select * from role where id = " + id;
	mysql.query(delSql, function(error, rows1) {
		if (error) {
			console.log(error);
			return false;
		}
		res.send(rows1);
	});
};

function sql_update(req, res) {
	var username = req.param('username');
	var password = req.param('password');
	var name = req.param('name');
	var role = req.param('role');
	var id = req.param('docid');
	var updateSql = "update role set username = '" + username + "',password ='" + password + "',name ='" + name + "',role ='" + role + "'  where id = " + id;
	mysql.query(updateSql, function(error, obj) {
		if (error) {
			console.log(error);
			return false;
		}
		req.session.infor = "修改成功！";
		res.send("200");
	});
};

exports.sql_list = function(req, res) {
	var _info = req.session.infor;
	req.session.infor = null;

	var page = parseInt(req.query.p);
	page = (page && page > 0) ? page : 1;
	var limit = (limit && limit > 0) ? limit : LIMIT;
	var sql1 = "select * from role limit " + (page - 1) * limit + "," + limit;
	var sql5 = "select count(*) as count from role";
	mysql.query(sql1, function(err, rows1) {
		if (err) {
			console.log(err);
			return false;
		}
		mysql.query(sql5, function(err1, rows5) {
			if (err1) {
				console.log(err1);
				return false;
			}
			var total = rows5[0].count;
			var totalpage = Math.ceil(total / limit);
			var isFirstPage = page == 1;
			var isLastPage = ((page - 1) * limit + rows1.length) == total;
			res.render('cms/role', {
				url: req.url,
				record: rows1,
				page: page,
				total: total,
				totalpage: totalpage,
				isFirstPage: isFirstPage,
				isLastPage: isLastPage,
				info: _info
			});
		});
	});
};

function chekuserlogin(req, res) {
	var username = req.param('username');
	var password = req.param('password');
	var Sql = "select id,username,password,name,email from user where username = '" + username + "'";
	console.log(Sql);
	mysql.query(Sql, function(error, obj) {
		if (error) {
			console.log(error);
			return false;
		}
		if (obj[0]) {
			if (obj[0].password == password) {
				req.session.cuser = obj[0].name;
				req.session.cid = obj[0].id;
				req.session.ctel = obj[0].username;
				req.session.cemail = obj[0].email;
				res.send("200");
			} else {
				res.send("300");
			}
		} else {
			res.send("300");
		}

	});
}

function chekwxuserlogin(req, res) {
	var username = req.param('username');
	var password = req.param('password');
	var Sql = "select id,username,password,name,favorable from user where username = '" + username + "'";
	mysql.query(Sql, function(error, obj) {
		if (error) {
			console.log(error);
			return false;
		}
		if (obj[0]) {
			if (obj[0].password == password) {
				req.session.cuser = obj[0].name;
				req.session.cid = obj[0].id;
				req.session.ctel = obj[0].username;
				req.session.favorable = obj[0].favorable;
				//bind openid
				var sql2 = "select openid from user where id = " + obj[0].id;
				mysql.query(sql2, function(error, obj2) {
					if (obj2[0].openid) {
						res.send("500");
					} else {
						var sql1 = "update user set openid = '" + req.session.openid + "' where id = " + obj[0].id;
						mysql.query(sql1, function(error, obj1) {
							if (error) {
								console.log(error);
								return false;
							}
							res.send("200");
						});
					}
				});
			} else {
				res.send("400");
			}
		} else {
			res.send("300");
		}

	});
}

function unbind(req, res) {
	//unbind openid
	var sql1 = "update user set openid = Null where openid = '" + req.session.openid + "'";
	mysql.query(sql1, function(error, obj1) {
		if (error) {
			console.log(error);
			return false;
		}
		res.send("200");
	});
}