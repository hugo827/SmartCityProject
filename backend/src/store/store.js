import {createStore, combineReducers} from "redux";

const colAccount = ["id_user", "login", "pswd", "email", "birthdate", "phone", "profile_picture", "is_admin"];
const colManga = ["id_manga","title","synopsis","new_price", "type", "sub_genre", "author", "publisher", "main_picture", "is_finish"];
const colTome = ["id_tome", "number", "title", "picture", "release_date", "is_last_tome", "fk_manga" ];
const colFollowedManga = ["id_followed_manga", "state", "fk_manga", "fk_user"];
const colReadedTome = ["id_readed_tome", "read_at", "fk_followed_manga", "fk_user", "fk_tome"];

