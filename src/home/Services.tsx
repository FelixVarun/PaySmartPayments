import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { PRIMARY_BACKGROUND } from '../utils/Global';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addToCart } from '../redux/cartSlice';
import CartHeaderIcon from '../components/CartHeaderIcon';
import MyStatusBar from '../components/MyStatusBar';
import ServiceCard from '../components/ServiceCard';
import { SERVICE_DATA } from '../utils/MockData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;



const Services = ({ route, navigation }: any) => {
  const { serviceName } = route.params;
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);



  const filteredData = SERVICE_DATA[serviceName] || [];

  const renderItem = ({ item }: any) => {
    const existingItem = cartItems.find(i => i.id === item.id);

    return (
      <ServiceCard 
        item={item} 
        existingItem={existingItem} 
        onAdd={(item) => dispatch(addToCart(item))} 
      />
    );
  };

  return (
    <View style={styles.container}>
       <MyStatusBar
        backgroundColor={PRIMARY_BACKGROUND}
        barStyle="light-content"
      />
      <View
        style={{
          backgroundColor: 'white',
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 30,
        //   borderBottomWidth: 1,
          borderColor: '#D4D4D4',
          paddingHorizontal: 10,
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


        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: '600',
            }}
            numberOfLines={1}
          >
            {serviceName} Services
          </Text>
        </View>

      
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <CartHeaderIcon cartCount={cartCount} />
        </View>
      </View>

      <View style={{ marginHorizontal: 20 }}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 50 }}>
              No items found for this service.
            </Text>
          }
        />
      </View>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    // paddingHorizontal: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 20,
    color: '#000',
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    width: CARD_WIDTH,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: '#D4D4D4',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: 'hidden', 
  },
  cardImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#eee',
  },
  cardContent: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: PRIMARY_BACKGROUND,
    fontWeight: '700',
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: PRIMARY_BACKGROUND,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
