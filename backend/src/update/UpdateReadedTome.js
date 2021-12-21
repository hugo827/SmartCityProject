import React from 'react';
import {Link} from "react-router-dom";

class UpdateReadedTome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name : this.props.name,
            token : localStorage.getItem('token'),
            rows: [],

            readAt: null,
            fkFollowedManga: 0,
            fkUser: 0,
            fkTome: 0
        }

    }

    callAPI() {
        const url = "http://localhost:3001/readedTome";
        const endUrl = "/";
        const id = this.state.id;

        const urlFinal = url + endUrl + id;

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
        this.setState({readAt: this.state.rows['read_at']});
        this.setState({fkFollowedManga: this.state.rows['fk_followed_manga']});
        this.setState({fkUser: this.state.rows['fk_user']});
        this.setState({fkTome: this.state.rows['fk_tome']});

    }


    sendAPI = async () => {

        const URL = `http://localhost:3001/${this.state.name}`;
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept':'application/json',
            'authorization' : `Bearer ${this.state.token}`
        };
        return await fetch(URL, {
            method : "PATCH",
            headers: headers,
            body : JSON.stringify({
                    id: this.state.id,
                    read_at: this.state.readAt,
                    fk_followed_manga: this.state.fkFollowedManga,
                    fk_user: this.state.fkUser,
                    fk_tome: this.state.fkTome
                }
            )
        });
    };




    async sendForm(event){
        event.preventDefault();

        try {
            await this.sendAPI();
            await window.alert("Le compte a bien ete mis a jour !");

        } catch (error) {
            console.log(error);
        }
    }

    render() {

        return (
            <div className="nameTable">
                <form className="form">
                    <p>Tout est obligatoire</p>
                    <label>Read at : </label> <input type="date" defaultValue={this.state.rows[`read_at`]} onChange={(e) => this.setState({readAt: e.target.value})} required/>
                    <label>fk followed manga (doit correspondre a un id existant dans followed manga): </label> <input defaultValue={this.state.rows[`fk_followed_manga`]} onChange={(e) => this.setState({fkFollowedManga: e.target.value})} required/>
                    <label>fk user (doit correspondre a l'id de fk_user du record fk_followed_manga): </label> <input  defaultValue={this.state.rows[`fk_user`]}  onChange={(e) => this.setState({fkUser: e.target.value})} required/>
                    <label>fk  tome (doit correspondre a un id existant dans tome): </label> <input  defaultValue={this.state.rows[`fk_tome`]} onChange={(e) => this.setState({fkTome: e.target.value})} required/>
                   <button type="submit" onClick={(e) => this.sendForm(e)}>submit</button>
                    <Link to={`/${this.state.name}`}><input  type="submit" value="Cancel"/></Link>
                </form>
            </div>
        )
    }

}

export default UpdateReadedTome;