const axios = require("axios");

// Base API Domain name
const API_URL = "https://radiant-dusk-41662.herokuapp.com";

/* 
login: 
- Send an email and password within the body
- Wait for the network request to finish
- If the promise is resolved then console log the token recived from a successful login attempt
- Any errors such as server timing out and the catch block will be executed
*/
login = async () => {
  try {
    // Awaiting the response from the API endpoint
    const response = await axios.post(`${API_URL}/api/users/login`, {
      email: "alexmachin1997@gmail.com", //this.state.email
      password: "goodboy1997" // this.state.password
    });

    // Data is the payload attached to the response from the request
    const { data } = response;

    // Data from the response
    // The data object contains isSuccess, token and a success message
    // This would be stored in AsyncStorage
    console.log(data.message);
    console.log(data.token);
  } catch (error) {
    // Data is the payload attached to the response from the request
    const { data } = error.response;

    // Success message from the API
    console.log(data.message);
  }
};

register = async () => {
  try {
    // Awaiting the response from the API endpoint
    const response = await axios.post(`${API_URL}/api/users/register`, {
      name: "Alex James Machin",
      email: "alexmachin1997@gmail.com",
      password: "goodboy1997",
      phone: "07713758383",
      allergies: ["Wheat"]
    });

    // Data is the payload attached to the response from the request
    const { data } = response;

    // Data from the response
    // The first data object is the response from axios
    // The second data object is the data provided by the API e.g. name, email, password etc
    console.log(data.data);
  } catch (error) {
    // Data is the payload attached to the response from the request
    const { data } = error.response;

    // Data from the response
    console.log(data.message);
  }
};

//register();
//login();
