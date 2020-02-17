import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { s, vs, ms } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import Divider from './Divider';
import Spacer from './Spacer';

class ReviewItem extends PureComponent {
  render() {
    const { author, content } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.author}>{`A review by ${author}`}</Text>

        <Spacer margin={8} />

        <Text style={styles.content} dataDetectorType="link">
          {content}
        </Text>

        <Spacer margin={8} />

        <Divider />
      </View>
    );
  }
}

ReviewItem.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(16),
    paddingVertical: vs(8)
  },
  author: {
    fontSize: ms(18),
    fontWeight: 'bold'
  },
  content: {
    fontSize: ms(14)
  }
});

export default ReviewItem;
