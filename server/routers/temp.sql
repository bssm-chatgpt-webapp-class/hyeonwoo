CREATE TABLE user (
  id int primary key auto_increment,
  email varchar(255) not null,
  pw varchar(255) not null
);

CREATE TABLE todo (
  id int primary key auto_increment,
  todo text not null,
  completed boolean not null default false,
  authorId int not null
);