// React dependencies
import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text
} from "react-native";

// React-Native Vector Icons
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import { fonts } from "../../styles/text-utils";

export default props => {
  return (
    <View style={{ marginBottom: 40 }}>
      <TouchableOpacity onPress={props.action}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 10
          }}
        >
          <MaterialIcons name={props.icon} size={40} color="#0277bd" />
          <Text style={[fonts.title3]}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
