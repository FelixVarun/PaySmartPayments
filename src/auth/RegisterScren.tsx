import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import MyStatusBar from '../components/MyStatusBar';
import { PRIMARY_BACKGROUND } from '../utils/Global';
import { Formik } from 'formik';

import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { RootState } from '../redux/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import { registerUser } from '../redux/authSlice';

const LoginSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .required('Password is required'),
});

type Props = {};

const RegisterScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<any>();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar
        backgroundColor={PRIMARY_BACKGROUND}
        barStyle="light-content"
      />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}
          >
            <View
              style={{
                marginBottom: 50,
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{ fontSize: 30, textAlign: 'center', fontWeight: '600' }}
              >
                Register
              </Text>
              <Text
                style={{ fontSize: 16, textAlign: 'center', marginTop: 20 }}
              >
                Fill your information below or register
              </Text>
              <Text style={{ fontSize: 16, textAlign: 'center' }}>
                with your social account
              </Text>
            </View>

            <Formik
              initialValues={{ name: '', email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={values => {
                dispatch(registerUser(values));
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <TextInput
                    placeholder="Name"
                    placeholderTextColor="#999"
                    style={styles.input}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    keyboardType="default"
                    autoCapitalize="none"
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.error}>{errors.name}</Text>
                  )}
            
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#999"
                    style={styles.input}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}

                
                  <View style={styles.passwordContainer}>
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="#999"
                      style={[styles.input2, { flex: 1, marginBottom: 0 }]} 
                      secureTextEntry={!showPassword}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Icon
                        name={showPassword ? 'eye' : 'eye-slash'}
                        size={20}
                        color="#777"
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}

                  
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSubmit()}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Register</Text>
                    )}
                  </TouchableOpacity>

                
                  <View style={styles.registerRow}>
                    <Text style={{ color: '#777' }}>
                      Already have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Login')}
                    >
                      <Text style={styles.registerText}> SignIn</Text>
                    </TouchableOpacity>
                  </View>

          
                  <View style={styles.dividerRow}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.line} />
                  </View>

              
                  <View style={styles.ssoRow}>
                    <TouchableOpacity style={styles.ssoButton}>
                      <Icon name="google" size={20} color="#DB4437" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ssoButton}>
                      <Icon name="apple" size={20} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ssoButton}>
                      <Icon name="facebook" size={20} color="#1877F2" />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    color: 'black',
  },
  input2: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    // borderWidth: 1,
    borderColor: '#eee',
    color: 'black',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 13,
  },
  button: {
    backgroundColor: PRIMARY_BACKGROUND,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: PRIMARY_BACKGROUND,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 10,
    color: '#777',
  },
  ssoRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  ssoButton: {
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
});
