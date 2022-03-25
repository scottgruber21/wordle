import { useGlobalContext } from '../Context'

export const WinOrLose = ({ status, wins, losses }) => {
  const { secretWord, restart } = useGlobalContext()

  if (status === 'win') {
    localStorage.setItem('wins', Number(wins) + 1)
    return (
      <div className='messageWrapper'>
        <div className='messageText'>
          <h2>Congratulations, you won!</h2>
          <p>
            <strong>Total wins: </strong>
            {localStorage.getItem('wins')}
          </p>
          <p>
            <strong>Total losses: </strong>
            {localStorage.getItem('losses')}
          </p>
          <div className='playAgain' onClick={restart}>
            Play Again
          </div>
        </div>
      </div>
    )
  }

  localStorage.setItem('losses', Number(losses) + 1)
  return (
    <div className='messageWrapper'>
      <div className='messageText'>
        <h2>Sorry, you lose!</h2>
        <p>
          <strong>The word was {secretWord}</strong>
        </p>
        <p>
          <strong>Total wins: </strong>
          {localStorage.getItem('wins')}
        </p>
        <p>
          <strong>Total losses: </strong>
          {localStorage.getItem('losses')}
        </p>
        <div className='playAgain' onClick={restart}>
          Play Again
        </div>
      </div>
    </div>
  )
}
