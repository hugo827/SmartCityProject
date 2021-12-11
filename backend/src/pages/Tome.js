import React from 'react';
import Table from "../component/Table";

export default function Tome(props) {

    const colTome = ["id_tome", "number", "title", "picture", "release_date", "is_last_tome", "fk_manga" ];

    return (
        <Table name="Tome" colonnes={colTome}></Table>
    )
}