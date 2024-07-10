import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './pages/components/Navbar'
import './assets/style.css'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

axios.defaults.withCredentials = true

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="root-layout">
      <Navbar />
      <main>
        <Outlet />
        <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition: Bounce/>
      </main>
    </div>
  )
}

export default App
