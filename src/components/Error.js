import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { vs } from 'react-native-size-matters';
import { COLORS } from 'constants';

const Error = () => {
  const { fill, center, text, icon } = styles;

  return (
    <View style={[fill, center]}>
      <Icon style={icon} name="error" size={vs(100)} color={COLORS.icon} />
      <Text style={text}>An error occurred.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    paddingBottom: vs(8)
  },
  text: {
    color: 'gray',
    fontSize: vs(20)
  }
});

export default Error;
