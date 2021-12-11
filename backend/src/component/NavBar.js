import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(){

    const tables = ["Home", "Account", "Manga", "Tome", "FollowedManga", "ReadedTome"];


    const names = tables.map( table => <Link to={`/${table.toLowerCase()}`} key={`link${table}`}><li className="items" key={`li${table}`} >{table}</li></Link>);

    return (
        <div className="navbar">
            <nav>
                <ul className="liste">
                    {names}
                </ul>
            </nav>
        </div>
    )
}



export default NavBar;