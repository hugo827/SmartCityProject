import React from 'react';
import Update from "./Update";


class UpdateTome extends Update {

    handleClick() {

    }

    render() {
        let data = [];
        let updateElem;
        for(let elem in this.state.rows) {
            data.push(elem);
        }

        if(this.state.update) {
            updateElem = data.map( elem => {
                if(elem !== 'picture') {
                    return <p><label>{elem} :</label><input defaultValue={this.state.rows[`${elem}`]}/></p>;
                }
                else {
                    return <p><label>{elem} :</label><input type="file" name="my_file" defaultValue={this.state.rows[`${elem}`]}/> </p>
                }

            })
        } else {
            updateElem = data.map( elem => {
                if(elem !== 'picture') {
                    return <p><label>{elem} :</label><input /></p>;
                }
                else {
                    return <p><label>{elem} :</label><input type="file" name="my_file"/> </p>
                }

            })
        }


        return (
            <div className="nameTable">
                { updateElem }
                <button type="submit">submit</button>
                <input onClick={this.handleClick()}  type="submit" value="Cancel"/>
            </div>
        )
    }

}

export default UpdateTome;