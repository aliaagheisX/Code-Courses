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