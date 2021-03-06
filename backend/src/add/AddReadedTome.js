import React from 'react';
import {Link} from "react-router-dom";


class AddReadedTome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : this.props.name,
            token : sessionStorage.getItem('token'),

            readAt: null,
            fkFollowedManga: 0,
            fkUser: 0,
            fkTome: 0
        }

    }

    sendAPI = async (formData) => {
        const URL = `http://localhost:3001/readedTome/`;
        const body = JSON.stringify({
            read_at: this.state.readAt,
            fk_followed_manga: this.state.fkFollowedManga,
            fk_user: this.state.fkUser,
            fk_tome: this.state.fkTome,
        });
        return await fetch(URL, {
            method : "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept':'application/json',
                'authorization' : `Bearer ${this.state.token}`
            },
            body: body
        });
    };




    async sendForm(event){
        event.preventDefault();
        const formData = new FormData();

        formData.append('read_at', this.state.readAt);
        formData.append('fk_followed_manga', this.state.fkFollowedManga);
        formData.append('new_price', this.state.fkUser);
        formData.append('fk_user', this.state.fkTome);


        try {
            await this.sendAPI(formData);
            await window.alert("Votre tome lu a bien ete ajouter");
            this.resetState();
        } catch (error) {
            console.error(error);
        }
    }

    resetState() {
        this.setState({
            readAt: "",
            fkFollowedManga: "",
            fkUser: 0,
            fkTome: "",
        });
    }

    async requiredVerif(event) {
        let isValid = true;

        const modified = {
            read_at: this.state.readAt,
            fk_followed_manga: this.state.fkFollowedManga,
            fk_user: this.state.fkUser,
            fk_tome: this.state.fkTome
        }

        for(let elem in modified ) {
            if(!(modified[elem] !== "" && modified[elem] !== undefined) && modified[elem] === null) isValid = false;
            if(elem !== 'read_at' && !isFinite(modified[elem]) ) isValid = false;

        }

        isValid ? await this.sendForm(event) : alert('Tous les champs doivent ??tre compl??t??s et avec des valeurs correct !');
    }

    render() {

        return (
            <div className="nameTable">
                <form className="form">
                    <p>Tout est obligatoire</p>
                    <label>readAt : </label> <input type="date" onChange={(e) => this.setState({readAt: e.target.value})} />
                    <label>fkFollowedManga (l'id entr?? doit corresponde ?? un id existant dans followed_manga) : </label> <input type="number" onChange={(e) => this.setState({fkFollowedManga: e.target.value})} />
                    <label>fkUser (l'id entr?? doit correspondre ?? l'id fkUser du fkFollowedManga): </label> <input type="number" onChange={(e) => this.setState({fkUser: e.target.value})} />
                    <label>fkTome (l'id entr?? doit correspondre ?? l'id d'un tome existant dans tome): </label> <input type="number" onChange={(e) => this.setState({fkTome: e.target.value})} />
                   <button type="submit" onClick={(e) => this.sendForm(e)}>submit</button>
                    <Link to={`/${this.props.name}`}><input  type="submit" value="Cancel" /></Link>
                </form>
            </div>
        )
    }

}

export default AddReadedTome;