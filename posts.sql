-- --------------------------------------------------------

--
-- Table structure for table posting
--

CREATE TABLE Posting (
  PostingID varchar(36) PRIMARY KEY NOT NULL,
  ProfileID varchar(36) DEFAULT NULL,
  ActivityLogID varchar(36) DEFAULT NULL,
--   //////////////////////// 
  Description text DEFAULT NULL,
  Picture varchar(200) DEFAULT NULL,
--   picture type
  UploadTime date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;