
import { useState } from 'react'
import Navbar from './components/common/Navbar'
import ModernFooter from './components/common/ModernFooter';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <>
    
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<div>Home Page</div>} />
      <Route path='/contact' element = {<ContactPage/>}/>
    </Routes>
    <ModernFooter/>
    </BrowserRouter>
    

    </>
  )
    
}



export default App;
