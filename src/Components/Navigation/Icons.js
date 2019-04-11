import React from "react";
import { spacing } from "../../styles/spacing-utils";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native";

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
