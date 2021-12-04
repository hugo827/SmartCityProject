import React from 'react';

function NavBar(){

    function click(str) {
        console.log(str);
    }

    const tables = ["Accueil", "User", "Manga", "Tome", "followed_manga", "readed_tome"];

    const names = tables.map( t => <li className="items" key={t} onClick={click(t)}>{t}</li>);


    return (
        <div className="navbar">
            <nav>
                <ul className="liste" >
                    {names}
                </ul>
            </nav>
        </div>
    )
}



export default NavBar;