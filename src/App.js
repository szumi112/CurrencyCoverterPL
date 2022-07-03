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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var react_1 = require("react");
var axios_1 = require("axios");
var react_select_1 = require("react-select");
var useLocalStorage_1 = require("./Hooks/useLocalStorage");
var App = function () {
    var _a, _b, _c;
    var _d = (0, react_1.useState)(""), data = _d[0], setData = _d[1];
    var _e = (0, react_1.useState)(""), currOne = _e[0], setCurrOne = _e[1];
    var _f = (0, react_1.useState)(""), currTwo = _f[0], setCurrTwo = _f[1];
    var _g = (0, react_1.useState)(), currencyList = _g[0], setCurrencyList = _g[1];
    var _h = (0, react_1.useState)(1), fromTo = _h[0], setFromTo = _h[1];
    var _j = (0, react_1.useState)(""), value = _j[0], setValue = _j[1];
    var _k = (0, useLocalStorage_1["default"])('history', [{
            data: '',
            przed: '',
            po: '',
            currencyOne: '',
            currencyTwo: ''
        }]), history = _k[0], setHistory = _k[1];
    var _l = (0, react_1.useState)(true), showHistory = _l[0], setShowHistory = _l[1];
    var apiKey = "1aea4f1fb98499f68b28"; // "d326fa1380d4a7f40612" // "1aea4f1fb98499f68b28"
    var apiUrl = "https://free.currconv.com/api/v7/convert?q=".concat(currOne.label, "_").concat(currTwo.label, "&compact=ultra&apiKey=").concat(apiKey);
    var listOfCurrencies = "https://free.currconv.com/api/v7/currencies?apiKey=".concat(apiKey);
    // styles for react-select input field
    var styles = {
        option: function (provided, state) { return (__assign(__assign({}, provided), { fontWeight: state.isSelected ? "normal" : "normal", paddingTop: '10px !important', color: '#335566', backgroundColor: 'white', fontSize: '1rem', height: '45px', textAlign: 'center', "&:hover": {
                backgroundColor: 'rgba(72,94,121,0.05)'
            } })); },
        singleValue: function (provided, state) { return (__assign(__assign({}, provided), { color: '#335566', fontSize: '1rem' })); }
    };
    // fetch data from API if values of currency one/two change
    (0, react_1.useEffect)(function () {
        axios_1["default"].get(apiUrl)
            .then(function (res) {
            setData(res.data);
        })["catch"](function (error) {
            return error;
        });
    }, [currOne, currTwo]);
    // fetch list of currencies
    (0, react_1.useEffect)(function () {
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
        setHistory(__spreadArray(__spreadArray([], history, true), [{
                data: new Date().toISOString().slice(0, 10),
                przed: fromTo,
                po: valueToSave,
                currencyOne: currOne.label,
                currencyTwo: currTwo.label
            }], false));
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
    return (<div className="App">
      <h1 className='bold'>Konwerter  Walut </h1>
      {/* {currOne.label && currTwo.label && data.replace('"', "").replace('"', " ").replace('{', " ").replace('}', "")} */}
      <div className="convertRow">
        <div>
            <p className='bold'> Przelicz z</p>
            <react_select_1["default"] className="select" styles={styles} options={currObj} onChange={setCurrOne}></react_select_1["default"]>
        </div>
        <div className='exchange' onClick={changeCurr}>
          ⮂
        </div>
        <div>
          <p className='bold'>Przelicz na</p>
          <react_select_1["default"] className="select" styles={styles} options={currObjTwo} onChange={setCurrTwo}></react_select_1["default"]>
        </div>
        <div className='kwota'>
          <p className='bold'>Kwota</p>
          <input type="number" className='inputOne' placeholder='wpisz kwotę' onChange={function (e) { return setFromTo(e.target.value); }} onKeyPress={function (ev) {
            if (ev.key === "Enter") {
                handleAddToHistory(ev.preventDefault());
            }
        }}/> 
          <p className='currOne'>{currOne.label}</p>
        </div>
        <div className='wynik'>
          <p className='bold'>Wynik</p>
          <input readOnly={true} className='inputTwo' value={value !== 'NaN' ? value : null}/> 
          <p className='currTwo'>{currTwo.label}</p>
        </div>
      
      </div>
      <div className='btns'>
        <button className='historiaBtn' onClick={function () { return setShowHistory(!showHistory); }}> Historia </button>
        <button className='konwertujBtn' onClick={handleAddToHistory}> Konwertuj </button>
      </div>
      {showHistory && ((_a = history[1]) === null || _a === void 0 ? void 0 : _a.data) !== undefined ? (<>
        
      <div className='hist'>
        <p className='bold data'>Data</p>
        <p className='bold przed'>Przed konwersją</p>
        <p className='bold po'>Po konwersji</p>
      </div> 

      <hr></hr>
      </>) : null}
      
      
      <div className="historiaSize">
        {history.map(function (entry, i) {
            return ((showHistory && entry.po && entry.po !== 'NaN' ? (<>
              <div className='histMap' key={i}>
                <p className='data'>{entry.data}</p>
                <p className='przed'>{entry.przed} {entry.currencyOne}</p>
                <p className='fatArrow'>➞</p>
                <p className='bold po'>{entry.po} {entry.currencyTwo}</p>
              </div>
              <hr></hr>
              </>) : null));
        }).reverse()}
        
        {showHistory && ((_b = history[1]) === null || _b === void 0 ? void 0 : _b.data) === undefined ? <p> Brak historii konwersji</p> : <p></p>}

      </div>
      {showHistory && ((_c = history[1]) === null || _c === void 0 ? void 0 : _c.data) !== undefined &&
            <button className='wyczyscBtn' onClick={restartApp}> Wyczyść historię</button>}
    </div>);
};
exports["default"] = App;
