import {useState, useEffect, useRef} from 'react'
import {Square} from './Square'
import { useGlobalContext } from './Context'

export const Row = ({boxes, order}) => {

    const [rowBoxes, setRowBoxes] = useState(boxes)

    const {currentRow, setCurrentRow} = useGlobalContext()

    const rowBoxesRef = useRef(rowBoxes)

    const rowBoxesLen = rowBoxes.length

    const rowBoxesLenRef = useRef(0)

    useEffect(() => {
      console.log(rowBoxes)
      window.addEventListener('keyup', e => handleClick(e))

      return () => window.removeEventListener('keyup', e => handleClick(e))
    }, [])

    const handleClick = e => {
      if(currentRow === order){
        if(e.key.match(/^[a-zA-Z]$/)){
          console.log('click')
          rowBoxesRef.current = rowBoxesRef.current.map((x, i) => i === rowBoxesLenRef ? {...x, letter:'A'} : x)
          setRowBoxes(rowBoxesRef.current)
          console.log(rowBoxesRef.current)

        }
        // else if(e.key === 'Backspace' && rowLength.length > 0){
        //   rowBoxesRef.current[rowLength.length - 1].letter = '
        //   setRowBoxes(rowBoxesRef.current)
        // }
        // else if(e.key === 'Enter'){
        //   currentRowRef.current++
        //   setCurrentRow(currentRowRef.current)
        // }
      }
      }

    return (
        <div className='row'>
        {rowBoxes.map((x, i) => <Square letter={x.letter} status={x.status} key={i} />)}
        </div>
    )
}