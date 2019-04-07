const axios = require("axios");

// Base API Domain name
const API_URL = "https://radiant-dusk-41662.herokuapp.com";

/* 
sayHello: 
- Wait for the network request to finish
- Once finishjed log the result, it will say hello
- Any errors such as server timing out and the catch block will be executed
*/
sayHello = async () => {
  try {
    const response = await axios(`${API_URL}/api/hello`);

    //Destructure data from the response object
    const { data } = response;

    // Log response from API request
    console.log(data);
  } catch (error) {
    // Log response from API request
    console.log(error);
  }
};

/* 
currentUser
- Token from the inital login
- Wait for the network request to finish before releasing the thread
- Once finished log the reuslts 
- Any errors such as being unauthorized or server timeout then the catch block will be executed
*/
const getMyData = async () => {
  try {
    // Authorization token
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yzk3NmQzNmNiODE2ODAwMTcxYzgxNTkiLCJpYXQiOjE1NTM0NDAyMDUsImV4cCI6MTU1MzUyNjYwNX0.Yyv5NfkhSUcBGU27Ug2n4V3Qgk-a4ljBQ2H1E59BXsU`;

    // Awaiting the response from the API endpoint and set the header to have an authorization token
    const response = await axios.get(`${API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    //Destructure data from the response object
    const { data } = response.data;

    // Data from the response
    console.log(`Your data ${JSON.stringify(data)}`);
  } catch (error) {
    // Error object contains a data object. Within that object is a response e.g. unauthorized
    const { data } = error.response;

    // Data from the response
    console.log(`Response Message: ${data}`);
  }
};

getMyData();
//sayHello();
