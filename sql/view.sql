CREATE VIEW entrust_user
AS
SELECT entrust.*,user.username,user.name
FROM entrust
LEFT JOIN user
ON entrust.userid=user.id;

CREATE VIEW house_brokers
AS
SELECT house.*,brokers.name,brokers.job,brokers.history,brokers.record,brokers.tel,brokers.img as b_img,project.*
FROM house
LEFT JOIN brokers
ON house.brokersid=brokers.id
LEFT JOIN project
ON house.projectid=project.pid;

CREATE VIEW concerned_house
AS
SELECT concerned.id as cid,concerned.userid,house.*
FROM concerned
LEFT JOIN house
ON concerned.houseid=house.id;

CREATE VIEW houserecord_brokers
AS
SELECT houserecord.*,brokers.name,brokers.job,brokers.history,brokers.record,brokers.tel,brokers.img as b_img,house.id as houseid,user.username,user.name as customername
FROM houserecord
LEFT JOIN brokers
ON houserecord.brokersid=brokers.id
LEFT JOIN house
ON houserecord.housetitle=house.title
LEFT JOIN user
ON houserecord.usermobile=user.username;

CREATE VIEW fconcerned_fund
AS
SELECT fconcerned.id as cid,fconcerned.userid,fund.*
FROM fconcerned
LEFT JOIN fund
ON fconcerned.fundid=fund.id;

CREATE VIEW house_project
AS
SELECT house.*,project.*
FROM house
LEFT JOIN project
ON house.projectid=project.pid;



