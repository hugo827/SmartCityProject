import React from 'react';


class Home extends React.Component {


    render() {

        return (
            <div className="home">
                <p>Welcome</p>
                <p>{ localStorage.getItem("admin") }</p>
            </div>
        )
    }
}


export default Home;


