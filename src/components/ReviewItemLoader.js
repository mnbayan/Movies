import React from 'react';
import { FlatList, View, Dimensions } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { vs } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { COLORS } from 'constants';
import Divider from './Divider';

const ReviewItemLoader = ({ style, count, itemStyle }) => {
  const getRectWidth = () => {
    const { width } = Dimensions.get('window');

    if (itemStyle !== null && itemStyle !== undefined) {
      const { paddingHorizontal, paddingLeft, paddingRight } = itemStyle;

      if (itemStyle.paddingHorizontal !== null) {
        return width - paddingHorizontal * 2;
      }

      if (paddingLeft !== null && paddingRight !== null) {
        return width - paddingLeft + paddingRight;
      }
    }

    return width;
  };

  const renderItem = () => {
    const { width } = Dimensions.get('window');
    const rectWidth = getRectWidth();
    const lineHeight = vs(10);

    return (
      <View style={[itemStyle]}>
        <ContentLoader
          height={vs(100)}
          width={width}
          backgroundColor={COLORS.loader}
        >
          <Rect x={0} y={vs(8)} height={vs(16)} width={rectWidth * 0.8} />
          <Rect x={0} y={vs(34)} height={lineHeight} width={rectWidth} />
          <Rect x={0} y={vs(48)} height={lineHeight} width={rectWidth} />
          <Rect x={0} y={vs(62)} height={lineHeight} width={rectWidth} />
          <Rect x={0} y={vs(76)} height={lineHeight} width={rectWidth * 0.6} />
        </ContentLoader>
        <Divider style={{ position: 'absolute', bottom: 10 }} color="red" />
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

ReviewItemLoader.propTypes = {
  count: PropTypes.number,
  itemStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default ReviewItemLoader;
