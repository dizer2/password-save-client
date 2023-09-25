import React, { useEffect, useState } from 'react';
import "./style/Form.css";
import { useNavigate } from 'react-router-dom';

function Form({ setThisLogin, setThisPassword, setData }) {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [loginName, setLoginName] = useState("Login");
    const [passwordName, setPasswordName] = useState("Password");
    const [loginNameColor, setLoginNameColor] = useState("white"); 
    const [passwordNameColor, setPasswordNameColor] = useState("white"); 
    const [loginOpen, setLoginOpen] = useState(false); 

    const navigate = useNavigate();
    
    useEffect(() => {
      if ("LOGIN-USER" in localStorage) {
        navigate("/home");
      }
    }, [navigate]);
   

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (login.length < 6) {
            setLoginName("Short login");
            setLoginNameColor("#FF4794");
        } else {
            setLoginName("Login");
            setLoginNameColor("white");
        }

        if (password.length < 6) {
            setPasswordName("Short password");
            setPasswordNameColor("#FF4794"); 
        } else {
            setPasswordName("Password");
            setPasswordNameColor("white"); 
        }

        if (login.length >= 6 && password.length >= 8) {

            try {
              let result = await fetch(
                'https://saveme-password.onrender.com/register', {
                  method: "post",
                  body: JSON.stringify({ login, password }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
        
              result = await result.json();
              console.log(result);
              console.log('USERS: ' + result.login);
              console.log('USERS: ' + result.password);
              setThisLogin(result.login);
              setThisPassword(result.password);
              console.warn(result);
              if (result.error && result.error === 'User with this login already exists') {
                console.log("This login exists");
                setLoginName("This login exists");
                setLoginNameColor("#FF4794");
              } else {
                setLogin("");
                setPassword("");
                navigate("/home");
              }
            } catch (error) {
              console.error("Error:", error);
        
            }
          }
        }

    const handleLogin = () => {
        setLoginOpen(!loginOpen); 
    }

    const handleOnSubmitLogin = async (e) => {
        e.preventDefault();
        if (login.length < 6) {
            setLoginName("Short login");
            setLoginNameColor("#FF4794");
        } else {
            setLoginName("Login");
            setLoginNameColor("white");
        }

        if (password.length < 6) {
            setPasswordName("Short password");
            setPasswordNameColor("#FF4794"); 
        } else {
            setPasswordName("Password");
            setPasswordNameColor("white"); 
        }

        if (login.length >= 6 && password.length >= 8) {
            try {
              const response = await fetch(`https://saveme-password.onrender.com/get-user?login=${login}&password=${password}`);
            
              if (!response.ok) {
                window.location.reload();
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
            
              const result = await response.json();
              console.log(result);
              if (result) {
                localStorage.setItem("LOGIN-USER", JSON.stringify(result.login));
                localStorage.setItem("PASSWORD-USER", JSON.stringify(result.password));
                setLogin("");
                setPassword("");
                navigate("/home");
              }
            } catch (error) {
              console.error("Error:", error);
              // Handle errors as needed, e.g., display an error message or navigate to a different page
            }
          }

    }

  
    return (
        <div className="form">
            <div className="form__wallpaper"></div>
            <form className="form__menu">
                <div className="form__menu-title">Welcome👋</div>


                {loginOpen ? (
                    <div className="log in">
                         <div className="form__menu-box">
                        <p className='input__title' style={{ color: loginNameColor }}>{loginName}</p>
                        <input value={login} onChange={(e) => setLogin(e.target.value)} className='form__input' type="text" placeholder='Write your login' />
                    </div>
                    <div className="form__menu-box">
                        <p className='input__title' style={{ color: passwordNameColor }}>{passwordName}</p>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className='form__input' type="password" placeholder='Write your password' />
                    </div>
                    <div className="form__menu-buttons">
                        <button type="submit" onClick={handleOnSubmitLogin} className='form__button'>Log in</button>
                        <p className='form__login'>Don't have an account? <span onClick={handleLogin}>Sigth out</span></p>
                    </div>
                    </div>
                ) : (
                    <div className="sigth out">
                    <div className="form__menu-box">
                        <p className='input__title' style={{ color: loginNameColor }}>{loginName}</p>
                        <input value={login} onChange={(e) => setLogin(e.target.value)} className='form__input' type="text" placeholder='Write your login' />
                    </div>
                    <div className="form__menu-box">
                        <p className='input__title' style={{ color: passwordNameColor }}>{passwordName}</p>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className='form__input' type="password" placeholder='Write your password' />
                    </div>
                    <div className="form__menu-buttons">
                        <button type="submit" onClick={handleOnSubmit} className='form__button'>Create Account</button>
                        <p className='form__login'>Have an account? <span onClick={handleLogin}>Log in</span></p>
                    </div>
                    </div>
                )}
                

            </form>
        </div>
    )
}

export default Form;
