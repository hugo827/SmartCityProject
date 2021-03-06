import React from 'react';
import {useParams} from "react-router-dom";
import Home from "../pages/Home";
import Table from "../component/Table";
import Error from "../pages/Error";


export default function Page() {
    let params = useParams();
    let name = params.name.toLowerCase();

    const colAccount = ["id_user", "login", "email", "birthdate", "phone", "picture", "is_admin"];
    const colTome = ["id_tome", "number", "title", "picture", "release_date", "is_last_tome", "fk_manga" ];
    const colReadedTome = ["id_readed_tome", "read_at", "fk_followed_manga", "fk_user", "fk_tome"];
    const colManga = ["id_manga","title","synopsis","new_price", "type", "sub_genre", "author", "publisher", "picture", "is_finish"];
    const colFollowedManga = ["id_followed_manga", "state", "fk_manga", "fk_user"];

    switch (name) {
        case 'manga' :
            return (
                <Table key={name} name={name} colonnes={colManga} />
            )
        case 'account' :
            return (
                <Table key={name} name={name} colonnes={colAccount} />
            )
        case 'tome' :
            return (
                <Table key={name} name={name} colonnes={colTome} />
            )
        case 'readedtome' :
            return (
                <Table key={name} name={name} colonnes={colReadedTome} />
            )
        case 'followedmanga' :
            return (
                <Table key={name} name={name} colonnes={colFollowedManga} />
            )
        case 'home' :
            return <Home />;
        default :
            return <Error />;
    }


}
