-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2019 at 06:24 AM
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
  `Age` int(5) NOT NULL,
  `IC` varchar(30) NOT NULL,
  `Status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`AccountID`, `AdminID`, `UserID`, `ProfileID`, `Name`, `AccountType`, `Email`, `Password`, `Age`, `IC`, `Status`) VALUES
('cd1a8e82-be04-4dce-ac67-8c4708a44d05', '', 'cd1a8e82-be04-4dce-ac67-8c4708a44d05', 'cd1a8e82-be04-4dce-ac67-8c4708a44d05', 'VONG', 'employee', 'vongnyuksoon1209@gmail.com', '1234', 0, '', ''),
('e60db948-a5c2-4794-8420-dd38e6501ce1', '', 'e60db948-a5c2-4794-8420-dd38e6501ce1', 'e60db948-a5c2-4794-8420-dd38e6501ce1', 'CHICKENPOPP', 'employer', 'vongnyuksoon2000@gmail.com', '1234', 0, '', '');

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
  `AdminRecordID` varchar(36) DEFAULT NULL,
  `FeedbackID` varchar(36) DEFAULT NULL,
  `AccountID` varchar(36) DEFAULT NULL,
  `PublishedYear` int(5) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Liciense` varchar(255) DEFAULT NULL,
  `Address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
('e39ed661-3b3d-44c9-8508-adea279e07af', 'e39ed661-3b3d-44c9-8508-adea279e07af', '78482a36-9289-4619-8af7-78ea6466b49c', 'pending', 'cd1a8e82-be04-4dce-ac67-8c4708a44d05');

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
('78482a36-9289-4619-8af7-78ea6466b49c', 'cd1a8e82-be04-4dce-ac67-8c4708a44d05', 'e39ed661-3b3d-44c9-8508-adea279e07af', 'e39ed661-3b3d-44c9-8508-adea279e07af', 'VONG', 'vongnyuksoon1209@gmail.com');

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
('9e1e7d67-f435-48d1-8368-0042226bbf9f', '9e1e7d67-f435-48d1-8368-0042226bbf9f', 2019, 'Apple', NULL, NULL),
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
  `GalleryName` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `UrgentTime` text DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Picture` varchar(255) DEFAULT NULL,
  `PostLifespan` text DEFAULT NULL,
  `View` text DEFAULT NULL,
  `Requirement` text DEFAULT NULL,
  `Category` varchar(36) DEFAULT NULL,
  `PostDay` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`JobID`, `EmployerID`, `ActivityLogID`, `QualificationsID`, `BillID`, `CandidateListID`, `Title`, `UploadDate`, `DueDate`, `Status`, `CompanyName`, `Location`, `Type`, `Salary`, `HireCount`, `UrgentTime`, `Description`, `Picture`, `PostLifespan`, `View`, `Requirement`, `Category`, `PostDay`) VALUES
('e39ed661-3b3d-44c9-8508-adea279e07af', 'e60db948-a5c2-4794-8420-dd38e6501ce1', 'e39ed661-3b3d-44c9-8508-adea279e07af', NULL, 'e39ed661-3b3d-44c9-8508-adea279e07af', 'e39ed661-3b3d-44c9-8508-adea279e07af', 'CHicken Rice Manager', '2019-11-14 13:06:09', '2019-11-19 13:06:09', 'open', 'CHICKENPOPP', 'JB', 'Part Time,', '50', '0', NULL, 'CHICKEN', '', NULL, '0', 'RICE', '9', NULL);

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
  `UploadTime` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posting`
--

INSERT INTO `posting` (`PostingID`, `ProfileID`, `ActivityLogID`, `Description`, `Picture`, `UploadTime`) VALUES
('43730928-7933-4b78-95f6-3386e31f7c70', 'cd1a8e82-be04-4dce-ac67-8c4708a44d05', NULL, 'VONG', '', '2019-11-14'),
('94880d1d-4a56-4aa2-be8b-0ba9d01fdcde', 'e60db948-a5c2-4794-8420-dd38e6501ce1', NULL, 'I am chickenpopp', '', '2019-11-14');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `ProfileID` varchar(36) NOT NULL,
  `AccountID` varchar(36) DEFAULT NULL,
  `ActivityLogID` varchar(36) DEFAULT NULL,
  `SkillID` varchar(36) DEFAULT NULL,
  `GalleryID` varchar(36) DEFAULT NULL,
  `PostingID` varchar(36) DEFAULT NULL,
  `Address` text NOT NULL,
  `About` text NOT NULL,
  `ProfilePic` varchar(255) DEFAULT NULL,
  `BackgroupPic` varchar(255) DEFAULT NULL,
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

INSERT INTO `profile` (`ProfileID`, `AccountID`, `ActivityLogID`, `SkillID`, `GalleryID`, `PostingID`, `Address`, `About`, `ProfilePic`, `BackgroupPic`, `Username`, `Description`, `Resume`, `Email`, `Availability`, `Age`, `Location`, `FacebookLink`, `LinkedLink`, `WhatsappLink`) VALUES
('cd1a8e82-be04-4dce-ac67-8c4708a44d05', 'cd1a8e82-be04-4dce-ac67-8c4708a44d05', NULL, NULL, NULL, NULL, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('e60db948-a5c2-4794-8420-dd38e6501ce1', 'e60db948-a5c2-4794-8420-dd38e6501ce1', NULL, NULL, NULL, NULL, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
