import React from 'react';
import Update from "./Update";


class UpdateManga extends Update {



    sendAPI = async (formData) => {
        const URL = "http://localhost:3001/formulaire";
        return await fetch(URL, {
            method : "POST",
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };


    async sendForm(event){
        event.preventDefault();
        const formData = new FormData();
        formData.append('nom', this.state.nom);
        formData.append('prenom', this.state.prenom);
        formData.append('avatar', this.state.avatar);
        for (const image of this.state.images){
            formData.append('images', image);
        }
        try {
            await this.sendAPI(formData);
            console.log("OK");
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let data = [];
        let updateElem;

        for(let elem in this.state.rows) {
            if(elem.split('_')[0] !==  'id') {
                data.push(elem);
            }
        }
        console.log(this.state);

        updateElem = data.map( elem => {
            if(elem === 'main_picture') {
                return <p><label>{elem} :</label><input type="file" name="my_file" defaultValue={this.state.rows[`${elem}`]}/> </p>
            }
            else {
                if(elem.split('_')[0] === 'is') {
                        return <p><label>{elem} :</label>
                                <input
                                    type="checkbox"
                                    checked={this.state.rows[`${elem}`]}
                                /></p>;
                    } else {
                        return <p><label>{elem} :</label>
                            <input
                                defaultValue={this.state.rows[`${elem}`]}
                                required
                            /></p>;

                    }

                }

        })

        return (
            <div className="nameTable">
                <form>
                    { updateElem }
                    <button type="submit">submit</button>
                    <input  type="submit" value="Cancel"/>
                </form>
            </div>
        )
    }

}

export default UpdateManga;