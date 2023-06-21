import AdmForm from './components/AdmForm/AdmForm.jsx'
import UserForm from './components/UserForm/UserForm.jsx'
import ScoreForm from './components/ScoreForm/ScoreForm.jsx'
import axios from 'axios'
import { Button } from '@chakra-ui/react'

function App() {

  const resetBet = async() => {
    try {
      const response = await axios.delete("https://expressjs-server-production-085c.up.railway.app/adm");
    } catch (error) {
      console.error('error', error);
    }
  }

  const displayResult = async() => {
    try {
      const response = await axios.put("https://expressjs-server-production-085c.up.railway.app/result/true");
    } catch (error) {
      console.error('error', error);
    }
  }

  const removeResult = async() => {
    try {
      const response = await axios.put("https://expressjs-server-production-085c.up.railway.app/result/false");
    } catch (error) {
      console.error('error', error);
    }
  }

  return (
    <>
    <Button onClick={displayResult}>
      Exibir resultado
    </Button>
    <Button onClick={removeResult}>
      Ocultar resultado
    </Button>
    <Button onClick={resetBet}>
      Resetar Bolão
      </Button>
      <AdmForm/>
      <ScoreForm/>
      <UserForm/>
    </>
  )
}

export default App
