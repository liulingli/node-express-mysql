/*
 Navicat MySQL Data Transfer

 Source Server         : database
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 03/12/2017 21:18:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for art_stat
-- ----------------------------
DROP TABLE IF EXISTS `art_stat`;
CREATE TABLE `art_stat`  (
  `tid` int(11) NOT NULL COMMENT '文章id 主键和外键',
  `read_count` int(255) NULL DEFAULT NULL COMMENT '文章点击数',
  `upvote` int(255) NULL DEFAULT NULL COMMENT '点赞数',
  INDEX `tid`(`tid`) USING BTREE,
  CONSTRAINT `art_stat_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `blog` (`tid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog`  (
  `tid` int(11) NOT NULL COMMENT '文章id（主键）',
  `user_id` int(11) NOT NULL COMMENT '用户id (外键)',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章标题',
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章作者',
  `type` int(255) NULL DEFAULT NULL COMMENT '文章类型（1：原创，2：转载）',
  `load_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '转载地址',
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章标签',
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章描述',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `alter_time` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `state` int(255) NULL DEFAULT NULL COMMENT '文章状态（1：未审核:2：保存:3：审核通过）',
  PRIMARY KEY (`tid`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `blog_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for resource
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource`  (
  `source_id` int(11) NOT NULL COMMENT '资源id 主键',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户id 外键',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题',
  `type` int(255) NULL DEFAULT NULL COMMENT '类型',
  `sdecotation` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述信息',
  `source_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '资源下载地址',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`source_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `resource_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for response1
-- ----------------------------
DROP TABLE IF EXISTS `response1`;
CREATE TABLE `response1`  (
  `post_id` int(11) NOT NULL COMMENT '回复id',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `tid` int(11) NULL DEFAULT NULL COMMENT '文章id',
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '回复内容',
  `response` int(255) NULL DEFAULT NULL COMMENT '二级回复id',
  `creat_time` datetime(0) NULL DEFAULT NULL COMMENT '回复时间',
  PRIMARY KEY (`post_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `tid`(`tid`) USING BTREE,
  CONSTRAINT `response1_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `response1_ibfk_2` FOREIGN KEY (`tid`) REFERENCES `blog` (`tid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for response2
-- ----------------------------
DROP TABLE IF EXISTS `response2`;
CREATE TABLE `response2`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `response` int(255) NULL DEFAULT NULL COMMENT '二级回复id',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '回复内容',
  `creat_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `response2_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户密码',
  `question` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密保问题',
  `answer` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密保答案',
  `user_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户图片',
  `regtime` datetime(0) NOT NULL COMMENT '注册时间',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (7902344, 'yase', 'yase', NULL, NULL, NULL, '2017-12-03 12:00:00');
INSERT INTO `users` VALUES (7902355, 'nvwa', 'nvwa', NULL, NULL, NULL, '2017-12-03 14:34:00');
INSERT INTO `users` VALUES (7902356, 'ake', 'ake', NULL, NULL, NULL, '2017-12-03 14:55:00');
INSERT INTO `users` VALUES (7906235, 'houyi', 'houyi', NULL, NULL, NULL, '2017-12-03 14:00:00');
INSERT INTO `users` VALUES (7906236, 'zhuangzhou', 'zhuangzhou', NULL, NULL, NULL, '2017-12-03 14:00:00');
INSERT INTO `users` VALUES (7906237, 'miyue', 'miyue', NULL, NULL, NULL, '2017-12-03 14:00:00');
INSERT INTO `users` VALUES (7906319, '123', '123', NULL, NULL, NULL, '2017-12-02 23:34:46');
INSERT INTO `users` VALUES (7906321, 'yuanxia', 'yuanxia', NULL, NULL, NULL, '2017-12-03 11:12:00');
INSERT INTO `users` VALUES (7906322, 'wanyuxiao', 'wanyuxiao', NULL, NULL, NULL, '2017-12-03 11:11:11');
INSERT INTO `users` VALUES (7906323, 'yanyueying', 'yanyueying', NULL, NULL, NULL, '2017-12-03 12:00:00');
INSERT INTO `users` VALUES (7906324, 'daji', 'daji', NULL, NULL, NULL, '2017-12-03 13:00:00');
INSERT INTO `users` VALUES (9706320, 'liulingli', 'liulingli', NULL, NULL, NULL, '2017-12-03 00:00:00');

-- ----------------------------
-- Table structure for users_info
-- ----------------------------
DROP TABLE IF EXISTS `users_info`;
CREATE TABLE `users_info`  (
  `user_id` int(11) NOT NULL COMMENT '用户id(主键+外键)',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户姓名',
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户性别',
  `birthday` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '生日',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话',
  PRIMARY KEY (`user_id`) USING BTREE,
  CONSTRAINT `users_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
