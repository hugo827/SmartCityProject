import React from 'react';
import {useParams} from "react-router-dom";
import UpdateManga from '../update/UpdateManga';
import UpdateAccount from "../update/UpdateAccount";
import UpdateReadedTome from "../update/UpdateReadedTome";
import UpdateFollowedManga from "../update/UpdateFollowedManga";
import UpdateTome from "../update/UpdateTome";
import Error from "../pages/Error";

export default function Update() {
    let params = useParams();
    let name = params.name.toLowerCase();

    switch (name) {
        case 'manga' :
            return (
                <UpdateManga id={`${params.id}`} name={`${name}`}></UpdateManga>
            )
        case 'account' :
            return (
                <UpdateAccount id={`${params.id}`} name={`${name}`}></UpdateAccount>
            )
        case 'tome' :
            return (
                <UpdateTome id={`${params.id}`} name={`${name}`}></UpdateTome>
            )
        case 'readedtome' :
            return (
                <UpdateReadedTome id={`${params.id}`} name={`${name}`}></UpdateReadedTome>
            )
        case 'followedmanga' :
            return (
                <UpdateFollowedManga id={`${params.id}`} name={`${name}`}></UpdateFollowedManga>
            )
        default :
             return <Error />;
    }

}

