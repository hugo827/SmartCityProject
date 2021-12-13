import React from 'react';
import {useParams} from "react-router-dom";

import AddManga from "../add/AddManga";
import AddAccount from "../add/AddAccount";
import AddTome from "../add/AddTome";
import AddReadedTome from "../add/AddReadedTome";
import Error from "../pages/Error";
import AddFollowedManga from "../add/AddFollowedManga";


export default function Add() {
    let params = useParams();
    let name = params.name.toLowerCase();

    switch (name) {
        case 'manga' :
            return (
                <AddManga name={`${name}`}></AddManga>
            )
        case 'account' :
            return (
                <AddAccount name={`${name}`}></AddAccount>
            )
        case 'tome' :
            return (
                <AddTome name={`${name}`}></AddTome>
            )
        case 'readedtome' :
            return (
                <AddReadedTome name={`${name}`}></AddReadedTome>
            )
        case 'followedmanga' :
            return (
                <AddFollowedManga name={`${name}`}></AddFollowedManga>
            )
        default :
            return <Error />;
    }


}
