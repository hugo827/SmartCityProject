import React from 'react';


class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            login: null,
            password: null,
        }
    }

    callAPI(login, password) {
        const url = "http://localhost:3001/account/login"
        const jsonBody = JSON.stringify({ "login" : login, "password": password});

        fetch(url, {
            method: "POST",
            body : jsonBody,
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
        }).then( res => {
            res.json().then( data => {
                this.props.setToken(data);
                sessionStorage.setItem("token", data);
                this.verifAdmin(data);
            })
        })
            .catch( (error) => {
                console.error(error);
            });

    }

    verifAdmin(token) {
        const urlAPI ="http://localhost:3001/account/admin";

        fetch(urlAPI, {
            method: "GET",
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json',
                'authorization' : `Bearer ${token}`
            },
        }).then( res => {
            res.json().then( data => {
                this.props.setAdmin(data['admin']);
                sessionStorage.setItem("admin", data['admin']);
            })
        })
            .catch( (error) => {
                console.error(error);
            });
    }

    connexion = (event) => {
        this.callAPI(this.state.login, this.state.password);
        event.preventDefault();
    }

    change = ({currentTarget}) => {
        const {value, name} = currentTarget;
        if(name === 'login'){
            this.setState({login: value});
        }else {
            this.setState({password: value});
        }

    }



    render() {
        return(
            <div className="login">
                <form onSubmit={this.connexion}>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={this.change} name="login"/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={this.change} name="password"/>
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;