import ReactDOM from 'react-dom/client'
import App from './App'
import English from './components/English'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/english' element={<English />} />
      </Routes>
    </BrowserRouter>
  </>
)
