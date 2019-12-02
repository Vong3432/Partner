-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2019 at 11:08 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `partner`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `AccountID` varchar(36) NOT NULL,
  `AdminID` varchar(36) NOT NULL,
  `UserID` varchar(36) NOT NULL,
  `ProfileID` varchar(36) NOT NULL,
  `Name` varchar(60) NOT NULL,
  `AccountType` varchar(10) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(5) NOT NULL,
  `Status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`AccountID`, `AdminID`, `UserID`, `ProfileID`, `Name`, `AccountType`, `Email`, `Password`, `Status`) VALUES
('2d244616-915e-40ec-a721-ee0a546c2647', '', '2d244616-915e-40ec-a721-ee0a546c2647', '2d244616-915e-40ec-a721-ee0a546c2647', 'CHICKENPOPP', 'employer', 'employer@gmail.com', '1234', '1'),
('574b9be9-4679-4529-8a38-bdd329b2a0f8', '', '574b9be9-4679-4529-8a38-bdd329b2a0f8', '574b9be9-4679-4529-8a38-bdd329b2a0f8', 'Apple', 'employer', 'employer2@gmail.com', '1234', '1'),
('63f1f013-9000-4b88-9bcd-6d4bed35cf44', '', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', 'Vong Nyuk Soon', 'employee', 'employee@gmail.com', '1234', '1'),
('7eec08f6-7c65-4bf8-a324-be1e5d80e8e0', '', '7eec08f6-7c65-4bf8-a324-be1e5d80e8e0', '7eec08f6-7c65-4bf8-a324-be1e5d80e8e0', 'John Doe', 'employee', 'employee2@gmail.com', '1234', '1'),
('9d5b0045-f7b5-4283-a781-5f2ba1705a73', '', '9d5b0045-f7b5-4283-a781-5f2ba1705a73', '9d5b0045-f7b5-4283-a781-5f2ba1705a73', 'MCD', 'employer', 'employer3@gmail.com', '1234', '1'),
('c39f16ba-1e2c-40ce-bd46-47ea77386c16', '', 'c39f16ba-1e2c-40ce-bd46-47ea77386c16', 'c39f16ba-1e2c-40ce-bd46-47ea77386c16', 'emp4', 'employee', 'employee4@gmail.com', '1234', '-1'),
('f1b8c2c5-5830-4591-b7ba-e3c475d26bc4', '', 'f1b8c2c5-5830-4591-b7ba-e3c475d26bc4', 'f1b8c2c5-5830-4591-b7ba-e3c475d26bc4', 'TestEmployee3', 'employee', 'employee3@gmail.com', '1234', '1');

-- --------------------------------------------------------

--
-- Table structure for table `activitylog`
--

CREATE TABLE `activitylog` (
  `ActivityLogID` varchar(36) NOT NULL,
  `ResumeId` varchar(36) NOT NULL,
  `FeedbackID` varchar(36) NOT NULL,
  `RequestID` varchar(36) NOT NULL,
  `JobID` varchar(36) NOT NULL,
  `PostingID` varchar(36) NOT NULL,
  `Type` varchar(5) NOT NULL,
  `UploadTime` date DEFAULT NULL,
  `Content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `AdminID` varchar(36) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`AdminID`, `Name`, `Password`) VALUES
('admin@123', 'Admin', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `adminrecord`
--

CREATE TABLE `adminrecord` (
  `AdminRecordID` varchar(36) NOT NULL,
  `AdminID` varchar(36) DEFAULT NULL,
  `ContentID` varchar(36) DEFAULT NULL,
  `Date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `applicantqualifications`
--

CREATE TABLE `applicantqualifications` (
  `QualificationsID` varchar(36) NOT NULL,
  `JobID` varchar(36) NOT NULL,
  `Name` varchar(36) DEFAULT NULL,
  `Type` varchar(36) DEFAULT NULL,
  `Content` text DEFAULT NULL,
  `Preference` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `BillID` varchar(36) NOT NULL,
  `JobID` varchar(36) NOT NULL,
  `Amount` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `candidatelist`
--

CREATE TABLE `candidatelist` (
  `CandidateListID` varchar(36) NOT NULL,
  `JobID` varchar(36) NOT NULL,
  `RequestID` varchar(36) NOT NULL,
  `CandidateStatus` varchar(10) NOT NULL,
  `UserID` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `candidatelist`
--

INSERT INTO `candidatelist` (`CandidateListID`, `JobID`, `RequestID`, `CandidateStatus`, `UserID`) VALUES
('fbd84d65-9745-46a3-b0d3-c56291f632a3', 'fbd84d65-9745-46a3-b0d3-c56291f632a3', '15ed7d9a-f81a-4392-a1a8-7f92c62bf49c', 'pending', 'f1b8c2c5-5830-4591-b7ba-e3c475d26bc4'),
('3b923ce1-e3c8-4c4c-b48b-9a672329e19b', '3b923ce1-e3c8-4c4c-b48b-9a672329e19b', '65ca3f79-37fc-4ce4-b8cc-cad6aa236d96', 'approve', '63f1f013-9000-4b88-9bcd-6d4bed35cf44'),
('9abbb0ee-0dca-4b9c-b1d4-d11ee193fe6b', '9abbb0ee-0dca-4b9c-b1d4-d11ee193fe6b', 'b5a4f267-2ff3-4ab4-883d-c5e19686ab6b', 'approve', '63f1f013-9000-4b88-9bcd-6d4bed35cf44'),
('4eb4e2a7-1a70-417b-b0fb-c5c56b0e634e', '4eb4e2a7-1a70-417b-b0fb-c5c56b0e634e', 'c4f95d83-44f6-48f0-a942-023902806376', 'approve', '63f1f013-9000-4b88-9bcd-6d4bed35cf44'),
('79bc8c4f-b060-4bad-bbbb-82728033832e', '79bc8c4f-b060-4bad-bbbb-82728033832e', 'c7bf015a-b1e4-415e-8362-9de6b1177cdf', 'pending', 'c39f16ba-1e2c-40ce-bd46-47ea77386c16');

-- --------------------------------------------------------

--
-- Table structure for table `candidaterequest`
--

CREATE TABLE `candidaterequest` (
  `RequestID` varchar(36) NOT NULL,
  `ApplicantID` varchar(36) DEFAULT NULL,
  `CandidateListID` varchar(36) DEFAULT NULL,
  `ActivityLogID` varchar(36) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `candidaterequest`
--

INSERT INTO `candidaterequest` (`RequestID`, `ApplicantID`, `CandidateListID`, `ActivityLogID`, `Name`, `Email`) VALUES
('15ed7d9a-f81a-4392-a1a8-7f92c62bf49c', 'f1b8c2c5-5830-4591-b7ba-e3c475d26bc4', 'fbd84d65-9745-46a3-b0d3-c56291f632a3', 'fbd84d65-9745-46a3-b0d3-c56291f632a3', 'TestEmployee3', 'employee3@gmail.com'),
('65ca3f79-37fc-4ce4-b8cc-cad6aa236d96', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', '3b923ce1-e3c8-4c4c-b48b-9a672329e19b', '3b923ce1-e3c8-4c4c-b48b-9a672329e19b', 'Vong Nyuk Soon', 'employee@gmail.com'),
('b5a4f267-2ff3-4ab4-883d-c5e19686ab6b', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', '9abbb0ee-0dca-4b9c-b1d4-d11ee193fe6b', '9abbb0ee-0dca-4b9c-b1d4-d11ee193fe6b', 'Vong Nyuk Soon', 'employee@gmail.com'),
('c4f95d83-44f6-48f0-a942-023902806376', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', '4eb4e2a7-1a70-417b-b0fb-c5c56b0e634e', '4eb4e2a7-1a70-417b-b0fb-c5c56b0e634e', 'Vong Nyuk Soon', 'employee@gmail.com'),
('c7bf015a-b1e4-415e-8362-9de6b1177cdf', 'c39f16ba-1e2c-40ce-bd46-47ea77386c16', '79bc8c4f-b060-4bad-bbbb-82728033832e', '79bc8c4f-b060-4bad-bbbb-82728033832e', 'emp4', 'employee4@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `ID` int(11) NOT NULL,
  `Value` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`ID`, `Value`) VALUES
(1, 'Accounting/Finance'),
(2, 'Admin/Human Resources'),
(3, 'Arts/Media/Communications'),
(4, 'Building/Construction'),
(5, 'Computer/IT'),
(6, 'Education/Training'),
(7, 'Engineering'),
(8, 'Healthcare'),
(9, 'Hotel/Restaurant'),
(10, 'Marketing'),
(11, 'Sales'),
(12, 'Science'),
(13, 'Others');

-- --------------------------------------------------------

--
-- Table structure for table `chatroom`
--

CREATE TABLE `chatroom` (
  `ChatRoomID` varchar(36) NOT NULL,
  `name` varchar(70) NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chatroom`
--

INSERT INTO `chatroom` (`ChatRoomID`, `name`, `text`) VALUES
('09h14ffd-82c9-4437-bd10-3d0aa16203fb', 'vong nyuk soon', 'Hi, I am Vong'),
('09h14ffd-82c9-4437-bd10-3d0aa16203fb', 'vong nyuk soon', 'Nice to meet you again.'),
('09h14ffd-82c9-4437-bd10-3d0aa16203fb', 'chickenpopp', 'Yes, indeed.'),
('09h14ffd-82c9-4437-bd10-3d0aa16203fb', 'chickenpopp', 'good to see u too'),
('1bb860ba-f352-46a2-8313-c7e865da879d', 'vong nyuk soon', 'Hi MCD'),
('1bb860ba-f352-46a2-8313-c7e865da879d', 'mcd', 'Yes'),
('94e0445b-fd66-4e05-8eba-5e2c6371c808', 'chickenpopp', 'Hi, this is cccd.'),
('94e0445b-fd66-4e05-8eba-5e2c6371c808', 'vong nyuk soon', 'Hi!'),
('94e0445b-fd66-4e05-8eba-5e2c6371c808', 'chickenpopp', 'How is your day?'),
('94e0445b-fd66-4e05-8eba-5e2c6371c808', 'vong nyuk soon', 'Great'),
('94e0445b-fd66-4e05-8eba-5e2c6371c808', 'chickenpopp', 'Ok.'),
('94e0445b-fd66-4e05-8eba-5e2c6371c808', 'chickenpopp', 'HOw about interview on Monday?'),
('94e0445b-fd66-4e05-8eba-5e2c6371c808', 'chickenpopp', 's'),
('94e0445b-fd66-4e05-8eba-5e2c6371c808', 'chickenpopp', 's'),
('94e0445b-fd66-4e05-8eba-5e2c6371c808', 'chickenpopp', '..'),
('96c544aa-204f-408a-8857-d29fda234c06', 'chickenpopp', 'Hello there'),
('96c544aa-204f-408a-8857-d29fda234c06', 'vong nyuk soon', 'Yes');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `CompanyID` varchar(36) NOT NULL,
  `UserID` varchar(36) DEFAULT NULL,
  `PublishedYear` int(5) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Liciense` varchar(255) DEFAULT NULL,
  `Address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`CompanyID`, `UserID`, `PublishedYear`, `Name`, `Liciense`, `Address`) VALUES
('2d244616-915e-40ec-a721-ee0a546c2647', '2d244616-915e-40ec-a721-ee0a546c2647', 2019, 'CHICKENPOPP', NULL, NULL),
('574b9be9-4679-4529-8a38-bdd329b2a0f8', '574b9be9-4679-4529-8a38-bdd329b2a0f8', 2019, 'Apple', NULL, NULL),
('9d5b0045-f7b5-4283-a781-5f2ba1705a73', '9d5b0045-f7b5-4283-a781-5f2ba1705a73', 2019, 'MCD', NULL, NULL),
('9e1e7d67-f435-48d1-8368-0042226bbf9f', '9e1e7d67-f435-48d1-8368-0042226bbf9f', 2019, 'Apple', NULL, NULL),
('e267b8be-5582-42ad-af72-f6cb393142b1', 'e267b8be-5582-42ad-af72-f6cb393142b1', 2019, 'CHICKENPOPP', NULL, NULL),
('e60db948-a5c2-4794-8420-dd38e6501ce1', 'e60db948-a5c2-4794-8420-dd38e6501ce1', 2019, 'CHICKENPOPP', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `ContentID` varchar(36) NOT NULL,
  `AdminRecordID` varchar(36) NOT NULL,
  `RecordDate` date DEFAULT NULL,
  `Content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `education`
--

CREATE TABLE `education` (
  `EducationID` varchar(36) NOT NULL,
  `ResumeID` varchar(36) DEFAULT NULL,
  `Degree` varchar(255) DEFAULT NULL,
  `School` varchar(255) DEFAULT NULL,
  `FieldOfStudy` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `StartYear` varchar(255) DEFAULT NULL,
  `EndYear` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `education`
--

INSERT INTO `education` (`EducationID`, `ResumeID`, `Degree`, `School`, `FieldOfStudy`, `Address`, `StartYear`, `EndYear`) VALUES
('3639a816-7515-47ac-b46f-d6ec24463f3b', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', 'CS', 'SUC', NULL, NULL, '2021', '2022'),
('47ecef80-d928-4771-8634-796de9a3e9d8', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', 'IT', 'SUC', NULL, NULL, '2025', '2025'),
('a3693ef1-a484-4b2c-b189-7065d58bb995', 'c39f16ba-1e2c-40ce-bd46-47ea77386c16', 'Diploma in Something', 'SUC', NULL, NULL, '2022', '2022');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `UserID` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `employer`
--

CREATE TABLE `employer` (
  `UserID` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `FeedbackID` varchar(36) NOT NULL,
  `AdminID` varchar(36) DEFAULT NULL,
  `ActivityLogID` varchar(36) DEFAULT NULL,
  `UserID` varchar(36) DEFAULT NULL,
  `Type` varchar(36) DEFAULT NULL,
  `UploadTime` date DEFAULT NULL,
  `Content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `feedback_id` varchar(36) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `admin_id` varchar(36) DEFAULT NULL,
  `type` int(36) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `GalleryID` varchar(36) NOT NULL,
  `ProfileID` varchar(36) NOT NULL,
  `PictureID` varchar(36) NOT NULL,
  `GalleryName` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`GalleryID`, `ProfileID`, `PictureID`, `GalleryName`) VALUES
('478a9abd-7439-4830-ab04-d12c8ad2d3a0', '2d244616-915e-40ec-a721-ee0a546c2647', '', 'lighthttpd-server-281x270.webp'),
('5e4e52ce-2363-401c-95f0-90f621e917cb', '2d244616-915e-40ec-a721-ee0a546c2647', '', 'apple.jpg'),
('79fbc897-9462-42fc-b937-d5268bbe0d50', '2d244616-915e-40ec-a721-ee0a546c2647', '', 'logo.png'),
('916a1d4b-a8a6-42dc-831d-7cee337f5aab', '2d244616-915e-40ec-a721-ee0a546c2647', '', 'Freelancer_Featured_Image.png'),
('9ed70cd3-ff5b-47de-b694-3e1067e1811d', '2d244616-915e-40ec-a721-ee0a546c2647', '', 'apache.png');

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `JobID` varchar(36) NOT NULL,
  `EmployerID` varchar(36) DEFAULT NULL,
  `ActivityLogID` varchar(36) DEFAULT NULL,
  `BillID` varchar(36) DEFAULT NULL,
  `CandidateListID` varchar(36) NOT NULL,
  `Title` text DEFAULT NULL,
  `UploadDate` datetime DEFAULT NULL,
  `DueDate` datetime NOT NULL,
  `Status` varchar(30) DEFAULT NULL,
  `CompanyName` text DEFAULT NULL,
  `Location` text DEFAULT NULL,
  `Type` text DEFAULT NULL,
  `Salary` text DEFAULT NULL,
  `HireCount` text DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Picture` varchar(255) DEFAULT NULL,
  `View` text DEFAULT NULL,
  `Requirement` text DEFAULT NULL,
  `Category` varchar(36) DEFAULT NULL,
  `TotalCandidates` int(255) NOT NULL,
  `ChatRoomID` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`JobID`, `EmployerID`, `ActivityLogID`, `BillID`, `CandidateListID`, `Title`, `UploadDate`, `DueDate`, `Status`, `CompanyName`, `Location`, `Type`, `Salary`, `HireCount`, `Description`, `Picture`, `View`, `Requirement`, `Category`, `TotalCandidates`, `ChatRoomID`) VALUES
('06f14ffd-82c9-4437-bd10-3a0aa16203fb', '2d244616-915e-40ec-a721-ee0a546c2647', '06f14ffd-82c9-4437-bd10-3a0aa16203fb', '06f14ffd-82c9-4437-bd10-3a0aa16203fb', '06f14ffd-82c9-4437-bd10-3a0aa16203fb', 'Senior Sales Analyst ', '2019-11-27 00:05:13', '2019-12-04 00:05:13', '-1', 'CHICKENPOPP', 'JB', 'Contract,Part Time,', '5000', '0', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '', '0', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '10', 0, '09f14ffd-82c9-4437-bd10-3d0aa16203fb'),
('3b923ce1-e3c8-4c4c-b48b-9a672329e19b', '2d244616-915e-40ec-a721-ee0a546c2647', NULL, '3b923ce1-e3c8-4c4c-b48b-9a672329e19b', '3b923ce1-e3c8-4c4c-b48b-9a672329e19b', 'cccd', '2019-12-03 05:11:35', '2019-12-08 05:11:35', '-2', 'CHICKENPOPP', 'jb', 'Commission,', '3000', '0', 'addsa', '', '0', 'asdsa', '10', 1, '94e0445b-fd66-4e05-8eba-5e2c6371c808'),
('4eb4e2a7-1a70-417b-b0fb-c5c56b0e634e', '2d244616-915e-40ec-a721-ee0a546c2647', NULL, '4eb4e2a7-1a70-417b-b0fb-c5c56b0e634e', '4eb4e2a7-1a70-417b-b0fb-c5c56b0e634e', 'hhhe', '2019-12-03 05:53:58', '2019-12-08 05:53:58', '1', 'CHICKENPOPP', 'jb', 'Contract,', '5000', '0', 'asda', '', '0', 'asdas', '1', 1, '96c544aa-204f-408a-8857-d29fda234c06'),
('79bc8c4f-b060-4bad-bbbb-82728033832e', '2d244616-915e-40ec-a721-ee0a546c2647', NULL, '79bc8c4f-b060-4bad-bbbb-82728033832e', '79bc8c4f-b060-4bad-bbbb-82728033832e', 'Programmer', '2019-12-03 02:32:38', '2019-12-08 02:32:38', '1', 'CHICKENPOPP', 'JB', 'Contract,', '5000', '0', 'abc', '2d244616-915e-40ec-a721-ee0a546c2647-cookin.png', '0', 'abc', '2', 2, '20831b4f-611a-4997-9631-51975ac500a2'),
('9abbb0ee-0dca-4b9c-b1d4-d11ee193fe6b', '9d5b0045-f7b5-4283-a781-5f2ba1705a73', NULL, '9abbb0ee-0dca-4b9c-b1d4-d11ee193fe6b', '9abbb0ee-0dca-4b9c-b1d4-d11ee193fe6b', 'Ppp', '2019-12-03 03:02:06', '2019-12-08 03:02:06', '1', 'MCD', 'JB', 'Part Time,', '5000', '0', 'sdada', '', '0', 'asda', '5', 1, '1bb860ba-f352-46a2-8313-c7e865da879d'),
('c210b23b-e827-4e68-babe-c065526db96a', '2d244616-915e-40ec-a721-ee0a546c2647', 'c210b23b-e827-4e68-babe-c065526db96a', 'c210b23b-e827-4e68-babe-c065526db96a', 'c210b23b-e827-4e68-babe-c065526db96a', 'Apache Programmers', '2019-11-20 14:00:22', '2019-11-30 07:54:05', '-1', 'CHICKENPOPP', 'GP', 'Commission,', '3000', '0', 'Take a deep dive and try our list of over 40 unique generators, find placeholder images for your next design, or add a lorem ipsum plugin to the CMS or text editor of your choice.', '2d244616-915e-40ec-a721-ee0a546c2647-apache.png', '0', 'Take a deep dive and try our list of over 40 unique generators, find placeholder images for your next design, or add a lorem ipsum plugin to the CMS or text editor of your choice.', '5', 0, '09g14ffd-82c9-4437-bd10-3d0aa16203fb'),
('fbd84d65-9745-46a3-b0d3-c56291f632a3', '2d244616-915e-40ec-a721-ee0a546c2647', 'fbd84d65-9745-46a3-b0d3-c56291f632a3', 'fbd84d65-9745-46a3-b0d3-c56291f632a3', 'fbd84d65-9745-46a3-b0d3-c56291f632a3', 'Tutor of Java', '2019-11-29 16:13:53', '2019-12-04 16:13:53', '-2', 'CHICKENPOPP', 'JB', 'Full Time,Part Time,', '5000', '0', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '', '0', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '6', 0, '09h14ffd-82c9-4437-bd10-3d0aa16203fb');

-- --------------------------------------------------------

--
-- Table structure for table `joblist`
--

CREATE TABLE `joblist` (
  `joblist_id` varchar(36) NOT NULL,
  `employee_id` varchar(36) DEFAULT NULL,
  `pendinglist_id` int(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jobpreference`
--

CREATE TABLE `jobpreference` (
  `JobPreferenceID` varchar(36) NOT NULL,
  `ResumeID` varchar(36) DEFAULT NULL,
  `JobTitle` varchar(255) DEFAULT NULL,
  `JobType` varchar(255) DEFAULT NULL,
  `Salary` varchar(255) DEFAULT NULL,
  `Relocation` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `LikesID` varchar(36) NOT NULL,
  `PostingID` varchar(36) NOT NULL,
  `AccountID` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`LikesID`, `PostingID`, `AccountID`) VALUES
('17483c56-3db9-40a1-8b44-54730418c4ef', 'f6ab5def-c516-4c25-8536-b8ee5c4cc0ff', '63f1f013-9000-4b88-9bcd-6d4bed35cf44'),
('3a457258-34de-45c8-bde0-391e7dc59132', 'ed6cc3c6-7e72-4aed-8a0d-89dced7a814f', '63f1f013-9000-4b88-9bcd-6d4bed35cf44'),
('f6e3900f-afde-4fd9-93d0-47fbddaa67e6', '6a3458ce-7adf-48e3-a48b-f604aef2198e', '63f1f013-9000-4b88-9bcd-6d4bed35cf44');

-- --------------------------------------------------------

--
-- Table structure for table `pendinglist`
--

CREATE TABLE `pendinglist` (
  `pendinglist_id` int(36) NOT NULL,
  `job_id` varchar(36) DEFAULT NULL,
  `joblist_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `personal_background`
--

CREATE TABLE `personal_background` (
  `personalbg_id` varchar(36) NOT NULL,
  `employee_id` varchar(36) DEFAULT NULL,
  `company_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `picture`
--

CREATE TABLE `picture` (
  `PictureID` varchar(36) NOT NULL,
  `GalleryID` varchar(36) DEFAULT NULL,
  `PictureFormat` varchar(255) DEFAULT NULL,
  `Remark` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `posting`
--

CREATE TABLE `posting` (
  `PostingID` varchar(36) NOT NULL,
  `ProfileID` varchar(36) DEFAULT NULL,
  `ActivityLogID` varchar(36) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Picture` varchar(200) DEFAULT NULL,
  `UploadTime` datetime DEFAULT NULL,
  `LikesCount` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posting`
--

INSERT INTO `posting` (`PostingID`, `ProfileID`, `ActivityLogID`, `Description`, `Picture`, `UploadTime`, `LikesCount`) VALUES
('0a7de378-147c-400b-a716-e2017623d491', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', NULL, 'Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It\'s also called placeholder (or filler) text. It\'s a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it\'s not genuine, correct, or comprehensible Latin anymore. While lorem ipsum\'s still resembles classical Latin, it actually has no meaning whatsoever. As Cicero\'s text doesn\'t contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.', '', '2019-12-01 16:44:11', 0),
('14d6bf67-db23-4c35-8392-4a0485b37d4c', '2d244616-915e-40ec-a721-ee0a546c2647', NULL, 'Chicken', '', '2019-12-01 00:14:47', 0),
('19b49558-7411-4117-855d-96188ec88f37', '2d244616-915e-40ec-a721-ee0a546c2647', NULL, 'something', '', '2019-12-03 05:52:52', 0),
('3acc4b8b-255d-445a-9637-152b02cd4a15', '2d244616-915e-40ec-a721-ee0a546c2647', NULL, 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.', '2d244616-915e-40ec-a721-ee0a546c2647-cookin.png', '2019-12-01 16:52:03', 0),
('534cfdc2-9b55-44eb-908e-240f7593cfa9', '2d244616-915e-40ec-a721-ee0a546c2647', NULL, 'Most of its text is made up from sections 1.10.32–3 of Cicero\'s De finibus bonorum et malorum (On the Boundaries of Goods and Evils; finibus may also be translated as purposes). Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit is the first known version (\"Neither is there anyone who loves grief itself since it is grief and thus wants to obtain it\"). It was found by Richard McClintock, a philologist, director of publications at Hampden-Sydney College in Virginia; he searched for citings of consectetur', '', '2019-12-01 16:50:21', 0),
('72d857fa-342b-4ddf-88ec-557cb906b980', '2d244616-915e-40ec-a721-ee0a546c2647', NULL, 'asdd', '', '2019-12-03 02:33:00', 0),
('7da7ab3e-f5c5-45e4-b5e1-174e5d1cc57d', 'c39f16ba-1e2c-40ce-bd46-47ea77386c16', NULL, 'Hi', '', '2019-12-03 02:55:05', 0),
('836a3607-2b25-4e44-ba2f-e1fb3f1667df', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', NULL, 'Lorem ipsum dolor sit amet, vix cibo nulla offendit ne, facer copiosae qualisque ei per, mel eu affert omnesque adversarium. Nec omnes definitionem at. Ei pro officiis adipisci postulant, ne has vitae dolorem voluptatum, omittam dissentiunt ei mel. Ne vix unum iriure commune, et duo erat vivendum electram. At maluisset scribentur vis, vocibus adversarium eos et, ex vis omnes invenire. Noster eirmod his ut, qui idque iriure te, vim et mundi pericula comprehensam.\n\nCommodo prompta dissentiunt te usu, rebum velit impetus mea et. No libris euismod tibique per, movet necessitatibus usu ea. Errem molestiae nam te, no eos vide nulla facilisi. Partiendo similique duo at, cu pri dicam habemus. Munere maiorum imperdiet ius ut, falli quidam cu pro.\n\nMei et lobortis periculis, eius facilisi eos ne. Mentitum consetetur ut vel. Quo te odio lobortis, pri ei erat theophrastus, modo admodum philosophia eam cu. Pri ex omnis singulis perpetua, meliore mandamus omittantur qui at. Te quis legere oporteat nam, vim recteque constituam ex.\n\nNam eu postea vocibus appetere. Vim amet conceptam incorrupte ne. Debitis persequeris intellegebat an his, an omnium assueverit quo, vim zril urbanitas dissentias te. Ei vocent deseruisse eam.\n\nVelit adipiscing ea nam. Est ne nibh tollit suavitate, vis percipit petentium eu. Eros essent ex his. Populo equidem no mei, id tacimates dignissim vim.', '', '2019-12-01 16:43:58', 0),
('a6633aaa-978b-4afd-afcc-8e8f8431ac4f', '2d244616-915e-40ec-a721-ee0a546c2647', NULL, 'The Latin scholar H. Rackham translated the above in 1914:\n\nDe Finibus Bonorum Et Malorum But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?', '2d244616-915e-40ec-a721-ee0a546c2647-quentin-bounias-cGoek20Eb2g-unsplash.jpg', '2019-12-01 16:50:53', 0),
('ae590886-0a90-491c-aa3c-3be7609d7bdf', '2d244616-915e-40ec-a721-ee0a546c2647', NULL, 'asd', '', '2019-12-03 01:35:08', 0),
('bf8817c3-d94c-433f-877f-61ad352a297b', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', NULL, '', '63f1f013-9000-4b88-9bcd-6d4bed35cf44-scene.jpg', '2019-11-30 23:41:24', 0);

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `ProfileID` varchar(36) NOT NULL,
  `AccountID` varchar(36) DEFAULT NULL,
  `ActivityLogID` varchar(36) DEFAULT NULL,
  `SkillID` varchar(36) DEFAULT NULL,
  `Address` text NOT NULL,
  `About` text NOT NULL,
  `ProfilePic` varchar(255) DEFAULT NULL,
  `BackgroundPic` varchar(255) NOT NULL,
  `Username` varchar(255) DEFAULT NULL,
  `Resume` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Availability` varchar(255) DEFAULT NULL,
  `Age` varchar(255) DEFAULT NULL,
  `Location` varchar(255) DEFAULT NULL,
  `FacebookLink` varchar(255) DEFAULT NULL,
  `LinkedLink` varchar(255) DEFAULT NULL,
  `WhatsappLink` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`ProfileID`, `AccountID`, `ActivityLogID`, `SkillID`, `Address`, `About`, `ProfilePic`, `BackgroundPic`, `Username`, `Resume`, `Email`, `Availability`, `Age`, `Location`, `FacebookLink`, `LinkedLink`, `WhatsappLink`) VALUES
('2d244616-915e-40ec-a721-ee0a546c2647', '2d244616-915e-40ec-a721-ee0a546c2647', NULL, NULL, '', 'ABCDEFGHIsasdasda', '2d244616-915e-40ec-a721-ee0a546c2647-austin-distel-744oGeqpxPQ-unsplash.jpg', '', 'CHICKENPOPP', NULL, 'employer@gmail.com', NULL, NULL, 'Gelang Patah', NULL, NULL, NULL),
('574b9be9-4679-4529-8a38-bdd329b2a0f8', '574b9be9-4679-4529-8a38-bdd329b2a0f8', NULL, NULL, '', '', NULL, '', 'Apple', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('63f1f013-9000-4b88-9bcd-6d4bed35cf44', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', NULL, NULL, '', 'Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It\'s also called placeholder (or filler) text. It\'s a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it\'s not genuine, correct, or comprehensible Latin anymore. While lorem ipsum\'s still resembles classical Latin, it actually has no meaning whatsoever. As Cicero\'s text doesn\'t contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original.', '63f1f013-9000-4b88-9bcd-6d4bed35cf44-christian-wiediger-jg9BCuOrGyw-unsplash.jpg', '', 'Vong Nyuk Soon', NULL, 'employee@gmail.com', 'Full Time', '19', 'Johor', NULL, NULL, NULL),
('7eec08f6-7c65-4bf8-a324-be1e5d80e8e0', '7eec08f6-7c65-4bf8-a324-be1e5d80e8e0', NULL, NULL, '', '', '7eec08f6-7c65-4bf8-a324-be1e5d80e8e0-joshua-sortino-qGKPHLqo6I4-unsplash.jpg', '', 'John Doe', NULL, 'employee2@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL),
('9d5b0045-f7b5-4283-a781-5f2ba1705a73', '9d5b0045-f7b5-4283-a781-5f2ba1705a73', NULL, NULL, '', '', NULL, '', 'MCD', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('c39f16ba-1e2c-40ce-bd46-47ea77386c16', 'c39f16ba-1e2c-40ce-bd46-47ea77386c16', NULL, NULL, '', 'aSdasdasd', NULL, '', 'emp4', NULL, 'employee4@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL),
('f1b8c2c5-5830-4591-b7ba-e3c475d26bc4', 'f1b8c2c5-5830-4591-b7ba-e3c475d26bc4', NULL, NULL, '', '', NULL, '', 'TestEmployee3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `resume`
--

CREATE TABLE `resume` (
  `ResumeID` varchar(36) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `ProfileID` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `resume`
--

INSERT INTO `resume` (`ResumeID`, `Name`, `ProfileID`) VALUES
('6c27aba4-fa91-4afb-942c-121888f25b60', 'COA10e_CH07_InputOutput.pdf', '63f1f013-9000-4b88-9bcd-6d4bed35cf44'),
('be50da9b-86fd-40d1-9db8-64975f32d44c', 'COA_Assignment_2_CPUoperationSample3.pdf', '63f1f013-9000-4b88-9bcd-6d4bed35cf44'),
('e98c92f1-bb77-4662-b923-c33f0beacf97', 'COA_Assignment_2_CPUoperationSample4.pdf', '63f1f013-9000-4b88-9bcd-6d4bed35cf44'),
('ec235bfd-637c-42f0-a4a6-76d466d3bd7f', '63f1f013-9000-4b88-9bcd-6d4bed35cf44-COA_Assignment_2_CPUoperationSample3.pdf', 'c39f16ba-1e2c-40ce-bd46-47ea77386c16');

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `SkillID` varchar(36) NOT NULL,
  `ProfileID` varchar(36) DEFAULT NULL,
  `SkillName` varchar(255) DEFAULT NULL,
  `Remark` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` varchar(36) NOT NULL,
  `AdminID` varchar(36) NOT NULL,
  `ContentID` varchar(36) NOT NULL,
  `Username` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `workexperience`
--

CREATE TABLE `workexperience` (
  `WorkExperienceID` varchar(36) NOT NULL,
  `ResumeID` varchar(36) DEFAULT NULL,
  `JobTitle` varchar(255) DEFAULT NULL,
  `Company` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `StartYear` varchar(255) DEFAULT NULL,
  `EndYear` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `workexperience`
--

INSERT INTO `workexperience` (`WorkExperienceID`, `ResumeID`, `JobTitle`, `Company`, `Address`, `Description`, `StartYear`, `EndYear`) VALUES
('a942e032-bdde-4e04-9662-855fba24c163', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', 'System Analyst', 'Google', NULL, NULL, '2008', '2025'),
('c9396ab4-c085-4426-a6b8-6cabbfa83289', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', 'Google Analyst', 'Google', NULL, NULL, '2025', '2025');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`AccountID`);

--
-- Indexes for table `activitylog`
--
ALTER TABLE `activitylog`
  ADD PRIMARY KEY (`ActivityLogID`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`AdminID`);

--
-- Indexes for table `adminrecord`
--
ALTER TABLE `adminrecord`
  ADD PRIMARY KEY (`AdminRecordID`);

--
-- Indexes for table `applicantqualifications`
--
ALTER TABLE `applicantqualifications`
  ADD PRIMARY KEY (`QualificationsID`);

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`BillID`);

--
-- Indexes for table `candidatelist`
--
ALTER TABLE `candidatelist`
  ADD PRIMARY KEY (`RequestID`);

--
-- Indexes for table `candidaterequest`
--
ALTER TABLE `candidaterequest`
  ADD PRIMARY KEY (`RequestID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`CompanyID`);

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`ContentID`);

--
-- Indexes for table `education`
--
ALTER TABLE `education`
  ADD PRIMARY KEY (`EducationID`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `employer`
--
ALTER TABLE `employer`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`FeedbackID`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`feedback_id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`GalleryID`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`JobID`);

--
-- Indexes for table `joblist`
--
ALTER TABLE `joblist`
  ADD PRIMARY KEY (`joblist_id`);

--
-- Indexes for table `jobpreference`
--
ALTER TABLE `jobpreference`
  ADD PRIMARY KEY (`JobPreferenceID`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`LikesID`);

--
-- Indexes for table `pendinglist`
--
ALTER TABLE `pendinglist`
  ADD PRIMARY KEY (`pendinglist_id`);

--
-- Indexes for table `personal_background`
--
ALTER TABLE `personal_background`
  ADD PRIMARY KEY (`personalbg_id`);

--
-- Indexes for table `picture`
--
ALTER TABLE `picture`
  ADD PRIMARY KEY (`PictureID`);

--
-- Indexes for table `posting`
--
ALTER TABLE `posting`
  ADD PRIMARY KEY (`PostingID`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`ProfileID`);

--
-- Indexes for table `resume`
--
ALTER TABLE `resume`
  ADD PRIMARY KEY (`ResumeID`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`SkillID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `workexperience`
--
ALTER TABLE `workexperience`
  ADD PRIMARY KEY (`WorkExperienceID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `pendinglist`
--
ALTER TABLE `pendinglist`
  MODIFY `pendinglist_id` int(36) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

--
-- Constraints for table `employer`
--
ALTER TABLE `employer`
  ADD CONSTRAINT `employer_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
