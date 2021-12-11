import React from 'react';
import Update from "./Update";


class UpdateAccount extends Update {


    render() {

        return (
            <div className="nameTable">
                <form className="form">
                    <label>Login : </label> <input defaultValue={this.state.rows[`login`]}/>
                    <label>Password : </label> <input defaultValue={this.state.rows[`pswd`]}/>
                    <label>Email : </label> <input defaultValue={this.state.rows[`email`]}/>
                    <label>Birthdate : </label> <input type="date" defaultValue={this.state.rows[`birthdate`]}/>
                    <label>phone : </label> <input defaultValue={this.state.rows[`phone`]}/>
                    <label>Profile picture : </label> <input type="file" defaultValue={this.state.rows[`profile_picture`]}/>
                    <label>Admin : </label> <input type="checkbox" checked={this.state.rows[`is_admin`]}/>
                    <button type="submit">submit</button>
                    <input  type="submit" value="Cancel"/>
                </form>
            </div>
        )
    }

}

export default UpdateAccount;