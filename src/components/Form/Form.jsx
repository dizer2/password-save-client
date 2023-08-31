import React from 'react'
import "./style/Form.css"

function Form() {
  return (
	<div className="form">
		<div className="form__wallpaper">

		</div>
		<div className="form__menu">
			<div className="form__menu-title">Welcome👋</div>
			<div className="form__menu-box">
				<p className='input__title'>Login</p>
				<input className='form__input' type="text" placeholder='Write your login' />
			</div>
			<div className="form__menu-box">
				<p className='input__title'>Password</p>
				<input className='form__input' type="password" placeholder='Write your password' />
			</div>

			<div className="form__menu-buttons">
				<button className='form__button'>Create Account</button>
				<p className='form__login'>Have an account? <span>Log in</span></p>
			</div>
			
		</div>
	</div>
  )
}

export default Form;