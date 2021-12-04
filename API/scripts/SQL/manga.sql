/***************************************
*        SCRIPT CREATION DB            *
*                                      *
****************************************/


DROP TABLE IF EXISTS readed_tome CASCADE;
DROP TABLE IF EXISTS followed_manga CASCADE;
DROP TABLE IF EXISTS tome CASCADE;
DROP TABLE IF EXISTS manga CASCADE;
DROP TABLE IF EXISTS account CASCADE;


CREATE TABLE account (
                         id_user integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                         login varchar(100) NOT NULL,
                         pswd TEXT NOT NULL,
                         email varchar(100) NOT NULL,
                         birthdate date DEFAULT null,
                         phone varchar(100) DEFAULT null,
                         profile_picture bytea,
                         is_Admin BOOLEAN DEFAULT false
);

CREATE TABLE manga (
                       id_manga integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                       title varchar(100) NOT NULL,
                       synopsis varchar(500) NOT NULL,
                       new_price float NOT NULL,
                       type varchar(100) NOT NULL,
                       sub_genre varchar(100) NOT NULL,
                       author varchar(100) NOT NULL,
                       publisher varchar(100) NOT NULL,
                       main_picture bytea,
                       is_finish BOOLEAN DEFAULT false
);


CREATE TABLE tome (
                      id_tome integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                      number integer NOT NULL,
                      title varchar(100) NOT NULL,
                      picture bytea,
                      release_date date DEFAULT CURRENT_DATE,
                      is_last_tome BOOLEAN DEFAULT true,
                      fk_manga integer NOT NULL,
                      FOREIGN KEY (fk_manga) REFERENCES manga(id_manga)
);

CREATE TABLE followed_manga (
                                id_followed_manga integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                                state integer CHECK (state > 0 AND state < 4) NOT NULL,
                                fk_manga integer NOT NULL,
                                fk_user integer NOT NULL,
                                FOREIGN KEY (fk_manga) REFERENCES manga(id_manga),
                                FOREIGN KEY (fk_user) REFERENCES account(id_user)
);
/* state : 1 = en cours, 2 = termine , 3 = pas commence*/

CREATE TABLE readed_tome (
                             id_reade_tome integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                             read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             fk_followed_manga integer NOT NULL,
                             fk_user integer NOT NULL,
                             fk_tome integer NOT NULL,
                             FOREIGN KEY (fk_followed_manga) REFERENCES followed_manga(id_followed_manga),
                             FOREIGN KEY (fk_user) REFERENCES  account(id_user),
                             FOREIGN KEY (fk_tome) REFERENCES tome(id_tome)
);


/*-------------------------INSERT pour débuter -----------------------------*/

INSERT INTO account
(login, pswd, email, is_Admin)
VALUES
    ('admin', '$2a$10$fiKILzSQn2YvA.mbmxhqa.7f8pErrnl4qofZY7nE/a5Vq8KakfPKG','test@gmail.com',true);

INSERT INTO account
(login, pswd, email)
VALUES
    ('remy', '$2a$10$fiKILzSQn2YvA.mbmxhqa.7f8pErrnl4qofZY7nE/a5Vq8KakfPKG', 'test@gmail.com');

INSERT INTO account
(login, pswd, email)
VALUES
    ('hugo', '$2a$10$fiKILzSQn2YvA.mbmxhqa.7f8pErrnl4qofZY7nE/a5Vq8KakfPKG','test@gmail.com');

INSERT INTO manga
(title,synopsis,new_price,type,sub_genre,author,publisher,is_finish)
VALUES
    ('Bleach','synopsis',7.50,'shonen', 'Nekketsu', 'Tite Kubo','Glenat',true);

INSERT INTO manga
(title,synopsis,new_price,type,sub_genre,author,publisher,is_finish)
VALUES
    ('Naruto','synopsis',7.50,'shonen', 'Nekketsu', 'Masashi Kishimoto','kena',false);

INSERT INTO tome
(number, title, release_date,fk_manga)
    VALUES
    (1, 'The Death And The Strawberry', '2003-05-19', 1);

INSERT INTO tome
(number, title, release_date,fk_manga)
    VALUES
    (2, 'Goodbye Parakeet, Goodnite My Sista', '2003-07-28', 1);

INSERT INTO tome
(number, title, release_date,fk_manga)
    VALUES
    (3, 'Memories In The Rain', '2003-10-15', 1);

INSERT INTO tome
(number, title, release_date,fk_manga)
    VALUES
    (4, 'Quincy Archer Hates You', '2004-02-18', 1);


INSERT INTO tome
(number, title, release_date,fk_manga)
    VALUES
    (5, 'Rightarm Of The Giant', '2004-04-21', 1);


