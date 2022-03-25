import { useState, useEffect, useRef } from 'react'
import './App.css'
import { useGlobalContext } from './Context'
import { Square } from './Square'
import { GAMEBOARD } from './gameboard'
import { wordlist } from './wordlist'
import { Keyboard } from './Keyboard'
import { MessageButton } from './overlays/MessageButton'
import { Message } from './overlays/Message'
import { NotInList } from './overlays/NotInList'
import { WinOrLose } from './overlays/WinOrLose'
import { usedLettersArray } from './usedLettersArray'

function App() {
  const {
    notInList,
    setNotInList,
    rowWord,
    setRowWord,
    enterLetter,
    goBack,
    handleEnter,
    gameStatus,
    setGameStatus,
    secretWord,
    setSecretWord,
    board,
    setBoard,
    currentRow,
    setCurrentRow,
    currentSquare,
    setCurrentSquare,
    setUsedLetters,
  } = useGlobalContext()

  const [showMessage, setShowMessage] = useState(false)

  const AppRef = useRef()

  const wins = localStorage.getItem('wins') || 0
  const losses = localStorage.getItem('losses') || 0

  useEffect(() => {
    setSecretWord(
      wordlist[Math.floor(Math.random() * wordlist.length)].toUpperCase()
    )
    setBoard(GAMEBOARD)
  }, [])

  useEffect(() => {
    AppRef.current.focus()
  }, [])

  useEffect(() => {
    if (gameStatus === 'win') {
      localStorage.setItem('wins', Number(wins) + 1)
    }

    if (gameStatus === 'lose') {
      localStorage.setItem('losses', Number(losses) + 1)
    }
  }, [gameStatus])

  const handleClick = (e) => {
    if (e.key.match(/^[a-zA-Z]$/) && currentSquare <= 4) {
      enterLetter(e.key.toUpperCase())
    }
    if (e.key === 'Backspace' && currentSquare > 0) {
      goBack()
    }
    if (e.key === 'Enter') {
      handleEnter()
    }
  }

  if (!gameStatus && currentRow >= 6) {
    setGameStatus('lose')
  }

  return (
    <>
      <MessageButton setShowMessage={setShowMessage} />
      {showMessage && <Message setShowMessage={setShowMessage} />}
      {notInList && <NotInList />}
      <div className='wrapper'>
        <h1>W@rpel</h1>
        <div
          className='App'
          tabIndex='0'
          onKeyUp={(e) => handleClick(e)}
          ref={AppRef}
        >
          {gameStatus === 'win' && (
            <WinOrLose status={'win'} wins={wins} losses={losses} />
          )}
          {gameStatus === 'lose' && (
            <WinOrLose status={'lose'} wins={wins} losses={losses} />
          )}
          <div className='container'>
            {board.map((x, i) => (
              <div className='row' key={i}>
                {x.map((y, j) => (
                  <Square
                    letter={y.letter}
                    status={y.status}
                    key={j}
                    onKeyUp={(e) => handleClick(e)}
                  />
                ))}
              </div>
            ))}
          </div>
          <Keyboard />
        </div>
      </div>
    </>
  )
}

export default App
