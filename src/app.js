import React from 'react'

const App = props => {
  const name = props.name ? props.name : 'No name'

  const onClick = () => {
    alert('it works!')
  }

  return (
    <>
    <h1>Hello, {name}!</h1>
    <p onClick={onClick}>If the app is correctly hydrated, clicking this paragraph will create an alert popup.</p>
    </>
  )
}

export default App
