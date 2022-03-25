import React, {useState, useEffect, useRef} from 'react'
import { useGlobalContext } from './Context'

export const Test = () => {

    const [line, setLine] = useState(['', '', '', '', ''])
    const [count, setCount] = useState(0)

    const handleKey = e => {
        console.log('test')
        helper(e)
    }

    const helper = e => {
        const newLine = line.map((x, i) => i === count ? e.key.tpUpperCase() : x)
        setLine(newLine)
        setCount(x => x + 1)
    }
 

    return <h1 tabIndex="0" onKeyUp={e => handleKey(e)}>{line.join('')}</h1>
}
