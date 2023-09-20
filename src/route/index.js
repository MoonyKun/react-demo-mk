import React, {Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/login/login";
import App from "../App";
import Index from "../pages/index";
import EmpList from "../pages/emplist/emplist";
import Home from "../pages/Home/home";

class Router extends Component {
    render () {
        return (
            <BrowserRouter>
                <App>
                    <Routes>
                        <Route exact path = "/" element = {<Login />}></Route>
                        <Route path = "/index" element = {<Index />}>
                            <Route path = "/index" element = {<Home />}></Route>
                            <Route path="/index/emplist" element = {<EmpList />}></Route>
                        </Route>
                    </Routes>
                </App>
            </BrowserRouter>    
        )
    }
}
export default Router