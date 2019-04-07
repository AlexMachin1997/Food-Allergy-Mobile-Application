const axios = require("axios");

// Base API Domain name
const API_URL = "https://radiant-dusk-41662.herokuapp.com";

/* 
updateUser:
- Send the updated data
- Wait for the network request to finish
- Set the headers, it must inlcude a JWT as its a protected API endpoint
- Any errors such as server timing out and the catch block will be executed
*/
const updateUser = async () => {
  try {
    // Authorization token
    const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yzk3ZmQzOWNiODE2ODAwMTcxYzgxNWYiLCJpYXQiOjE1NTM2Mjk2ODUsImV4cCI6MTU1MzcxNjA4NX0.3IvlaLH-7XUdZN2Jw8060gxwPB_ZCt_xi6BNpnlhn1w`;

    // Awaiting the response from the API endpoint and set the header to have an authorization token
    const response = await axios.put(
      `${API_URL}/api/users`,
      {
        name: "Alex Machin",
        email: "alexmachin1997@gmail.com",
        phone: undefined,
        allergies: []
      },
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: token
        }
      }
    );

    //Destructure data from the response object
    const { data } = response;

    // Log response from API request
    console.log(data.data);
    console.log(data.message);
  } catch (error) {
    // Error object contains a data object
    const { data } = error.response;
    console.log(`Response Message: ${data.error}`);

    // Full log of the error object
    console.log(data.error);
  }
};

updateUser();
