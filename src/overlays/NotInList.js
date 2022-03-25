import React, { useEffect } from 'react'
import { useGlobalContext } from '../Context'

export const NotInList = () => {
  const { setNotInList } = useGlobalContext()

  useEffect(() => {
    setTimeout(() => setNotInList(false), 1000)
    return () => clearTimeout(() => setNotInList(false), 1000)
  }, [])

  return (
    <div className='messageWrapper'>
      <div className='messageText'>
        <h2>Not in word list</h2>
      </div>
    </div>
  )
}
