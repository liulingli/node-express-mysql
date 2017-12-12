/*
Navicat MySQL Data Transfer

Source Server         : database
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2017-12-12 09:39:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `art_stat`
-- ----------------------------
DROP TABLE IF EXISTS `art_stat`;
CREATE TABLE `art_stat` (
  `tid` int(11) NOT NULL COMMENT '文章id 主键和外键',
  `read_count` int(255) DEFAULT NULL COMMENT '文章点击数',
  `upvote` int(255) DEFAULT NULL COMMENT '点赞数',
  KEY `tid` (`tid`) USING BTREE,
  CONSTRAINT `art_stat_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `blog` (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of art_stat
-- ----------------------------

-- ----------------------------
-- Table structure for `blog`
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `tid` int(11) NOT NULL COMMENT '文章id（主键）',
  `user_id` int(11) NOT NULL COMMENT '用户id (外键)',
  `title` varchar(255) DEFAULT NULL COMMENT '文章标题',
  `author` varchar(255) DEFAULT NULL COMMENT '文章作者',
  `type` int(255) DEFAULT NULL COMMENT '文章类型（1：原创，2：转载）',
  `load_url` varchar(255) DEFAULT NULL COMMENT '转载地址',
  `label` varchar(255) DEFAULT NULL COMMENT '文章标签',
  `description` varchar(255) DEFAULT NULL COMMENT '文章描述',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `alter_time` datetime DEFAULT NULL COMMENT '修改时间',
  `state` int(255) DEFAULT NULL COMMENT '文章状态（1：未审核:2：保存:3：审核通过）',
  PRIMARY KEY (`tid`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  CONSTRAINT `blog_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of blog
-- ----------------------------

-- ----------------------------
-- Table structure for `resource`
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `source_id` int(11) NOT NULL COMMENT '资源id 主键',
  `user_id` int(11) DEFAULT NULL COMMENT '用户id 外键',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `type` int(255) DEFAULT NULL COMMENT '类型',
  `sdecotation` varchar(255) DEFAULT NULL COMMENT '描述信息',
  `source_url` varchar(255) DEFAULT NULL COMMENT '资源下载地址',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`source_id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  CONSTRAINT `resource_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of resource
-- ----------------------------

-- ----------------------------
-- Table structure for `response1`
-- ----------------------------
DROP TABLE IF EXISTS `response1`;
CREATE TABLE `response1` (
  `post_id` int(11) NOT NULL COMMENT '回复id',
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `tid` int(11) DEFAULT NULL COMMENT '文章id',
  `text` varchar(255) DEFAULT NULL COMMENT '回复内容',
  `response` int(255) DEFAULT NULL COMMENT '二级回复id',
  `creat_time` datetime DEFAULT NULL COMMENT '回复时间',
  PRIMARY KEY (`post_id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  KEY `tid` (`tid`) USING BTREE,
  CONSTRAINT `response1_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `response1_ibfk_2` FOREIGN KEY (`tid`) REFERENCES `blog` (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of response1
-- ----------------------------

-- ----------------------------
-- Table structure for `response2`
-- ----------------------------
DROP TABLE IF EXISTS `response2`;
CREATE TABLE `response2` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `response` int(255) DEFAULT NULL COMMENT '二级回复id',
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `text` varchar(255) DEFAULT NULL COMMENT '回复内容',
  `creat_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  CONSTRAINT `response2_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of response2
-- ----------------------------

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '用户密码',
  `question` varchar(255) DEFAULT NULL COMMENT '密保问题',
  `answer` varchar(255) DEFAULT NULL COMMENT '密保答案',
  `user_img` varchar(255) DEFAULT NULL COMMENT '用户图片',
  `regtime` datetime NOT NULL COMMENT '注册时间',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'yase', 'yase', null, null, null, '2017-12-03 12:00:00');
INSERT INTO `users` VALUES ('2', 'nvwa', 'nvwa', null, null, null, '2017-12-03 14:34:00');
INSERT INTO `users` VALUES ('3', 'ake', 'ake', null, null, null, '2017-12-03 14:55:00');
INSERT INTO `users` VALUES ('4', 'houyi', 'houyi', null, null, null, '2017-12-03 14:00:00');
INSERT INTO `users` VALUES ('5', 'zhuangzhou', 'zhuangzhou', null, null, null, '2017-12-03 14:00:00');
INSERT INTO `users` VALUES ('6', 'miyue', 'miyue', null, null, null, '2017-12-03 14:00:00');
INSERT INTO `users` VALUES ('7', '123', '123', null, null, null, '2017-12-02 23:34:46');
INSERT INTO `users` VALUES ('8', 'yuanxia', 'yuanxia', null, null, null, '2017-12-03 11:12:00');
INSERT INTO `users` VALUES ('9', 'wanyuxiao', 'wanyuxiao', null, null, null, '2017-12-03 11:11:11');
INSERT INTO `users` VALUES ('10', 'yanyueying', 'yanyueying', null, null, null, '2017-12-03 12:00:00');
INSERT INTO `users` VALUES ('11', 'daji', 'daji', null, null, null, '2017-12-03 13:00:00');
INSERT INTO `users` VALUES ('12', 'liulingli', 'liulingli', null, null, null, '2017-12-03 00:00:00');

-- ----------------------------
-- Table structure for `users_info`
-- ----------------------------
DROP TABLE IF EXISTS `users_info`;
CREATE TABLE `users_info` (
  `user_id` int(11) NOT NULL COMMENT '用户id(主键+外键)',
  `name` varchar(255) DEFAULT NULL COMMENT '用户姓名',
  `sex` varchar(255) DEFAULT NULL COMMENT '用户性别',
  `birthday` varchar(255) DEFAULT NULL COMMENT '生日',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `tel` varchar(255) DEFAULT NULL COMMENT '电话',
  PRIMARY KEY (`user_id`) USING BTREE,
  CONSTRAINT `users_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of users_info
-- ----------------------------
