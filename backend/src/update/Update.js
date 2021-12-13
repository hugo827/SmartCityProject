import React from 'react';


class Update extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token : localStorage.getItem('token'),
            id : this.props.id,
            name : this.props.name,
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
                                this.setState({rows: data});
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