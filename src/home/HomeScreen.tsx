import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GREY, PRIMARY_BACKGROUND } from '../utils/Global';
import MyStatusBar from '../components/MyStatusBar';
import { OFFERS, SERVICE_DATA, SERVICES } from '../utils/MockData';
import ServiceCard from '../components/ServiceCard';
import { RootState } from '../redux/store';
import { addToCart } from '../redux/cartSlice';
import CartHeaderIcon from '../components/CartHeaderIcon';

type Props = {
  navigation: any;
};





const { width } = Dimensions.get('window');

const CARD_WIDTH = width * 0.65;

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const fullName = user?.user_metadata?.full_name || 'User';

  const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const popularServices = SERVICE_DATA['Washing'] || [];
  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MyStatusBar
        backgroundColor={PRIMARY_BACKGROUND}
        barStyle="light-content"
      />
      <ImageBackground
        source={require('../../assets/img/herobanner.png')}
        style={styles.banner}
        imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ marginLeft: 10 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
                Hi
              </Text>
              <Text style={{ color: 'white' }}>{fullName}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
     
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={{ marginRight: 18 }}
              >
                <Ionicons
                  name="person-circle-outline"
                  size={26}
                  color="white"
                />
              </TouchableOpacity>

           
              <TouchableOpacity onPress={handleLogout}>
                <MaterialIcons name="logout" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              marginTop: 15,
            }}
          >
            <Ionicons name="location-outline" size={22} color="#FFFFFF" />
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>
              New York, USA{' '}
            </Text>
            <Ionicons
              name="chevron-down"
              size={22}
              color="#FFFFFF"
              style={{ marginTop: 5 }}
            />
          </View>
        </View>
        <View style={styles.searchRow}>
       
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={22} color="#777" />
            <TextInput
              placeholder="Search services..."
              placeholderTextColor="#999"
              style={styles.searchInput}
            />
          </View>

       
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              padding: 20,
              fontWeight: '600',
            }}
          >
            #SpecialForYou
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 14,
              padding: 20,
              fontWeight: '600',
            }}
          >
            See All
          </Text>
        </View>

        <View style={{ height: 160 }}>
          <FlatList
            data={OFFERS}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              padding: 20,
              fontWeight: '600',
            }}
          >
            Services
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 14,
              padding: 20,
              fontWeight: '600',
            }}
          >
            See All
          </Text>
        </View>

        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
          >
            {SERVICES.map(item => (
              <Pressable
                key={item.id}
                style={styles.serviceItem}
                onPress={() => {
                  navigation.navigate('Services', {
                    serviceName: item.name,
                  });
                }}
              >
                <View style={styles.serviceIconContainer}>
               
                  <MaterialIcons
                    name={item.icon}
                    size={28}
                    color={PRIMARY_BACKGROUND}
                  />
                </View>
                <Text style={styles.serviceText}>{item.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              padding: 20,
              fontWeight: '600',
            }}
          >
            Popular Services
          </Text>
                  <CartHeaderIcon cartCount={cartCount} />

        </View>

        <FlatList
          data={popularServices}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
          renderItem={({ item }) => {
            const existingItem = cartItems.find(i => i.id === item.id);
            return (
              <View
                style={{
                  paddingBottom: 40,
                  marginRight: -10,
                  transform: [{ scale: 0.9 }],
                }}
              >
              
                <ServiceCard
                  item={item}
                  existingItem={existingItem}
                  onAdd={product => dispatch(addToCart(product))}
                />
              </View>
            );
          }}
        />
      </ScrollView>

      {/* <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={{ color: '#fff', fontWeight: '600' }}>Logout</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#f9f9f9',
  },

  banner: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    // paddingHorizontal: 20,
  },

  bannerOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    // padding: 10,
    // borderRadius: 10,
  },

  bannerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  logoutBtn: {
    marginTop: 30,
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
  },

  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    elevation: 3,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#000',
  },

  filterButton: {
    marginLeft: 10,
    backgroundColor: '#fff',
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    color: '#000',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontWeight: '600',
  },
  seeAll: {
    color: 'grey',
    fontSize: 14,
    paddingHorizontal: 20,
    fontWeight: '600',
  },
  serviceItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  serviceIconContainer: {
    width: 65,
    height: 65,
    borderRadius: 33, 
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 12,
    color: '#444',
    fontWeight: '500',
  },
  card: {
    width: CARD_WIDTH,
    height: 150,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: '#fff',
    fontSize: 13,
    marginTop: 4,
  },
});
