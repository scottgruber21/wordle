import React, { useState, useContext, useRef } from 'react'
import { usedLettersArray } from './usedLettersArray'
import { wordlist } from './wordlist'
import { GAMEBOARD } from './gameboard'

const AppContext = React.createContext()

const Context = ({ children }) => {
  const [board, setBoard] = useState([])
  const [currentRow, setCurrentRow] = useState(0)
  const [currentSquare, setCurrentSquare] = useState(0)
  const [secretWord, setSecretWord] = useState('')
  const [gameStatus, setGameStatus] = useState('')
  const [usedLetters, setUsedLetters] = useState(usedLettersArray)
  const [notInList, setNotInList] = useState(false)

  const goBack = () => {
    const newBoard = board.map((x, i) =>
      x.map((y, j) =>
        i === currentRow && j === currentSquare - 1 ? { ...y, letter: '' } : y
      )
    )
    setBoard(newBoard)
    setCurrentSquare((prev) => prev - 1)
  }

  const enterLetter = (e) => {
    const newBoard = board.map((x, i) =>
      x.map((y, j) =>
        i === currentRow && j === currentSquare ? { ...y, letter: e } : y
      )
    )
    setBoard(newBoard)
    setCurrentSquare((prev) => prev + 1)
  }

  const findUsedLetter = (letter, status) => {
    const newUsedLetters = usedLetters.slice()
    const letterIndex = newUsedLetters.findIndex((x) => x.letter === letter)
    if (newUsedLetters[letterIndex].status === 'unknown') {
      newUsedLetters[letterIndex].status = status
      setUsedLetters(newUsedLetters)
    }
    if (
      newUsedLetters[letterIndex].status === 'found' &&
      status === 'correct'
    ) {
      newUsedLetters[letterIndex].status = 'correct'
      setUsedLetters(newUsedLetters)
    }
  }

  const handleEnter = () => {
    const finalWord = board[currentRow].map((x) => x.letter)
    const secretWordMap = secretWord.split('')

    if (currentSquare === 5 && currentRow <= 5) {
      if (!wordlist.includes(finalWord.join('').toLowerCase())) {
        const newBoard = board.map((x, i) =>
          x.map((y, j) => (i === currentRow ? { ...y, letter: '' } : y))
        )
        setBoard(newBoard)
        setCurrentSquare(0)
        setNotInList(true)
        return
      }
      if (finalWord.join('') === secretWord) {
        const newBoard = board.map((x, i) =>
          x.map((y, j) => (i === currentRow ? { ...y, status: 'correct' } : y))
        )
        setBoard(newBoard)
        setGameStatus('win')
      } else {
        for (let i in finalWord) {
          if (finalWord[i] && finalWord[i] === secretWordMap[i]) {
            // TODO: Identify right Letters
            findUsedLetter(finalWord[i], 'correct')
            const newBoard = board.slice()
            newBoard[currentRow][i] = {
              letter: finalWord[i],
              status: 'correct',
            }
            finalWord[i] = false
            secretWordMap[i] = false
          }
        }
        for (let i in finalWord) {
          if (
            finalWord[i] &&
            finalWord[i] !== secretWord[i] &&
            secretWordMap.includes(finalWord[i])
          ) {
            const letterIndex = secretWordMap.findIndex(
              (x) => x === finalWord[i]
            )
            findUsedLetter(finalWord[i], 'found')
            const newBoard = board.slice()
            newBoard[currentRow][i] = { letter: finalWord[i], status: 'found' }
            finalWord[i] = false
            secretWordMap[letterIndex] = false
          }
        }

        for (let i in finalWord) {
          if (finalWord[i] && !secretWordMap.includes(finalWord[i])) {
            //TODO: identify wrong letters
            findUsedLetter(finalWord[i], 'incorrect')
            const newBoard = board.slice()
            newBoard[currentRow][i] = {
              letter: finalWord[i],
              status: 'incorrect',
            }
            setBoard(newBoard)
          }
        }
        setCurrentRow((x) => x + 1)
        setCurrentSquare(0)
      }
    }
  }

  const restart = () => {
    setSecretWord(
      wordlist[Math.floor(Math.random() * wordlist.length)].toUpperCase()
    )
    setBoard(GAMEBOARD)
    setCurrentRow(0)
    setCurrentSquare(0)
    setGameStatus('')

    const newUsedLetters = usedLetters.map((x) => ({ ...x, status: 'unknown' }))

    setUsedLetters(newUsedLetters)
  }

  return (
    <AppContext.Provider
      value={{
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
        usedLetters,
        setUsedLetters,
        notInList,
        setNotInList,
        restart,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export { Context, useGlobalContext }
