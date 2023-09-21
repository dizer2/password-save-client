import React, { useEffect, useState } from 'react';
import "./style/Home.css"
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Buttons/Button';

function Home({data, setData, thisLogin, setThisLogin, thisPassword, setThisPassword }) {

	const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [namePassword, setNamePassword] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");
  const [savePassword, setSavePassword] = useState([]);
  const [originalSavePassword, setOriginalSavePassword] = useState([]);
  const [popupTitle, setpPopupTitle] = useState("Add new password");
  const [popupTitleColor, setpPopupTitleColor] = useState("white"); 
  const [sortOrder, setSortOrder] = useState('desc'); 
  const [searchQuery, setSearchQuery] = useState('');


  

  const handlePopup = () => {
    setPopupOpen(!popupOpen);
  }

  

  async function fetchData() {
    if (!thisLogin) {
      window.location.reload();
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/get-user?login=${thisLogin}&password=${thisPassword}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      localStorage.setItem("LOGIN-USER", JSON.stringify(result.login));
      localStorage.setItem("PASSWORD-USER", JSON.stringify(result.password));
      setData(result);
      setSavePassword(result.savePassword || []);
      setOriginalSavePassword(result.savePassword || []);
      console.log(result);
      console.log(data);
      setIsLoading(true); 

    } catch (error) {
      console.error("Error:", error);
      setIsLoading(true); 
    }
  }
  

  useEffect(() => {
    fetchData();
  }, [thisLogin]);

  const hadleSupport = () => {
    window.open('https://github.com/dizer2');
  }

  const hadnleLogOut = () => {
    setThisLogin("");
    setThisPassword("");
    localStorage.removeItem("LOGIN-USER");
    localStorage.removeItem("PASSWORD-USER");
    navigate("/");
    
  }

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };


  const handleAddNewPassword = async () => {
    // Check if namePassword and originalPassword are not empty and don't exceed 18 characters
    if (
      namePassword && namePassword.length <= 18 &&
      originalPassword && originalPassword.length <= 18
    ) {
      // Check if an element with the same name already exists
      if (savePassword.some(item => item.name === namePassword)) {
        setpPopupTitle(`Password with name "${namePassword}" already exists.`);
        setpPopupTitleColor("#334155");
  
        setNamePassword("");
        setOriginalPassword("");
      } else {
        // Generate a unique ID
        const uniqueId = generateUniqueId();
  
        // Get the current date in the format "DD.MM YYYY"
        const currentDate = new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).replace(/\//g, '.');
  
        // Create a new password object with the name, password, ID, and date
        const newPassword = {
          id: uniqueId,
          name: namePassword,
          password: originalPassword,
          hidePassword: '*'.repeat(originalPassword.length),
          date: currentDate,
        };
        
        console.log(newPassword);
        try {
          // Make a POST request to add the new password to the database
          const response = await fetch('http://localhost:5000/add-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              login: thisLogin,
              password: thisPassword,
              newPassword,
            }),
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          // Get the updated user object with the new password
          const result = await response.json();
  
          // Update the savePassword state with the new user object
          setSavePassword(result.savePassword || []);
  
          // Also update the originalSavePassword array by adding the new password
          setOriginalSavePassword([...originalSavePassword, newPassword]);
  
          // Clear the input fields and close the popup
          setNamePassword("");
          setOriginalPassword("");
          setpPopupTitle(`Add new password`);
          setpPopupTitleColor("white");
          setPopupOpen(!popupOpen);
        } catch (error) {
          console.error("Error:", error);
          // Handle errors as needed
        }
      }
    } else {
      setpPopupTitle("Name and password should not be empty and should not exceed 18 characters.");
      setpPopupTitleColor("#334155");
    }
  };

  // Use useEffect to log the updated state after it's been updated
  useEffect(() => {
    console.log(savePassword);


  }, [savePassword]);

  const popupClass = popupOpen ? 'home__popup home__popup-open' : 'home__popup';

  const handleDeletePassword = async (id) => {
    try {
      // Send a DELETE request to the server to delete the password
      const response = await fetch(`http://localhost:5000/delete-password?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: thisLogin,
          password: thisPassword,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // If the deletion was successful on the server, update the state
      const updatedPasswords = savePassword.filter((password) => password.id !== id);
      setSavePassword(updatedPasswords);
  
      // Also update the originalSavePassword array
      const updatedOriginalPasswords = originalSavePassword.filter((password) => password.id !== id);
      setOriginalSavePassword(updatedOriginalPasswords);
    } catch (error) {
      console.error('Error:', error);
      // Handle errors as needed
    }
  };
  


  const hadleCopyPasswrod = (text) => {
    try {
      // Create a text area element to temporarily hold the text
      const textArea = document.createElement('textarea');
      textArea.value = text;
  
      // Append the text area to the document
      document.body.appendChild(textArea);
  
      // Select the text in the text area
      textArea.select();
  
      // Execute the copy command to copy the selected text to the clipboard
      document.execCommand('copy');
  
      // Remove the text area from the document
      document.body.removeChild(textArea);
  
      // You can provide user feedback that the text has been copied (e.g., show a tooltip)
      alert('Password copied to clipboard');
    } catch (error) {
      console.error('Error copying password:', error);
      // Handle errors as needed
    }
  };

  const handleShowPassword = (id) => {
    const updatedPasswords = savePassword.map((password) => {
      if (password.id === id) {
        return {
          ...password,
          showPassword: !password.showPassword,
        };
      }
      return password;
    });
    setSavePassword(updatedPasswords);
  };


  const handleSortByDate = () => {
    // Toggle sorting order
    const newSortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    setSortOrder(newSortOrder);

    const sortedPasswords = [...savePassword].sort((a, b) => {
      const dateA = new Date(a.date.split('.').reverse().join('-') + 'T00:00:00');
      const dateB = new Date(b.date.split('.').reverse().join('-') + 'T00:00:00');

      if (newSortOrder === 'asc') {
        return dateA - dateB; // Sort ascending (oldest to newest)
      } else {
        return dateB - dateA; // Sort descending (newest to oldest)
      }
    });

    setSavePassword([...sortedPasswords]); // Create a new array with sorted elements
  };



  const handleSearchByName = (e) => {
    // Get the current search query from the input field
    const query = e.target.value.toLowerCase();

    // Set the search query state
    setSearchQuery(query);

    // Filter passwords by name based on the search query
    const filteredPasswords = query === ""
      ? originalSavePassword // If query is empty, show all original passwords
      : originalSavePassword.filter((password) =>
          password.name.toLowerCase().includes(query)
        );

    // Update the savePassword state with the filtered passwords
    setSavePassword(filteredPasswords);
  };




  return (
    <div className='home'>

      <div className={popupClass}>
        
        <div className="home__popup-penguin"></div>
        <div className="home__popup-close" onClick={handlePopup}></div>
        <p className='home__popup-title' style={{color: popupTitleColor}}>{popupTitle}</p>
        <input onChange={(e) => setNamePassword(e.target.value)} className='home__popup-input' value={namePassword} type="text" placeholder='Write name item' />
        <input value={originalPassword} onChange={(e) => setOriginalPassword(e.target.value)} className='home__popup-input' type="text" placeholder='Write password' />
        <button onClick={handleAddNewPassword} className='home__popup-button'>Add</button>

      </div>

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

      {isLoading ? (
        <div className="home__container">
        <div className="home__container-top">
          <p className='home__container-top-title'>{data.login}</p>

          <div className="home__container-top-filter">
            <div className="home__search">
              <div className="home__search-icon"></div>
                <input
                  className="home__search-input"
                  type="text"
                  placeholder="Search by name"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearchByName(e);
                  }}                  
                />            
              </div>
            <Button id={0} onClick={handleSortByDate} icon='https://i.ibb.co/2FL1tsB/Document-Add.png' text="Sort by date"></Button>
            <Button id={1} onClick={handlePopup} icon='https://i.ibb.co/3djKKDT/List.png' text="Add new"></Button>
          </div>

          <div className="home__container-top-password">Were found <span>{savePassword.length}</span> password</div>

        </div>
        <div className="home__container-bottom">
        {savePassword.map((password) => (
          <div className="home__container-bottom-password" id={password.id} key={password.id}>
              <div className="password__info">
                <div className="password__info-photo"></div>
                <div className="password__info-text">
                  <p className="password__title">{password.name}</p>
                  <div className="password__main">
                  <p>{password.showPassword ? password.password : password.hidePassword}</p>
                  </div>
                </div>
              </div>
              <div className="password__changes">
                <p className="password__changes-date">{password.date}</p>
                <div className="password__changes-box">
                  <div className="change__button change__button-copy" onClick={() => hadleCopyPasswrod(password.password)}>
                    <div className="change__button-img change__button-copys"></div>
                  </div>
                  <div className="change__button change__button-eyes" onClick={() => handleShowPassword(password.id)}>
                    <div className={`change__button-img ${password.showPassword ? 'change__button-cEyes' : 'change__button-oEyes'}`}></div>
                  </div>
                  <div className="change__button change__button-remove" onClick={() => handleDeletePassword(password.id)}>
                    <div className="change__button-img change__button-trash"></div>
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>

        </div>
      ):(
        <div className='home__loading'>
          <h1>Loading...</h1>
        </div>
      )}
      
    </div>
  );
}

export default Home;
