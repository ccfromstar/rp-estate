#(Version: 5.5.35-0ubuntu0.13.10.2)
# Date: 2016-02-18 22:15:06
# Generator: MySQL-Front 5.3  (Build 4.128)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "area"
#

DROP TABLE IF EXISTS `area`;
CREATE TABLE `area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for table "brokers"
#

DROP TABLE IF EXISTS `brokers`;
CREATE TABLE `brokers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `job` varchar(255) DEFAULT NULL,
  `history` int(11) NOT NULL DEFAULT '0',
  `store` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `record` int(11) NOT NULL DEFAULT '0',
  `plate` text,
  `keycell` text,
  `selfrating` text,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Structure for table "concerned"
#

DROP TABLE IF EXISTS `concerned`;
CREATE TABLE `concerned` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `houseid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for table "entrust"
#

DROP TABLE IF EXISTS `entrust`;
CREATE TABLE `entrust` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `info` text,
  `createtime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for table "fconcerned"
#

DROP TABLE IF EXISTS `fconcerned`;
CREATE TABLE `fconcerned` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `fundid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for table "fund"
#

DROP TABLE IF EXISTS `fund`;
CREATE TABLE `fund` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `manager` varchar(255) DEFAULT NULL,
  `strategy` varchar(255) DEFAULT NULL,
  `runtime` varchar(255) DEFAULT NULL,
  `sixmonth` varchar(255) DEFAULT NULL,
  `oneyear` varchar(255) DEFAULT NULL,
  `accu` varchar(255) DEFAULT NULL,
  `yearly` varchar(255) DEFAULT NULL,
  `networth` varchar(255) DEFAULT NULL,
  `sepical` int(11) NOT NULL DEFAULT '0',
  `img` varchar(255) DEFAULT NULL,
  `introduction` text,
  `start` varchar(255) DEFAULT NULL,
  `opendate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for table "house"
#

DROP TABLE IF EXISTS `house`;
CREATE TABLE `house` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `price` int(9) NOT NULL DEFAULT '0',
  `unitPrice` int(11) NOT NULL DEFAULT '0',
  `shoufu` decimal(10,1) NOT NULL DEFAULT '0.0',
  `monthly` int(11) NOT NULL DEFAULT '0',
  `type` varchar(255) DEFAULT NULL,
  `orientation` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `village` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `brokersid` int(11) NOT NULL DEFAULT '0',
  `region` varchar(255) DEFAULT NULL,
  `subway` varchar(255) DEFAULT NULL,
  `feature` varchar(255) DEFAULT NULL,
  `area` decimal(10,2) NOT NULL DEFAULT '0.00',
  `img` varchar(255) DEFAULT NULL,
  `state` varchar(10) NOT NULL DEFAULT '上线',
  `housetype` varchar(255) DEFAULT NULL,
  `description` text,
  `matching` text,
  `sepical` int(11) NOT NULL DEFAULT '0',
  `projectid` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

#
# Structure for table "houserecord"
#

DROP TABLE IF EXISTS `houserecord`;
CREATE TABLE `houserecord` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datetime` varchar(255) DEFAULT NULL,
  `brokersid` int(11) DEFAULT NULL,
  `housetitle` varchar(255) DEFAULT NULL,
  `usermobile` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Structure for table "project"
#

DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `proname` varchar(255) DEFAULT NULL,
  `proaddress` varchar(255) DEFAULT NULL,
  `salesoffice` varchar(255) DEFAULT NULL,
  `developer` varchar(255) DEFAULT NULL,
  `opening` varchar(255) DEFAULT NULL,
  `others` varchar(255) DEFAULT NULL,
  `property` int(11) NOT NULL DEFAULT '0',
  `households` int(11) NOT NULL DEFAULT '0',
  `parking` varchar(255) DEFAULT NULL,
  `decoration` varchar(255) DEFAULT NULL,
  `buildingtype` varchar(255) DEFAULT NULL,
  `propertytype` varchar(255) DEFAULT NULL,
  `reference` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Structure for table "role"
#

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) NOT NULL DEFAULT '123456',
  `name` varchar(50) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

#
# Structure for table "user"
#

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `brithday` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

DROP VIEW IF EXISTS `concerned_house`;
CREATE VIEW `concerned_house` AS 
  select `concerned`.`id` AS `cid`,`concerned`.`userid` AS `userid`,`house`.`id` AS `id`,`house`.`title` AS `title`,`house`.`price` AS `price`,`house`.`unitPrice` AS `unitPrice`,`house`.`shoufu` AS `shoufu`,`house`.`monthly` AS `monthly`,`house`.`type` AS `type`,`house`.`orientation` AS `orientation`,`house`.`level` AS `level`,`house`.`village` AS `village`,`house`.`address` AS `address`,`house`.`brokersid` AS `brokersid`,`house`.`region` AS `region`,`house`.`subway` AS `subway`,`house`.`feature` AS `feature`,`house`.`area` AS `area`,`house`.`img` AS `img`,`house`.`state` AS `state`,`house`.`housetype` AS `housetype`,`house`.`description` AS `description`,`house`.`matching` AS `matching`,`house`.`sepical` AS `sepical`,`house`.`projectid` AS `projectid` from (`concerned` left join `house` on((`concerned`.`houseid` = `house`.`id`)));

DROP VIEW IF EXISTS `entrust_user`;
CREATE VIEW `entrust_user` AS 
  select `entrust`.`id` AS `id`,`entrust`.`userid` AS `userid`,`entrust`.`info` AS `info`,`entrust`.`createtime` AS `createtime`,`user`.`username` AS `username`,`user`.`name` AS `name` from (`entrust` left join `user` on((`entrust`.`userid` = `user`.`id`)));

DROP VIEW IF EXISTS `fconcerned_fund`;
CREATE VIEW `fconcerned_fund` AS 
  select `fconcerned`.`id` AS `cid`,`fconcerned`.`userid` AS `userid`,`fund`.`id` AS `id`,`fund`.`name` AS `name`,`fund`.`manager` AS `manager`,`fund`.`strategy` AS `strategy`,`fund`.`runtime` AS `runtime`,`fund`.`sixmonth` AS `sixmonth`,`fund`.`oneyear` AS `oneyear`,`fund`.`accu` AS `accu`,`fund`.`yearly` AS `yearly`,`fund`.`networth` AS `networth`,`fund`.`sepical` AS `sepical`,`fund`.`img` AS `img`,`fund`.`introduction` AS `introduction`,`fund`.`start` AS `start`,`fund`.`opendate` AS `opendate` from (`fconcerned` left join `fund` on((`fconcerned`.`fundid` = `fund`.`id`)));

DROP VIEW IF EXISTS `house_brokers`;
CREATE VIEW `house_brokers` AS 
  select `house`.`id` AS `id`,`house`.`title` AS `title`,`house`.`price` AS `price`,`house`.`unitPrice` AS `unitPrice`,`house`.`shoufu` AS `shoufu`,`house`.`monthly` AS `monthly`,`house`.`type` AS `type`,`house`.`orientation` AS `orientation`,`house`.`level` AS `level`,`house`.`village` AS `village`,`house`.`address` AS `address`,`house`.`brokersid` AS `brokersid`,`house`.`region` AS `region`,`house`.`subway` AS `subway`,`house`.`feature` AS `feature`,`house`.`area` AS `area`,`house`.`img` AS `img`,`house`.`state` AS `state`,`house`.`housetype` AS `housetype`,`house`.`description` AS `description`,`house`.`matching` AS `matching`,`house`.`sepical` AS `sepical`,`house`.`projectid` AS `projectid`,`brokers`.`name` AS `name`,`brokers`.`job` AS `job`,`brokers`.`history` AS `history`,`brokers`.`record` AS `record`,`brokers`.`tel` AS `tel`,`brokers`.`img` AS `b_img`,`project`.`pid` AS `pid`,`project`.`proname` AS `proname`,`project`.`proaddress` AS `proaddress`,`project`.`salesoffice` AS `salesoffice`,`project`.`developer` AS `developer`,`project`.`opening` AS `opening`,`project`.`others` AS `others`,`project`.`property` AS `property`,`project`.`households` AS `households`,`project`.`parking` AS `parking`,`project`.`decoration` AS `decoration`,`project`.`buildingtype` AS `buildingtype`,`project`.`propertytype` AS `propertytype`,`project`.`reference` AS `reference` from ((`house` left join `brokers` on((`house`.`brokersid` = `brokers`.`id`))) left join `project` on((`house`.`projectid` = `project`.`pid`)));

DROP VIEW IF EXISTS `house_project`;
CREATE VIEW `house_project` AS 
  select `house`.`id` AS `id`,`house`.`title` AS `title`,`house`.`price` AS `price`,`house`.`unitPrice` AS `unitPrice`,`house`.`shoufu` AS `shoufu`,`house`.`monthly` AS `monthly`,`house`.`type` AS `type`,`house`.`orientation` AS `orientation`,`house`.`level` AS `level`,`house`.`village` AS `village`,`house`.`address` AS `address`,`house`.`brokersid` AS `brokersid`,`house`.`region` AS `region`,`house`.`subway` AS `subway`,`house`.`feature` AS `feature`,`house`.`area` AS `area`,`house`.`img` AS `img`,`house`.`state` AS `state`,`house`.`housetype` AS `housetype`,`house`.`description` AS `description`,`house`.`matching` AS `matching`,`house`.`sepical` AS `sepical`,`house`.`projectid` AS `projectid`,`project`.`pid` AS `pid`,`project`.`proname` AS `proname`,`project`.`proaddress` AS `proaddress`,`project`.`salesoffice` AS `salesoffice`,`project`.`developer` AS `developer`,`project`.`opening` AS `opening`,`project`.`others` AS `others`,`project`.`property` AS `property`,`project`.`households` AS `households`,`project`.`parking` AS `parking`,`project`.`decoration` AS `decoration`,`project`.`buildingtype` AS `buildingtype`,`project`.`propertytype` AS `propertytype`,`project`.`reference` AS `reference` from (`house` left join `project` on((`house`.`projectid` = `project`.`pid`)));

DROP VIEW IF EXISTS `houserecord_brokers`;
CREATE VIEW `houserecord_brokers` AS 
  select `houserecord`.`id` AS `id`,`houserecord`.`datetime` AS `datetime`,`houserecord`.`brokersid` AS `brokersid`,`houserecord`.`housetitle` AS `housetitle`,`houserecord`.`usermobile` AS `usermobile`,`brokers`.`name` AS `name`,`brokers`.`job` AS `job`,`brokers`.`history` AS `history`,`brokers`.`record` AS `record`,`brokers`.`tel` AS `tel`,`brokers`.`img` AS `b_img`,`house`.`id` AS `houseid`,`user`.`username` AS `username`,`user`.`name` AS `customername` from (((`houserecord` left join `brokers` on((`houserecord`.`brokersid` = `brokers`.`id`))) left join `house` on((`houserecord`.`housetitle` = `house`.`title`))) left join `user` on((`houserecord`.`usermobile` = `user`.`username`)));
