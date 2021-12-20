import React from 'react';


class AddReadedTome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name : this.props.name,
            token : localStorage.getItem('token'),

            readAt: null,
            fkFollowedManga: 0,
            fkUser: 0,
            fkTome: 0
        }

    }

    sendAPI = async (formData) => {
        const URL = `http://localhost:3001/readedTome/`;

        return await fetch(URL, {
            method : "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept':'application/json',
                'authorization' : `Bearer ${this.state.token}`
            },
            body: formData
        });
    };




    async sendForm(event){
        event.preventDefault();
        const formData = new FormData();

        formData.append('read_at', this.state.readAt);
        formData.append('fk_followed_manga', this.state.fkFollowedManga);
        formData.append('new_price', this.state.fkUser);
        formData.append('fk_user', this.state.fkTome);


        try {
            await this.sendAPI(formData);
            await window.alert("Votre tome lu a bien ete ajouter");
            this.resetState();
        } catch (error) {
            console.log(error);
        }
    }

    resetState() {
        this.setState({
            readAt: "",
            fkFollowedManga: "",
            fkUser: 0,
            fkTome: "",
        });
    }



    render() {

        return (
            <div className="nameTable">
                <form className="form">
                    <label>readAt : </label> <input type="date" onChange={(e) => this.setState({readAt: e.target.value})} />
                    <label>fkFollowedManga : </label> <input type="number" onChange={(e) => this.setState({fkFollowedManga: e.target.value})} />
                    <label>fkUser : </label> <input type="number" onChange={(e) => this.setState({fkUser: e.target.value})} />
                    <label>fkTome : </label> <input type="number" onChange={(e) => this.setState({fkTome: e.target.value})} />
                   <button type="submit" onClick={(e) => this.sendForm(e)}>submit</button>
                    <input  type="submit" value="Cancel"/>
                </form>
            </div>
        )
    }

}

export default AddReadedTome;