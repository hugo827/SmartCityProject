import React from 'react';
import Add from "./Add";


class AddManga extends Add {

    constructor(props) {
        super(props);
        this.state = {
            value: 'Écrivez un essai à propos de votre élément du DOM préféré'
        };

    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    handleSubmit = (event) => {
        alert('Un essai a été envoyé : ' + this.state.value);
        event.preventDefault();
    }


    render() {
        const colManga = ["title","synopsis","new_price", "type", "sub_genre", "author", "publisher", "picture", "is_finish"];


        const rows = colManga.map( elem => {
            if(elem !== "picture") {
                return <p><label>{elem} :</label><input/></p>;
            } else {
                if(elem === "synopsis")  {
                    return <p><label>{elem} : </label><textarea > </textarea></p>
                }
                 else {
                     return <p><label>{elem} :</label><input type="file"/></p>;
                }
            }
        });



        return (
            <div className="nameTable">
                <form className="form" onSubmit={this.handleSubmit}>
                    { rows }
                    <button type="submit">submit</button>
                    <input  type="submit" value="Cancel"/>
                </form>
            </div>
        )
    }
}

export default AddManga;
