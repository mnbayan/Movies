import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const Spacer = ({ style, height = 0.5, color = '#b2adb3' }) => (
  <View style={[style, { height, backgroundColor: color }]} />
);

Spacer.propTypes = {
  height: PropTypes.number,
  color: PropTypes.string
};

export default Spacer;
