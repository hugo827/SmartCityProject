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
    login varchar(100),
    pswd TEXT,
    email varchar(100),
    birthdate date default null,
    phone varchar(100) default null,
    profile_picture bytea,
    is_Admin BOOLEAN
    is_Admin BOOLEAN
);

CREATE TABLE manga (
    id_Manga integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title varchar(100),
    synopsis varchar(500),
    new_price float,
    type varchar(100),
    sub_genre varchar(100),
    autor varchar(100),
    publisher varchar(100),
    main_picture bytea,
    is_finish BOOLEAN DEFAULT false NOT NULL
);

CREATE TABLE tome (
    id_tome integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    number integer default NOT NULL,
    title varchar(100),
    picture bytea,
    release_date TIMESTAMP,
    FOREIGN KEY (fk_manga) REFERENCES manga (id_manga),
);


CREATE TABLE followed_manga (
    id_followed_manga integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    state integer CHECK  (state > 0 AND state < 4),
    FOREIGN KEY (fk_manga) REFERENCES manga (id_manga),
    FOREIGN KEY (fk_user) REFERENCES user (id_user),
);

CREATE TABLE readed_tome (
    id_reade_tome integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    read_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_followed_manga) REFERENCES followed_manga (id_followed_manga),
    FOREIGN KEY (fk_user) REFERENCES  user (id_user),
    FOREIGN KEY (fk_tome) REFERENCES tome (id_tome),
);


/*-------------------------INSERT pour débuter -----------------------------*/

INSERT INTO user
    (login, pswd, email, birthdate, phone, profile_picture, is_Admin)
    VALUES
        ('admin', 'tigrou007', , '00000', ,true);

INSERT INTO user
    (login, pswd, email, birthdate, phone, profile_picture, is_Admin)
    VALUES
        ('remy', 'remy007', , '00000', ,false);

INSERT INTO user
    (login, pswd, email, birthdate, phone, profile_picture, is_Admin)
    VALUES
        ('hugo', 'hugo007', , '00000', ,false);

INSERT INTO manga
    (title,synopsis,new_price,type,sub_genre,autor,publisher,main_picture,is_finish)
    VALUES
        ('Bleach','synopsis',7.50,'shonen', 'Nekketsu', 'Tite Kubo','Glenat', ,true);

INSERT INTO tome
(number, title, picture, release_date)
    VALUE
    (1, 'The Death And The Strawberry',, 05/01/2002);

