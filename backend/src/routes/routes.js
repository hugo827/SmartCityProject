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

    const [token, setToken ] = useState(sessionStorage.getItem("token")); // hook -> si valeur existant alors on met le token dans la variable token
    const [admin, setAdmin ] = useState(sessionStorage.getItem("admin"));

    if((!token && !admin)) {
        sessionStorage.clear(); // pas nécessaire.
        return <Login  setToken={setToken} setAdmin={setAdmin}/>
    }
    else {
               return(
                   <Router>
                       <NavBar/>
                       <Routes>
                           <Route path={"/:name"} element={<Page />} />
                           <Route path="/" element={<Home />} />
                           <Route path={"/update/:name/:id"} element={<Update />} />
                           <Route path={"/add/:name"} element={<Add />} />
                       </Routes>
                   </Router>
               );
    }

}

export default Way;