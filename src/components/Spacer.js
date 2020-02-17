import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { ms } from 'react-native-size-matters';

const Spacer = ({ children, margin = 16 }) => (
  <View style={{ margin: ms(margin) }}>{children}</View>
);

Spacer.propTypes = {
  margin: PropTypes.number
};

export default Spacer;
