import React from 'react';

class AddTome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : this.props.name,
            token : localStorage.getItem('token'),

            number: 0,
            title: "",
            picture: null,
            releaseDate: null,
            isLastTome: false,
            fkManga: null,
        }

    }

    submitAdd(event) {
        this.sendForm(event);
    }

    sendAPI = async (formData) => {
        const URL = `http://localhost:3001/${this.state.name}/`;
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept':'application/json',
            'authorization' : `Bearer ${this.state.token}`
        };
        const body = JSON.stringify({
            number: this.state.number,
            title: this.state.title,
            picture: this.state.picture,
            release_date: this.state.releaseDate,
            is_last_tome: this.state.isLastTome,
            fk_manga: this.state.fkManga
        });


        return await fetch(URL, {
            method : "POST",
            headers: headers,
            body : body
        });
    };




    async sendForm(event){
        event.preventDefault();
        const formData = new FormData();

        formData.append('number', this.state.number);
        formData.append('title', this.state.title);
        formData.append('picture', this.state.picture);
        formData.append('release_date', this.state.releaseDate);
        formData.append('is_last_tome', this.state.isLastTome);
        formData.append('fk_manga', this.state.fkManga);

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
            number: 0,
            title: "",
            picture: null,
            releaseDate: null,
            isLastTome: false,
            fkManga: 0,
        });
    }


    render() {

        return (
            <div className="nameTable">
                <form className="form">
                    <label>Number : </label> <input type={"number"} onChange={(e) => this.setState({number: e.target.value})} />
                    <label>title : </label> <input type="text" onChange={(e) => this.setState({title: e.target.value})} />
                    <label>picture : </label> <input type={"file"} accept={"image/*"} onChange={(e) => this.setState({picture: e.target.value})} />
                    <label>Release date : </label> <input type={"date"} onChange={(e) => this.setState({releaseDate: e.target.value})} />
                    <label>is last tome : </label> <input type="checkbox" onChange={(e) => this.setState({isLastTome: !this.state.isFinish})}/>
                    <label>fk Manga : </label> <input type={"number"} onChange={(e) => this.setState({fkManga: e.target.value})}/>
                    <button type="submit" onClick={(e) => this.sendForm(e)}>submit</button>
                    <input  type="submit" value="Cancel"/>
                </form>
            </div>
        )
    }

}

export default AddTome;