import React from 'react';


class AddFollowedManga extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : this.props.name,
            token : localStorage.getItem('token'),

            stateManga: 3,
            fkManga: 0,
            fkUser: 0,
        }

    }

    submitAdd(event) {
        this.sendForm(event);
    }

    sendAPI = async (formData) => {
        const URL = `http://localhost:3001/followedManga/`;
        return await fetch(URL, {
            method : "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept':'application/json',
                'authorization' : `Bearer ${this.state.token}`
            },
            body : JSON.stringify({
                state: this.state.stateManga,
                fk_manga: this.state.fkManga,
                fk_user: this.state.fkUser,
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
            await window.alert("Votre manga suivit a bien ete ajoute");
            this.resetState();
        } catch (error) {
            console.log(error);
        }
    }

    resetState() {
        this.setState({
            stateManga: 3,
            fkManga: 0,
            fkUser: 0,
        });
    }



    render() {

        return (
            <div className="nameTable">
                <form className="form">
                    <label>stateManga : </label> <input type={"number"} onChange={(e) => this.setState({stateManga: e.target.value})} />
                    <label>fkManga : </label> <input type={"number"} onChange={(e) => this.setState({fkManga: e.target.value})} />
                    <label>fkUser : </label> <input type={"number"} onChange={(e) => this.setState({fkUser: e.target.value})} />

                    <button type="submit" onClick={(e) => this.sendForm(e)}>submit</button>
                    <input  type="submit" value="Cancel"/>
                </form>
            </div>
        )
    }

}

export default AddFollowedManga;