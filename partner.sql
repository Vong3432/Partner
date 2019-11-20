-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2019 at 03:46 PM
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
('63f1f013-9000-4b88-9bcd-6d4bed35cf44', '', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', 'Vong Nyuk Soon', 'employee', 'employee@gmail.com', '1234', '1');

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
('c210b23b-e827-4e68-babe-c065526db96a', 'c210b23b-e827-4e68-babe-c065526db96a', '14372b42-02c2-4eca-82cf-a8b3034c16a1', 'pending', '63f1f013-9000-4b88-9bcd-6d4bed35cf44');

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
('14372b42-02c2-4eca-82cf-a8b3034c16a1', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', 'c210b23b-e827-4e68-babe-c065526db96a', 'c210b23b-e827-4e68-babe-c065526db96a', 'Vong Nyuk Soon', 'employee@gmail.com');

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
  `StartDate` varchar(255) DEFAULT NULL,
  `EndDate` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `QualificationsID` varchar(36) DEFAULT NULL,
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
  `PostDay` int(30) DEFAULT NULL,
  `TotalCandidates` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`JobID`, `EmployerID`, `ActivityLogID`, `QualificationsID`, `BillID`, `CandidateListID`, `Title`, `UploadDate`, `DueDate`, `Status`, `CompanyName`, `Location`, `Type`, `Salary`, `HireCount`, `Description`, `Picture`, `View`, `Requirement`, `Category`, `PostDay`, `TotalCandidates`) VALUES
('05e4d33c-b792-444f-a056-93d0958f530c', '2d244616-915e-40ec-a721-ee0a546c2647', '05e4d33c-b792-444f-a056-93d0958f530c', NULL, '05e4d33c-b792-444f-a056-93d0958f530c', '05e4d33c-b792-444f-a056-93d0958f530c', 'Mango Programmer', '2019-11-20 20:46:11', '2019-11-25 20:46:11', '1', 'CHICKENPOPP', 'JB', 'Internship,', '5000', '0', 'Accountable for the Greater APAC region delivery of corporate global project portfolio, leading a matrixed and direct team of Project and PMO resources across the Greater APAC region\n\nProvide support and advice on project/ programme governance for the P&PM team and manage high level escalations\n\nOwn tactical and strategic changes in order to align, synchronize and harmonize P&PM policies, methods, processes, procedures, work instructions and associated tools.\n\nBalance the global, regional and local needs to deliver corporate solutions for global customers and local customers in a highly matrixed environment, seamlessly\n\nRepresent Gr APAC needs on the Global PM leadership team\n\nInput into the bid process to capture the commercials related to project delivery\n\nEnsure delivery of contractual obligations at a Global and local Level\nGr APAC Project Portfolio Management and associated exec reporting\n\nLead high visibility projects (hands-on)\n\nHarmonization, synchronising and alignment of processes, procedures, work instructions and tools\n\nResource forecasting, budgeting, allocation and variance reporting on a project portfolio level\n\nTeam development and management; ensure SMART objectives are set for each role in the team\n\nDrive Continuous Service Improvement (lessons learned) and internal “business change” projects/programmes\nIdentify revenue opportunities through commercial and project change control\n\nEnsure the delivery of the Gr APAC project portfolio to customer satisfaction, financial, quality and schedule targets\n\nAssign adequate resource to customer projects to ensure smooth delivery to project timescales\n\nLead, develop, succession plan and recruit in to the P&PM regional team to ensure world class skill and capability at the correct resource levels, with resiliency, developing effective working relationships with the local country management teams\n\nDrive through initiatives to improve project delivery within the group\n\nWork closely with Service Management to ensure smooth handover from \nTransition (Project) to Operations\n\nDrive the implementation of project and programme governance across the \nAPAC region taking into account all interfaces with other business transformation initiatives\n\nOn-going measurement of project profitability against bid process inputs (cost model)\n\nCapacity planning at project portfolio level', '', '0', 'Accountable for the Greater APAC region delivery of corporate global project portfolio, leading a matrixed and direct team of Project and PMO resources across the Greater APAC region\n\nProvide support and advice on project/ programme governance for the P&PM team and manage high level escalations\n\nOwn tactical and strategic changes in order to align, synchronize and harmonize P&PM policies, methods, processes, procedures, work instructions and associated tools.\n\nBalance the global, regional and local needs to deliver corporate solutions for global customers and local customers in a highly matrixed environment, seamlessly\n\nRepresent Gr APAC needs on the Global PM leadership team\n\nInput into the bid process to capture the commercials related to project delivery\n\nEnsure delivery of contractual obligations at a Global and local Level\nGr APAC Project Portfolio Management and associated exec reporting\n\nLead high visibility projects (hands-on)\n\nHarmonization, synchronising and alignment of processes, procedures, work instructions and tools\n\nResource forecasting, budgeting, allocation and variance reporting on a project portfolio level\n\nTeam development and management; ensure SMART objectives are set for each role in the team\n\nDrive Continuous Service Improvement (lessons learned) and internal “business change” projects/programmes\nIdentify revenue opportunities through commercial and project change control\n\nEnsure the delivery of the Gr APAC project portfolio to customer satisfaction, financial, quality and schedule targets\n\nAssign adequate resource to customer projects to ensure smooth delivery to project timescales\n\nLead, develop, succession plan and recruit in to the P&PM regional team to ensure world class skill and capability at the correct resource levels, with resiliency, developing effective working relationships with the local country management teams\n\nDrive through initiatives to improve project delivery within the group\n\nWork closely with Service Management to ensure smooth handover from \nTransition (Project) to Operations\n\nDrive the implementation of project and programme governance across the \nAPAC region taking into account all interfaces with other business transformation initiatives\n\nOn-going measurement of project profitability against bid process inputs (cost model)\n\nCapacity planning at project portfolio level', '5', NULL, 0),
('5b71548e-11c4-4956-804a-f272cf9d2c53', '2d244616-915e-40ec-a721-ee0a546c2647', '5b71548e-11c4-4956-804a-f272cf9d2c53', NULL, '5b71548e-11c4-4956-804a-f272cf9d2c53', '5b71548e-11c4-4956-804a-f272cf9d2c53', 'Post', '2019-11-20 21:42:29', '2019-11-25 21:42:29', '1', 'CHICKENPOPP', 'GP', 'Full Time,Part Time,Contract,Commission,Internship,', '300', '0', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '', '0', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '5', NULL, 0),
('c210b23b-e827-4e68-babe-c065526db96a', '2d244616-915e-40ec-a721-ee0a546c2647', 'c210b23b-e827-4e68-babe-c065526db96a', NULL, 'c210b23b-e827-4e68-babe-c065526db96a', 'c210b23b-e827-4e68-babe-c065526db96a', 'Apache Programmer', '2019-11-20 22:00:22', '2019-11-25 22:00:22', '-1', 'CHICKENPOPP', 'GP', 'Commission,', '3000', '0', 'Take a deep dive and try our list of over 40 unique generators, find placeholder images for your next design, or add a lorem ipsum plugin to the CMS or text editor of your choice.', '2d244616-915e-40ec-a721-ee0a546c2647-apache.png', '0', 'Take a deep dive and try our list of over 40 unique generators, find placeholder images for your next design, or add a lorem ipsum plugin to the CMS or text editor of your choice.', '5', NULL, 1);

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
  `UploadTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posting`
--

INSERT INTO `posting` (`PostingID`, `ProfileID`, `ActivityLogID`, `Description`, `Picture`, `UploadTime`) VALUES
('035d9f73-98ff-4a5a-83b3-e27f73c04e28', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', NULL, '', '63f1f013-9000-4b88-9bcd-6d4bed35cf44-bmw.jpg', '2019-11-20 22:42:47'),
('2e9dd815-0409-4d45-a7f8-0dd28cd9ffa3', '368cd56a-1ed7-4c37-af61-7b971b34f8b3', NULL, 'EDF', '', '2019-11-18 02:51:33'),
('43c9b641-c37f-442f-9419-9fcaeccb5579', '2d244616-915e-40ec-a721-ee0a546c2647', NULL, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '', '2019-11-20 21:24:32'),
('53de1f75-fe3b-4a30-8653-f24277303c80', '2d244616-915e-40ec-a721-ee0a546c2647', NULL, 'Boolean === false', '', '2019-11-20 22:10:45'),
('68d8a81b-8ebc-48f0-808f-8e95d2b970a8', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', NULL, 'Hello world :)', '', '2019-11-19 21:42:34'),
('ac06415d-8719-49a0-83a1-7a3f039329c3', '2d244616-915e-40ec-a721-ee0a546c2647', NULL, 'Porsche interior', '2d244616-915e-40ec-a721-ee0a546c2647-porsche2.jpg', '2019-11-20 22:41:53'),
('c9a163ee-85d8-4e32-9dcf-0695415febc8', '2d244616-915e-40ec-a721-ee0a546c2647', NULL, 'Porsche GT3 RS', '2d244616-915e-40ec-a721-ee0a546c2647-porsche.jpg', '2019-11-20 22:41:05');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `ProfileID` varchar(36) NOT NULL,
  `AccountID` varchar(36) DEFAULT NULL,
  `ActivityLogID` varchar(36) DEFAULT NULL,
  `SkillID` varchar(36) DEFAULT NULL,
  `PostingID` varchar(36) DEFAULT NULL,
  `Address` text NOT NULL,
  `About` text NOT NULL,
  `ProfilePic` varchar(255) DEFAULT NULL,
  `BackgroundPic` varchar(255) NOT NULL,
  `Username` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
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

INSERT INTO `profile` (`ProfileID`, `AccountID`, `ActivityLogID`, `SkillID`, `PostingID`, `Address`, `About`, `ProfilePic`, `BackgroundPic`, `Username`, `Description`, `Resume`, `Email`, `Availability`, `Age`, `Location`, `FacebookLink`, `LinkedLink`, `WhatsappLink`) VALUES
('2d244616-915e-40ec-a721-ee0a546c2647', '2d244616-915e-40ec-a721-ee0a546c2647', NULL, NULL, NULL, '', 'ABCDEFGHI', '2d244616-915e-40ec-a721-ee0a546c2647-austin-distel-744oGeqpxPQ-unsplash.jpg', '', NULL, NULL, NULL, 'employer@gmail.com', NULL, NULL, 'Gelang Patah', NULL, NULL, NULL),
('63f1f013-9000-4b88-9bcd-6d4bed35cf44', '63f1f013-9000-4b88-9bcd-6d4bed35cf44', NULL, NULL, NULL, '', 'Hi', '63f1f013-9000-4b88-9bcd-6d4bed35cf44-nitish-meena-RbbdzZBKRDY-unsplash.jpg', '', NULL, NULL, NULL, 'employee@gmail.com', 'Freelancer', '19', 'GP', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `resume`
--

CREATE TABLE `resume` (
  `FeedbackID` varchar(36) NOT NULL,
  `JobPreferenceID` varchar(36) DEFAULT NULL,
  `WorkExperienceID` varchar(36) DEFAULT NULL,
  `EducationID` varchar(36) DEFAULT NULL,
  `EmployeeID` varchar(36) DEFAULT NULL,
  `ActivityLogID` varchar(36) DEFAULT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `ContactNo` varchar(255) DEFAULT NULL,
  `Nationality` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `PrivacySetting` varchar(255) DEFAULT NULL,
  `UploadTime` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `StartDate` varchar(255) DEFAULT NULL,
  `EndDate` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Indexes for table `jobpreference`
--
ALTER TABLE `jobpreference`
  ADD PRIMARY KEY (`JobPreferenceID`);

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
  ADD PRIMARY KEY (`FeedbackID`);

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
