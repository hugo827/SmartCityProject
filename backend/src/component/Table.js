import React from 'react';
import { Link } from 'react-router-dom';

import Delete from './Delete';
import Pagination from './Pagination';


class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state  = {
            offset : 0,
            nbRecords : [],
            rows: []
        };
    }

    callAPI() {
        const url = "http://localhost:3001/";
        const endUrl = "/all/";
        const table = this.props.name.toLowerCase();
        const page = this.state.offset;

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

    getCountRecord() {
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
         this.getCountRecord();
         this.callAPI();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.name !== prevProps.name) {
            this.setState({offset: 0});
            this.getCountRecord();
            this.callAPI();
        }
        if(this.state.offset !== prevState.offset) {
            this.callAPI();
        }
    }

    async delete(id) {
        await Delete(this.props.name, id);
        this.getCountRecord();
        this.callAPI();
    }

    changeOffset = (numPage) => {
        this.setState({offset: numPage});
    }

    render() {
        const rows = this.state.rows.map( data => {
            if(data != null) {
                return (
                    <tr key={data[this.props.colonnes[0]]}>
                        {
                            this.props.colonnes.map((c, i) => {
                                if(c.split("_")[0] !== "is") {
                                    return <td key={i}>{data[c]}</td>;
                                } else {
                                    return <td key={i}>{data[c] ? "True" : "false" }</td>;
                                }
                            })
                        }
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
                            <tr key={'thead'}>
                                { this.props.colonnes.map( (col, index) => <th key={index}>{col}</th> ) }
                                <th key="action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                    <Pagination totalRecord={this.state.nbRecords} changeOffset={this.changeOffset}/>
                    <Link to={`/add/${this.props.name.toLowerCase()}`}><button className="btnAdd">Ajouter</button></Link>
                </div>
            </div>

        )
    }
}

export default Table;