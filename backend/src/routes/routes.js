import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import NavBar from '../component/NavBar';
import Home from '../pages/Home';
import Update from "./Update";
import Add from "./Add";
import Page from "./pages";
import Login from "../pages/Login";


function Way(){

    const [token, setToken ] = useState();
    const [admin, setAdmin ] = useState();

    if((!token && !admin)) {
        localStorage.clear();
        return <Login  setToken={setToken} setAdmin={setAdmin}/>
    }
    else {
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("admin", JSON.stringify(admin));

            return(
                <Router>
                    <NavBar></NavBar>
                    <Routes>
                        <Route path={"/:name"} element={<Page />} />
                        <Route path="/" element={<Home />} />
                        <Route path={"/update/:name:id"} element={<Update />} />
                        <Route path={"/add/:name"} element={<Add />} />
                    </Routes>
                </Router>
            );
    }

}

export default Way;