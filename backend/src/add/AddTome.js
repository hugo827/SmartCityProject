import React from 'react';
import {Link} from "react-router-dom";

class AddTome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : this.props.name,
            token : sessionStorage.getItem('token'),

            number: 0,
            title: "",
            picture: [],
            releaseDate: null,
            isLastTome: false,
            fkManga: null,
        }

    }


    sendAPI = async (formData) => {
        const URL = `http://localhost:3001/${this.state.name}/`;
        const headers = {
            'Accept':'application/json',
            'authorization' : `Bearer ${this.state.token}`
        };

        return await fetch(URL, {
            method : "POST",
            headers: headers,
            body : formData
        })
            /*.then(
            res => res.status === 204 ? window.alert("Votre tome a bien et ajouter") : window.alert("un probbléme est survenue")
        );*/
    };




    async sendForm(event){
        event.preventDefault();
        const formData = new FormData();

        formData.append('number', this.state.number);
        formData.append('title', this.state.title);
        formData.append('release_date', this.state.releaseDate);
        formData.append('is_last_tome', this.state.isLastTome);
        formData.append('fk_manga', this.state.fkManga);
        formData.append('picture', this.state.picture);

        try {
           await this.sendAPI(formData);

            //this.resetState();
        } catch (error) {
            console.error(error);
        }
    }

    resetState() {
        this.setState({
            number: 0,
            title: "",
            picture: null,
            releaseDate: null,
            isLastTome: false,
            fkManga: 0,
        });
    }

    async requiredVerif(event) {
        let isValid = true;

        const modified = {
            title: this.state.title,
            picture: this.state.picture,
            releaseDate: this.state.releaseDate,
            isLastTome: this.state.isLastTome,
            fkManga: this.state.fkManga,
            numberTome: this.state.numberTome
        }

        for(let elem in modified ) {
            if(!(modified[elem] !== "" && modified[elem] !== undefined) && modified[elem] === null) isValid = false;
            if((elem === 'numberTome' || elem === 'fkManga') && !isFinite(modified[elem]) ) isValid = false;
        }

        isValid ? await this.sendForm(event) : alert('Tous les champs doivent être complétés et avec des valeurs correct !');
    }

    render() {
        return (
            <div className="nameTable">
                <form className="form">
                    <p>Tout est obligatoire</p>
                    <label>Number : </label> <input type={"number"} onChange={(e) => this.setState({number: e.target.value})} />
                    <label>title : </label> <input type="text" onChange={(e) => this.setState({title: e.target.value})} />
                    <label>picture : </label> <input type={"file"} accept={"image/*"} onChange={(e) => this.setState({picture: e.target.files[0]})} />
                    <label>Release date : </label> <input type={"date"} onChange={(e) => this.setState({releaseDate: e.target.value})} />
                    <label>is last tome : </label> <input type="checkbox" onChange={(e) => this.setState({isLastTome: !this.state.isFinish})} />
                    <label>fk Manga (l'id entrée doit correspondre à un id existant dans manga): </label> <input type={"number"} onChange={(e) => this.setState({fkManga: e.target.value})} required/>
                    <button type="submit" onClick={(e) => this.sendForm(e)}>submit</button>
                    <Link to={`/${this.props.name}`}><input  type="submit" value="Cancel" /></Link>
                </form>
            </div>
        )
    }

}

export default AddTome;