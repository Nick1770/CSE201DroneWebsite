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

CREATE TABLE Attendance (
	id			INT			NOT NULL	PRIMARY KEY	AUTO_INCREMENT,
	user_id		INT			NOT NULL,
    day			DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES Users(id) 
);

CREATE TABLE Events (
	id			INT			NOT NULL	PRIMARY KEY	AUTO_INCREMENT,
	user_id		INT			NOT NULL,
    day			DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES Users(id) 
);

CREATE TABLE Members (
	id			INT			NOT NULL	PRIMARY KEY	AUTO_INCREMENT,
	user_id		INT			NOT NULL,
    joined		DATETIME	NOT NULL	DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES Users(id) 
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

DELIMITER ;
-- --------------------------------------------------------------------------------------------------------- --
--                                            Set Initial Values                                             --
-- --------------------------------------------------------------------------------------------------------- --
INSERT INTO Roles (name) VALUE ('ADMIN');
-- --------------------------------------------------------------------------------------------------------- --
--                                                 Testing                                                   --
-- --------------------------------------------------------------------------------------------------------- --

SET SQL_SAFE_UPDATES = 0;
-- CALL AssignRole(1,1)
-- select * from roles
-- CALL GetRoles(1)
-- Call Register ('d','');
-- SELECT * FROM Users;
-- DELETE FROM Users;
-- SELECT * FROM sessions;
-- DELETE FROM sessions;