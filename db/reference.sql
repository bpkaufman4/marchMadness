-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 07, 2023 at 11:18 AM
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

--
-- Dumping data for table `reference`
--

INSERT INTO `reference` (`referenceCd`, `referenceSet`, `referenceMeaning`, `display`, `description`, `activeInd`, `created`) VALUES
('0022df55-c2d8-11eb-96e5-ee86d28a3c90', 'ERRORLOGINCLUSION', NULL, 'Root Error Log', '/home/progra39/public_html/projects/sandbox/forge/error_log', 1, '2021-06-01 12:50:53'),
('0022e29d-c2d8-11eb-96e5-ee86d28a3c90', 'ERRORLOGINCLUSION', NULL, 'Model Error Log', '/home/progra39/public_html/projects/sandbox/forge/model/error_log', 1, '2021-06-01 12:50:53'),
('0022e330-c2d8-11eb-96e5-ee86d28a3c90', 'ERRORLOGINCLUSION', NULL, 'doIt Root Error', '/home/progra39/public_html/projects/sandbox/forge/doIt/error_log', 1, '2021-06-01 12:50:53'),
('0022e38e-c2d8-11eb-96e5-ee86d28a3c90', 'ERRORLOGINCLUSION', NULL, 'Controller Root Error', '/home/progra39/public_html/projects/sandbox/forge/controller/error_log', 1, '2021-06-01 12:50:53'),
('0713aaf3-a745-11ea-8ab8-ccec3d6c67c0', 'USERTYPE', 'ADMINISTRATOR', 'Administrator', NULL, 1, '2020-06-05 15:55:50'),
('0713ae73-a745-11ea-8ab8-ccec3d6c67c0', 'USERTYPE', 'USER', 'User', NULL, 1, '2020-06-05 15:55:50'),
('0713af54-a745-11ea-8ab8-ccec3d6c67c0', 'USERSTATUS', 'ACTIVE', 'Active', NULL, 1, '2020-06-05 15:55:50'),
('0713b02e-a745-11ea-8ab8-ccec3d6c67c0', 'USERSTATUS', 'CREATING', 'Creating', NULL, 1, '2020-06-05 15:55:50'),
('0713b0ca-a745-11ea-8ab8-ccec3d6c67c0', 'USERSTATUS', 'PENDING', 'Pending', NULL, 1, '2020-06-05 15:55:50'),
('0713b156-a745-11ea-8ab8-ccec3d6c67c0', 'USERSTATUS', 'DELETED', 'Deleted', NULL, 1, '2020-06-05 15:55:50'),
('0713b1e4-a745-11ea-8ab8-ccec3d6c67c0', 'USERSTATUS', 'VERIFYING EMAIL', 'Awaiting user verification of EMAIL', NULL, 1, '2020-06-05 15:55:50'),
('0713b291-a745-11ea-8ab8-ccec3d6c67c0', 'USERSTATUS', 'REJECTED', 'User was rejected', NULL, 1, '2020-06-05 15:55:50'),
('312fc300-b235-11ea-8da0-d412da13d0d7', 'APPLICATIONSETTINGS', 'EXAMPLESETTING2', 'Example Setting 2', NULL, 1, '2020-06-19 14:00:11'),
('35b4f219-40ba-11ed-812c-b07537b5e55c', 'PATCHEXCLUSIONS', NULL, 'tempImages', NULL, 1, '2022-09-30 12:20:02'),
('42806979-40ba-11ed-812c-b07537b5e55c', 'PATCHEXCLUSIONS', NULL, 'editorImages', NULL, 1, '2022-09-30 12:20:24'),
('819b875b-32c1-11ed-8fe9-da2e572acc82', 'PATCHESCONTENTTYPE', 'staticContent', 'Static Content', NULL, 1, '2022-09-12 17:37:00'),
('899267c8-39ea-11ed-812c-b07537b5e55c', 'PATCHESCONTENTTYPE', 'notificationTemplate', 'Notification Templates', NULL, 1, '2022-09-21 20:18:21'),
('95b572aa-5458-11ec-aa40-dc9e7fa4b6a4', 'PATCHEXCLUSIONS', NULL, 'error_log', NULL, 1, '2021-12-03 16:46:38'),
('95b57531-5458-11ec-aa40-dc9e7fa4b6a4', 'PATCHEXCLUSIONS', NULL, '.ftpquota', NULL, 1, '2021-12-03 16:46:38'),
('a1579f61-39eb-11ed-812c-b07537b5e55c', 'PATCHESCONTENTTYPE', 'notificationTemplateParameter', 'Notification Templlate Parameters', NULL, 1, '2022-09-21 20:26:10'),
('ac6ef613-c4c7-11ed-b0d9-a61678181008', 'PINACCESSCODE', 'PINACCESSCODE', 'Pin Access Code', NULL, 1, '2023-03-17 13:28:58'),
('b55c0601-25fa-11ec-9906-abc5d8e90765', 'PATCHTARGETS', NULL, 'LIVE', '../bootstrapLive', 1, '2021-10-05 16:38:45'),
('b999bfcb-e5a4-11ec-8b69-cdf5630e1d68', 'PATCHEXCLUSIONS', NULL, 'vendor', NULL, 1, '2022-06-06 14:26:59'),
('bbdb1c87-92d0-11ed-bcbc-12866b84551c', 'PATCHEXCLUSIONS', NULL, '2fa', NULL, 1, '2023-01-12 23:27:52'),
('d519d495-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'AF', 'Afghanistan', NULL, 1, '2022-04-29 13:54:04'),
('d51c61a5-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'AL', 'Albania', NULL, 1, '2022-04-29 13:54:04'),
('d52237aa-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'DZ', 'Algeria', NULL, 1, '2022-04-29 13:54:04'),
('d523bcbe-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'AS', 'American Samoa', NULL, 1, '2022-04-29 13:54:05'),
('d5250575-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'AO', 'Angola', NULL, 1, '2022-04-29 13:54:05'),
('d525717f-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'AD', 'Andorra', NULL, 1, '2022-04-29 13:54:05'),
('d526c2c2-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'AQ', 'Antarctica', NULL, 1, '2022-04-29 13:54:05'),
('d52723eb-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'AI', 'Anguilla', NULL, 1, '2022-04-29 13:54:05'),
('d5297c4f-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'AG', 'Antigua and Barbuda', NULL, 1, '2022-04-29 13:54:05'),
('d52aabc7-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'AR', 'Argentina', NULL, 1, '2022-04-29 13:54:05'),
('d52fc683-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'AM', 'Armenia', NULL, 1, '2022-04-29 13:54:05'),
('d5307038-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'AU', 'Australia', NULL, 1, '2022-04-29 13:54:05'),
('d5315eb9-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'AW', 'Aruba', NULL, 1, '2022-04-29 13:54:05'),
('d532aa73-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'AT', 'Austria', NULL, 1, '2022-04-29 13:54:05'),
('d5334671-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'AZ', 'Azerbaijan', NULL, 1, '2022-04-29 13:54:05'),
('d5357061-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BS', 'Bahamas', NULL, 1, '2022-04-29 13:54:05'),
('d5360958-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BH', 'Bahrain', NULL, 1, '2022-04-29 13:54:05'),
('d536ee42-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BD', 'Bangladesh', NULL, 1, '2022-04-29 13:54:05'),
('d5384d3e-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BB', 'Barbados', NULL, 1, '2022-04-29 13:54:05'),
('d538d88c-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BY', 'Belarus', NULL, 1, '2022-04-29 13:54:05'),
('d53974d2-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BE', 'Belgium', NULL, 1, '2022-04-29 13:54:05'),
('d53b71e9-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BZ', 'Belize', NULL, 1, '2022-04-29 13:54:05'),
('d53c1c0c-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BJ', 'Benin', NULL, 1, '2022-04-29 13:54:05'),
('d53d7063-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BM', 'Bermuda', NULL, 1, '2022-04-29 13:54:05'),
('d53e79cb-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BT', 'Bhutan', NULL, 1, '2022-04-29 13:54:05'),
('d53f6610-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BO', 'Bolivia, Plurinational State of', NULL, 1, '2022-04-29 13:54:05'),
('d5408663-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BQ', 'Bonaire, Sint Eustatius and Saba', NULL, 1, '2022-04-29 13:54:05'),
('d5418fee-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BA', 'Bosnia and Herzegovina', NULL, 1, '2022-04-29 13:54:05'),
('d5422df2-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BW', 'Botswana', NULL, 1, '2022-04-29 13:54:05'),
('d5447b75-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'IO', 'British Indian Ocean Territory', NULL, 1, '2022-04-29 13:54:05'),
('d544e34c-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BR', 'Brazil', NULL, 1, '2022-04-29 13:54:05'),
('d54648cd-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BN', 'Brunei Darussalam', NULL, 1, '2022-04-29 13:54:05'),
('d547aeb1-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BG', 'Bulgaria', NULL, 1, '2022-04-29 13:54:05'),
('d5482acb-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BF', 'Burkina Faso', NULL, 1, '2022-04-29 13:54:05'),
('d54a94ce-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BI', 'Burundi', NULL, 1, '2022-04-29 13:54:05'),
('d54b062b-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'KH', 'Cambodia', NULL, 1, '2022-04-29 13:54:05'),
('d54c5631-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CM', 'Cameroon', NULL, 1, '2022-04-29 13:54:05'),
('d54dedaa-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CA', 'Canada', NULL, 1, '2022-04-29 13:54:05'),
('d54e7507-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CV', 'Cape Verde', NULL, 1, '2022-04-29 13:54:05'),
('d550a772-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'KY', 'Cayman Islands', NULL, 1, '2022-04-29 13:54:05'),
('d5513908-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CF', 'Central African Republic', NULL, 1, '2022-04-29 13:54:05'),
('d552d905-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'TD', 'Chad', NULL, 1, '2022-04-29 13:54:05'),
('d5535b48-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CL', 'Chile', NULL, 1, '2022-04-29 13:54:05'),
('d55447bd-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CN', 'China', NULL, 1, '2022-04-29 13:54:05'),
('d555424c-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CX', 'Christmas Island', NULL, 1, '2022-04-29 13:54:05'),
('d5570127-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CC', 'Cocos (Keeling) Islands', NULL, 1, '2022-04-29 13:54:05'),
('d55882b0-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CO', 'Colombia', NULL, 1, '2022-04-29 13:54:05'),
('d55a36bc-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'KM', 'Comoros', NULL, 1, '2022-04-29 13:54:05'),
('d55c05e3-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CG', 'Congo', NULL, 1, '2022-04-29 13:54:05'),
('d55d6975-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CD', 'Congo, the Democratic Republic of the', NULL, 1, '2022-04-29 13:54:05'),
('d55f3bb1-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CK', 'Cook Islands', NULL, 1, '2022-04-29 13:54:05'),
('d560919e-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CR', 'Costa Rica', NULL, 1, '2022-04-29 13:54:05'),
('d561c6f1-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CU', 'Cuba', NULL, 1, '2022-04-29 13:54:05'),
('d562987a-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'HR', 'Croatia', NULL, 1, '2022-04-29 13:54:05'),
('d5633762-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CW', 'Curaçao', NULL, 1, '2022-04-29 13:54:05'),
('d564f9f6-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CY', 'Cyprus', NULL, 1, '2022-04-29 13:54:05'),
('d56632bb-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CZ', 'Czech Republic', NULL, 1, '2022-04-29 13:54:05'),
('d5676e37-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CI', 'Côte d\'Ivoire', NULL, 1, '2022-04-29 13:54:05'),
('d56833ba-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'DK', 'Denmark', NULL, 1, '2022-04-29 13:54:05'),
('d568ff39-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'DJ', 'Djibouti', NULL, 1, '2022-04-29 13:54:05'),
('d569ea10-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'DM', 'Dominica', NULL, 1, '2022-04-29 13:54:05'),
('d56b6ef7-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'DO', 'Dominican Republic', NULL, 1, '2022-04-29 13:54:05'),
('d56c82a5-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'EC', 'Ecuador', NULL, 1, '2022-04-29 13:54:05'),
('d56daf28-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'EG', 'Egypt', NULL, 1, '2022-04-29 13:54:05'),
('d56eb1e5-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SV', 'El Salvador', NULL, 1, '2022-04-29 13:54:05'),
('d56f5077-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GQ', 'Equatorial Guinea', NULL, 1, '2022-04-29 13:54:05'),
('d571095a-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'ER', 'Eritrea', NULL, 1, '2022-04-29 13:54:05'),
('d572dfcd-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'EE', 'Estonia', NULL, 1, '2022-04-29 13:54:05'),
('d5744270-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'ET', 'Ethiopia', NULL, 1, '2022-04-29 13:54:05'),
('d5760778-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'FK', 'Falkland Islands (Malvinas)', NULL, 1, '2022-04-29 13:54:05'),
('d577b63d-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'FO', 'Faroe Islands', NULL, 1, '2022-04-29 13:54:05'),
('d5792fd7-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'FJ', 'Fiji', NULL, 1, '2022-04-29 13:54:05'),
('d57b4848-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'FI', 'Finland', NULL, 1, '2022-04-29 13:54:05'),
('d57be1b5-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'FR', 'France', NULL, 1, '2022-04-29 13:54:05'),
('d57d100a-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GF', 'French Guiana', NULL, 1, '2022-04-29 13:54:05'),
('d57eaeba-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'PF', 'French Polynesia', NULL, 1, '2022-04-29 13:54:05'),
('d57fdbdb-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'TF', 'French Southern Territories', NULL, 1, '2022-04-29 13:54:05'),
('d5811a00-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GA', 'Gabon', NULL, 1, '2022-04-29 13:54:05'),
('d582a41b-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GM', 'Gambia', NULL, 1, '2022-04-29 13:54:05'),
('d5837e9c-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GE', 'Georgia', NULL, 1, '2022-04-29 13:54:05'),
('d5856506-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'DE', 'Germany', NULL, 1, '2022-04-29 13:54:05'),
('d5861ccc-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GH', 'Ghana', NULL, 1, '2022-04-29 13:54:05'),
('d586c72b-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GI', 'Gibraltar', NULL, 1, '2022-04-29 13:54:05'),
('d5884c60-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GR', 'Greece', NULL, 1, '2022-04-29 13:54:05'),
('d5892c57-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GL', 'Greenland', NULL, 1, '2022-04-29 13:54:05'),
('d58b08a7-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GD', 'Grenada', NULL, 1, '2022-04-29 13:54:05'),
('d58cb81c-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GP', 'Guadeloupe', NULL, 1, '2022-04-29 13:54:05'),
('d58e43f6-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GU', 'Guam', NULL, 1, '2022-04-29 13:54:05'),
('d58ea463-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GT', 'Guatemala', NULL, 1, '2022-04-29 13:54:05'),
('d58f1c0b-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GG', 'Guernsey', NULL, 1, '2022-04-29 13:54:05'),
('d58f7b2a-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GN', 'Guinea', NULL, 1, '2022-04-29 13:54:05'),
('d5926214-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GW', 'Guinea-Bissau', NULL, 1, '2022-04-29 13:54:05'),
('d59457c9-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GY', 'Guyana', NULL, 1, '2022-04-29 13:54:05'),
('d5969e45-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'HT', 'Haiti', NULL, 1, '2022-04-29 13:54:05'),
('d5972dae-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'VA', 'Holy See (Vatican City State)', NULL, 1, '2022-04-29 13:54:05'),
('d597f129-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'HN', 'Honduras', NULL, 1, '2022-04-29 13:54:05'),
('d59851d0-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'HK', 'Hong Kong', NULL, 1, '2022-04-29 13:54:05'),
('d599f1f5-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'HU', 'Hungary', NULL, 1, '2022-04-29 13:54:05'),
('d59c5f36-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'IS', 'Iceland', NULL, 1, '2022-04-29 13:54:05'),
('d59f009d-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'IN', 'India', NULL, 1, '2022-04-29 13:54:05'),
('d5a0474f-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'ID', 'Indonesia', NULL, 1, '2022-04-29 13:54:05'),
('d5a2a97d-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'IR', 'Iran, Islamic Republic of', NULL, 1, '2022-04-29 13:54:05'),
('d5a4a9db-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'IM', 'Isle of Man', NULL, 1, '2022-04-29 13:54:05'),
('d5a650cc-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'IQ', 'Iraq', NULL, 1, '2022-04-29 13:54:05'),
('d5a8aabc-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'IE', 'Ireland', NULL, 1, '2022-04-29 13:54:05'),
('d5aaa122-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'IT', 'Italy', NULL, 1, '2022-04-29 13:54:05'),
('d5ac6c7d-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'IL', 'Israel', NULL, 1, '2022-04-29 13:54:05'),
('d5adf749-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'JM', 'Jamaica', NULL, 1, '2022-04-29 13:54:05'),
('d5ae50aa-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'JP', 'Japan', NULL, 1, '2022-04-29 13:54:05'),
('d5aeb971-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'JE', 'Jersey', NULL, 1, '2022-04-29 13:54:05'),
('d5b03909-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'JO', 'Jordan', NULL, 1, '2022-04-29 13:54:05'),
('d5b1f901-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'KZ', 'Kazakhstan', NULL, 1, '2022-04-29 13:54:05'),
('d5b3ba22-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'KE', 'Kenya', NULL, 1, '2022-04-29 13:54:05'),
('d5b438f1-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'KI', 'Kiribati', NULL, 1, '2022-04-29 13:54:05'),
('d5b4b12b-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'KP', 'Korea, Democratic People\'s Republic of', NULL, 1, '2022-04-29 13:54:05'),
('d5b5314d-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'KR', 'Korea, Republic of', NULL, 1, '2022-04-29 13:54:05'),
('d5b633ed-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'KW', 'Kuwait', NULL, 1, '2022-04-29 13:54:05'),
('d5b862ad-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'KG', 'Kyrgyzstan', NULL, 1, '2022-04-29 13:54:05'),
('d5ba390f-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'LA', 'Lao People\'s Democratic Republic', NULL, 1, '2022-04-29 13:54:05'),
('d5bbb4c0-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'LV', 'Latvia', NULL, 1, '2022-04-29 13:54:06'),
('d5be614c-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'LB', 'Lebanon', NULL, 1, '2022-04-29 13:54:06'),
('d5bf3ec3-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'LS', 'Lesotho', NULL, 1, '2022-04-29 13:54:06'),
('d5bf9988-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'LR', 'Liberia', NULL, 1, '2022-04-29 13:54:06'),
('d5bff461-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'LY', 'Libya', NULL, 1, '2022-04-29 13:54:06'),
('d5c12da8-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'LI', 'Liechtenstein', NULL, 1, '2022-04-29 13:54:06'),
('d5c3ef1e-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'LT', 'Lithuania', NULL, 1, '2022-04-29 13:54:06'),
('d5c4eb8f-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'LU', 'Luxembourg', NULL, 1, '2022-04-29 13:54:06'),
('d5c7eadd-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MO', 'Macao', NULL, 1, '2022-04-29 13:54:06'),
('d5c83f99-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MK', 'Macedonia, the Former Yugoslav Republic of', NULL, 1, '2022-04-29 13:54:06'),
('d5c89ea4-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MW', 'Malawi', NULL, 1, '2022-04-29 13:54:06'),
('d5c8f6b9-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MG', 'Madagascar', NULL, 1, '2022-04-29 13:54:06'),
('d5ca83da-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MY', 'Malaysia', NULL, 1, '2022-04-29 13:54:06'),
('d5cd9a8b-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MV', 'Maldives', NULL, 1, '2022-04-29 13:54:06'),
('d5cdfa96-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'ML', 'Mali', NULL, 1, '2022-04-29 13:54:06'),
('d5ce9c16-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MH', 'Marshall Islands', NULL, 1, '2022-04-29 13:54:06'),
('d5ceeffd-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MQ', 'Martinique', NULL, 1, '2022-04-29 13:54:06'),
('d5cf6320-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MT', 'Malta', NULL, 1, '2022-04-29 13:54:06'),
('d5d0cfe4-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MR', 'Mauritania', NULL, 1, '2022-04-29 13:54:06'),
('d5d3adea-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MU', 'Mauritius', NULL, 1, '2022-04-29 13:54:06'),
('d5d42df1-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'YT', 'Mayotte', NULL, 1, '2022-04-29 13:54:06'),
('d5d49fca-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MX', 'Mexico', NULL, 1, '2022-04-29 13:54:06'),
('d5d5017a-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'FM', 'Micronesia, Federated States of', NULL, 1, '2022-04-29 13:54:06'),
('d5d5bdfa-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MD', 'Moldova, Republic of', NULL, 1, '2022-04-29 13:54:06'),
('d5d76e30-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MC', 'Monaco', NULL, 1, '2022-04-29 13:54:06'),
('d5d9b2c8-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MN', 'Mongolia', NULL, 1, '2022-04-29 13:54:06'),
('d5da3ace-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'ME', 'Montenegro', NULL, 1, '2022-04-29 13:54:06'),
('d5dac0b9-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MS', 'Montserrat', NULL, 1, '2022-04-29 13:54:06'),
('d5db5a1d-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MA', 'Morocco', NULL, 1, '2022-04-29 13:54:06'),
('d5dbb858-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MZ', 'Mozambique', NULL, 1, '2022-04-29 13:54:06'),
('d5ddbf20-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MM', 'Myanmar', NULL, 1, '2022-04-29 13:54:06'),
('d5dfdf8c-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'NA', 'Namibia', NULL, 1, '2022-04-29 13:54:06'),
('d5e0712b-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'NR', 'Nauru', NULL, 1, '2022-04-29 13:54:06'),
('d5e0d3c7-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'NP', 'Nepal', NULL, 1, '2022-04-29 13:54:06'),
('d5e16756-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'NL', 'Netherlands', NULL, 1, '2022-04-29 13:54:06'),
('d5e1d6c5-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'NC', 'New Caledonia', NULL, 1, '2022-04-29 13:54:06'),
('d5e3c511-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'NZ', 'New Zealand', NULL, 1, '2022-04-29 13:54:06'),
('d5e5ef78-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'NI', 'Nicaragua', NULL, 1, '2022-04-29 13:54:06'),
('d5e67ee4-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'NE', 'Niger', NULL, 1, '2022-04-29 13:54:06'),
('d5e6e2ba-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'NG', 'Nigeria', NULL, 1, '2022-04-29 13:54:06'),
('d5e7c7ef-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'NU', 'Niue', NULL, 1, '2022-04-29 13:54:06'),
('d5e8d884-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'NF', 'Norfolk Island', NULL, 1, '2022-04-29 13:54:06'),
('d5e9f176-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MP', 'Northern Mariana Islands', NULL, 1, '2022-04-29 13:54:06'),
('d5ec252a-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'NO', 'Norway', NULL, 1, '2022-04-29 13:54:06'),
('d5ec9769-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'OM', 'Oman', NULL, 1, '2022-04-29 13:54:06'),
('d5ece596-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'PK', 'Pakistan', NULL, 1, '2022-04-29 13:54:06'),
('d5eed463-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'PW', 'Palau', NULL, 1, '2022-04-29 13:54:06'),
('d5f03a0a-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'PS', 'Palestine, State of', NULL, 1, '2022-04-29 13:54:06'),
('d5f11145-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'PA', 'Panama', NULL, 1, '2022-04-29 13:54:06'),
('d5f21893-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'PG', 'Papua New Guinea', NULL, 1, '2022-04-29 13:54:06'),
('d5f2845a-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'PY', 'Paraguay', NULL, 1, '2022-04-29 13:54:06'),
('d5f2db9f-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'PE', 'Peru', NULL, 1, '2022-04-29 13:54:06'),
('d5f5e6e1-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'PH', 'Philippines', NULL, 1, '2022-04-29 13:54:06'),
('d5f7a16b-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'PN', 'Pitcairn', NULL, 1, '2022-04-29 13:54:06'),
('d5f883a9-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'PL', 'Poland', NULL, 1, '2022-04-29 13:54:06'),
('d5f8e9a1-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'PT', 'Portugal', NULL, 1, '2022-04-29 13:54:06'),
('d5f94992-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'PR', 'Puerto Rico', NULL, 1, '2022-04-29 13:54:06'),
('d5f998f9-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'QA', 'Qatar', NULL, 1, '2022-04-29 13:54:06'),
('d5fd422c-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'RO', 'Romania', NULL, 1, '2022-04-29 13:54:06'),
('d5fe191c-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'RU', 'Russian Federation', NULL, 1, '2022-04-29 13:54:06'),
('d5fe775d-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'RW', 'Rwanda', NULL, 1, '2022-04-29 13:54:06'),
('d5fedebd-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'RE', 'Réunion', NULL, 1, '2022-04-29 13:54:06'),
('d5ff40bc-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'BL', 'Saint Barthélemy', NULL, 1, '2022-04-29 13:54:06'),
('d5ff90a7-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SH', 'Saint Helena, Ascension and Tristan da Cunha', NULL, 1, '2022-04-29 13:54:06'),
('d6035b34-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'KN', 'Saint Kitts and Nevis', NULL, 1, '2022-04-29 13:54:06'),
('d6040f98-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'LC', 'Saint Lucia', NULL, 1, '2022-04-29 13:54:06'),
('d6047117-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'MF', 'Saint Martin (French part)', NULL, 1, '2022-04-29 13:54:06'),
('d604eae5-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'PM', 'Saint Pierre and Miquelon', NULL, 1, '2022-04-29 13:54:06'),
('d605e02d-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'VC', 'Saint Vincent and the Grenadines', NULL, 1, '2022-04-29 13:54:06'),
('d60684c5-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'WS', 'Samoa', NULL, 1, '2022-04-29 13:54:06'),
('d609b574-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SM', 'San Marino', NULL, 1, '2022-04-29 13:54:06'),
('d60a1685-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'ST', 'Sao Tome and Principe', NULL, 1, '2022-04-29 13:54:06'),
('d60a67fc-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SA', 'Saudi Arabia', NULL, 1, '2022-04-29 13:54:06'),
('d60b7a61-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SN', 'Senegal', NULL, 1, '2022-04-29 13:54:06'),
('d60c1de6-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'RS', 'Serbia', NULL, 1, '2022-04-29 13:54:06'),
('d60c9032-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SC', 'Seychelles', NULL, 1, '2022-04-29 13:54:06'),
('d60fc283-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SL', 'Sierra Leone', NULL, 1, '2022-04-29 13:54:06'),
('d610212f-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SG', 'Singapore', NULL, 1, '2022-04-29 13:54:06'),
('d610efc4-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SX', 'Sint Maarten (Dutch part)', NULL, 1, '2022-04-29 13:54:06'),
('d61172fa-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SK', 'Slovakia', NULL, 1, '2022-04-29 13:54:06'),
('d6123ad4-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SI', 'Slovenia', NULL, 1, '2022-04-29 13:54:06'),
('d6129e93-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SB', 'Solomon Islands', NULL, 1, '2022-04-29 13:54:06'),
('d615db4a-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SO', 'Somalia', NULL, 1, '2022-04-29 13:54:06'),
('d616a137-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'ZA', 'South Africa', NULL, 1, '2022-04-29 13:54:06'),
('d6172803-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GS', 'South Georgia and the South Sandwich Islands', NULL, 1, '2022-04-29 13:54:06'),
('d6178fe0-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SS', 'South Sudan', NULL, 1, '2022-04-29 13:54:06'),
('d6188580-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'ES', 'Spain', NULL, 1, '2022-04-29 13:54:06'),
('d61984d3-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'LK', 'Sri Lanka', NULL, 1, '2022-04-29 13:54:06'),
('d61c028e-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SD', 'Sudan', NULL, 1, '2022-04-29 13:54:06'),
('d61cdccd-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SR', 'Suriname', NULL, 1, '2022-04-29 13:54:06'),
('d61d584f-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SJ', 'Svalbard and Jan Mayen', NULL, 1, '2022-04-29 13:54:06'),
('d61dec2a-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SZ', 'Swaziland', NULL, 1, '2022-04-29 13:54:06'),
('d61f2836-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SE', 'Sweden', NULL, 1, '2022-04-29 13:54:06'),
('d61fb5ed-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'CH', 'Switzerland', NULL, 1, '2022-04-29 13:54:06'),
('d622458c-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'SY', 'Syrian Arab Republic', NULL, 1, '2022-04-29 13:54:06'),
('d623298b-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'TW', 'Taiwan, Province of China', NULL, 1, '2022-04-29 13:54:06'),
('d62404ed-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'TJ', 'Tajikistan', NULL, 1, '2022-04-29 13:54:06'),
('d6248433-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'TZ', 'Tanzania, United Republic of', NULL, 1, '2022-04-29 13:54:06'),
('d625af22-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'TH', 'Thailand', NULL, 1, '2022-04-29 13:54:06'),
('d626a196-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'TL', 'Timor-Leste', NULL, 1, '2022-04-29 13:54:06'),
('d628d97a-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'TG', 'Togo', NULL, 1, '2022-04-29 13:54:06'),
('d629aa28-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'TK', 'Tokelau', NULL, 1, '2022-04-29 13:54:06'),
('d62a4084-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'TO', 'Tonga', NULL, 1, '2022-04-29 13:54:06'),
('d62aa1ab-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'TT', 'Trinidad and Tobago', NULL, 1, '2022-04-29 13:54:06'),
('d62c8e0c-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'TN', 'Tunisia', NULL, 1, '2022-04-29 13:54:06'),
('d62db011-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'TR', 'Turkey', NULL, 1, '2022-04-29 13:54:06'),
('d62f369c-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'TM', 'Turkmenistan', NULL, 1, '2022-04-29 13:54:06'),
('d62fb6a1-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'TC', 'Turks and Caicos Islands', NULL, 1, '2022-04-29 13:54:06'),
('d6303ff6-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'TV', 'Tuvalu', NULL, 1, '2022-04-29 13:54:06'),
('d630e3c5-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'UG', 'Uganda', NULL, 1, '2022-04-29 13:54:06'),
('d6335bab-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'UA', 'Ukraine', NULL, 1, '2022-04-29 13:54:06'),
('d634e429-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'AE', 'United Arab Emirates', NULL, 1, '2022-04-29 13:54:06'),
('d63556da-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'GB', 'United Kingdom', NULL, 1, '2022-04-29 13:54:06'),
('d6366977-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'US', 'United States', NULL, 1, '2022-04-29 13:54:06'),
('d6371653-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'UM', 'United States Minor Outlying Islands', NULL, 1, '2022-04-29 13:54:06'),
('d6378bae-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'UY', 'Uruguay', NULL, 1, '2022-04-29 13:54:06'),
('d6397965-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'UZ', 'Uzbekistan', NULL, 1, '2022-04-29 13:54:06'),
('d63afa2f-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'VU', 'Vanuatu', NULL, 1, '2022-04-29 13:54:06'),
('d63c26be-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'VE', 'Venezuela, Bolivarian Republic of', NULL, 1, '2022-04-29 13:54:06'),
('d63ccf04-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'VN', 'Viet Nam', NULL, 1, '2022-04-29 13:54:06'),
('d63d3c22-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'VG', 'Virgin Islands, British', NULL, 1, '2022-04-29 13:54:06'),
('d63d9fdc-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'VI', 'Virgin Islands, U.S.', NULL, 1, '2022-04-29 13:54:06'),
('d63fa5f0-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'WF', 'Wallis and Futuna', NULL, 1, '2022-04-29 13:54:06'),
('d640fad7-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'EH', 'Western Sahara', NULL, 1, '2022-04-29 13:54:06'),
('d6421eb3-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'YE', 'Yemen', NULL, 1, '2022-04-29 13:54:06'),
('d642e548-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'ZM', 'Zambia', NULL, 1, '2022-04-29 13:54:06'),
('d6434917-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'ZW', 'Zimbabwe', NULL, 1, '2022-04-29 13:54:06'),
('d643c2d9-c7c3-11ec-82d8-b58a913c769b', 'COUNTRYCODES', 'AX', 'Åland Islands', NULL, 1, '2022-04-29 13:54:06'),
('dc4f6dc8-a216-11ec-870f-2f089befdf90', 'PATCHEXCLUSIONS', NULL, 'mapTest.php', NULL, 1, '2022-03-12 15:12:41'),
('f568539e-234e-11eb-b002-c878019c0b63', 'PATCHEXCLUSIONS', NULL, 'PHPMailer', NULL, 1, '2020-11-10 12:19:19'),
('f5685675-234e-11eb-b002-c878019c0b63', 'PATCHEXCLUSIONS', NULL, 'fpdf', NULL, 1, '2020-11-10 12:19:19'),
('f56856f5-234e-11eb-b002-c878019c0b63', 'PATCHEXCLUSIONS', NULL, 'froala', NULL, 1, '2020-11-10 12:19:19'),
('f5685745-234e-11eb-b002-c878019c0b63', 'PATCHEXCLUSIONS', NULL, 'config.php', NULL, 1, '2020-11-10 12:19:19'),
('f58666ba-0c52-11ee-b217-3ddb965f1651', 'PATCHEXCLUSIONS', NULL, '.ftp-deploy-sync-state.json', NULL, 1, '2023-06-16 14:34:54'),
('f5c6cc2c-5489-11ec-aa40-dc9e7fa4b6a4', 'PATCHEXCLUSIONS', NULL, '.htaccess', NULL, 1, '2021-12-03 22:40:05'),
('fdda3322-b16a-11ea-8da0-d412da13d0d7', 'APPLICATIONSETTINGS', 'EXAMPLESETTING1', 'Example Setting 1', 'description goes here', 1, '2020-06-18 13:52:47');
ALTER reference SET updated = created;
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
