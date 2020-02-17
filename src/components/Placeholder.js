import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { vs } from 'react-native-size-matters';
import PropTypes from 'prop-types';

const Placeholder = ({ icon, message }) => {
  const { fill, center, text } = styles;

  return (
    <View style={[fill, center]}>
      {icon}
      <Text style={text}>{message}</Text>
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
  text: {
    color: 'gray',
    fontSize: vs(20)
  }
});

Placeholder.propTypes = {
  icon: PropTypes.element,
  message: PropTypes.string
};

export default Placeholder;
