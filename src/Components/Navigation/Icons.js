// React dependencies
import React from "react";
import { TouchableOpacity } from "react-native";

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import { spacing } from "../../styles/spacing-utils";

// React-Native Vector Icon
import Icon from "react-native-vector-icons/MaterialIcons";

export default props => {
  return (
    <TouchableOpacity
      onPress={props.action}
      style={[
        props.marginLeft ? spacing.smallLeft : 0,
        props.marginRight ? spacing.smallRight : 0
      ]}
    >
      <Icon name={props.icon} size={30} />
    </TouchableOpacity>
  );
};
