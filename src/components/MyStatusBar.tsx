import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import React, { useState, useEffect } from "react";

const MyStatusBar = ({ backgroundColor, ...props }: any) => {
  
const [statusBarHeight, setStatusBarHeight] = useState<number | undefined>(StatusBar.currentHeight);

useEffect(() => {
  setStatusBarHeight(StatusBar.currentHeight);
}, []);

  return (
    <View style={[styles.statusBar, { backgroundColor, height: statusBarHeight }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
};

const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const styles = StyleSheet.create({
  statusBar: {
    height: 24, 
  },
  appBar: {
    backgroundColor: "#79B45D",
    height: APPBAR_HEIGHT,
  },
});

export default MyStatusBar;
