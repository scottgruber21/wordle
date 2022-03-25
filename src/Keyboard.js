import React from 'react'
import { keyboardLetters } from './keyboardLetters'
import { Key } from './Key'

export const Keyboard = () => {
  return (
    <div className='keyboard'>
      {keyboardLetters.map((x, i) => (
        <div className='keyboard-row' key={i}>
          {x.map((y, j) => (
            <Key letter={y} key={j} />
          ))}
        </div>
      ))}
    </div>
  )
}
