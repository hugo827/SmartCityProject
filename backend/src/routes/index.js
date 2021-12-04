import React from "react";
import NavBar from '../component/NavBar';
import Home from '../component/Home';

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Table from '../component/Table';


const colAccount = ["id_user", "login", "pswd", "email", "birthdate", "phone", "profile_picture", "is_admin"];
const colManga = ["id_manga","title","synopsis","new_price", "type", "sub_genre", "author", "publisher", "main_picture", "is_finish"];
const colTome = ["id_tome", "number", "title", "picture", "release_date", "is_last_tome", "fk_manga" ];
const colFollowedManga = ["id_followed_manga", "state", "fk_manga", "fk_user"];
const colReadedTome = ["id_readed_tome", "read_at", "fk_followed_manga", "fk_user", "fk_tome"];


export default function Way(){
    return(

        <Router>
            <NavBar></NavBar>
            <Routes>
                <Route path="/:page" element={<Table name="Manga" colonnes={colManga}></Table>}></Route>

                <Route path="/manga" element={<Table name="Manga" colonnes={colManga}></Table>}></Route>
                <Route path="/account" element={<Table name="Account" colonnes={colAccount}></Table>}></Route>
                <Route path="/tome" element={<Table name="Tome" colonnes={colTome}></Table>}></Route>
                <Route path="/followedmanga" element={<Table name="Followed_manga" colonnes={colFollowedManga}></Table>}></Route>
                <Route path="/readedtome" element={<Table name="Readed_tome" colonnes={colReadedTome}></Table>}></Route>
                <Route path="/" element={<Home></Home>}></Route>
            </Routes>
        </Router>
    );
}