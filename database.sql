-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Ven 01 Juillet 2016 à 12:35
-- Version du serveur :  5.7.9
-- Version de PHP :  5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `database`
--

-- --------------------------------------------------------

CREATE DATABASE `database`;
USE `database`;

--
-- Structure de la table `flags`
--

DROP TABLE IF EXISTS `flags`;
CREATE TABLE IF NOT EXISTS `flags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `record` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `flags`
--

INSERT INTO `flags` (`id`, `record`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `information_need`
--

DROP TABLE IF EXISTS `information_need`;
CREATE TABLE IF NOT EXISTS `information_need` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `information_need`
--

INSERT INTO `information_need` (`id`, `description`) VALUES
(1, 'This is the description of an information need. You need to formulate a query to search what this text explains.'),
(2, 'You need to find informations about an event that occured in Australia the 26th of January.'),
(3, 'This is the third information need'),
(4, 'This is the fourth information need'),
(5, 'This is the fifth information need'),
(6, 'This is the sixth information need');

-- --------------------------------------------------------

--
-- Structure de la table `post_questionnaire`
--

DROP TABLE IF EXISTS `post_questionnaire`;
CREATE TABLE IF NOT EXISTS `post_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pre_questionnaire`
--

DROP TABLE IF EXISTS `pre_questionnaire`;
CREATE TABLE IF NOT EXISTS `pre_questionnaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `profession` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `queries`
--

DROP TABLE IF EXISTS `queries`;
CREATE TABLE IF NOT EXISTS `queries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idInfoNeed` int(11) NOT NULL,
  `idSpoken` int(11) NOT NULL,
  `idWritten` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `queries`
--

INSERT INTO `queries` (`id`, `idInfoNeed`, `idSpoken`, `idWritten`) VALUES
(41, 1, 0, 46),
(37, 1, 68, 41),
(36, 1, 67, 42),
(38, 1, 0, 43),
(39, 1, 0, 44),
(40, 1, 0, 45);

-- --------------------------------------------------------

--
-- Structure de la table `search`
--

DROP TABLE IF EXISTS `search`;
CREATE TABLE IF NOT EXISTS `search` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(60) NOT NULL,
  `url` text NOT NULL,
  `description` varchar(160) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `search`
--

INSERT INTO `search` (`id`, `title`, `url`, `description`) VALUES
(1, 'java', 'http://api.jquery.com/jQuery.getJSON/', 'This is a website for describe the json file');

-- --------------------------------------------------------

--
-- Structure de la table `spoken_queries`
--

DROP TABLE IF EXISTS `spoken_queries`;
CREATE TABLE IF NOT EXISTS `spoken_queries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `ASR` text NOT NULL,
  `finalcontent` text NOT NULL,
  `audio_name` varchar(100) NOT NULL,
  `relevant_ids` text NOT NULL,
  `irrelevant_ids` text NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `spoken_queries`
--

INSERT INTO `spoken_queries` (`id`, `idUser`, `ASR`, `finalcontent`, `audio_name`, `relevant_ids`, `irrelevant_ids`, `time`) VALUES
(67, 1, 'test ASR 1 - info 1', 'final content - info 1', 'audio-record-Gareth-17', '1', '1', '2016-05-12 13:26:37'),
(68, 1, 'test ASR 2 - info 1', 'final content - info 1', 'audio-record-Gareth-18', '1', '1', '2016-05-12 13:26:37');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `info_need` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `login` (`password`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`user_id`, `name`, `password`, `created`, `info_need`) VALUES
(1, 'Gareth', 'e8affcce440383de6c8080f38a3582a1', '2015-08-31 11:18:22', '1-4'),
(6, 'test1', '098f6bcd4621d373cade4e832627b4f6', '2016-04-19 10:35:27', '2-3-4-5'),
(7, 'test123', '098f6bcd4621d373cade4e832627b4f6', '2016-04-20 13:56:42', ''),
(8, 'test2', '098f6bcd4621d373cade4e832627b4f6', '2016-04-20 13:57:09', '');

-- --------------------------------------------------------

--
-- Structure de la table `video_recommendation`
--

DROP TABLE IF EXISTS `video_recommendation`;
CREATE TABLE IF NOT EXISTS `video_recommendation` (
  `videoID` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `video_url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`videoID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `video_recommendation`
--

INSERT INTO `video_recommendation` (`videoID`, `title`, `description`, `video_url`) VALUES
(1, 'Deep Learning: Intelligence from Big Data', 'This is a deep learning course, you can\r\nget more information from this video course and I hoe it can help you.', 'https://www.youtube.com/embed/czLI3oLDe8M');

-- --------------------------------------------------------

--
-- Structure de la table `written_queries`
--

DROP TABLE IF EXISTS `written_queries`;
CREATE TABLE IF NOT EXISTS `written_queries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `wcontent` text NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `wr_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;

--
-- Contenu de la table `written_queries`
--

INSERT INTO `written_queries` (`id`, `idUser`, `wcontent`, `time`) VALUES
(41, 1, 'fill written - info 1', '2016-05-12 13:27:11'),
(42, 1, 'fill written 2 - info 1', '2016-05-12 13:27:20'),
(43, 1, 'test', '2016-06-23 13:10:18'),
(44, 1, 'test', '2016-06-23 13:10:41'),
(45, 1, 'test', '2016-06-23 13:13:02'),
(46, 1, 'test', '2016-06-23 13:13:45');


