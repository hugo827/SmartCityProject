import React from 'react';
import {Link} from "react-router-dom";

class UpdateManga extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            name : this.props.name,
            token : localStorage.getItem('token'),
            rows : [],

            title: "",
            synopsis: "",
            price: null,
            type: "",
            subGenre: "",
            author: "",
            publisher: "",
            picture: null,
            isFinish: false,
        }
    }

    callAPI() {
        const url = "http://localhost:3001/";
        const endUrl = "/";
        const table = this.state.name;
        const id = this.state.id;

        const urlFinal = url + table + endUrl + id;

        if (window.fetch) {
            fetch(urlFinal)
                .then( res => {
                    res.json().then( data => {
                        this.setState({rows: data});
                        this.testSetState();
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

    testSetState() {
       const title = "title";
       this.setState({[`${title}`]: this.state.rows['title']});
       this.setState({synopsis: this.state.rows['synopsis']});
       this.setState({price: this.state.rows['new_price']});
       this.setState({subGenre: this.state.rows['sub_genre']});
       this.setState({author: this.state.rows['author']});
       this.setState({publisher: this.state.rows['publisher']});
       this.setState({picture: this.state.rows['picture']});
       this.setState({isFinish: !this.state.rows['is_finish']});
       this.setState({type: this.state.rows['type']});
   }

    submitAdd(event) {
        this.sendForm(event);
    }

    sendAPI = async (formData) => {
        const URL = `http://localhost:3001/${this.state.name}`;
        return await fetch(URL, {
            method : "PATCH",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept':'application/json',
                'authorization' : `Bearer ${this.state.token}`
            },
            body : JSON.stringify({
                id: this.state.id,
                title: this.state.title,
                synopsis: this.state.synopsis,
                new_price: this.state.price,
                type: this.state.type,
                sub_genre: this.state.subGenre,
                author: this.state.author,
                publisher: this.state.publisher,
                picture: this.state.picture,
                is_finish: this.state.isFinish,
            })
        });
    };


    async sendForm(event){
        event.preventDefault();
        const formData = new FormData();

        formData.append('title', this.state.title);
        formData.append('synopsis', this.state.synopsis);
        formData.append('new_price', this.state.price);
        formData.append('type', this.state.type);
        formData.append('sub_genre', this.state.subGenre);
        formData.append('author', this.state.author);
        formData.append('publisher', this.state.publisher);
        formData.append('picture', this.state.picture);
        formData.append('is_finish', this.state.isFinish);

        try {
            await this.sendAPI(formData);
            await window.alert("Votre manga a bien ete modifier");
        } catch (error) {
            console.log(error);
        }
    }


     render() {

        return (
            <div className="nameTable">
                <form className="form">
                    <label>Title : </label> <input defaultValue={this.state.title} onChange={(e) => this.setState({title: e.target.value})} />
                    <label>Synopsis : </label> <input defaultValue={this.state.synopsis} onChange={(e) => this.setState({synopsis: e.target.value})} />
                    <label>Price : </label> <input defaultValue={this.state.price} onChange={(e) => this.setState({price: e.target.value})} />
                    <label>type : </label> <input defaultValue={this.state.type} onChange={(e) => this.setState({type: e.target.value})} />
                    <label>sub Genre : </label> <input defaultValue={this.state.subGenre} onChange={(e) => this.setState({subGenre: e.target.value})}/>
                    <label>Author : </label> <input defaultValue={this.state.author} onChange={(e) => this.setState({author: e.target.value})} />
                    <label>publisher : </label> <input defaultValue={this.state.publisher} onChange={(e) => this.setState({publisher: e.target.value})} />
                    <label>picture : </label> <input defaultValue={this.state.picture} type="file" accept={"image/*"} onChange={(e) => this.setState({picture: e.target.files[0]})}/>
                    <label>is finish : </label> <input defaultValue={!this.state.isFinish} type="checkbox" onChange={(e) => this.setState({isFinish: !this.state.isFinish})}/>
                    <button type="submit" onClick={(e) => this.sendForm(e)}>submit</button>
                    <Link to={`/${this.state.name}`}><input  type="submit" value="Cancel"/></Link>
                </form>
            </div>
        )
    }
}

export default UpdateManga;