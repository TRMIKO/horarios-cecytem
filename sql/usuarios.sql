DROP USER 'CECYTEM'@'localhost';

CREATE USER 'CECYTEM'@'localhost' IDENTIFIED BY '100%CECYTEM';
GRANT ALL PRIVILEGES ON CECYTEM . * TO 'CECYTEM'@'localhost';
FLUSH PRIVILEGES;
