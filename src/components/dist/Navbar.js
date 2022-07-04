"use strict";
exports.__esModule = true;
var react_1 = require("react");
var english_png_1 = require("../imgs/english.png");
var polish_png_1 = require("../imgs/polish.png");
var Navbar = function () {
    return (react_1["default"].createElement("div", { className: 'navbar' },
        react_1["default"].createElement("a", { href: "/" },
            react_1["default"].createElement("img", { src: polish_png_1["default"], width: "25px" })),
        react_1["default"].createElement("a", { href: "/english" },
            react_1["default"].createElement("img", { src: english_png_1["default"], width: "25px" }))));
};
exports["default"] = Navbar;
