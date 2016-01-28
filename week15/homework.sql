-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2016 年 01 月 28 日 11:22
-- 服务器版本: 5.6.21
-- PHP 版本: 5.4.34

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `homework9`
--
CREATE DATABASE `homework9` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `homework9`;

-- --------------------------------------------------------

--
-- 表的结构 `new1`
--

CREATE TABLE IF NOT EXISTS `new1` (
  `newsid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `newstitle` varchar(100) DEFAULT NULL,
  `newsimg` varchar(200) DEFAULT NULL,
  `newsfrom` varchar(100) DEFAULT NULL,
  `newscontent` varchar(200) DEFAULT NULL,
  `tag` int(11) DEFAULT NULL,
  `addtime` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`newsid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- 转存表中的数据 `new1`
--

INSERT INTO `new1` (`newsid`, `newstitle`, `newsimg`, `newsfrom`, `newscontent`, `tag`, `addtime`) VALUES
(1, '习近平再次集体回见部分非洲国家领导人', './image/phone/xjp.jpg', '新浪要闻', NULL, 1, '2015-10-4'),
(2, '国际财经头条：三星内幕交易调查设计多名总裁级高管', './image/phone/sanxing.jpg', '热点', NULL, 1, '2015-12-14'),
(3, '科技大事件:Facebook悄然关闭Creative Labs', './image/phone/facebook.jpg', '新热点', NULL, 1, '2015-12-14'),
(4, 'o2o创业的死亡率为何那么的高？', './image/phone/o2o.jpg', '网易新闻', NULL, 1, '2015-12-14'),
(5, '请在这里修改新闻标题newsid5', '', '修改修改', NULL, 1, '2015-12-14'),
(6, '请在这里修改新闻标题newsid6', '', '修改修改', NULL, 1, '2015-12-14'),
(7, ' 野心郎平：希望能够给中国女排留下一点财富', './image/phone/langping.jpg', NULL, NULL, 2, '2015-12-14'),
(8, '绝代双骄演员现状 燕南天身家330亿 林志颖生双胞胎', './image/phone/linzhiyin.jpg', NULL, NULL, 2, '2015-12-14'),
(9, '印度28天女婴惨遭毒手 被男子强奸血流不止', './image/phone/yindu.jpg', NULL, NULL, 2, '2015-12-14'),
(10, '女子半裸登记入住酒店,社会都发展到这个节奏了', './image/phone/banluo.jpg', NULL, NULL, 2, '2015-12-14'),
(11, '特斯拉用汽车制造边角料做出了iPhone保护套', './image/phone/tesila.jpg', NULL, NULL, 2, '2015-12-14'),
(12, '习近平再次集体回见部分非洲国家领导人', NULL, NULL, '习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人', 3, '2015-12-14'),
(13, '国际财经头条：三星内幕交易调查设计多名总裁级高管', NULL, NULL, '习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人', 3, '2015-12-14'),
(14, '科技大事件:Facebook悄然关闭Creative Labs', NULL, NULL, '习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人', 3, '2015-12-14'),
(15, 'o2o创业的死亡率为何那么的高？', NULL, NULL, '习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人', 3, '2015-12-14'),
(16, '请在这里修改新闻标题newsid5', NULL, NULL, '', 3, '修改'),
(17, '请在这里修改新闻标题newsid6', NULL, NULL, '', 3, '修改');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
