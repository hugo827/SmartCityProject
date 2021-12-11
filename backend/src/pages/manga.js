import React from 'react';
import Table from "../component/Table";

export default function Manga(props) {

    const colManga = ["id_manga","title","synopsis","new_price", "type", "sub_genre", "author", "publisher", "main_picture", "is_finish"];

    return (
        <Table name="Manga" colonnes={colManga}></Table>
    )
}