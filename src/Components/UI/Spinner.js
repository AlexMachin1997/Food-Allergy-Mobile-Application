// React dependencies
import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import { flex } from "../../styles/flex-utils";

export default props => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};
