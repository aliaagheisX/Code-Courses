DROP DATABASE IF EXISTS CodeCourses;
CREATE DATABASE CodeCourses;

use CodeCourses;
############USER############
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
SCORE INT DEFAULT 0,
PRIMARY KEY (ID),
FOREIGN KEY (ID) REFERENCES _USER(ID)
ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE INSTRUCTOR
( ID INT,
RATING INT DEFAULT 0 CHECK (RATING >= 0 AND RATING <= 10),
PRIMARY KEY (ID),
FOREIGN KEY (ID) REFERENCES _USER(ID)
ON DELETE CASCADE  ON UPDATE CASCADE
);
CREATE TABLE ELEMENT
(ID INT AUTO_INCREMENT,
 CREATIONDATE DATE DEFAULT NOW(),
 TITLE VARCHAR(50) NOT NULL CHECK (length(TITLE)>=2),
 IMAGE varchar(400),
 DESCRIPTION varchar(800) not null CHECK (length(DESCRIPTION)>=20),
 PRIMARY KEY (ID));
 ##########ARTICLE##########
CREATE TABLE ARTICLE
( ID INT AUTO_INCREMENT,
  LID INT,
  BODY varchar(5000000) NOT NULL CHECK (length(BODY)>=20), 
 INSTRUCTORID INT,
 AUTHORFNAME VARCHAR(32)  CHECK (AUTHORFNAME NOT LIKE '%[^a-zA-Z]%' AND (LENGTH(AUTHORFNAME) >=3)),
 AUTHORSNAME VARCHAR(32)  CHECK (AUTHORSNAME NOT LIKE '%[^a-zA-Z]%' AND (LENGTH(AUTHORSNAME) >=3)),
  PRIMARY KEY(ID),
 FOREIGN KEY(INSTRUCTORID) REFERENCES INSTRUCTOR(ID)
 ON DELETE SET NULL ON UPDATE CASCADE,
 FOREIGN KEY (ID) REFERENCES ELEMENT(ID) 
 ON DELETE CASCADE  ON UPDATE CASCADE
 );
CREATE TABLE TOPIC 
(ID INT AUTO_INCREMENT,
NAME VARCHAR(30) NOT NULL CHECK (LENGTH(NAME)>=2),
PRIMARY KEY (ID),
UNIQUE(NAME));
CREATE TABLE READARTICLE
(SID INT,
 AID INT,#ARTICLE ID
 PRIMARY KEY(SID,AID),
 FOREIGN KEY (SID) REFERENCES STUDENT(ID)
 ON DELETE CASCADE ON UPDATE CASCADE,
 FOREIGN KEY (AID) REFERENCES ARTICLE(ID)
 ON DELETE CASCADE ON UPDATE CASCADE);
 CREATE TABLE ARTICLE_TOPIC
 (AID INT,#ARTICLE ID
  TID INT,
  PRIMARY KEY (AID,TID),
  FOREIGN KEY (AID) REFERENCES ARTICLE(ID)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (TID) REFERENCES TOPIC(ID) 
  ON DELETE CASCADE ON UPDATE CASCADE
 );
 CREATE TABLE LIKEONARTICLE #USER LIKED AN ARTICLE
 (UID INT,#USER ID
  AID INT,#ARTICLE ID
  PRIMARY KEY(UID,AID),
  FOREIGN KEY (UID) REFERENCES _USER(ID)
  ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (AID) REFERENCES ARTICLE(ID)
   ON UPDATE CASCADE ON DELETE CASCADE);
 CREATE TABLE _COMMENT#WEAK ENTITY
(ID INT AUTO_INCREMENT,
  AID INT ,#ARTICLE ID
  RID INT ,#REPLY ID
  UID INT NOT NULL,#USER ID   
  CREATIONDATENTIME DATETIME DEFAULT NOW(),
  BODY VARCHAR(1000) NOT NULL CHECK (length(BODY)>5),
  PRIMARY KEY (ID,AID),
  FOREIGN KEY (AID) REFERENCES ARTICLE(ID)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (RID) REFERENCES _COMMENT(ID)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (UID) REFERENCES _USER(ID) 
  ON DELETE CASCADE ON UPDATE CASCADE   
 );  
 CREATE TABLE LIKEONCOMMENT #USER LIKED A COMMENT
 (UID INT,#USER ID
  CID INT,#COMMENT ID
  PRIMARY KEY(UID,CID),
  FOREIGN KEY (UID) REFERENCES _USER(ID)
  ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (CID) REFERENCES _COMMENT(ID)
   ON UPDATE CASCADE ON DELETE CASCADE);
  
CREATE TABLE COURSE 
 (
  ID INT AUTO_INCREMENT,
  INSTRUCTORID INT,
  INSTRUCTORFNAME VARCHAR(32)  CHECK (INSTRUCTORFNAME NOT LIKE '%[^a-zA-Z]%' AND (LENGTH(INSTRUCTORFNAME) >=3)),
  INSTRUCTORSNAME VARCHAR(32)  CHECK (INSTRUCTORSNAME NOT LIKE '%[^a-zA-Z]%' AND (LENGTH(INSTRUCTORSNAME) >=3)),
  PREREQUISITES VARCHAR(256) DEFAULT NULL,
  FOREIGN KEY (INSTRUCTORID) REFERENCES INSTRUCTOR(ID)
  ON DELETE SET NULL ON UPDATE CASCADE,
  PRIMARY KEY (ID),
  FOREIGN KEY (ID) REFERENCES ELEMENT(ID)
  ON UPDATE CASCADE ON DELETE CASCADE
 );

 CREATE TABLE COURSE_TOPIC
 (
  CID INT,
  TID INT,
  PRIMARY KEY (CID, TID),
  FOREIGN KEY (CID) REFERENCES COURSE(ID)
  ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (TID) REFERENCES TOPIC(ID)
  ON UPDATE CASCADE ON DELETE CASCADE
 );

 CREATE TABLE ENROLL
 (
    STARTDATE DATETIME DEFAULT NOW(),
    REVIEWBODY VARCHAR(256) DEFAULT NULL,
    REVIEWRATING INT DEFAULT NULL CHECK (REVIEWRATING >= 0 AND REVIEWRATING <= 5),
    SID INT,
    CID INT,
    PRIMARY KEY(SID, CID),
    FOREIGN KEY(SID) REFERENCES STUDENT(ID)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(CID) REFERENCES COURSE(ID)
    ON UPDATE CASCADE ON DELETE CASCADE
 );

 CREATE TABLE LESSON
 (
   LID INT AUTO_INCREMENT,
  NAME VARCHAR(32) CHECK(NAME NOT LIKE '%[^a-zA-Z]%' AND LENGTH(NAME)>=1),
  DESCRIPTION VARCHAR(256) CHECK(DESCRIPTION NOT LIKE '%[^a-zA-Z]%' AND LENGTH(DESCRIPTION)>=1),
  CID INT NOT NULL,
  PRIMARY KEY(LID),
  FOREIGN KEY(CID) REFERENCES COURSE(ID)
  ON UPDATE CASCADE ON DELETE CASCADE
 );

   ##########QUIZ###########
 CREATE TABLE QUIZ (
   ID INT AUTO_INCREMENT,
   LID INT,
   MAXSCORE INT NOT NULL,
   INSTRUCTORID INT,
   PRIMARY KEY(ID),
   INSTRUCTORFNAME VARCHAR(32) CHECK (INSTRUCTORFNAME NOT LIKE '%[^a-zA-Z]%' AND (LENGTH(INSTRUCTORFNAME) >=3)),
   INSTRUCTORSNAME VARCHAR(32) CHECK (INSTRUCTORSNAME NOT LIKE '%[^a-zA-Z]%' AND (LENGTH(INSTRUCTORSNAME) >=3)),
   FOREIGN KEY(LID) REFERENCES LESSON(LID)
   ON UPDATE CASCADE ON DELETE SET NULL,
   FOREIGN KEY (ID) REFERENCES ELEMENT (ID)
   ON UPDATE CASCADE ON DELETE CASCADE,
   FOREIGN KEY (INSTRUCTORID) REFERENCES INSTRUCTOR(ID)
   ON DELETE SET NULL ON UPDATE CASCADE );
 CREATE TABLE STUDENTTAKESQUIZ (
    QID INT,#QUIZ ID
     SID INT,#STUDENT ID
     SCORE INT NOT NULL,
     TAKEDATE DATE DEFAULT NOW(),
     PRIMARY KEY (QID,SID),
     FOREIGN KEY (QID) REFERENCES QUIZ(ID)
     ON UPDATE CASCADE ON DELETE CASCADE,
     FOREIGN KEY (SID) REFERENCES STUDENT (ID)
  ON UPDATE CASCADE ON DELETE CASCADE);
  
 CREATE TABLE QUESTION(
    ID INT AUTO_INCREMENT,
    SCORE INT NOT NULL,
    BODY varchar(500000) NOT NULL CHECK (length(BODY)>=10),
    INSTRUCTORID INT NOT NULL,	
     PRIMARY KEY (ID),
    FOREIGN KEY (INSTRUCTORID) REFERENCES INSTRUCTOR(ID)
    ON DELETE CASCADE ON UPDATE CASCADE 
  );   
 CREATE TABLE CHOICES(
    ID INT,
    ISCORRECT INT NOT NULL,
     BODY varchar(255) NOT NULL CHECK (length(BODY)>=2 and length(BODY)<=255 ),
     PRIMARY KEY(ID,body),
     FOREIGN KEY (ID) REFERENCES QUESTION (ID)
     ON DELETE CASCADE ON UPDATE CASCADE);   
  CREATE TABLE QUIZ_QUESTION_TOPIC
  (QID INT,#QUIZ ID
   NID INT,#QUESTION ID
   TID INT,#TOPIC ID
   PRIMARY KEY(QID,NID,TID),
   FOREIGN KEY (QID) REFERENCES QUIZ (ID)
   ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (NID) REFERENCES QUESTION (ID)
   ON DELETE CASCADE ON UPDATE CASCADE,
   FOREIGN KEY (TID) REFERENCES TOPIC (ID)
   ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE MESSAGES 
(
    MID INT AUTO_INCREMENT,
    SENDDATETIME DATETIME DEFAULT NOW(),
    TXT VARCHAR(256) NOT NULL CHECK (LENGTH(TXT) >= 1),
    SENDER VARCHAR(20) NOT NULL CHECK (LENGTH(SENDER) >= 3),
    CID INT,
    PRIMARY KEY(MID),
    FOREIGN KEY(SENDER) REFERENCES _USER(USERNAME)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(CID) REFERENCES COURSE(ID)
    ON UPDATE CASCADE ON DELETE CASCADE
);

ALTER TABLE ARTICLE ADD FOREIGN KEY (LID) REFERENCES LESSON(LID)
ON UPDATE CASCADE ON DELETE SET NULL;   
DELIMITER $$

CREATE TRIGGER like_article
AFTER INSERT
ON LIKEONARTICLE FOR EACH ROW
BEGIN
    UPDATE INSTRUCTOR
    SET RATING=RATING+100
    WHERE INSTRUCTOR.ID IN (SELECT INSTRUCTORID FROM ARTICLE WHERE ID=NEW.AID);
END$$
DELIMITER ;  

CREATE TRIGGER dislike_article
AFTER DELETE
ON LIKEONARTICLE FOR EACH ROW
BEGIN
    UPDATE INSTRUCTOR
    SET RATING=RATING-100
    WHERE INSTRUCTOR.ID IN (SELECT INSTRUCTORID FROM ARTICLE WHERE ID=OLD.AID);
END$$
DELIMITER ;

CREATE TRIGGER like_comment
AFTER INSERT
ON LIKEONCOMMENT FOR EACH ROW
BEGIN
    UPDATE STUDENT
    SET SCORE=SCORE+10
    WHERE STUDENT.ID IN (SELECT UID FROM _COMMENT WHERE ID=NEW.CID);
END$$
DELIMITER ;

CREATE TRIGGER dislike_comment
AFTER DELETE
ON LIKEONCOMMENT FOR EACH ROW
BEGIN
    UPDATE STUDENT
    SET SCORE=SCORE-10
    WHERE STUDENT.ID IN (SELECT UID FROM _COMMENT WHERE ID=OLD.CID);
END$$
DELIMITER ;    

CREATE TRIGGER read_article
AFTER INSERT 
ON READARTICLE FOR EACH ROW
BEGIN
    UPDATE STUDENT
    SET SCORE=SCORE+25
    WHERE STUDENT.ID=NEW.SID;

    UPDATE INSTRUCTOR
    SET RATING=RATING+50
    WHERE INSTRUCTOR.ID IN (SELECT INSTRUCTORID FROM ARTICLE WHERE ID=NEW.AID);
END$$
DELIMITER ;

CREATE TRIGGER student_takes_quiz
AFTER INSERT
ON STUDENTTAKESQUIZ FOR EACH ROW
BEGIN
    UPDATE STUDENT
    SET SCORE=SCORE+NEW.SCORE
    WHERE STUDENT.ID=NEW.SID;
END$$
DELIMITER ;    

CREATE TRIGGER review
AFTER UPDATE 
ON ENROLL FOR EACH ROW
BEGIN
    IF OLD.REVIEWBODY <> NEW.REVIEWBODY THEN
        UPDATE INSTRUCTOR
        SET RATING=RATING+(NEW.REVIEWRATING-OLD.REVIEWRATING)*10
        WHERE INSTRUCTOR.ID IN (SELECT INSTRUCTORID FROM COURSE WHERE ID=NEW.CID);
    ELSEIF OLD.REVIEWBODY IS NULL THEN
        UPDATE INSTRUCTOR
        SET RATING=RATING+NEW.REVIEWRATING*10
        WHERE INSTRUCTOR.ID IN (SELECT INSTRUCTORID FROM COURSE WHERE ID=NEW.CID);        
    END IF;
END$$
DELIMITER ;    

CREATE TRIGGER names_change
AFTER UPDATE
ON _user FOR EACH ROW
BEGIN
    IF OLD.FNAME <> new.FNAME OR OLD.SNAME <> new.SNAME THEN
        UPDATE course 
        set course.INSTRUCTORFNAME = new.FNAME, course.INSTRUCTORSNAME = new.SNAME
        WHERE course.INSTRUCTORID = new.ID;
        
        UPDATE article 
        set article.AUTHORFNAME = new.FNAME, article.AUTHORSNAME = new.SNAME
        WHERE article.INSTRUCTORID = new.ID;
        
        UPDATE quiz 
        set quiz.INSTRUCTORFNAME = new.FNAME, quiz.INSTRUCTORSNAME = new.SNAME
        WHERE quiz.INSTRUCTORID = new.ID;
    END IF;
END$$

DELIMITER ;

DELIMITER &&  
CREATE PROCEDURE add_article
	(IN title Varchar(50), 
     IN description Varchar(800), 
     IN image Varchar(400),
     IN body Varchar(5000000),
     IN i_id INT(10),
     OUT article_id INT(10) )   
BEGIN    
    INSERT INTO ELEMENT(TITLE,DESCRIPTION,IMAGE) VALUES (title, description, image);
    SET article_id = LAST_INSERT_ID();
    INSERT INTO ARTICLE(ID,BODY,INSTRUCTORID, AUTHORFNAME, AUTHORSNAME) 
    VALUES(
        article_id, 
        body, 
        i_id,
        (SELECT FNAME from _user WHERE _user.ID =  i_id), 
        (SELECT SNAME from _user WHERE _user.ID =  i_id)
    );
END &&  
DELIMITER ;


DELIMITER &&  
CREATE PROCEDURE add_course
	(IN title Varchar(50), 
     IN description Varchar(800), 
     IN image Varchar(400),
     IN pre Varchar(256),
     IN i_id INT(10),
     OUT course_id INT(10) )   
BEGIN    
    INSERT INTO ELEMENT(TITLE,DESCRIPTION,IMAGE) VALUES (title, description, image);
    SET course_id = LAST_INSERT_ID();
    INSERT INTO COURSE(ID,PREREQUISITES,INSTRUCTORID, 	INSTRUCTORFNAME, INSTRUCTORSNAME) 
    VALUES(
        course_id, 
        pre, 
        i_id,
        (SELECT FNAME from _user WHERE _user.ID =  i_id), 
        (SELECT SNAME from _user WHERE _user.ID =  i_id)
    );
END &&  
DELIMITER ;


DELIMITER &&  
CREATE PROCEDURE add_quiz
	(IN title Varchar(50), 
     IN description Varchar(800), 
     IN image Varchar(400),
     IN max_score INT(10),
     IN i_id INT(10),
     OUT quiz_id INT(10) )   
BEGIN    
    INSERT INTO ELEMENT(TITLE,DESCRIPTION,IMAGE) VALUES (title, description, image);
    SET quiz_id = LAST_INSERT_ID();
    INSERT INTO quiz(ID,MAXSCORE,INSTRUCTORID, INSTRUCTORFNAME, INSTRUCTORSNAME) 
    VALUES(
        quiz_id, 
        max_score, 
        i_id,
        (SELECT FNAME from _user WHERE _user.ID =  i_id), 
        (SELECT SNAME from _user WHERE _user.ID =  i_id)
    );
END &&  
DELIMITER ;

DELIMITER &&
CREATE PROCEDURE add_lesson
    (
     IN name varchar(32),
     IN description varchar(256),
     IN cid int(11),
     OUT lesson_id int(11)
    )
BEGIN
    INSERT INTO lesson(NAME, DESCRIPTION, CID) VALUES (name, description, cid);
    SET lesson_id = LAST_INSERT_ID();
END &&
DELIMITER ;