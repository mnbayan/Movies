import React from 'react';
import { FlatList, View, Dimensions } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { vs } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { COLORS } from 'constants';

const MovieCardLoader = ({ style, count, itemStyle }) => {
  const getRectWidth = () => {
    const { width } = Dimensions.get('window');

    if (itemStyle !== null) {
      const { paddingHorizontal, paddingLeft, paddingRight } = itemStyle;

      if (paddingHorizontal !== null) {
        return width - paddingHorizontal * 2;
      }

      if (paddingLeft !== null && paddingRight !== null) {
        return width - paddingLeft + paddingRight;
      }
    }

    return width;
  };

  const renderItem = () => {
    const height = vs(200);
    const width = getRectWidth();

    return (
      <View style={itemStyle}>
        <ContentLoader
          height={height}
          width={width}
          backgroundColor={COLORS.loader}
        >
          <Rect x={0} y={0} height={height} width={width} />
        </ContentLoader>
      </View>
    );
  };

  return (
    <FlatList
      style={style}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      data={_.range(count)}
      keyExtractor={(item) => `${item}`}
      renderItem={renderItem}
    />
  );
};

MovieCardLoader.propTypes = {
  count: PropTypes.number,
  itemStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default MovieCardLoader;
