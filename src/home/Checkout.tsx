import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from '../redux/cartSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { PRIMARY_BACKGROUND } from '../utils/Global';
import { SafeAreaView } from 'react-native-safe-area-context';

const DELIVERY_CHARGE = 40;

const Checkout = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + parseInt(item.price.replace('₹', '')) * item.quantity,
    0,
  );

  const total = subtotal + (subtotal > 0 ? DELIVERY_CHARGE : 0);

  const renderItem = ({ item }: any) => {
    const numericPrice = parseInt(item.price.replace('₹', ''));

    return (
      <View style={styles.itemContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>₹{numericPrice}</Text>
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => dispatch(decrementQuantity(item.id))}
          >
            <Ionicons name="remove-circle-outline" size={26} color="#000" />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => dispatch(incrementQuantity(item.id))}
          >
            <Ionicons name="add-circle-outline" size={26} color="#000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
          <Ionicons name="trash-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: 'white',
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
        //   marginBottom: 10,
          //   borderBottomWidth: 1,
          borderColor: '#D4D4D4',
          paddingHorizontal: 10,
          gap: 10,
        }}
      >
       
        <TouchableOpacity
          style={{
            height: '100%',
            justifyContent: 'center',
          }}
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="keyboard-backspace" color="black" size={30} />
        </TouchableOpacity>

        <Text
          style={{
            color: 'black',
            fontSize: 20,
            fontWeight: '600',
          }}
          numberOfLines={1}
        >
          Review and Pay
        </Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={{ fontSize: 16 }}>Your cart is empty 🛒</Text>
        </View>
      ) : (
        <>
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              padding: 20,
              fontWeight: '600',
            }}
          >
            Delivery Location
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 0.5,
          borderColor: '#D4D4D4',

              marginHorizontal: 20,
              borderRadius: 4,
            }}
          >
            <View style={{ paddingHorizontal: 16 }}>
              <Ionicons name="home" color="black" size={30} />
            </View>

            <View style={{ paddingHorizontal: 10, width: '80%',paddingVertical:4 }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '600',
                }}
              >
                Home
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 14,
                  //   fontWeight: '600',
                }}
              >
                Felix, No.9, lakshmi nagar, mes road, Near lake, East tambaram,
                tambaram , chennai
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 14,

                  //   fontWeight: '600',
                }}
              >
                Phone number: 7550038569
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              padding: 20,
              fontWeight: '600',
            }}
          >
            Added Services
          </Text>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />

     
          <View style={styles.summaryContainer}>
            <View style={styles.row}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryText}>₹{subtotal}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.summaryText}>Delivery</Text>
              <Text style={styles.summaryText}>₹{DELIVERY_CHARGE}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>₹{total}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => {
                dispatch(clearCart());
                navigation.navigate('Home');
              }}
            >
              <Text style={styles.checkoutText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 4,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    // elevation: 1,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemPrice: {
    marginTop: 4,
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    gap: 4,
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginTop: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
    color: '#444',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: PRIMARY_BACKGROUND,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
