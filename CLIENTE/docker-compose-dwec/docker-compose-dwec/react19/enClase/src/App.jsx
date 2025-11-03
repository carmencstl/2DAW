import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Nav />
      <Main />
      <Footer />
    </>
  )
}

export default App
