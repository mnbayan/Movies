import React from 'react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';

const Container = ({ children, style }) => (
  <SafeAreaView style={[{ flex: 1 }, style]} forceInset={{ bottom: 'never' }}>
    {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
    {children}
  </SafeAreaView>
);

export default Container;
