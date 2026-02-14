import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setUser } from '../redux/authSlice';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';
import { supabase } from '../supabase/supabaseService';
import { ActivityIndicator, View } from 'react-native';

export default function RootNavigator() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [initializing, setInitializing] = useState(true);

 useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();


      dispatch(setUser(data.session?.user ?? null));
      setInitializing(false); 
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        dispatch(setUser(session?.user ?? null));
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, [dispatch]);

    if (initializing) {
    return (
      <View style={{flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"white"}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  return (
    <NavigationContainer>
      {user ? <HomeNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}
