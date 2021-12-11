import React from 'react';
import Table from "../component/Table";

export default function ReadedTome(props) {

    const colReadedTome = ["id_readed_tome", "read_at", "fk_followed_manga", "fk_user", "fk_tome"];

    return (
        <Table name="Readed_tome" colonnes={colReadedTome}></Table>
    )
}