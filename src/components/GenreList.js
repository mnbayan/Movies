import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { s, ms, vs } from 'react-native-size-matters';
import PropTypes from 'prop-types';

const GenreList = ({ style, data }) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style}
      data={data}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => {
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(3),
    borderColor: 'gray',
    borderWidth: 1,
    padding: ms(5),
    marginRight: s(10)
  },
  itemText: {
    textAlign: 'center',
    fontSize: vs(12)
  }
});

GenreList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
};

export default GenreList;
