const axios = require("axios");

// Base API Domain name
const API_URL = "https://radiant-dusk-41662.herokuapp.com";

/* 

- Token from the inital login
- Wait for the network request to finish before releasing the thread
- Once finished log the reuslts 
- Any errors such as being unauthorized or server timeout then the catch block will be executed
*/
const deleteUser = async () => {
  try {
    // Authorization token
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yzk3Njc2NGNiODE2ODAwMTcxYzgxNTciLCJpYXQiOjE1NTM0MjY0NDEsImV4cCI6MTU1MzUxMjg0MX0.vA7Rb1SbTOlE7x-QUpJN-ZmEWNXc-077_1pDd9iPa6Y`;

    // Awaiting the response from the API endpoint and set the header to have an authorization token
    const response = await axios.delete(`${API_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const { data } = response;
    console.log(data.message);
  } catch (error) {
    const { data } = error.response;
    console.log(data);
  }
};

deleteUser();
