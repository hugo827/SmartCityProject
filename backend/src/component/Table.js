import React from 'react';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import Delete from './Delete';

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state  = {
            nbRecords : [],
            rows: []
        };

    }

    callAPI() {
        const url = "http://localhost:3001/";
        const endUrl = "/all/";
        const table = this.props.name.toLowerCase();
        const page = 0;

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

        const urlFinal = `${url}${table}${endUrl}`;

        if (window.fetch) {
            fetch(urlFinal)
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
         this.callAPI();
    }

    componentDidUpdate(prevProps) {
        if (this.props.name !== prevProps.name) {
            this.createPagination();
            this.callAPI();
        }
    }

    delete(id) {
        Delete(this.props.name, id);
        this.createPagination();
        this.callAPI();
    }

    render() {

        const rows = this.state.rows.map( data => {
            if(data != null) {
                return (
                    <tr key={data[this.props.colonnes[0]]}>
                        {this.props.colonnes.map(c => <td>{data[c]}</td>)}
                        <td>
                            <div>
                                <button className="BTN DEL" onClick={ () => this.delete(data[`${this.props.colonnes[0]}`])}>DEL</button>
                                <Link  to={`/update/${this.props.name}${data[`${this.props.colonnes[0]}`]}`}><button className="BTN UPD">UPD</button></Link>
                            </div>
                        </td>
                    </tr>
                )
            } else {
                return null;
            }
        })

        return (

            <div>
                <div className="nameTable"><h1>Tables : {this.props.name} </h1></div>

                <div className="table">
                    <table className="fl-table">
                        <thead>
                            <tr>
                                { this.props.colonnes.map( col =>  <th>{col}</th> ) }
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                    <Pagination totalRecord={this.state.nbRecords} nbElemPerPage={2} table={this.props.name.toLowerCase()}></Pagination>
                    <Link to={`/add/${this.props.name.toLowerCase()}`}><button className="btnAdd">Ajouter</button></Link>
                </div>
            </div>

        )
    }
}

export default Table;