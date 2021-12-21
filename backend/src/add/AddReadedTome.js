import React from 'react';
import {Link} from "react-router-dom";


class AddReadedTome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : this.props.name,
            token : localStorage.getItem('token'),

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
            console.log(error);
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



    render() {

        return (
            <div className="nameTable">
                <form className="form">
                    <p>Tout est obligatoire</p>
                    <label>readAt : </label> <input type="date" onChange={(e) => this.setState({readAt: e.target.value})} required/>
                    <label>fkFollowedManga (l'id entré doit corresponde à un id existant dans followed_manga) : </label> <input type="number" onChange={(e) => this.setState({fkFollowedManga: e.target.value})} required/>
                    <label>fkUser (l'id entré doit correspondre à l'id fkUser du fkFollowedManga): </label> <input type="number" onChange={(e) => this.setState({fkUser: e.target.value})} required/>
                    <label>fkTome (l'id entré doit correspondre à l'id d'un tome existant dans tome): </label> <input type="number" onChange={(e) => this.setState({fkTome: e.target.value})} required/>
                   <button type="submit" onClick={(e) => this.sendForm(e)}>submit</button>
                    <Link to={`/${this.props.name}`}><input  type="submit" value="Cancel" /></Link>
                </form>
            </div>
        )
    }

}

export default AddReadedTome;