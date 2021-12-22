import React from 'react';
import {Link} from "react-router-dom";


class AddFollowedManga extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : this.props.name,
            token : sessionStorage.getItem('token'),

            stateManga: 3,
            fkManga: 0,
            fkUser: 0,
        }

    }

    sendAPI = async (formData) => {
        const URL = `http://localhost:3001/followedManga/`;
        const body = JSON.stringify({
            id: this.state.id,
            state: this.state.stateManga,
            fk_manga: this.state.fkManga,
            fk_user: this.state.fkUser,
        });
        return await fetch(URL, {
            method : "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept':'application/json',
                'authorization' : `Bearer ${this.state.token}`
            },
            body : body
        });
    };




    async sendForm(event){
        event.preventDefault();
        const formData = new FormData();

        formData.append('state', this.state.stateManga);
        formData.append('fk_manga', this.state.fkManga);
        formData.append('fk_user', this.state.fkUser);


        try {
            await this.sendAPI(formData);
            await window.alert("Votre manga suivit a bien ete ajoute");
            this.resetState();
        } catch (error) {
            console.error(error);
        }
    }

    resetState() {
        this.setState({
            stateManga: 3,
            fkManga: 0,
            fkUser: 0,
        });
    }



    render() {

        return (
            <div className="nameTable">
                <form className="form">
                    <p>Tout est obligatoire</p>
                    <label>stateManga (valeur obligatoire entre 1 et 3 -- 1 =terminer -- 2 =en cours -- 3 =pas commencer): </label> <input type={"number"} onChange={(e) => this.setState({stateManga: e.target.value})} required/>
                    <label>fkManga (doit exister dans manga): </label> <input type={"number"} onChange={(e) => this.setState({fkManga: e.target.value})} required/>
                    <label>fkUser (doit exister dans user): </label> <input type={"number"} onChange={(e) => this.setState({fkUser: e.target.value})} required/>

                    <button type="submit" onClick={(e) => this.sendForm(e)}>submit</button>
                    <Link to={`/${this.props.name}`}><input  type="submit" value="Cancel" /></Link>
                </form>
            </div>
        )
    }

}

export default AddFollowedManga;