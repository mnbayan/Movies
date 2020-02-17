import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { vs } from 'react-native-size-matters';
import PropTypes from 'prop-types';

const Spinner = ({ color = '#2B70AD', position = 'center' }) => (
  <View style={[styles.default, styles[position]]}>
    <ActivityIndicator size="large" color={color} />
  </View>
);

Spinner.propTypes = {
  color: PropTypes.string,
  position: PropTypes.oneOf(['top', 'center', 'bottom'])
};

const styles = StyleSheet.create({
  default: {
    position: 'absolute',
    left: 0,
    right: 0
  },
  center: {
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  top: {
    top: vs(16)
  },
  bottom: {
    bottom: vs(16)
  }
});

export default Spinner;
