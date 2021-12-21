import React from 'react';
import {Link} from "react-router-dom";


class UpdateAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name : this.props.name,
            token : localStorage.getItem('token'),
            rows: [],

            login: "",
            password: "",
            email: 0,
            birthdate: null,
            phone: "",
            picture: [],
            isAdmin: false,
            previewPicture: null,
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
        this.setState({login: this.state.rows['login']});
        this.setState({email: this.state.rows['email']});
        this.setState({birthdate: this.state.rows['birthdate']});
        this.setState({phone: this.state.rows['phone']});
        this.setState({previewPicture: this.state.rows['picture']});
        this.setState({isAdmin: !this.state.rows['is_admin']});
    }


    sendAPI = async (formData) => {

        const URL = `http://localhost:3001/${this.state.name}`;

        const headers = {
            'Accept':'application/json',
            'authorization' : `Bearer ${this.state.token}`
        };

        return await fetch(URL, {
            method : "PATCH",
            headers: headers,
            body : formData
        });
    };




    async sendForm(event){
        event.preventDefault();
        const formData = new FormData();

        formData.append('id_user', this.state.id);
        formData.append('login', this.state.login);
        formData.append('pswd', this.state.password);
        formData.append('email', this.state.email);
        formData.append('birthdate', this.state.birthdate);
        formData.append('phone', this.state.phone);
        formData.append('is_admin', this.state.isAdmin);
        formData.append('picture', this.state.picture);

        try {
            await this.sendAPI(formData);
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
                    <label>login : </label> <input defaultValue={this.state.rows[`login`]} onChange={(e) => this.setState({login: e.target.value})} required/>
                    <label>password : </label> <input onChange={(e) => this.setState({password: e.target.value})} required/>
                    <label>email : </label> <input type="email" defaultValue={this.state.rows[`email`]}  onChange={(e) => this.setState({email: e.target.value})} required/>
                    <label>birthdate : </label> <input type="date" defaultValue={`1990-01-01`} onChange={(e) => this.setState({birthdate: e.target.value})} required/>
                    <label>phone : </label> <input type="number" defaultValue={this.state.rows[`phone`]} onChange={(e) => this.setState({phone: e.target.value})} required/>
                    <label>picture : </label> <input type="file" accept={"image/*"}  defaultValue={this.state.rows[`picture`]} onChange={(e) => this.setState({picture: e.target.files[0]})} required/>
                    <label>is admin : </label> <input type="checkbox" defaultValue={this.state.rows[`is_admin`]} onChange={(e) => this.setState({isAdmin: !this.state.isFinish})} required/>
                    <button type="submit" onClick={(e) => this.sendForm(e)}>submit</button>
                    <Link to={`/${this.state.name}`}><input  type="submit" value="Cancel"/></Link>
                </form>
            </div>
        )
    }
}

export default UpdateAccount;