import React from 'react';
import Add from "./Add";


class AddManga extends Add {

    render() {
        const colManga = ["title","synopsis","new_price", "type", "sub_genre", "author", "publisher", "main_picture", "is_finish"];


        const rows = colManga.map( elem => {
            if(elem !== "main_picture") {
                return <p><label>{elem} :</label><input/></p>;
            } else {
                return <p><label>{elem} :</label><input type="file"/></p>;
            }
        });


        return (
            <div className="nameTable">
                { rows }
                <button type="submit">submit</button>
                <input  type="submit" value="Cancel"/>
            </div>
        )
    }
}

export default AddManga;
