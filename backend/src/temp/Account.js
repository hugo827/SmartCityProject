import React from 'react';
import Table from "../component/Table";

export default function Account(props) {

    const colAccount = ["id_user", "login", "pswd", "email", "birthdate", "phone", "profile_picture", "is_admin"];

    return (
        <Table name="Account" colonnes={colAccount}></Table>
    )
}

