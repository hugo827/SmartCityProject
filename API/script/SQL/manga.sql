/***************************************
*        SCRIPT CREATION DB            *
*                                      *
****************************************/


/*
DROP TABLE IF EXISTS readed_tome CASCADE;
DROP TABLE IF EXISTS follow_manga CASCADE;
DROP TABLE IF EXISTS user CASCADE;
DROP TABLE IF EXISTS tome CASCADE;
DROP TABLE IF EXISTS manga CASCADE;
*/

CREATE TABLE user (
    id_user integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    login varchar(100) NOT NULL,
    pswd TEXT NOT NULL,
    email varchar(100) NOT NULL,
    birthdate date default null,
    phone varchar(100) default null,
    profile_picture bytea,
    is_Admin BOOLEAN DEFAULT false NOT NULL
);

CREATE TABLE manga (
    id_Manga integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title varchar(100) NOT NULL,
    synopsis varchar(500) NOT NULL,
    new_price float NOT NULL,
    type varchar(100) NOT NULL,
    sub_genre varchar(100) NOT NULL,
    autor varchar(100) NOT NULL,
    publisher varchar(100) NOT NULL,
    main_picture bytea,
    is_finish BOOLEAN DEFAULT false NOT NULL
);

CREATE TABLE tome (
    id_tome integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    number integer NOT NULL,
    title varchar(100) NOT NULL,
    picture bytea,
    release_date date NOT NULL DEFAULT CURRENT_DATE ,
    FOREIGN KEY (fk_manga) REFERENCES manga (id_manga) NOT NULL,
);


CREATE TABLE followed_manga (
    id_followed_manga integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    state integer CHECK  (state > 0 AND state < 4) NOT NULL,
    FOREIGN KEY (fk_manga) REFERENCES manga (id_manga) NOT NULL,
    FOREIGN KEY (fk_user) REFERENCES user (id_user) NOT NULL,
);
/* state : 1 = en cours, 2 = termine , 3 = pas commence*/

CREATE TABLE readed_tome (
    id_reade_tome integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_followed_manga) REFERENCES followed_manga (id_followed_manga) NOT NULL,
    FOREIGN KEY (fk_user) REFERENCES  user (id_user) NOT NULL,
    FOREIGN KEY (fk_tome) REFERENCES tome (id_tome) NOT NULL,
);


/*-------------------------INSERT pour débuter -----------------------------*/

INSERT INTO user
    (login, pswd, email, is_Admin)
    VALUES
        ('admin', 'tigrou007','test@gmail.com',true);

INSERT INTO user
    (login, pswd, email)
    VALUES
        ('remy', 'remy007', 'test@gmail.com');

INSERT INTO user
    (login, pswd, email)
    VALUES
        ('hugo', 'hugo007','test@gmail.com');

INSERT INTO manga
    (title,synopsis,new_price,type,sub_genre,autor,publisher,is_finish)
    VALUES
        ('Bleach','synopsis',7.50,'shonen', 'Nekketsu', 'Tite Kubo','Glenat',true);

INSERT INTO tome
(number, title, release_date)
    VALUE
    (1, 'The Death And The Strawberry', '19-05-2003 00:00:00');

INSERT INTO tome
(number, title, release_date)
    VALUE
    (2, 'Goodbye Parakeet, Goodnite My Sista', '28-07-2003 00:00:00');

INSERT INTO tome
(number, title, release_date)
    VALUE
    (3, 'Memories In The Rain', '15-10-2003 00:00:00');

INSERT INTO tome
(number, title, release_date)
    VALUE
    (4, 'Quincy Archer Hates You', '18-02-2004 00:00:00');


INSERT INTO tome
(number, title, release_date)
    VALUE
    (5, 'Rightarm Of The Giant', '21-04-2004 00:00:00');