import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import {AUTHENTICATION} from './components/AUTH/AUTH'
import { ENTERTAINMENT } from './components/APP/ENTERTAINMENT';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<AUTHENTICATION />} />
          <Route path="/entertainment" element={<ENTERTAINMENT />} />
          <Route path="/login" element={<AUTHENTICATION />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
