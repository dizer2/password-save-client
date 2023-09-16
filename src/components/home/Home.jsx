import React, { useEffect, useState } from 'react';
import "./style/Home.css"
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Buttons/Button';

function Home({ thisLogin, setThisLogin }) {

	const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [buttons, setButtons] = useState([
    {
      id: 0,
      iconUrl: 'https://i.ibb.co/2FL1tsB/Document-Add.png',
      text: 'Sort by date'
    },
    {
      id: 1,
      iconUrl: 'https://i.ibb.co/3djKKDT/List.png',
      text: 'Add new'
    },

  ]);


  async function fetchData() {
    try {
      const response = await fetch(`http://localhost:5000/get-user?login=${thisLogin}`);

      if (!response.ok) {
        window.location.reload();
        throw new Error(`HTTP error! Status: ${response.status}`);

      }

      const result = await response.json();
			localStorage.setItem("PASSWORD-USER", JSON.stringify(result.login));
      setData(result);

    } catch (error) {
      console.error("Error:", error);
      // navigate("/");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const hadleSupport = () => {
    window.open('https://github.com/dizer2');
  }

  const hadnleLogOut = () => {
    setThisLogin("");
    localStorage.removeItem("PASSWORD-USER");
    navigate("/");
    
  }

  return (
    <div className='home'>
      <div className="home__navigation">
        <div className="home__navigation-top">
          <div className="home__navigation-top-logo">
            <div className="home__icon"></div>
            <p className="home__logo">saveme</p>
          </div>

          <div className="home__navigation-top-menu">
            <div className="home__nav home__nav-active">
              <div className="home__nav-icon home__nav-icon1"></div>
              <p className="home__nav-text">Profil</p>
            </div>

            <div className="home__nav" onClick={hadleSupport}>
              <div className="home__nav-icon home__nav-icon2"></div>
              <p className="home__nav-text home__nav-defult">Support</p>
            </div>
          </div>
        </div>
        <div className="home__navigation-bottom">
          <div className="home__navigation-bottom-icon">

          </div>
          <p onClick={hadnleLogOut} className="home__navigation-bottom-text">Log out</p>
        </div>



      </div>
      <div className="home__container">
        <div className="home__container-top">
          <p className='home__container-top-title'>{data.login}</p>

          <div className="home__container-top-filter">
            <div className="home__search">
              <div className="home__search-icon"></div>
              <input className='home__search-input' type="text" placeholder='Search by name' />
            </div>
            {
              buttons.map((button) => (
                <Button key={button.id} icon={button.iconUrl} text={button.text} ></Button>
              ))
            }
          </div>

          <div className="home__container-top-password">Were found <span>5</span> password</div>

        </div>
        <div className="home__container-bottom">
            <div className="home__container-bottom-password">
              <div className="password__info">
                <div className="password__info-photo"></div>
                <div className="password__info-text">
                  <p className='password__title'>Up Word</p>
                  <div className="password__main">
                    <p>sdfa5353</p>
                  </div>
                </div>
              </div>
              <div className="password__changes">
                <p className='password__changes-date'>18.07 2023</p>
                <div className="password__changes-box">
                  <div className="change__button change__button-copy">
                    <div className="change__button-img change__button-copys"></div>
                  </div>

                  <div className="change__button change__button-eyes">
                    <div className="change__button-img change__button-oEyes"></div>
                  </div>

                  <div className="change__button change__button-remove">
                    <div className="change__button-img change__button-trash"></div>
                  </div>

                </div>
              </div>
            </div>

            <div className="home__container-bottom-password">
              <div className="password__info">
                <div className="password__info-photo"></div>
                <div className="password__info-text">
                  <p className='password__title'>Up Word</p>
                  <div className="password__main">
                    <p>sdfa5353</p>
                  </div>
                </div>
              </div>
              <div className="password__changes">
                <p className='password__changes-date'>18.07 2023</p>
                <div className="password__changes-box">
                  <div className="change__button change__button-copy">
                    <div className="change__button-img change__button-copys"></div>
                  </div>

                  <div className="change__button change__button-eyes">
                    <div className="change__button-img change__button-oEyes"></div>
                  </div>

                  <div className="change__button change__button-remove">
                    <div className="change__button-img change__button-trash"></div>
                  </div>

                </div>
              </div>
            </div>

            <div className="home__container-bottom-password">
              <div className="password__info">
                <div className="password__info-photo"></div>
                <div className="password__info-text">
                  <p className='password__title'>Up Word</p>
                  <div className="password__main">
                    <p>sdfa5353</p>
                  </div>
                </div>
              </div>
              <div className="password__changes">
                <p className='password__changes-date'>18.07 2023</p>
                <div className="password__changes-box">
                  <div className="change__button change__button-copy">
                    <div className="change__button-img change__button-copys"></div>
                  </div>

                  <div className="change__button change__button-eyes">
                    <div className="change__button-img change__button-oEyes"></div>
                  </div>

                  <div className="change__button change__button-remove">
                    <div className="change__button-img change__button-trash"></div>
                  </div>

                </div>
              </div>
            </div>


            <div className="home__container-bottom-password">
              <div className="password__info">
                <div className="password__info-photo"></div>
                <div className="password__info-text">
                  <p className='password__title'>Up Word</p>
                  <div className="password__main">
                    <p>sdfa5353</p>
                  </div>
                </div>
              </div>
              <div className="password__changes">
                <p className='password__changes-date'>18.07 2023</p>
                <div className="password__changes-box">
                  <div className="change__button change__button-copy">
                    <div className="change__button-img change__button-copys"></div>
                  </div>

                  <div className="change__button change__button-eyes">
                    <div className="change__button-img change__button-cEyes"></div>
                  </div>

                  <div className="change__button change__button-remove">
                    <div className="change__button-img change__button-trash"></div>
                  </div>

                </div>
              </div>
            </div>

            <div className="home__container-bottom-password">
              <div className="password__info">
                <div className="password__info-photo"></div>
                <div className="password__info-text">
                  <p className='password__title'>Up Word</p>
                  <div className="password__main">
                    <p>sdfa5353</p>
                  </div>
                </div>
              </div>
              <div className="password__changes">
                <p className='password__changes-date'>18.07 2023</p>
                <div className="password__changes-box">
                  <div className="change__button change__button-copy">
                    <div className="change__button-img change__button-copys"></div>
                  </div>

                  <div className="change__button change__button-eyes">
                    <div className="change__button-img change__button-oEyes"></div>
                  </div>

                  <div className="change__button change__button-remove">
                    <div className="change__button-img change__button-trash"></div>
                  </div>

                </div>
              </div>
            </div>



        </div>


      </div>
    </div>
  );
}

export default Home;
