DROP DATABASE IF EXISTS CodeCourses;
CREATE DATABASE CodeCourses;

use CodeCourses;

DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS instructor;
DROP TABLE IF EXISTS _USER;

CREATE TABLE _USER
(ID INT NOT NULL AUTO_INCREMENT ,
USERNAME varchar(20) NOT NULL CHECK (LENGTH(USERNAME) >=3),
FNAME varchar(32) NOT NULL CHECK (FNAME NOT LIKE '%[^a-zA-Z]%' AND (LENGTH(FNAME) >=3)),
SNAME varchar(32) NOT NULL CHECK (SNAME NOT LIKE '%[^a-zA-Z]%' AND (LENGTH(SNAME)>=3)),
EMAIL varchar(32) NOT NULL CHECK (EMAIL LIKE '%@%.%'),
JOINDATE DATE DEFAULT NOW(),
ABOUT varchar(50000),
ISADMIN BIT NOT NULL DEFAULT 0,
_PASSWORD varchar(60) NOT NULL,
_IMAGE varchar(400),
PRIMARY KEY(ID),
UNIQUE (USERNAME), 
 UNIQUE (EMAIL)

);
CREATE TABLE STUDENT
(ID INT,
_RANK INT DEFAULT 0,
NUMBEROFENROLLEDCOURSES INT DEFAULT 0,
 NUMBEROFREADARTICLES INT DEFAULT 0,
NUMBEROFSOLVEDQUIZZES INT DEFAULT 0,
SCORE INT DEFAULT 0,
PRIMARY KEY (ID),
FOREIGN KEY (ID) REFERENCES _USER(ID)
ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE INSTRUCTOR
( ID INT,
 NUMBEROFARTICLESWRITTEN INT DEFAULT 0,
 NUMBEROFQUIZCREATED INT DEFAULT 0,
NUMBEROFCOURSESINSTRUCTED INT DEFAULT 0,
RATING INT DEFAULT 0 CHECK (RATING >= 0 AND RATING <= 10),
PRIMARY KEY (ID),
FOREIGN KEY (ID) REFERENCES _USER(ID)
ON DELETE CASCADE  ON UPDATE CASCADE
)