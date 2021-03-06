import { useState, useMemo, useEffect, FC } from 'react'
import axios from 'axios'
import Select from 'react-select'
import useLocalStorage from '../Hooks/useLocalStorage'

interface history {
  data: string
  przed: string | number | undefined
  po: string | number | undefined
  currencyOne: string
  currencyTwo: string
}

const English: React.FC = () => {
  const [data, setData] = useState<string>('')
  const [currOne, setCurrOne] = useState<any>('')
  const [currTwo, setCurrTwo] = useState<any>('')
  const [currencyList, setCurrencyList] = useState<any>()
  const [fromTo, setFromTo] = useState<number | any>(1)
  const [value, setValue] = useState<any>('')
  const [history, setHistory] = useLocalStorage('history', [
    {
      data: '',
      przed: '',
      po: '',
      currencyOne: '',
      currencyTwo: ''
    }
  ])

  const [showHistory, setShowHistory] = useState<boolean>(true)
  const apiKey: string = '1aea4f1fb98499f68b28' // "d326fa1380d4a7f40612" // "1aea4f1fb98499f68b28"
  const apiUrl: string = `https://free.currconv.com/api/v7/convert?q=${currOne.label}_${currTwo.label}&compact=ultra&apiKey=${apiKey}`
  const listOfCurrencies: string = `https://free.currconv.com/api/v7/currencies?apiKey=${apiKey}`

  // styles for react-select input field
  const styles = {
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.isSelected ? 'normal' : 'normal',
      paddingTop: '10px !important',
      color: '#335566',
      backgroundColor: 'white',
      fontSize: '1rem',
      height: '45px',
      textAlign: 'center',
      '&:hover': {
        backgroundColor: 'rgba(72,94,121,0.05)'
      }
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#335566',
      fontSize: '1rem'
    })
  }

  // fetch data from API if values of currency one/two change
  useEffect(() => {
    axios
      .get(apiUrl)
      .then(res => {
        setData(res.data)
      })
      .catch(error => {
        return error
      })
  }, [currOne, currTwo])

  // fetch list of currencies
  useEffect(() => {
    axios
      .get(listOfCurrencies)
      .then(res => {
        setCurrencyList(res.data.results)
      })
      .catch(error => {
        return error
      })
  }, [])

  // store currencies in consts
  const currObj =
    currencyList && Object.keys(currencyList).map(x => ({ label: x }))
  const currObjTwo =
    currencyList && Object.keys(currencyList).map(x => ({ label: x }))

  // add to history and convert result with setValue
  const handleAddToHistory = e => {
    const valueToSave = (
      parseFloat(Object.values(data).join()) * fromTo
    ).toFixed(2)
    setValue(valueToSave)

    setHistory([
      ...history,
      {
        data: new Date().toISOString().slice(0, 10),
        przed: fromTo,
        po: valueToSave,
        currencyOne: currOne.label,
        currencyTwo: currTwo.label
      }
    ])
  }

  const restartApp = () => {
    setHistory([
      {
        data: '',
        przed: '',
        po: '',
        currencyOne: '',
        currencyTwo: ''
      }
    ])
    setShowHistory(!showHistory)
  }

  const changeCurr = () => {
    setCurrOne(currTwo)
    setCurrTwo(currOne)
  }

  const keyPressFunction = e => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault()
    }
    if (e.key === 'Enter') {
      handleAddToHistory(e.preventDefault())
    }
  }

  return (
    <div className='App'>
      <h1 className='bold'>Currency Converter</h1>
      <div className='convertRow'>
        <div>
          <p className='bold'>From</p>
          <Select
            className='select'
            styles={styles}
            options={currObj}
            onChange={setCurrOne}
          ></Select>
        </div>
        <div className='exchange' onClick={changeCurr}>
          ???
        </div>
        <div>
          <p className='bold'>To</p>
          <Select
            className='select'
            styles={styles}
            options={currObjTwo}
            onChange={setCurrTwo}
          ></Select>
        </div>
        <div className='kwota'>
          <p className='bold'>Amount</p>
          <input
            type='number'
            onKeyPress={e => keyPressFunction(e)}
            className='inputOne'
            placeholder='enter amount'
            onChange={e => setFromTo(e.target.value)}
          />
          <p className='currOne'>{currOne.label}</p>
        </div>
        <div className='wynik'>
          <p className='bold'>Result</p>
          <input
            readOnly={true}
            className='inputTwo'
            value={value !== 'NaN' ? value : null}
          />
          <p className='currTwo'>{currTwo.label}</p>
        </div>
      </div>
      <div className='btns'>
        <button
          className='historiaBtn'
          onClick={() => setShowHistory(!showHistory)}
        >
          {' '}
          History{' '}
        </button>
        <button className='konwertujBtn' onClick={handleAddToHistory}>
          {' '}
          Convert{' '}
        </button>
      </div>
      {showHistory && history[1]?.data !== undefined ? (
        <>
          <div className='hist'>
            <p className='bold data'>Date</p>
            <p className='bold przed'>Before conversion</p>
            <p className='bold po'>After conv.</p>
          </div>

          <hr></hr>
        </>
      ) : null}

      <div className='historiaSize'>
        {history
          .map((entry, i) => {
            return showHistory && entry.po && entry.po !== 'NaN' ? (
              <>
                <div className='histMap' key={i}>
                  <p className='data'>{entry.data}</p>
                  <p className='przed przedResponsive'>
                    {entry.przed} {entry.currencyOne}
                  </p>
                  <p className='fatArrow'>???</p>
                  <p className='bold po'>
                    {entry.po} {entry.currencyTwo}
                  </p>
                </div>
                <hr></hr>
              </>
            ) : null
          })
          .reverse()}

        {showHistory && history[1]?.data === undefined ? (
          <p className='brak'> No history of conversions</p>
        ) : (
          <p></p>
        )}
      </div>
      {showHistory && history[1]?.data !== undefined && (
        <button className='wyczyscBtn' onClick={restartApp}>
          {' '}
          Clear history
        </button>
      )}
    </div>
  )
}

export default English
