-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2022 at 11:19 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `codecourses`
--
DROP Database IF EXISTS codecourses;
CREATE Database codecourses;
use codecourses;

-- --------------------------------------------------------

--
-- Table structure for table `article`
--

CREATE TABLE `article` (
  `ID` int(11) NOT NULL,
  `BODY` longtext NOT NULL CHECK (octet_length(`BODY`) >= 20),
  `INSTRUCTORID` int(11) DEFAULT NULL,
  `AUTHORFNAME` varchar(32) DEFAULT NULL CHECK (`AUTHORFNAME`  not like '%[^a-zA-Z]%' and octet_length(`AUTHORFNAME`) >= 3),
  `AUTHORSNAME` varchar(32) DEFAULT NULL CHECK (`AUTHORSNAME`  not like '%[^a-zA-Z]%' and octet_length(`AUTHORSNAME`) >= 3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `article`
--

INSERT INTO `article` (`ID`, `BODY`, `INSTRUCTORID`, `AUTHORFNAME`, `AUTHORSNAME`) VALUES
(1, '\r\n# Cheeese\r\n\r\nA brief description of files & what in it\r\n\r\n```\r\n    ├── ...\r\n    |── graphics.inc\r\n    |   ├── CLRS                                             # clear screen\r\n    |   ├── DrawGrid (width of square, colors)               # draw grid \r\n    |   ├── DrawImg  (img, width of image, startPoint)       # draw image **skipping color 4**\r\n    ├── main.asm                    # main  running file\r\n    │   ├── board peices code  \r\n    │   ├── color code\r\n    │   ├── gridColor, square width, image width\r\n    │   ├── images of peices\r\n    │   └── board 8x8 => peices|emptyCell\r\n    ├── converter.py                    # convert png 25x25 to bitmap\r\n    │   ├── filename                    # will print bitmap of it\r\n    └── ...\r\n```\r\n\r\n\r\n## how to use DOsBOX\r\n\r\n1. download it \r\n2. MASM/TASM extension\r\n3. open vs code settings \r\n    - search on masm\r\n    - Assembler option on ```tasm```\r\n    - scroll down to ```emulator```\r\n    - make sure it select ```dosBox```\r\n## 🛠 Skills\r\nJavascript, HTML, CSS...\r\n\r\n\r\n## Installation\r\n\r\nInstall my-project with npm\r\n\r\n```bash\r\n  npm install my-project\r\n  cd my-project\r\n```\r\n    \r\n![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)\r\n\r\n\r\n## Roadmap\r\n\r\n- Additional browser support\r\n\r\n- Add more integrations\r\n\r\n', NULL, 'Aliaa', 'Abdelaziz'),
(3, '\r\n## Hate To Bring it to you **BUT**\r\n\r\nA brief description of what this project does and who it\'s for\r\n\r\n## Color Reference\r\n\r\n| Color             | Hex                                                                |\r\n| ----------------- | ------------------------------------------------------------------ |\r\n| Example Color | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) #0a192f |\r\n| Example Color | ![#f8f8f8](https://via.placeholder.com/10/f8f8f8?text=+) #f8f8f8 |\r\n| Example Color | ![#00b48a](https://via.placeholder.com/10/00b48a?text=+) #00b48a |\r\n| Example Color | ![#00d1a0](https://via.placeholder.com/10/00b48a?text=+) #00d1a0 |\r\n\r\n\r\n## Environment Variables\r\n\r\nTo run this project, you will need to add the following environment variables to your .env file\r\n\r\n`API_KEY`\r\n\r\n`ANOTHER_API_KEY`\r\n\r\n\r\n## 🚀 About Me\r\nI\'m a full stack developer...\r\n\r\n\r\n## 🔗 Links\r\n[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherineoelsner.com/)\r\n[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)\r\n[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)\r\n\r\n', NULL, 'Aliaa', 'Abdelaziz'),
(5, 'How to Create Beautiful Websites\r\n\r\n   long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we ', NULL, NULL, NULL),
(6, 'How to Create Beautiful Websites\r\n\r\n   long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we ', NULL, NULL, NULL),
(7, 'How to Create Beautiful Websites\r\n\r\n   long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we ', NULL, NULL, NULL),
(8, 'How to Create Beautiful Websites\r\n\r\n   long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we ', NULL, NULL, NULL),
(9, 'How to Create Beautiful Websites\r\n\r\n   long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we ', NULL, NULL, NULL),
(10, 'How to Create Beautiful Websites\r\n\r\n   long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we ', NULL, NULL, NULL),
(11, 'How to Create Beautiful Websites\r\n\r\n   long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we ', NULL, NULL, NULL),
(12, 'How to Create Beautiful Websites\r\n\r\n   long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we ', NULL, NULL, NULL),
(13, 'How to Create Beautiful Websites\r\n\r\n   long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we ', NULL, NULL, NULL),
(14, 'How to Create Beautiful Websites\r\n\r\n   long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we ', NULL, NULL, NULL),
(15, 'How to Create Beautiful Websites\r\n\r\n   long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we ', NULL, NULL, NULL),
(16, 'How to Create Beautiful Websites\r\n\r\n   long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we ', NULL, NULL, NULL),
(17, 'How to Create Beautiful Websites\r\n\r\n   long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we  long ago when there’s multiple theirs we go for web dev we gor for higher road where we clear that’s not going to clear that we we ', NULL, NULL, NULL),
(18, '\n## Hate To Bring it to you **BUT**\n\nA brief description of what this project does and who it\'s for\n\n## Color Reference\n\n| Color             | Hex                                                                |\n| ----------------- | ------------------------------------------------------------------ |\n| Example Color | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) #0a192f |\n| Example Color | ![#f8f8f8](https://via.placeholder.com/10/f8f8f8?text=+) #f8f8f8 |\n| Example Color | ![#00b48a](https://via.placeholder.com/10/00b48a?text=+) #00b48a |\n| Example Color | ![#00d1a0](https://via.placeholder.com/10/00b48a?text=+) #00d1a0 |\n\n\n## Environment Variables\n\nTo run this project, you will need to add the following environment variables to your .env file\n\n`API_KEY`\n\n`ANOTHER_API_KEY`\n\n\n## 🚀 About Me\nI\'m a full stack developer...\n\n\n## 🔗 Links\n[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherineoelsner.com/)\n[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)\n[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)\n\n', NULL, NULL, NULL),
(24, '\r\n## Hate To Bring it to you **BUT**\r\n\r\nA brief description of what this project does and who it`s for\r\n\r\n## Color Reference\r\n\r\n| Color             | Hex                                                                |\r\n| ----------------- | ------------------------------------------------------------------ |\r\n| Example Color | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) #0a192f |\r\n| Example Color | ![#f8f8f8](https://via.placeholder.com/10/f8f8f8?text=+) #f8f8f8 |\r\n| Example Color | ![#00b48a](https://via.placeholder.com/10/00b48a?text=+) #00b48a |\r\n| Example Color | ![#00d1a0](https://via.placeholder.com/10/00b48a?text=+) #00d1a0 |\r\n\r\n\r\n## Environment Variables\r\n\r\nTo run this project, you will need to add the following environment variables to your .env file\r\n\r\n`API_KEY`\r\n\r\n`ANOTHER_API_KEY`\r\n\r\n\r\n## ???? About Me\r\nI`m a full stack developer...\r\n\r\n\r\n## ???? Links\r\n[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherineoelsner.com/)\r\n[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)\r\n[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)\r\n\r\n', NULL, NULL, NULL),
(25, '\r\n## Hate To Bring it to you **BUT**\r\n\r\nA brief description of what this project does and who it`s for\r\n\r\n## Color Reference\r\n\r\n| Color             | Hex                                                                |\r\n| ----------------- | ------------------------------------------------------------------ |\r\n| Example Color | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) #0a192f |\r\n| Example Color | ![#f8f8f8](https://via.placeholder.com/10/f8f8f8?text=+) #f8f8f8 |\r\n| Example Color | ![#00b48a](https://via.placeholder.com/10/00b48a?text=+) #00b48a |\r\n| Example Color | ![#00d1a0](https://via.placeholder.com/10/00b48a?text=+) #00d1a0 |\r\n\r\n\r\n## Environment Variables\r\n\r\nTo run this project, you will need to add the following environment variables to your .env file\r\n\r\n`API_KEY`\r\n\r\n`ANOTHER_API_KEY`\r\n\r\n\r\n## ???? About Me\r\nI`m a full stack developer...\r\n\r\n\r\n## ???? Links\r\n[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherineoelsner.com/)\r\n[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)\r\n[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)\r\n\r\n', NULL, NULL, NULL),
(26, '\r\n## Hate To Bring it to you **BUT**\r\n\r\nA brief description of what this project does and who it`s for\r\n\r\n## Color Reference\r\n\r\n| Color             | Hex                                                                |\r\n| ----------------- | ------------------------------------------------------------------ |\r\n| Example Color | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) #0a192f |\r\n| Example Color | ![#f8f8f8](https://via.placeholder.com/10/f8f8f8?text=+) #f8f8f8 |\r\n| Example Color | ![#00b48a](https://via.placeholder.com/10/00b48a?text=+) #00b48a |\r\n| Example Color | ![#00d1a0](https://via.placeholder.com/10/00b48a?text=+) #00d1a0 |\r\n\r\n\r\n## Environment Variables\r\n\r\nTo run this project, you will need to add the following environment variables to your .env file\r\n\r\n`API_KEY`\r\n\r\n`ANOTHER_API_KEY`\r\n\r\n\r\n## ???? About Me\r\nI`m a full stack developer...\r\n\r\n\r\n## ???? Links\r\n[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherineoelsner.com/)\r\n[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)\r\n[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)\r\n\r\n', NULL, NULL, NULL),
(27, '\r\n## Hate To Bring it to you **BUT**\r\n\r\nA brief description of what this project does and who it`s for\r\n\r\n## Color Reference\r\n\r\n| Color             | Hex                                                                |\r\n| ----------------- | ------------------------------------------------------------------ |\r\n| Example Color | ![#0a192f](https://via.placeholder.com/10/0a192f?text=+) #0a192f |\r\n| Example Color | ![#f8f8f8](https://via.placeholder.com/10/f8f8f8?text=+) #f8f8f8 |\r\n| Example Color | ![#00b48a](https://via.placeholder.com/10/00b48a?text=+) #00b48a |\r\n| Example Color | ![#00d1a0](https://via.placeholder.com/10/00b48a?text=+) #00d1a0 |\r\n\r\n\r\n## Environment Variables\r\n\r\nTo run this project, you will need to add the following environment variables to your .env file\r\n\r\n`API_KEY`\r\n\r\n`ANOTHER_API_KEY`\r\n\r\n\r\n## ???? About Me\r\nI`m a full stack developer...\r\n\r\n\r\n## ???? Links\r\n[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherineoelsner.com/)\r\n[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)\r\n[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)\r\n\r\n', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `article_topic`
--

CREATE TABLE `article_topic` (
  `AID` int(11) NOT NULL,
  `TID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `article_topic`
--

INSERT INTO `article_topic` (`AID`, `TID`) VALUES
(14, 1),
(15, 1),
(15, 2),
(15, 4),
(15, 6),
(16, 1),
(16, 2),
(16, 4),
(16, 6),
(17, 1),
(18, 2),
(18, 5),
(18, 6),
(24, 1),
(24, 2),
(24, 3),
(24, 4),
(24, 5),
(24, 6),
(24, 7),
(24, 8),
(25, 1),
(25, 2),
(25, 3),
(25, 4),
(25, 5),
(25, 6),
(25, 7),
(25, 8),
(26, 1),
(26, 2),
(26, 3),
(26, 4),
(26, 5),
(26, 6),
(26, 7),
(26, 8),
(27, 1),
(27, 2),
(27, 3),
(27, 4),
(27, 5),
(27, 6),
(27, 7),
(27, 8);

-- --------------------------------------------------------

--
-- Table structure for table `element`
--

CREATE TABLE `element` (
  `ID` int(11) NOT NULL,
  `CREATIONDATE` date ,
  `TITLE` varchar(25) NOT NULL CHECK (octet_length(`TITLE`) >= 2),
  `IMAGE` varchar(400) DEFAULT NULL,
  `DESCRIPTION` varchar(800) NOT NULL CHECK (octet_length(`DESCRIPTION`) >= 20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `element`
--

INSERT INTO `element` (`ID`, `CREATIONDATE`, `TITLE`, `IMAGE`, `DESCRIPTION`) VALUES
(1, '2022-12-15', 'Who react & assembly kill', 'http://localhost:4000/images/1.jpg', 'they killed me every day and night'),
(2, '2022-12-15', 'Database killed a student', 'http://localhost:4000/images/2.jpg', 'after midterm they killed each part'),
(3, '2022-12-15', 'clr me', 'http://localhost:4000/images/e6563f53a63f8a3fd0fa8fa05ebb96e0', 'my life was wasted on react'),
(4, '2022-12-15', 'clr me', 'http://localhost:4000/images/93cd527f2855ac5cc3415105943357e6', 'my life was wasted on react'),
(5, '2022-12-15', 'How to die after midterm', 'http://localhost:4000/images/ef1a6b90c369deadf4db3a1b2ef03aa9', 'How React Killed me ??'),
(6, '2022-12-15', 'How to die after midterm', 'http://localhost:4000/images/f3faaebe1a49bbd01a503395f4e15ecd', 'How React Killed me ??'),
(7, '2022-12-15', 'How to die after midterm', 'http://localhost:4000/images/f74a50d74de7986c6ce1f71904b1d638', 'How React Killed me ??'),
(8, '2022-12-15', 'How to die after midterm', 'http://localhost:4000/images/9ee66d46dc9cfa3144de22bf302d90ad', 'How React Killed me ??'),
(9, '2022-12-15', 'How to die after midterm', 'http://localhost:4000/images/bf100560716a1f23a252b8c9db48f652', 'How React Killed me ??'),
(10, '2022-12-15', 'How to die after midterm', 'http://localhost:4000/images/43b297186f3bfa4719f77c2d051f7f39', 'How React Killed me ??'),
(11, '2022-12-15', 'How to die after midterm', 'http://localhost:4000/images/072ca67d776b42634943e0488d289d1d', 'How React Killed me ??'),
(12, '2022-12-15', 'How to die after midterm', 'http://localhost:4000/images/3d7d9f558f05891de9061678684c9569', 'How React Killed me ??'),
(13, '2022-12-15', 'How to die after midterm', 'http://localhost:4000/images/c96b31fb3f0b692058f06b13c2a40dfb', 'How React Killed me ??'),
(14, '2022-12-15', 'How to die after midterm', 'http://localhost:4000/images/6aeffc0248361f0b53c1e34069f183cb', 'How React Killed me ??'),
(15, '2022-12-15', 'How to die after midterm', 'http://localhost:4000/images/144a43fb2f50687983a1190f0798b46b', 'How React Killed me ??'),
(16, '2022-12-15', 'How to die after midterm', 'http://localhost:4000/images/df00a2d8543a71de859cbfd194965a15', 'How React Killed me ??'),
(17, '2022-12-15', 'my life pretty sad', 'http://localhost:4000/images/88c39e8777b355a94594550e4f8a24c7', 'my life was wasted on react'),
(18, '2022-12-16', 'How To kill Time', 'http://localhost:4000/images/a5f496aa097b4286f4a33f3721d3d45e', 'by killing humans haha'),
(19, '2022-12-16', 'My Life was Sad  killing', 'http://localhost:4000/images/16c52a822b35c62bd046058fb314101a', 'but after that i realised that i am بشمهندس'),
(20, '2022-12-16', 'My Life pretty Sad', 'http://localhost:4000/images/3539e6c6a36fa264e1b9a3bb40d22be9', 'How React Killed me ??'),
(21, '2022-12-16', 'My Life pretty Sad', 'http://localhost:4000/images/c34b56819e67893e4968a140fc5f66a8', 'How React Killed me ??'),
(22, '2022-12-16', 'My Life pretty Sad', 'http://localhost:4000/images/22f8ae4da0b32aec363d7028a842cdb4', 'How React Killed me ??'),
(23, '2022-12-16', 'My Life pretty Sad', 'http://localhost:4000/images/889373d8468c37497d3ff3b1d6e06c6d', 'How React Killed me ??'),
(24, '2022-12-16', 'My Life pretty Sad', 'http://localhost:4000/images/c59508a43a243c697fa604689d0c65af', 'How React Killed me ??'),
(25, '2022-12-16', 'kill me after cry', 'http://localhost:4000/images/8e5ca8850888fa6a6f703a27f6dc7704', 'my life was wasted on react'),
(26, '2022-12-16', 'kill me after a cry', 'http://localhost:4000/images/582097b274dcc3f0ec14fc7ab711af00', 'my life was wasted on react'),
(27, '2022-12-16', 'kill me pleasee', 'http://localhost:4000/images/db947fd69729b19bacde40fecc56d653', 'my life was wasted on react');

-- --------------------------------------------------------

--
-- Table structure for table `instructor`
--

CREATE TABLE `instructor` (
  `ID` int(11) NOT NULL,
  `RATING` int(11) DEFAULT 0 CHECK (`RATING` >= 0 and `RATING` <= 10)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `instructor`
--

INSERT INTO `instructor` (`ID`, `RATING`) VALUES
(6, 5);

-- --------------------------------------------------------

--
-- Table structure for table `likeonarticle`
--

CREATE TABLE `likeonarticle` (
  `UID` int(11) NOT NULL,
  `AID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likeonarticle`
--

INSERT INTO `likeonarticle` (`UID`, `AID`) VALUES
(2, 27),
(5, 27);

-- --------------------------------------------------------

--
-- Table structure for table `likeoncomment`
--

CREATE TABLE `likeoncomment` (
  `UID` int(11) NOT NULL,
  `CID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `readarticle`
--

CREATE TABLE `readarticle` (
  `SID` int(11) NOT NULL,
  `AID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `ID` int(11) NOT NULL,
  `_RANK` int(11) DEFAULT 0,
  `SCORE` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`ID`, `_RANK`, `SCORE`) VALUES
(2, 20, 1340),
(5, 5, 1800),
(6, 10, 3000);

-- --------------------------------------------------------

--
-- Table structure for table `topic`
--

CREATE TABLE `topic` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(30) NOT NULL CHECK (octet_length(`NAME`) >= 2)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `topic`
--

INSERT INTO `topic` (`ID`, `NAME`) VALUES
(1, 'all'),
(8, 'asd'),
(4, 'css'),
(2, 'good'),
(6, 'modern'),
(5, 'star'),
(7, 'thugLife'),
(3, 'web');

-- --------------------------------------------------------

--
-- Table structure for table `_comment`
--

CREATE TABLE `_comment` (
  `ID` int(11) NOT NULL,
  `AID` int(11) NOT NULL,
  `RID` int(11) DEFAULT NULL,
  `UID` int(11) NOT NULL,
  `CREATIONDATENTIME` datetime ,
  `BODY` varchar(1000) NOT NULL CHECK (octet_length(`BODY`) > 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `_user`
--

CREATE TABLE `_user` (
  `ID` int(11) NOT NULL,
  `USERNAME` varchar(20) NOT NULL CHECK (octet_length(`USERNAME`) >= 3),
  `FNAME` varchar(32) NOT NULL CHECK (`FNAME`  not like '%[^a-zA-Z]%' and octet_length(`FNAME`) >= 3),
  `SNAME` varchar(32) NOT NULL CHECK (`SNAME`  not like '%[^a-zA-Z]%' and octet_length(`SNAME`) >= 3),
  `EMAIL` varchar(32) NOT NULL CHECK (`EMAIL` like '%@%.%'),
  `JOINDATE` date ,
  `ABOUT` mediumtext DEFAULT NULL,
  `ISADMIN` bit(1) NOT NULL DEFAULT b'0',
  `_PASSWORD` varchar(60) NOT NULL,
  `_IMAGE` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `_user`
--

INSERT INTO `_user` (`ID`, `USERNAME`, `FNAME`, `SNAME`, `EMAIL`, `JOINDATE`, `ABOUT`, `ISADMIN`, `_PASSWORD`, `_IMAGE`) VALUES
(2, 'aliaagheis1', 'aliaa', 'gheis', 'aliaagheis1@gmail.com', '2022-12-15', NULL, b'1', '$2a$10$ZweVRabdZ/zO6QnrWZmQLewqeI/nqCxrT2Y.GMSAQqMbkwvYyjb7a', 'https://7wdata.be/wp-content/uploads/2016/05/icon-user-default.png}'),
(5, 'aliaagheis', 'aliaaBest', 'gheis', 'aliaagheis@gmail.com', '2022-12-16', 'hate react and cry on it', b'1', '$2a$10$cDzjcn6AkKSCWmczQM0.F.P/vgLQKp1e/M5tz0lnFzEHMESovWh..', 'http://localhost:4000/images/914cc92fb5e371c658f6757fd765fa2f'),
(6, 'aliaagheisDel', 'aliaa', 'gheis', 'adadja@a.com', '2022-12-16', NULL, b'1', '$2a$10$Kw.OA6ooSLs4eKYJNgQyDexZqvZdrnmUswY9.pGiU5gV9dBEBPv2S', 'http://localhost:4000/images/37ba040aecbcb1ae53126b3825e1cb7d');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `INSTRUCTORID` (`INSTRUCTORID`);

--
-- Indexes for table `article_topic`
--
ALTER TABLE `article_topic`
  ADD PRIMARY KEY (`AID`,`TID`),
  ADD KEY `TID` (`TID`);

--
-- Indexes for table `element`
--
ALTER TABLE `element`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `instructor`
--
ALTER TABLE `instructor`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `likeonarticle`
--
ALTER TABLE `likeonarticle`
  ADD PRIMARY KEY (`UID`,`AID`),
  ADD KEY `AID` (`AID`);

--
-- Indexes for table `likeoncomment`
--
ALTER TABLE `likeoncomment`
  ADD PRIMARY KEY (`UID`,`CID`),
  ADD KEY `CID` (`CID`);

--
-- Indexes for table `readarticle`
--
ALTER TABLE `readarticle`
  ADD PRIMARY KEY (`SID`,`AID`),
  ADD KEY `AID` (`AID`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `NAME` (`NAME`);

--
-- Indexes for table `_comment`
--
ALTER TABLE `_comment`
  ADD PRIMARY KEY (`ID`,`AID`),
  ADD KEY `AID` (`AID`),
  ADD KEY `RID` (`RID`),
  ADD KEY `UID` (`UID`);

--
-- Indexes for table `_user`
--
ALTER TABLE `_user`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `USERNAME` (`USERNAME`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `element`
--
ALTER TABLE `element`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `topic`
--
ALTER TABLE `topic`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `_comment`
--
ALTER TABLE `_comment`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `_user`
--
ALTER TABLE `_user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`INSTRUCTORID`) REFERENCES `instructor` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `article_ibfk_2` FOREIGN KEY (`ID`) REFERENCES `element` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `article_topic`
--
ALTER TABLE `article_topic`
  ADD CONSTRAINT `article_topic_ibfk_1` FOREIGN KEY (`AID`) REFERENCES `article` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `article_topic_ibfk_2` FOREIGN KEY (`TID`) REFERENCES `topic` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `instructor`
--
ALTER TABLE `instructor`
  ADD CONSTRAINT `instructor_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `_user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likeonarticle`
--
ALTER TABLE `likeonarticle`
  ADD CONSTRAINT `likeonarticle_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `_user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likeonarticle_ibfk_2` FOREIGN KEY (`AID`) REFERENCES `article` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likeoncomment`
--
ALTER TABLE `likeoncomment`
  ADD CONSTRAINT `likeoncomment_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `_user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likeoncomment_ibfk_2` FOREIGN KEY (`CID`) REFERENCES `_comment` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `readarticle`
--
ALTER TABLE `readarticle`
  ADD CONSTRAINT `readarticle_ibfk_1` FOREIGN KEY (`SID`) REFERENCES `student` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `readarticle_ibfk_2` FOREIGN KEY (`AID`) REFERENCES `article` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`ID`) REFERENCES `_user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_comment`
--
ALTER TABLE `_comment`
  ADD CONSTRAINT `_comment_ibfk_1` FOREIGN KEY (`AID`) REFERENCES `article` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_comment_ibfk_2` FOREIGN KEY (`RID`) REFERENCES `_comment` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_comment_ibfk_3` FOREIGN KEY (`UID`) REFERENCES `_user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
