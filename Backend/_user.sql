-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2022 at 12:20 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS DBPROJECT;
CREATE DATABASE DBPROJECT;
USE DBPROJECT;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `_user`
--

CREATE TABLE `_user` (
  `ID` varchar(20) NOT NULL,
  `USERNAME` varchar(20) NOT NULL,
  `_password` varchar(50) NOT NULL,
  `FNAME` varchar(15) NOT NULL,
  `SNAME` varchar(15) NOT NULL,
  `EMAIL` varchar(50) NOT NULL,
  `JOINDATE` date DEFAULT NULL,
  `ABOUT` varchar(500) DEFAULT NULL,
  `ARTICLESWRITTENCOUNT` int(11) DEFAULT NULL,
  `ISADMIN` bit(1) NOT NULL DEFAULT b'0',
  `_IMAGE` text DEFAULT '0x00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `_user`
--

INSERT INTO `_user` (`ID`, `USERNAME`, `_password`, `FNAME`, `SNAME`, `EMAIL`, `JOINDATE`, `ABOUT`, `ARTICLESWRITTENCOUNT`, `ISADMIN`, `_IMAGE`) VALUES
('1', 'ahmed', 'abc123', 'ahmed', 'ahmed', 'ahmed@ahmed.com', '2022-11-16', 'fdgsdgdsg', 1, b'0', '0x00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `_user`
--
ALTER TABLE `_user`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `USERNAME` (`USERNAME`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
