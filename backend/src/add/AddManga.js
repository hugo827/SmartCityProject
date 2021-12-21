import React from 'react';
import {Link} from "react-router-dom";

class AddManga extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : this.props.name,
            token : localStorage.getItem('token'),

            title: "",
            synopsis: "",
            price: 0,
            type: "",
            subGenre: "",
            author: "",
            publisher: "",
            picture: null,
            isFinish: false,
        }

    }

    sendAPI = async (formData) => {

        const URL = `http://localhost:3001/${this.state.name}/`;

        return await fetch(URL, {
            method : "POST",
            headers: {
                'Authorization' : `Bearer ${this.state.token}`
            },
            body : formData
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
        formData.append('is_finish', this.state.isFinish);
        formData.append('picture', this.state.picture);

        try {
            await this.sendAPI(formData);
            await window.alert("Votre manga a bien et ajouter");
        } catch (error) {
            console.log(error);
        }
    }

    resetState() {
           this.setState({
                title: "",
                synopsis: "",
                price: 0,
                type: "",
                subGenre: "",
                author: "",
                publisher: "",
                picture: [],
                isFinish: false,
           });
    }

    render() {
        return (
            <div className="nameTable">
                <form className="form">
                    <label>Title : </label> <input type={"text"} onChange={(e) => this.setState({title: e.target.value})} required />
                    <label>Synopsis : </label> <input type={"text"} onChange={(e) => this.setState({synopsis: e.target.value})} required/>
                    <label>Price : </label> <input type={"text"} onChange={(e) => this.setState({price: e.target.value})} required/>
                    <label>type : </label> <input type={"text"} onChange={(e) => this.setState({type: e.target.value})} required/>
                    <label>sub Genre : </label> <input type={"text"} onChange={(e) => this.setState({subGenre: e.target.value})} required/>
                    <label>Author : </label> <input type={"text"} onChange={(e) => this.setState({author: e.target.value})} required/>
                    <label>publisher : </label> <input type={"text"} onChange={(e) => this.setState({publisher: e.target.value})} required/>
                    <label>picture : </label> <input type="file" accept={"image/*"} onChange={(e) => this.setState({picture: e.target.files[0]})} required/>
                    <label>is finish : </label> <input type="checkbox" onChange={(e) => this.setState({isFinish: !this.state.isFinish})} required/>
                    <button type={"submit"} onClick={(e) => this.sendForm(e)}>submit</button>
                    <Link to={`/${this.props.name}`}><input  type="submit" value="Cancel" /></Link>
                </form>
            </div>
        )
    }

}

export default AddManga;
