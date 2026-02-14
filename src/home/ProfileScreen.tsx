import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateUser } from '../redux/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PRIMARY_BACKGROUND } from '../utils/Global';

const ProfileScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const currentName = user?.user_metadata?.full_name || '';

  const [name, setName] = useState(currentName);

  const handleUpdate = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    dispatch(updateUser(name));
    Alert.alert('Success', 'Name updated successfully');
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
          Profile 
         </Text>
       </View>

   
      <View style={{ padding: 20 }}>
        
        <Text style={styles.label}>Full Name</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update Name</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: PRIMARY_BACKGROUND,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
   container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});
