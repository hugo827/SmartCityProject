import React from 'react';

class Update extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            update: false,
            rows : []
        }
    }

    callAPI() {
        const url = "http://localhost:3001/";
        const endUrl = "/";
        const table = this.props.name.toLowerCase();
        const id = this.props.idElem ?? 1;
        const urlFinal = url + table + endUrl + id;

            if (window.fetch) {
                fetch(urlFinal)
                    .then( res => {
                        res.json().then( data => {
                            if(this.props.idElem) {
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
                console.log("fetch n'est pas disponible")
            }

    }

    componentDidMount() {
        this.callAPI();
    }

    handleClick() {

    }

    render() {
        let data = [];
        let updateElem;
        for(let elem in this.state.rows) {
            data.push(elem);
        }

        if(this.state.update) {
             updateElem = data.map( elem => {
                if(elem !== 'main_picture') {
                    return <p><label>{elem} :</label><input value={this.state.rows[`${elem}`]}/></p>;
                }
                else {
                    return <p><label>{elem} :</label><input type="file" name="my_file" value={this.state.rows[`${elem}`]}/> </p>
                }

            })
        } else {
             updateElem = data.map( elem => {
                if(elem !== 'main_picture') {
                    return <p><label>{elem} :</label><input /></p>;
                }
                else {
                    return <p><label>{elem} :</label><input type="file" name="my_file"/> </p>
                }

            })
        }


        return (
            <div className="nameTable">
                { updateElem }
                <button type="submit">submit</button>
                <input onClick={this.handleClick()}  type="submit" value="Cancel"/>
            </div>
        )
    }

}

export default Update;