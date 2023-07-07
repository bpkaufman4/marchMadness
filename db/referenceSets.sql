-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 07, 2023 at 10:55 AM
-- Server version: 10.2.44-MariaDB
-- PHP Version: 8.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `progra39_bootstrapDev`
--

-- --------------------------------------------------------

--
-- Table structure for table `referenceSets`
--

CREATE TABLE `referenceSets` (
  `referenceSet` varchar(40) NOT NULL,
  `display` varchar(40) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletableInd` smallint(6) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `referenceSets`
--

INSERT INTO `referenceSets` (`referenceSet`, `display`, `description`, `created`, `deletableInd`) VALUES
('APPLICATIONSETTINGS', 'Application Settings', NULL, '2020-06-18 13:52:47', 1),
('BIGTEST', 'Big Test', NULL, '2020-06-19 13:35:27', 1),
('COUNTRYCODES', 'Country Codes', NULL, '2022-04-29 13:50:26', 0),
('ERRORLOGINCLUSION', 'Targets for system monitoring', NULL, '2021-06-01 12:50:37', 0),
('PATCHESCONTENTTYPE', 'patchesContent Content Types', NULL, '2022-08-31 12:39:30', 0),
('PATCHEXCLUSIONS', 'Exclusions for patches', NULL, '2020-11-10 12:19:02', 0),
('PATCHTARGETS', 'Targets for patches', NULL, '2020-11-10 12:19:02', 0),
('PINACCESSCODE', 'Pin Access Code', NULL, '2023-03-17 13:24:38', 0),
('USERSTATUS', 'User Status Codes', NULL, '2020-06-05 15:55:50', 0),
('USERTYPE', 'User Type Codes', NULL, '2020-06-05 15:55:50', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `referenceSets`
--
ALTER TABLE `referenceSets`
  ADD PRIMARY KEY (`referenceSet`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
