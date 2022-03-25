import React, { useEffect } from 'react'
import { useGlobalContext } from './Context'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { AiOutlineEnter } from 'react-icons/ai'

export const Key = ({ letter }) => {
  const { enterLetter, goBack, handleEnter, currentSquare, usedLetters } =
    useGlobalContext()

  const handleClick = () => {
    if (letter.match(/^[a-zA-Z]$/) && currentSquare <= 4) {
      enterLetter(letter)
    }
    if (letter === 'Back' && currentSquare > 0) {
      goBack()
    }
    if (letter === 'Enter') {
      handleEnter()
    }
  }

  return (
    <div
      className={`key ${
        letter.match(/^[A-Z]$/) &&
        usedLetters[usedLetters.findIndex((x) => x.letter === letter)].status
      } ${(letter === 'Enter' || letter === 'Back') && 'large'}`}
      onClick={handleClick}
    >
      {letter === 'Back' ? (
        <RiDeleteBack2Line />
      ) : letter === 'Enter' ? (
        <AiOutlineEnter />
      ) : (
        letter
      )}
    </div>
  )
}
