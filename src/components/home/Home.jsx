import React, { useEffect, useState } from 'react';

function Home() {

  const [userId, setUserId] = useState('');

  async function fetchData() {
    try {
      const response = await fetch(`http://localhost:5000/get-users${userId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
	  console.log(result);
      // Assuming you want to set the user ID from the first user in the array
      if (result.length > 0) {
        const firstUser = result[0];
        setUserId(firstUser._id);
      } else {
        setUserId(''); // No users found
      }

    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>{userId}</div>
  );
}

export default Home;
