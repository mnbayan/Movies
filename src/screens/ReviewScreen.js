import React, { Component } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ReviewItem,
  ReviewItemLoader,
  Placeholder,
  Container
} from 'components';
import { COLORS } from 'constants';
import { fetchReviews } from 'services';

class ReviewScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      reviews: null,
      refreshing: false,
      isFetching: false
    };
  }

  componentDidMount() {
    this.fetchReviews(1);
  }

  // eslint-disable-next-line react/sort-comp
  fetchReviews(nextPage) {
    const { page, isFetching } = this.state;

    if (page === nextPage || isFetching) return;

    this.setState(() => ({ isFetching: true }));

    const { navigation } = this.props;
    const id = navigation.getParam('movie_id');

    const oldPage = page;

    fetchReviews(id, nextPage)
      .then((response) => {
        const { results } = response;

        let reviewsVal = results;

        if (response.page !== 1) {
          const { reviews } = this.state;
          reviewsVal = [...reviews, ...results];
        }

        const pageVal = this.shouldUpdatePage(results)
          ? response.page
          : oldPage;

        this.setState(() => ({
          page: pageVal,
          reviews: reviewsVal,
          refreshing: false,
          isFetching: false
        }));
      })
      .catch(() => {
        this.setState(() => ({ refreshing: false, isFetching: false }));
      });
  }

  shouldUpdatePage = (results) => {
    return results !== null && results !== undefined && results.length > 0;
  };

  onRefresh = () => {
    this.setState(() => ({ refreshing: true }));

    this.fetchReviews(1);
  };

  loadNext = () => {
    const { page } = this.state;

    this.fetchReviews(page + 1);
  };

  refreshControl = () => {
    const { refreshing } = this.state;

    return (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={this.onRefresh}
        colors={COLORS.refreshControl}
      />
    );
  };

  renderItem = ({ item }) => {
    const { author, content } = item;

    return <ReviewItem author={author} content={content} />;
  };

  renderLoader = () => {
    const { fill, list } = styles;

    return (
      <ReviewItemLoader
        style={[fill, list]}
        itemStyle={{ paddingHorizontal: s(8) }}
        count={7}
      />
    );
  };

  renderContent(reviews) {
    if (reviews.length > 0) {
      const { list, fill } = styles;

      return (
        <FlatList
          style={[fill, list]}
          data={reviews}
          refreshControl={this.refreshControl()}
          renderItem={this.renderItem}
          keyExtractor={(item) => `${item.id}`}
          onEndReachedThreshold={0.01}
          onEndReached={this.loadNext}
        />
      );
    }

    return (
      <Placeholder
        icon={<Icon name="rate-review" size={vs(100)} color={COLORS.icon} />}
        message="No reviews yet."
      />
    );
  }

  render() {
    const { reviews } = this.state;

    return (
      <Container>
        {reviews === null ? this.renderLoader() : this.renderContent(reviews)}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  list: {
    paddingVertical: vs(8)
  }
});

export default ReviewScreen;
