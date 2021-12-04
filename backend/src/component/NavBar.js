import React from 'react';
import { Link } from 'react-router-dom';

function NavBar(){

    const tables = ["Home", "Account", "Manga", "Tome", "FollowedManga", "ReadedTome"];

    const names = tables.map( t => <Link to={`/${t.toLowerCase()}`} key={`link${t}`}><li className="items" key={`li${t}`}>{t}</li></Link>);

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