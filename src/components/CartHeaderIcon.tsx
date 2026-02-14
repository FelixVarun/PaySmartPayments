import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, NavigationProp } from "@react-navigation/native";



type CartHeaderIconProps = {
  cartCount: number;
};

const CartHeaderIcon: React.FC<CartHeaderIconProps> = ({ cartCount }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Checkout");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Ionicons name="cart-outline" size={26} color="#000" />

      {cartCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {cartCount > 99 ? "99+" : cartCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartHeaderIcon;

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -4,
    backgroundColor: "#ff3b30",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
