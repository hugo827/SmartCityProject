import React from 'react';


class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: []
        };
    }

     componentDidMount() {
         const url = "http://localhost:3001/"
         const endUrl = "/all"
         const table = "manga"

         if (window.fetch) {
             fetch(url + table + endUrl)
                 .then( res => {
                     res.json().then( data => {
                        this.setState({rows: data});
                     })
                 })
                 .catch( (error) => {
                    console.error(error);
                });
        } else {
            console.log("fetch n'est pas disponible")
        }
    }

    render() {


        const rows = this.state.rows.map( data => {
            return (
                <tr key={data[this.props.colonnes[0]]}>
                    {this.props.colonnes.map( c => <th>{data[c]}</th>)}
                </tr>
            )
        })




        return (
            <div>
                <div className="nameTable"><h1>Tables : Manga </h1></div>

                <div className="table">
                    <table className="fl-table">
                        <thead>
                        <tr>
                            { this.props.colonnes.map( c =>  <th>{c}</th> ) }
                        </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>

                </div>
                <div>
                    <button>Ajouter</button>
                </div>
            </div>

        )
    }
}



export default Table;