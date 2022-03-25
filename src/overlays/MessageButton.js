export const MessageButton = ({ setShowMessage }) => {
  const handleClick = () => {
    setShowMessage(true)
  }

  return (
    <div className='messageButton' onClick={handleClick}>
      A message to the
      <br />
      New York Times
    </div>
  )
}
