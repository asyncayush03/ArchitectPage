import { useState } from 'react'
import Navbar from './components/common/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Navbar/>
  )
}

export default App
