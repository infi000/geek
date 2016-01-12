-- phpMyAdmin SQL Dump
-- version 4.5.0.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2015-12-13 10:05:00
-- 服务器版本： 10.0.17-MariaDB
-- PHP Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homework8`
--
CREATE DATABASE IF NOT EXISTS `homework8` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `homework8`;

-- --------------------------------------------------------

--
-- 表的结构 `new1`
--

CREATE TABLE `new1` (
  `newsid` int(10) UNSIGNED NOT NULL,
  `newstitle` varchar(100) DEFAULT NULL,
  `newsimg` varchar(200) DEFAULT NULL,
  `newsfrom` varchar(100) DEFAULT NULL,
  `addtime` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `new1`
--

INSERT INTO `new1` (`newsid`, `newstitle`, `newsimg`, `newsfrom`, `addtime`) VALUES
(1, '习近平再次集体回见部分非洲国家领导人', './image/phone/xjp.jpg', '新浪要闻', '一天前'),
(2, '国际财经头条：三星内幕交易调查设计多名总裁级高管', './image/phone/sanxing.jpg', '热点', '2分钟前'),
(3, '科技大事件:Facebook悄然关闭Creative Labs', './image/phone/facebook.jpg', '新热点', '26分钟前'),
(4, 'o2o创业的死亡率为何那么的高？', './image/phone/o2o.jpg', '网易新闻', '一天前'),
(5, '请在这里修改新闻标题newsid5', '', '修改修改', '修改'),
(6, '请在这里修改新闻标题newsid6', '', '修改修改', '修改');

-- --------------------------------------------------------

--
-- 表的结构 `new2`
--

CREATE TABLE `new2` (
  `newsid` int(10) UNSIGNED NOT NULL,
  `newstitle` varchar(100) DEFAULT NULL,
  `newsimg` varchar(200) DEFAULT NULL,
  `addtime` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `new2`
--

INSERT INTO `new2` (`newsid`, `newstitle`, `newsimg`, `addtime`) VALUES
(1, ' 野心郎平：希望能够给中国女排留下一点财富', './image/phone/langping.jpg', '一天前'),
(2, '绝代双骄演员现状 燕南天身家330亿 林志颖生双胞胎', './image/phone/linzhiyin.jpg', '2分钟前'),
(3, '印度28天女婴惨遭毒手 被男子强奸血流不止', './image/phone/yindu.jpg', '26分钟前'),
(4, '女子半裸登记入住酒店,社会都发展到这个节奏了', './image/phone/banluo.jpg', '一天前'),
(5, '特斯拉用汽车制造边角料做出了iPhone保护套', './image/phone/tesila.jpg', '一分钟前');

-- --------------------------------------------------------

--
-- 表的结构 `new3`
--

CREATE TABLE `new3` (
  `newsid` int(10) UNSIGNED NOT NULL,
  `newstitle` varchar(100) DEFAULT NULL,
  `newscontent` varchar(200) DEFAULT NULL,
  `addtime` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `new3`
--

INSERT INTO `new3` (`newsid`, `newstitle`, `newscontent`, `addtime`) VALUES
(1, '习近平再次集体回见部分非洲国家领导人', '习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人', '一天前'),
(2, '国际财经头条：三星内幕交易调查设计多名总裁级高管', '习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人', '2分钟前'),
(3, '科技大事件:Facebook悄然关闭Creative Labs', '习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人', '26分钟前'),
(4, 'o2o创业的死亡率为何那么的高？', '习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人', '一天前'),
(5, '请在这里修改新闻标题newsid5', '', '修改'),
(6, '请在这里修改新闻标题newsid6', '', '修改');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `new1`
--
ALTER TABLE `new1`
  ADD PRIMARY KEY (`newsid`);

--
-- Indexes for table `new2`
--
ALTER TABLE `new2`
  ADD PRIMARY KEY (`newsid`);

--
-- Indexes for table `new3`
--
ALTER TABLE `new3`
  ADD PRIMARY KEY (`newsid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `new1`
--
ALTER TABLE `new1`
  MODIFY `newsid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `new2`
--
ALTER TABLE `new2`
  MODIFY `newsid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `new3`
--
ALTER TABLE `new3`
  MODIFY `newsid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
