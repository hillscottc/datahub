

--CREATE database triv_db WITH encoding 'utf8';

create schema trivia;


CREATE TABLE trivia.category (
    category_id serial primary key,
    category_name varchar(255) NOT NULL
);

CREATE TABLE trivia.clue (
    clue_id serial primary key,
    category_id serial references trivia.category(category_id),
    question varchar(355) NOT NULL,
    answer varchar(355) NOT NULL
);
