import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ms, vs } from 'react-native-size-matters';

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: ms(8),
    height: vs(50),
    backgroundColor: '#01d277',
    borderRadius: ms(5)
  },
  title: {
    textAlign: 'center',
    fontSize: vs(16),
    fontWeight: 'bold'
  }
});

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func
};

export default Button;
