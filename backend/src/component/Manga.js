import React from 'react';
import axios from 'axios';

class Manga extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mangas : []
        ;
    }

     componentDidMount() {

        if (window.fetch) {
             fetch("http://127.0.0.1:3001/", {mode:'no-cors'}, {headers: 'Acces-Control-Allow-Origin: *'})
                .then( (res) => res.json())
                 .then( (manga) => this.setState({mangas: manga}))
                 .catch( (error) => {
                    console.error(error);
                });
        } else {
            console.log("fetch n'est pas disponible")
        }
    }




    render() {


        return (
            <p>{this.state.mangas}</p>
        );
    }
}



export default Manga;