import React from 'react';
import Pagination from './Pagination';

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nbRecords : [],
            rows: []
        };
    }

    callAPI(nb) {
        const url = "http://localhost:3001/";
        const endUrl = "/all/";
        const table = this.props.name.toLowerCase();
        const page = nb ?? 0;

        if (window.fetch) {
            fetch(url + table + endUrl + page)
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

    createPagination() {
        const url = "http://localhost:3001/";
        const endUrl = "/nb";
        const table = this.props.name.toLowerCase();

        if (window.fetch) {
            fetch(`${url}${table}${endUrl}`)
                .then( res => {
                    res.json().then( data => {
                        this.setState({nbRecords: data})
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
         this.createPagination();
         this.callAPI(0);
    }

    componentDidUpdate(prevProps) {
        if (this.props.name !== prevProps.name) {
            this.componentDidMount(); // Je remonte a chaque fois pas bon
        }
    }

    render() {

        const rows = this.state.rows.map( data => {
            if(data != null) {
                return (
                    <tr key={data[this.props.colonnes[0]]}>
                        {this.props.colonnes.map(c => <td>{data[c]}</td>)}
                        <td>
                            <div>
                                <button>DEL</button>
                                <button>UPD</button>
                            </div>
                        </td>
                    </tr>
                )
            }
        })


        return (
            <div>
                <div className="nameTable"><h1>Tables : {this.props.name} </h1></div>

                <div className="table">
                    <table className="fl-table">
                        <thead>
                        <tr>
                            { this.props.colonnes.map( c =>  <th>{c}</th> ) }
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                    <Pagination totalRecord={this.state.nbRecords} nbElemPerPage={2} ></Pagination>
                </div>
                <div>
                    <button className="btnAdd">Ajouter</button>
                </div>
            </div>

        )
    }
}



export default Table;