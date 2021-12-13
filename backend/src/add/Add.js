import React from 'react';


class Add extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            urlAPI : "http://localhost:3001/",
            name : this.props.name.toLowerCase(),
            token : localStorage.getItem('token'),
        }
    }

    postAPI() {

        const urlFinal = this.state.urlAPI + this.state.name;

        if (window.fetch) {
            fetch(urlFinal, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'authorization': `Bearer ${this.state.token}`
                }
            })
                .catch( (error) => {
                    console.error(error);
                });
        } else {
            console.log("Fetch n'est pas disponible")
        }

    }

}

export default Add;