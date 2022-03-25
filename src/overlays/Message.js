import { GrClose } from 'react-icons/gr'

export const Message = ({ setShowMessage }) => {
  const handleClick = () => {
    setShowMessage(false)
  }

  return (
    <div className='messageWrapper' onClick={handleClick}>
      <div className='messageText' onClick={(e) => e.stopPropagation()}>
        <h2>A Message to the New York Times</h2>
        <p>
          Pretty please don't sue me for this clone of the game you just paid a
          lot of money for. I did this to show off my mad React skillz and I'm
          not making anything off of this. In fact, this app has cost me
          countless hours that would have been better spent playing The Legend
          of Zelda. Let's call it even.
        </p>
        <p>Also, Walter Duranty was a Stalinist stooge. Support Ukraine.</p>
        <div style={{ textAlign: 'right', fontSize: '24px' }}>
          <GrClose onClick={handleClick} />
        </div>
      </div>
    </div>
  )
}
