import { useState } from 'react'
import './App.css'
import GameBoard from './components/GameBoard'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <main>
      <h1>Snake</h1>
      <GameBoard/>
      <div className="card">
        <button onClick={() => location.reload()}>
          New Game
        </button>
      </div>
    </main>
  )
}

export default App
