module.exports = function (app, routes) {
    //PC端
    app.get('/',routes.checkuserLogin);
    app.get('/',routes.home);

    app.get('/estate_home',routes.checkuserLogin);
    app.get('/estate_home',routes.estate_home);

    app.get('/estate_company',routes.checkuserLogin);
    app.get('/estate_company',routes.estate_company);

    app.get('/estate_list',routes.checkuserLogin);
    app.get('/estate_list',routes.estate_list);

    app.get('/estate_detail',routes.checkuserLogin);
    app.get('/estate_detail',routes.estate_detail);

    app.get('/estate_loan',routes.checkuserLogin);
    app.get('/estate_loan',routes.estate_loan);

    app.get('/estate_broker',routes.checkuserLogin);
    app.get('/estate_broker',routes.estate_broker);

    app.get('/financing_home',routes.checkuserLogin);
    app.get('/financing_home',routes.financing_home);

    app.get('/financing_detail',routes.checkuserLogin);
    app.get('/financing_detail',routes.financing_detail);

    app.get('/financing_introduce',routes.checkuserLogin);
    app.get('/financing_introduce',routes.financing_introduce);

    app.get('/financing_list',routes.checkuserLogin);
    app.get('/financing_list',routes.financing_list);

    app.get('/reg',routes.checkuserLogin);
    app.get('/reg',routes.reg);

    app.get('/option_info',routes.checkuserLogin);
    app.get('/option_info',routes.option_info);

    app.get('/option_estate1',routes.checkuserLogin);
    app.get('/option_estate1',routes.option_estate1);

    app.get('/option_estate2',routes.checkuserLogin);
    app.get('/option_estate2',routes.option_estate2);

    app.get('/option_estate3',routes.checkuserLogin);
    app.get('/option_estate3',routes.option_estate3);

    app.get('/option_financing1',routes.checkuserLogin);
    app.get('/option_financing1',routes.option_financing1);

    app.get('/option_financing2',routes.checkuserLogin);
    app.get('/option_financing2',routes.option_financing2);

    //后端
    app.get('/cms',routes.login);
    app.post('/cms/logindo',routes.logindo);

    app.get('/cms/home',routes.checkLogin);
    app.get('/cms/home',routes.cms_home);

    app.get('/cms/role',routes.checkLogin);
    app.get('/cms/role',routes.role);
    app.post('/role/:sql',routes.roledo);

    app.get('/cms/finrole',routes.checkLogin);
    app.get('/cms/finrole',routes.finrole);
    app.post('/role/:sql',routes.roledo);

    app.get('/cms/user',routes.checkLogin);
    app.get('/cms/user',routes.user);
    app.post('/user/:sql',routes.userdo);

    app.get('/cms/brokers',routes.checkLogin);
    app.get('/cms/brokers',routes.brokers);
    app.post('/brokers/:sql',routes.brokersdo);

    app.get('/cms/fund',routes.checkLogin);
    app.get('/cms/fund',routes.fund);
    app.post('/fund/:sql',routes.funddo);

    app.get('/cms/houserecord',routes.checkLogin);
    app.get('/cms/houserecord',routes.houserecord);
    app.post('/houserecord/:sql',routes.houserecorddo);

    app.get('/cms/house',routes.checkLogin);
    app.get('/cms/house',routes.house);
    app.post('/house/:sql',routes.housedo);

    app.get('/cms/project',routes.checkLogin);
    app.get('/cms/project',routes.project);
    app.post('/project/:sql',routes.projectdo);

    app.get('/cms/upload',routes.upload);
    app.get('/cms/uploadsuccess',routes.uploadsuccess);
    app.post('/cms/uploaddo',routes.uploaddo);

    app.get('/cms/entrust',routes.checkLogin);
    app.get('/cms/entrust',routes.entrust);

    //接口
    app.get('/User/getByUserName',routes.User_getByUserName);
    app.get('/House/getAll',routes.House_getAll);
    app.get('/House/getById',routes.House_getById);
    app.get('/House/getByKey',routes.House_getByKey);
    app.get('/House/getProjectById',routes.House_getProjectById);
    app.get('/User/getConcernedByUserId',routes.User_getConcernedByUserId);
    app.get('/User/getEntrustByUserId',routes.User_getEntrustByUserId);
    app.get('/User/getHouserecordByUserId',routes.User_getHouserecordByUserId);
};