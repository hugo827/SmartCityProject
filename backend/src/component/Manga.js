import React from 'react';


class Manga extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: []
        };
    }

     componentDidMount() {
        const url = "http://localhost:3001/"
         const endUrl = "/all"

         if (window.fetch) {
             fetch(url + "manga" + endUrl)
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
                <tr key={data.id_manga}>
                    <th scope="row">{data.id_manga}</th>
                    <td>{data.title}</td>
                    <td>{data.synopsis}</td>
                    <td>{data.new_price}</td>
                    <td>{data.type}</td>
                    <td>{data.sub_genre}</td>
                    <td>{data.author}</td>
                    <td>{data.publisher}</td>
                    <td>{data.main_picture}</td>
                    <td>{data.is_finish}</td>
                    <td>
                        <div style={{width:"110px"}}>
                            <button color="danger" onClick={() => this.updateRows(rows.id_manga)}>Upd</button>
                            <button color="danger" onClick={() => this.deleteRows(rows.id_manga)}>Del</button>
                        </div>
                    </td>
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
                            <th>ID</th>
                            <th>Title</th>
                            <th>Synopsis</th>
                            <th>Price</th>
                            <th>Type</th>
                            <th>Sub Genre</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>Main picture</th>
                            <th>Is finish</th>
                            <th>Action</th>
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



export default Manga;