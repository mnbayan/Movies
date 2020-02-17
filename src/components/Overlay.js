import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const Overlay = ({ style, color, children }) => {
  return (
    <View
      style={[
        {
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        style,
        { backgroundColor: color }
      ]}
    >
      {children}
    </View>
  );
};

Overlay.propTypes = {
  color: PropTypes.string
};

export default Overlay;
