import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './pages/components/Navbar'
import './assets/style.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="root-layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
