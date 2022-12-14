-- --------------------------------------------------------------------------------------------------------- --
--                                              Create Database                                              --
-- --------------------------------------------------------------------------------------------------------- --
DROP DATABASE IF EXISTS CSE201;
CREATE DATABASE CSE201;
USE CSE201;

-- --------------------------------------------------------------------------------------------------------- --
--                                                  Tables                                                   --
-- --------------------------------------------------------------------------------------------------------- --
CREATE TABLE Users (
	id					INT					NOT NULL	PRIMARY KEY		AUTO_INCREMENT,
    email				VARCHAR(200)		NOT NULL	UNIQUE,
	fName				VARCHAR(50)			NOT NULL,
	lName				VARCHAR(50)			NOT NULL,
	password			CHAR(60) BINARY		NOT NULL,
    createdAt			DATETIME			NOT NULL	DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Roles (
	id			INT			NOT NULL	PRIMARY KEY	AUTO_INCREMENT,
	name		VARCHAR(10) NOT NULL
);

CREATE TABLE AssignedRoles (
	role_id		INT			NOT NULL,
	user_id		INT			NOT NULL,
	FOREIGN KEY(role_id) REFERENCES Roles(id),
    FOREIGN KEY(user_id) REFERENCES Users(id),
	PRIMARY KEY(role_id, user_id)
);

CREATE TABLE Absences (
	user_id		INT		NOT NULL,
    date		DATE	NOT NULL,
    FOREIGN KEY(user_id) REFERENCES Users(id) ,
    PRIMARY KEY (user_id, date)
);

CREATE TABLE Events (
	id			INT			NOT NULL	PRIMARY KEY	AUTO_INCREMENT,
    title		VARCHAR(100) NOT NULL,
	start		DATETIME	NOT NULL
);

CREATE TABLE Questions (
	id			INT				NOT NULL		PRIMARY KEY AUTO_INCREMENT,
    user_id		INT				NOT NULL,
    content		VARCHAR(500)	NOT NULL,
    answer		VARCHAR(500)	DEFAULT NULL,
    posted_at 	DATETIME 		NOT NULL 	DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------------------------------------------------------- --
--                                               Stored Procs                                                --
-- --------------------------------------------------------------------------------------------------------- --
DELIMITER //

CREATE PROCEDURE Register(
	email			VARCHAR(200),
	fName			VARCHAR(50),
	lName			VARCHAR(50),
    hashedPassword	CHAR(60) BINARY
) this_proc:BEGIN
	DECLARE _userId	 INT;

    IF (SELECT id FROM Users u WHERE u.email = email) THEN BEGIN
		SELECT
			0 AS success,
			0 AS userId,
            'username already in use' AS message;
		LEAVE this_proc;
    END; END IF;
    
	INSERT INTO Users (email, fName, lName, password) VALUE
		(email, fName, lName, hashedPassword);
        
	SET _userId = @@IDENTITY;

	SELECT
		1 AS success,
		_userId AS userId,
        'user registered' AS message;
END//

CREATE PROCEDURE Login(
	email	VARCHAR(200)
) BEGIN
	SELECT id, password FROM Users u WHERE u.email = email;
END//

CREATE PROCEDURE AssignRole(
	userId	INT,
	roleId	INT
) BEGIN
	INSERT INTO AssignedRoles (role_id, user_id) VALUE (userId, roleId);
END//

CREATE PROCEDURE GetRoles(
	userId	INT
) BEGIN
	SELECT name, role_id
    FROM AssignedRoles a JOIN Roles r ON a.role_id = r.id
    WHERE a.user_id = userId;
END//

CREATE PROCEDURE AddEvent(
    title		VARCHAR(100),
	start		DATETIME
) BEGIN
	INSERT INTO Events (title, start) VALUE (title, start);
END//

CREATE PROCEDURE GetEvents(
	startDate	DATETIME,
    endDate		DATETIME
) BEGIN
	SELECT * FROM Events e WHERE e.start >= startDate AND e.start <= endDate;
END//

CREATE PROCEDURE DeleteEvent(
	id INT
) BEGIN
	DELETE FROM Events e WHERE e.id = id;
END//

CREATE PROCEDURE GetAttendance(
	onDate	DATETIME
) BEGIN
	SELECT
		id,
        email,
        fName,
        lName,
        (date IS NOT NULL) AS absent
	FROM Users u 
		LEFT JOIN Absences a 
			ON u.id = a.user_id AND a.date = DATE(onDate);
END//

CREATE PROCEDURE UpdateAbsence(
	userId	INT,
	onDate	DateTime,
    absent	BOOLEAN
) BEGIN
	IF (absent) THEN
		INSERT IGNORE INTO Absences (user_id, date) VALUE (userId, Date(onDate)); # ON DUPLICATE KEY UPDATE date = Date(onDate);
    ELSE
		DELETE FROM Absences WHERE user_id = userId AND Date(onDate) = date;
    END IF;
END//

CREATE PROCEDURE GetUsers() BEGIN
	SELECT id, fName, lName FROM Users;
END//

CREATE PROCEDURE AskQuestion(
	_user_id VARCHAR(500),
    _content VARCHAR(500)
) BEGIN
	INSERT INTO Questions (user_id, content) VALUES (_user_id, _content);
END//

CREATE PROCEDURE AnswerQuestion(
	_id VARCHAR(500),
    _answer VARCHAR(500)
) BEGIN
	UPDATE Questions SET answer = _answer WHERE id = _id;
END//

CREATE PROCEDURE GetQandA() BEGIN
	SELECT * FROM Questions WHERE answer IS NOT NULL;
END//

CREATE PROCEDURE GetQuestions() BEGIN
	SELECT * FROM Questions;
END//

CREATE PROCEDURE RemoveAnswer(
	_id INT
) BEGIN
	UPDATE Questions SET answer = NULL WHERE id = _id;
END//

DELIMITER ;
-- --------------------------------------------------------------------------------------------------------- --
--                                            Set Initial Values                                             --
-- --------------------------------------------------------------------------------------------------------- --
INSERT INTO Roles (name) VALUE ('ADMIN');
CALL Register('admin@gmail.com', 'admin', 'account', '$2b$12$9fjmbA3.FXnT1wx/jfiOlu/XYNlGyUCEY2QTb3ztGqoZjOBHc0xWW');
CALL Register('john.williams@gmail.com', 'John', 'Williams', '$2b$12$peFUQVJyjgFmcJlvQua.7uTnVvHGCrynZVE04DL36O7FyWCQ8pu9S');
CALL AssignRole(1, 1);

CALL AddEvent('Welcome to MU Drone Club!', CURRENT_TIMESTAMP());

CALL AskQuestion(1, 'What time does this club meet?');
CALL AnswerQuestion(1, 'This club meets at 6:00pm on Wednesday');
-- --------------------------------------------------------------------------------------------------------- --
--                                                 Testing                                                   --
-- --------------------------------------------------------------------------------------------------------- --

SET SQL_SAFE_UPDATES = 0;
-- Call GetEvents('2022-10-30T04:00:00', '2022-12-11T05:00:00');
-- CALL AddEvent('name', CURRENT_TIMESTAMP());
-- CALL AssignRole(1,1)
-- select * from roles
-- select * from assignedRoles
-- CALL GetRoles(1)
-- delete from events;
-- select * from events;
-- Call Register ('d','');

-- select * from absences;
-- insert into absences (user_id, date) VALUE (2, Date(CURRENT_TIMESTAMP()) + 1);
-- CALL getAbsences(Date(CURRENT_TIMESTAMP()));

-- SELECT * FROM Users;
-- DELETE FROM Users;
-- SELECT * FROM sessions;
-- DELETE FROM sessions;