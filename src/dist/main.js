"use strict";
exports.__esModule = true;
var client_1 = require("react-dom/client");
var App_1 = require("./App");
var English_1 = require("./components/English");
var react_router_dom_1 = require("react-router-dom");
var Navbar_1 = require("./components/Navbar");
client_1["default"].createRoot(document.getElementById('root')).render(React.createElement(React.Fragment, null,
    React.createElement(Navbar_1["default"], null),
    React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(react_router_dom_1.Routes, null,
            React.createElement(react_router_dom_1.Route, { path: "/", element: React.createElement(App_1["default"], null) }),
            React.createElement(react_router_dom_1.Route, { path: "/english", element: React.createElement(English_1["default"], null) })))));
