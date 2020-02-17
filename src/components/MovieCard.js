import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/FontAwesome';
import { s, vs } from 'react-native-size-matters';
import PropTypes from 'prop-types';

class MovieCard extends PureComponent {
  render() {
    const {
      container,
      image,
      overlay,
      text,
      ratingContainer,
      ratingText
    } = styles;

    const { title, backdrop, onPress, style, vote } = this.props;

    return (
      <View style={[container, style]}>
        <TouchableOpacity onPress={onPress}>
          <>
            <FastImage
              style={image}
              source={{
                uri: `${Config.IMAGE_URL}/w500/${backdrop}`
              }}
            />
            <View style={overlay} />
          </>

          <Text style={text}>{title}</Text>
          <View style={ratingContainer}>
            <Icon name="star" size={30} color="yellow" />
            <Text style={ratingText}>{`${vote}/10`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: vs(8),
    paddingHorizontal: s(8)
  },
  image: {
    height: vs(200)
  },
  text: {
    position: 'absolute',
    bottom: vs(8),
    left: s(60),
    right: s(8),
    color: 'white',
    fontSize: vs(18),
    fontWeight: 'bold'
  },
  ratingContainer: {
    position: 'absolute',
    bottom: vs(8),
    left: s(8)
  },
  ratingText: { color: 'white', fontWeight: 'bold' },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

MovieCard.propTypes = {
  title: PropTypes.string,
  backdrop: PropTypes.string,
  onPress: PropTypes.func,
  vote: PropTypes.number
};

export default MovieCard;
