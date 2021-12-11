import React from 'react';

class Update extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            name : this.props.name,
            update: false,
            rows : []
        }
    }

    callAPI() {
        const url = "http://localhost:3001/";
        const endUrl = "/";
        const table = this.state.name.toLowerCase();
        const id = this.state.id;

        const urlFinal = url + table + endUrl + id;

        if (window.fetch) {
            fetch(urlFinal)
                .then( res => {
                    res.json().then( data => {
                        if(this.state.id) {
                            this.setState({update: true, rows: data});
                        } else {
                            this.setState({update: false, rows: data});
                        }
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

export default Update;