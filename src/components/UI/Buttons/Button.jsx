import React from 'react'
import "./style/Button.css"

function Button({icon, text, onClick }) {
  return (
	<div className='home__button' onClick={onClick}>
      <div className="home__button-icon" style={{ backgroundImage: `url(${icon})` }}></div>
		<div className="home__button-text">{text}</div>
	</div>
  )
}

export default Button;