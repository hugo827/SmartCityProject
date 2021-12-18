import React from 'react';

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

    async submitAdd(event) {
        event.preventDefault()
        try {
            const formData = new FormData();
            await this.sendAPI(formData);
            await window.alert("Votre manga a bien et ajouter");
            this.resetState();
        } catch (error) {
            console.log(error);
        }
    }

    sendAPI = async (formData) => {

        const URL = `http://localhost:3001/${this.state.name}/`;
        return await fetch(URL, {
            method : "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept':'application/json',
                'authorization' : `Bearer ${this.state.token}`
            },
            body : JSON.stringify({
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
            await window.alert("Votre manga a bien et ajouter");
            this.resetState();
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
                picture: null,
                isFinish: false,
           });
    }

    render() {

        return (
            <div className="nameTable">
                <form className="form">
                    <label>Title : </label> <input onChange={(e) => this.setState({title: e.target.value})} />
                    <label>Synopsis : </label> <input onChange={(e) => this.setState({synopsis: e.target.value})} />
                    <label>Price : </label> <input onChange={(e) => this.setState({price: e.target.value})} />
                    <label>type : </label> <input onChange={(e) => this.setState({type: e.target.value})} />
                    <label>sub Genre : </label> <input onChange={(e) => this.setState({subGenre: e.target.value})}/>
                    <label>Author : </label> <input onChange={(e) => this.setState({author: e.target.value})} />
                    <label>publisher : </label> <input onChange={(e) => this.setState({publisher: e.target.value})} />
                    <label>picture : </label> <input type="file" accept={"image/*"} onChange={(e) => this.setState({picture: e.target.files[0]})}/>
                    <label>is finish : </label> <input type="checkbox" onChange={(e) => this.setState({isFinish: !this.state.isFinish})}/>
                    <button type="submit" onClick={(e) => this.sendForm(e)}>submit</button>
                    <input  type="submit" value="Cancel"/>
                </form>
            </div>
        )
    }

}

export default AddManga;
