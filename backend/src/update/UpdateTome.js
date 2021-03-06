import React from 'react';
import {Link} from "react-router-dom";


class UpdateTome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            name : this.props.name,
            token : sessionStorage.getItem('token'),
            rows : [],

            numberTome: "",
            title: "",
            picture: [],
            releaseDate: null,
            isLastTome: false,
            fkManga: null,
            previewPicture: null
        }
    }

    callAPI() {
        const url = "http://localhost:3001/";
        const endUrl = "/";
        const table = this.state.name;
        const id = this.state.id;

        const urlFinal = url + table + endUrl + id;

        if (window.fetch) {
            fetch(urlFinal)
                .then( res => {
                    res.json().then( data => {
                        this.setState({rows: data});
                        this.testSetState();
                    })
                })
                .catch( (error) => {
                    console.error(error);
                });

        } else {
            console.log("Fetch n'est pas disponible")
        }

    }

    componentDidMount() {
        this.callAPI();

    }

    testSetState() {
        this.setState({title: this.state.rows['title'],
            previewPicture: this.state.rows['picture'],
            releaseDate: this.state.rows['release_date'],
            isLastTome: this.state.rows['is_last_tome'],
            fkManga: this.state.rows['fk_manga'],
            numberTome: this.state.rows['number']
        });
    }

    sendAPI = async (formData) => {
        const URL = `http://localhost:3001/${this.state.name}`;
        return await fetch(URL, {
            method : "PATCH",
            headers: {
                'Accept':'application/json',
                'authorization' : `Bearer ${this.state.token}`
            },
            body : formData
        });
    };


    async sendForm(event){
        event.preventDefault();
        const formData = new FormData();
        formData.append('id_tome', this.state.id);
        formData.append('number', this.state.numberTome);
        formData.append('title', this.state.title);
        formData.append('release_date', this.state.releaseDate);
        formData.append('is_last_tome', this.state.isLastTome);
        formData.append('fk_manga', this.state.fkManga);
        formData.append('picture', this.state.picture);

        try {
            await this.sendAPI(formData);
            await window.alert("Votre tome a bien ete modifier");
            /* create redirection */
        } catch (error) {
            console.error(error);
            await window.alert('Une erreur est arriv??e !');
        }
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

        isValid ? await this.sendForm(event) : alert('Tous les champs doivent ??tre compl??t??s et avec des valeurs correct !');
    }

    render() {
        return (
            <div className="nameTable">
                <form className="form">
                    <p>Tout est obligatoire</p>
                    <label>Number : </label> <input defaultValue={this.state.numberTome} onChange={(e) => this.setState({numberTome: e.target.value})} />
                    <label>title : </label> <input defaultValue={this.state.title} onChange={(e) => this.setState({title: e.target.value})} />
                    <label>picture : </label> <input type="file" accept={"image/*"} defaultValue={this.state.picture} onChange={(e) => this.setState({picture: e.target.files[0]})} />
                    <label>Release date  : </label> <input type={"date"} defaultValue={this.state.releaseDate} onChange={(e) => this.setState({releaseDate: e.target.value})} />
                    <label>is last tome  : </label> <input type="checkbox" checked={!this.state.isLastTome} onChange={(e) => this.setState({isLastTome: e.target.value})} />
                    <label>fk Manga (L'id entr??e doit correspondre ?? un id existant dans manga): </label> <input defaultValue={this.state.fkManga} onChange={(e) => this.setState({fkManga: e.target.value})} />
                    <button type="submit" onClick={(e) => this.requiredVerif(e)}>submit</button>
                    <Link to={`/${this.state.name}`}><input  type="submit" value="Cancel"/></Link>
                </form>
            </div>
        )
    }

}

export default UpdateTome;