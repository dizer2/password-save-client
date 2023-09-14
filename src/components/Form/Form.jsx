import React, { useState } from 'react'
import "./style/Form.css"
import { useNavigate } from 'react-router-dom';

function Form({setThisLogin}) {

	const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
	const [savePassword, setSavePassword] = useState({});
	const navigate = useNavigate();


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
        'http://localhost:5000/register', {
            method: "post",
            body: JSON.stringify({ login, password, savePassword }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
		console.log('USERS: ' + result.login);
		setThisLogin(result.login);
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
            setLogin("");
            setPassword("");
			navigate("/home");
        }
    }
  return (
	
	<div className="form">
		<div className="form__wallpaper">

		</div>
		<form className="form__menu">
			<div className="form__menu-title">Welcome👋</div>
			<div className="form__menu-box">
				<p className='input__title'>Login</p>
				<input value={login} onChange={(e) => setLogin(e.target.value)}  className='form__input' type="text" placeholder='Write your login' />
			</div>
			<div className="form__menu-box">
				<p className='input__title'>Password</p>
				<input value={password} onChange={(e) => setPassword(e.target.value)} className='form__input' type="password" placeholder='Write your password' />
			</div>

			<div className="form__menu-buttons">
				<button type="submit" onClick={handleOnSubmit} className='form__button'>Create Account</button>
				<p className='form__login'>Have an account? <span>Log in</span></p>
			</div>
			
		</form>
	</div>
  )
}

export default Form;