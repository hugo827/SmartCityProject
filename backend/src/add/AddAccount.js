import React from 'react';
import {Link} from "react-router-dom";


class AddAccount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : this.props.name,
            token : localStorage.getItem('token'),

            login: "",
            password: "",
            email: 0,
            birthdate: null,
            phone: "",
            picture: [],
            isAdmin: false,
        }

    }


    sendAPI = async (formData) => {
        const URL = `http://localhost:3001/${this.state.name}/inscription`;
        const headers = {
            'Accept':'application/json',
            'authorization' : `Bearer ${this.state.token}`
            };

            return await fetch(URL, {
            method : "POST",
            headers: headers,
            body : formData
        });
    };




    async sendForm(event){

        event.preventDefault();
        const formData = new FormData();

        formData.append('login', this.state.login);
        formData.append('pswd', this.state.password);
        formData.append('email', this.state.email);
        formData.append('birthdate', this.state.birthdate);
        formData.append('phone', this.state.phone);
        formData.append('is_admin', this.state.isAdmin);
        formData.append('picture', this.state.picture);

        try {
            await this.sendAPI(formData);
            await window.alert("Un nouveau compte à bien été crée");
            this.resetState();
        } catch (error) {
            console.log(error);
        }
    }

    resetState() {
        this.setState({
            login: "",
            password: "",
            email: 0,
            birthdate: "",
            phone: "",
            picture: [],
            isAdmin: false,
        });
    }

    render() {

        return (
            <div className="nameTable">
                <form className="form">
                    <p>Tout est obligatoire</p>
                    <label>login : </label> <input onChange={(e) => this.setState({login: e.target.value})} required/>
                    <label>password : </label> <input onChange={(e) => this.setState({password: e.target.value})} required/>
                    <label>email : </label> <input type="email" onChange={(e) => this.setState({email: e.target.value})} />
                    <label>birthdate : </label> <input type={"date"} onChange={(e) => this.setState({birthdate: e.target.value})} required/>
                    <label>phone : </label> <input type="number" onChange={(e) => this.setState({phone: e.target.value})} required/>
                    <label>picture : </label> <input type="file" accept={"image/*"} onChange={(e) => this.setState({picture: e.target.files[0]})} required/>
                    <label>is admin : </label> <input type="checkbox" onChange={(e) => this.setState({isAdmin: !this.state.isFinish})} required/>
                    <button type="submit" onClick={(e) => this.sendForm(e)}>submit</button>
                    <Link to={`/${this.props.name}`}><input  type="submit" value="Cancel" /></Link>
                </form>
            </div>
        )
    }

}

export default AddAccount;