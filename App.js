// React dependencies
import React, { Component } from "react";

// The exported app container which will decide which route or routes are viewed
import AppContainer from "./src/routing/index";

/*
React-Native-Paper:
- Acts as a higher order component for the libaray
- More details can be found here https://callstack.github.io/react-native-paper/getting-started.html
*/
import { Provider as PaperProvider } from "react-native-paper";

export default class App extends Component {
  render() {
    return (
      <PaperProvider>
        <AppContainer />
      </PaperProvider>
    );
  }
}
