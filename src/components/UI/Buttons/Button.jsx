import React from 'react'
import "./style/Button.css"

function Button({icon, text}) {
  return (
	<div className='home__button'>
      <div className="home__button-icon" style={{ backgroundImage: `url(${icon})` }}></div>
		<div className="home__button-text">{text}</div>
	</div>
  )
}

export default Button;