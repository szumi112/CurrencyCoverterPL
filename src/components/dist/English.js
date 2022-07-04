"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var axios_1 = require("axios");
var react_select_1 = require("react-select");
var useLocalStorage_1 = require("../Hooks/useLocalStorage");
var English = function () {
    var _a, _b, _c;
    var alphabets = [
        'a', 'b', 'c', 'd', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
        'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ];
    var _d = react_1.useState(""), data = _d[0], setData = _d[1];
    var _e = react_1.useState(""), currOne = _e[0], setCurrOne = _e[1];
    var _f = react_1.useState(""), currTwo = _f[0], setCurrTwo = _f[1];
    var _g = react_1.useState(), currencyList = _g[0], setCurrencyList = _g[1];
    var _h = react_1.useState(1), fromTo = _h[0], setFromTo = _h[1];
    var _j = react_1.useState(""), value = _j[0], setValue = _j[1];
    var _k = useLocalStorage_1["default"]('history', [{
            data: '',
            przed: '',
            po: '',
            currencyOne: '',
            currencyTwo: ''
        }]), history = _k[0], setHistory = _k[1];
    var _l = react_1.useState(true), showHistory = _l[0], setShowHistory = _l[1];
    var apiKey = "1aea4f1fb98499f68b28"; // "d326fa1380d4a7f40612" // "1aea4f1fb98499f68b28"
    var apiUrl = "https://free.currconv.com/api/v7/convert?q=" + currOne.label + "_" + currTwo.label + "&compact=ultra&apiKey=" + apiKey;
    var listOfCurrencies = "https://free.currconv.com/api/v7/currencies?apiKey=" + apiKey;
    // styles for react-select input field
    var styles = {
        option: function (provided, state) { return (__assign(__assign({}, provided), { fontWeight: state.isSelected ? "normal" : "normal", paddingTop: '10px !important', color: '#335566', backgroundColor: 'white', fontSize: '1rem', height: '45px', textAlign: 'center', "&:hover": {
                backgroundColor: 'rgba(72,94,121,0.05)'
            } })); },
        singleValue: function (provided, state) { return (__assign(__assign({}, provided), { color: '#335566', fontSize: '1rem' })); }
    };
    // fetch data from API if values of currency one/two change
    react_1.useEffect(function () {
        axios_1["default"].get(apiUrl)
            .then(function (res) {
            setData(res.data);
        })["catch"](function (error) {
            return error;
        });
    }, [currOne, currTwo]);
    // fetch list of currencies
    react_1.useEffect(function () {
        axios_1["default"].get(listOfCurrencies)
            .then(function (res) {
            setCurrencyList(res.data.results);
        })["catch"](function (error) {
            return error;
        });
    }, []);
    // store currencies in consts
    var currObj = currencyList && Object.keys(currencyList).map(function (x) { return ({ label: x }); });
    var currObjTwo = currencyList && Object.keys(currencyList).map(function (x) { return ({ label: x }); });
    // add to history and convert result with setValue
    var handleAddToHistory = function (e) {
        var valueToSave = (parseFloat(Object.values(data).join()) * fromTo).toFixed(2);
        setValue(valueToSave);
        setHistory(__spreadArrays(history, [{
                data: new Date().toISOString().slice(0, 10),
                przed: fromTo,
                po: valueToSave,
                currencyOne: currOne.label,
                currencyTwo: currTwo.label
            }]));
    };
    var restartApp = function () {
        setHistory([{
                data: '',
                przed: '',
                po: '',
                currencyOne: '',
                currencyTwo: ''
            }]);
        setShowHistory(!showHistory);
    };
    var changeCurr = function () {
        setCurrOne(currTwo);
        setCurrTwo(currOne);
    };
    return (React.createElement("div", { className: "App" },
        React.createElement("h1", { className: 'bold' }, "Currency Converter"),
        React.createElement("div", { className: "convertRow" },
            React.createElement("div", null,
                React.createElement("p", { className: 'bold' }, "From"),
                React.createElement(react_select_1["default"], { className: "select", styles: styles, options: currObj, onChange: setCurrOne })),
            React.createElement("div", { className: 'exchange', onClick: changeCurr }, "\u2B82"),
            React.createElement("div", null,
                React.createElement("p", { className: 'bold' }, "To"),
                React.createElement(react_select_1["default"], { className: "select", styles: styles, options: currObjTwo, onChange: setCurrTwo })),
            React.createElement("div", { className: 'kwota' },
                React.createElement("p", { className: 'bold' }, "Amount"),
                React.createElement("input", { type: "number", inputMode: 'numeric', className: 'inputOne', onChange: function (e) { return setFromTo(e.target.value); }, onKeyPress: function (ev) {
                        if (ev.key === "Enter") {
                            handleAddToHistory(ev.preventDefault());
                        }
                    } }),
                React.createElement("p", { className: 'currOne' }, currOne.label)),
            React.createElement("div", { className: 'wynik' },
                React.createElement("p", { className: 'bold' }, "Result"),
                React.createElement("input", { readOnly: true, className: 'inputTwo', value: value !== 'NaN' ? value : null }),
                React.createElement("p", { className: 'currTwo' }, currTwo.label))),
        React.createElement("div", { className: 'btns' },
            React.createElement("button", { className: 'historiaBtn', onClick: function () { return setShowHistory(!showHistory); } }, " History "),
            React.createElement("button", { className: 'konwertujBtn', onClick: handleAddToHistory }, " Convert ")),
        showHistory && ((_a = history[1]) === null || _a === void 0 ? void 0 : _a.data) !== undefined ? (React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'hist' },
                React.createElement("p", { className: 'bold data' }, "Date"),
                React.createElement("p", { className: 'bold przed' }, "Before conversion"),
                React.createElement("p", { className: 'bold po' }, "After conv.")),
            React.createElement("hr", null))) : null,
        React.createElement("div", { className: "historiaSize" },
            history.map(function (entry, i) {
                return ((showHistory && entry.po && entry.po !== 'NaN' ? (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: 'histMap', key: i },
                        React.createElement("p", { className: 'data' }, entry.data),
                        React.createElement("p", { className: 'przed przedResponsive' },
                            entry.przed,
                            " ",
                            entry.currencyOne),
                        React.createElement("p", { className: 'fatArrow' }, "\u279E"),
                        React.createElement("p", { className: 'bold po' },
                            entry.po,
                            " ",
                            entry.currencyTwo)),
                    React.createElement("hr", null))) : null));
            }).reverse(),
            showHistory && ((_b = history[1]) === null || _b === void 0 ? void 0 : _b.data) === undefined ? React.createElement("p", { className: 'brak' }, " Brak historii konwersji") : React.createElement("p", null)),
        showHistory && ((_c = history[1]) === null || _c === void 0 ? void 0 : _c.data) !== undefined &&
            React.createElement("button", { className: 'wyczyscBtn', onClick: restartApp }, " Wyczy\u015B\u0107 histori\u0119")));
};
exports["default"] = English;
