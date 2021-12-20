import React from 'react';
import {Link} from "react-router-dom";

class UpdateFollowedManga extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name : this.props.name,
            token : localStorage.getItem('token'),
            rows: [],

            stateManga: 3,
            fkManga: 0,
            fkUser: 0,
        }

    }

    callAPI() {
        const url = "http://localhost:3001/followedManga/";
        const id = this.state.id;

        const urlFinal = url + id;

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
        this.setState({stateManga: this.state.rows['state']});
        this.setState({fkManga: this.state.rows['fk_manga']});
        this.setState({fkUser: this.state.rows['fk_user']});
    }


    sendAPI = async () => {
        const URL = `http://localhost:3001/${this.state.name}`;
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept':'application/json',
            'authorization' : `Bearer ${this.state.token}`
        };
        const body = JSON.stringify({
            id: this.state.id,
            state: this.state.stateManga,
            fk_manga: this.state.fkManga,
            fk_user: this.state.fkUser,
        });

        return await fetch(URL, {
            method : "PATCH",
            headers: headers,
            body : body
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
                    <label>State : </label> <input defaultValue={this.state.rows[`state`]} onChange={(e) => this.setState({stateManga: e.target.value})} />
                    <label>fk Manga : </label> <input defaultValue={this.state.rows[`fk_manga`]} onChange={(e) => this.setState({fkManga: e.target.value})} />
                    <label>fk User : </label> <input  defaultValue={this.state.rows[`fk_user`]}  onChange={(e) => this.setState({fkUser: e.target.value})} />
                    <button type="submit" onClick={(e) => this.sendForm(e)}>submit</button>
                    <Link to={`/${this.state.name}`}><input  type="submit" value="Cancel"/></Link>
                </form>
            </div>
        )
    }

}

export default UpdateFollowedManga;