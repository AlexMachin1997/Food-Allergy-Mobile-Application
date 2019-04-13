// React dependencies
import React from "react";
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
      style={[
        flex.flex,
        flex.row,
        flex.justifyContentCenter,
        flex.alignItemsCenter
      ]}
    >
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};
