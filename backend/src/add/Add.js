import React from 'react';


class Add extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            urlAPI : "http://localhost:3001/",
            name : this.props.name.toLowerCase(),
            token : "",
            rows : []
        }
    }

    callAPI() {

        const urlFinal = this.state.urlAPI + this.state.name;

        if (window.fetch) {
            fetch(urlFinal, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'authorization': `Bearer ${this.state.token}`
                }
            })
                .then( res => {
                    res.json().then( data => {
                            this.setState({update: false, rows: data});
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

}

export default Add;