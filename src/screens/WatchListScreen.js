import React, { Component } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MovieCard, MovieCardLoader, Placeholder, Container } from 'components';
import { ROUTES, COLORS } from 'constants';
import { AccountContext } from 'contexts';
import { fetchWatchList } from 'services';

class WatchListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      movies: null,
      refreshing: false,
      isFetching: false
    };
  }

  componentDidMount() {
    this.fetchWatchList(1);

    this.fetchAccountDetailsIfNeeded();
  }

  // eslint-disable-next-line react/sort-comp
  fetchAccountDetailsIfNeeded() {
    const {
      state: { accountId },
      fetchAccountDetails
    } = this.context;

    if (accountId === null) {
      fetchAccountDetails();
    }
  }

  fetchWatchList(nextPage) {
    const { page, isFetching } = this.state;

    if (page === nextPage || isFetching) return;

    const {
      state: { accountId }
    } = this.context;

    this.setState(() => ({ isFetching: true }));

    fetchWatchList(accountId, nextPage)
      .then((response) => {
        let _movies = response.results;

        if (response.page !== 1) {
          const { movies } = this.state;
          _movies = [...movies, ...response.results];
        }

        this.setState(() => ({
          page,
          movies: _movies,
          refreshing: false,
          isFetching: false
        }));
      })
      .catch(() => {
        this.setState(() => ({ refreshing: false, isFetching: false }));
      });
  }

  onRefresh = () => {
    this.setState(() => ({ refreshing: true }));

    this.fetchWatchList(1);
  };

  loadNext = () => {
    const { page } = this.state;

    this.fetchWatchList(page + 1);
  };

  renderRefreshControl = () => {
    const { refreshing } = this.state;

    return (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={this.onRefresh}
        colors={[COLORS.refreshControl]}
      />
    );
  };

  renderItem = ({ item }) => {
    const { title, backdrop_path, vote_average, id } = item;

    return (
      <MovieCard
        title={title}
        backdrop={backdrop_path}
        vote={vote_average}
        onPress={() => {
          const { navigation } = this.props;
          navigation.navigate(ROUTES.details, { movie_id: id });
        }}
      />
    );
  };

  renderLoader = () => {
    const { list, fill } = styles;

    return (
      <MovieCardLoader
        style={[fill, list]}
        count={4}
        itemStyle={{ paddingHorizontal: s(8), paddingVertical: vs(8) }}
      />
    );
  };

  renderContent(movies) {
    if (movies.length > 0) {
      const { list, fill } = styles;

      return (
        <FlatList
          style={[list, fill]}
          bounces={false}
          data={movies}
          refreshControl={this.renderRefreshControl()}
          renderItem={this.renderItem}
          keyExtractor={(item) => `${item.id}`}
          onEndReachedThreshold={0.01}
          onEndReached={this.loadNext}
        />
      );
    }

    return (
      <Placeholder
        icon={<Icon name="bookmark" size={vs(100)} color={COLORS.icon} />}
        message="No items in your WatchList yet."
      />
    );
  }

  render() {
    const { movies } = this.state;

    return (
      <Container>
        {movies === null ? this.renderLoader() : this.renderContent(movies)}
      </Container>
    );
  }
}

WatchListScreen.contextType = AccountContext;

const styles = StyleSheet.create({
  fill: { flex: 1 },
  list: { paddingVertical: vs(8) }
});

export default WatchListScreen;
