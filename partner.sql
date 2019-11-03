-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2019 at 12:12 PM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

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
  `account_id` varchar(36) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `profile_id` varchar(36) DEFAULT NULL,
  `name` varchar(70) DEFAULT NULL,
  `email` varchar(70) DEFAULT NULL,
  `category` varchar(20) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` varchar(36) NOT NULL,
  `feedback_id` varchar(36) DEFAULT NULL,
  `adminrecord_id` varchar(36) DEFAULT NULL,
  `content_id` varchar(36) DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `bill_id` varchar(36) NOT NULL,
  `company_id` varchar(36) DEFAULT NULL,
  `amount` decimal(7,2) DEFAULT NULL,
  `paymethod` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `company_id` varchar(36) NOT NULL,
  `personalbg_id` varchar(36) DEFAULT NULL,
  `bill_id` varchar(36) DEFAULT NULL,
  `publishedYear` date DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `license` varchar(60) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `content_id` varchar(36) NOT NULL,
  `adminrecord_id` varchar(36) DEFAULT NULL,
  `record_date` date DEFAULT NULL,
  `content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `education`
--

CREATE TABLE `education` (
  `education_id` int(36) NOT NULL,
  `education_level` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` varchar(36) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `resume_id` varchar(36) DEFAULT NULL,
  `joblist_id` varchar(36) DEFAULT NULL,
  `education_level` int(36) DEFAULT NULL,
  `expectSalary` varchar(70) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `employer`
--

CREATE TABLE `employer` (
  `employer_id` varchar(36) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `personalbg_id` varchar(36) DEFAULT NULL
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `job_id` varchar(36) NOT NULL,
  `employer_id` varchar(36) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `upload_date` date DEFAULT NULL,
  `content` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `duration` time DEFAULT NULL,
  `requirement` text DEFAULT NULL,
  `salary` varchar(70) DEFAULT NULL,
  `status` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`job_id`, `employer_id`, `title`, `upload_date`, `content`, `description`, `duration`, `requirement`, `salary`, `status`) VALUES
('0fbe0400-ab5b-408e-aea5-027defd793e6', '1', 'Software developer', '2019-10-24', 'conent', 'software', '24:00:00', 'requirement', '2000', 'pending'),
('367e4cae-8309-4b66-a6fe-dff0ff2b7d7b', '1', 'Senior devloper', '2019-10-24', 'conent', 'senior', '24:00:00', 'requirement', '2000', 'pending'),
('c369a65b-bbe8-418b-ac59-074eef170133', '2', 'Fake developer', '2019-10-24', 'conent', 'description', '24:00:00', 'requirement', '2000', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `joblist`
--

CREATE TABLE `joblist` (
  `joblist_id` varchar(36) NOT NULL,
  `employee_id` varchar(36) DEFAULT NULL,
  `pendinglist_id` int(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pendinglist`
--

CREATE TABLE `pendinglist` (
  `pendinglist_id` int(36) NOT NULL,
  `job_id` varchar(36) DEFAULT NULL,
  `joblist_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pendinglist`
--

INSERT INTO `pendinglist` (`pendinglist_id`, `job_id`, `joblist_id`) VALUES
(3, '0fbe0400-ab5b-408e-aea5-027defd793e6', NULL),
(4, '367e4cae-8309-4b66-a6fe-dff0ff2b7d7b', NULL),
(5, 'c369a65b-bbe8-418b-ac59-074eef170133', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `personal_background`
--

CREATE TABLE `personal_background` (
  `personalbg_id` varchar(36) NOT NULL,
  `employee_id` varchar(36) DEFAULT NULL,
  `company_id` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `resume`
--

CREATE TABLE `resume` (
  `resume_id` varchar(36) NOT NULL,
  `employee_id` varchar(36) DEFAULT NULL,
  `educationlvl_id` varchar(36) DEFAULT NULL,
  `upload_date` date DEFAULT NULL,
  `contact` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(36) NOT NULL,
  `account_id` varchar(36) DEFAULT NULL,
  `feedback_id` varchar(36) DEFAULT NULL,
  `employee_id` varchar(36) DEFAULT NULL,
  `employer_id` varchar(36) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `age` int(200) DEFAULT NULL,
  `IC` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`bill_id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`company_id`);

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`content_id`);

--
-- Indexes for table `education`
--
ALTER TABLE `education`
  ADD PRIMARY KEY (`education_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `employer`
--
ALTER TABLE `employer`
  ADD PRIMARY KEY (`employer_id`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`feedback_id`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`job_id`);

--
-- Indexes for table `joblist`
--
ALTER TABLE `joblist`
  ADD PRIMARY KEY (`joblist_id`);

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
-- Indexes for table `resume`
--
ALTER TABLE `resume`
  ADD PRIMARY KEY (`resume_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pendinglist`
--
ALTER TABLE `pendinglist`
  MODIFY `pendinglist_id` int(36) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
