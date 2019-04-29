create database data;
use data;

create table sensors (
id int not null auto_increment primary key,
seq int(10) unsigned,
device decimal(4,0) unsigned,
unit decimal(2,0) unsigned,
type char(1),
value decimal(10,4),
ip char(15),
time TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

CREATE USER 'sensor'@'203.252.106.169' IDENTIFIED BY 'sensor.data';
GRANT ALL PRIVILEGES ON data.* TO 'sensor'@'203.252.106.169';
FLUSH PRIVILEGES;

SET PASSWORD FOR sensor@203.252.106.169 = 'mypassword';