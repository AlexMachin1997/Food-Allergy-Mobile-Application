// React dependencies
import React from "react";
import { Text, View } from "react-native";

import CustomButton from "../Form/Button";

// React-Native Vector Icons
import OcticonsIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default props => (
  <View
    style={{
      margin: 10,
      padding: 5,
      borderWidth: 1,
      borderColor: props.isAllergic ? "#DC143C" : "green",
      borderRadius: 10,
      backgroundColor: "white"
    }}
  >
    <View>
      <Text style={{ fontSize: 20, paddingBottom: 10, color: "black" }}>
        {props.name}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          <Text style={{ fontSize: 20 }}>
            <OcticonsIcon
              name={
                props.isAllergic
                  ? "emoticon-sad-outline"
                  : "emoticon-happy-outline"
              }
              color={props.isAllergic ? "#DC143C" : "green"}
              size={49}
            />
          </Text>
        </View>
        <View>
          <CustomButton
            text="Delete"
            mode="contained"
            compact={true}
            colour="red"
            isDark={true}
            styling={{ borderRadius: 90 }}
            disabled={false}
            onClick={props.onDelete}
            label="Delete the item from your basket"
          />
        </View>
        <View />
      </View>
    </View>
  </View>
);
