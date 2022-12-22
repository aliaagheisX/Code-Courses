DELIMITER $$

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