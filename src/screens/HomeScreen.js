import React, { Component } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import { MovieCard, MovieCardLoader, Container } from 'components';
import { ROUTES, COLORS } from 'constants';
import { AccountContext } from 'contexts';
import { fetchMovies } from 'services';

class HomeScreen extends Component {
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
    this.fetchMovies(1);

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

  fetchMovies(nextPage) {
    const { page, isFetching } = this.state;

    if (page === nextPage || isFetching) return;

    this.setState(() => ({ isFetching: true }));

    fetchMovies(nextPage)
      .then((response) => {
        const { results } = response;

        let _movies = results;

        if (response.page !== 1) {
          const { movies } = this.state;
          _movies = [...movies, ...results];
        }

        this.setState(() => ({
          page,
          movies: _movies,
          refreshing: false,
          isFetching: false
        }));
      })
      .catch(() =>
        this.setState(() => ({ refreshing: false, isFetching: false }))
      );
  }

  onRefresh = () => {
    this.setState(() => ({ refreshing: true }));

    this.fetchMovies(1);
  };

  loadNext = () => {
    const { page } = this.state;

    this.fetchMovies(page + 1);
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
    const { navigation } = this.props;

    return (
      <MovieCard
        title={title}
        backdrop={backdrop_path}
        vote={vote_average}
        onPress={() => {
          navigation.navigate(ROUTES.details, { movie_id: id });
        }}
      />
    );
  };

  render() {
    const { movies } = this.state;
    const { list, fill } = styles;

    return (
      <Container>
        {movies === null ? (
          <MovieCardLoader
            style={[fill, list]}
            count={4}
            itemStyle={{ paddingHorizontal: s(8), paddingVertical: vs(8) }}
          />
        ) : (
          <FlatList
            style={list}
            bounces={false}
            data={movies}
            refreshControl={this.renderRefreshControl()}
            renderItem={this.renderItem}
            keyExtractor={(item) => `${item.id}`}
            onEndReachedThreshold={0.01}
            onEndReached={this.loadNext}
          />
        )}
      </Container>
    );
  }
}

HomeScreen.contextType = AccountContext;

HomeScreen.navigationOptions = {
  title: 'Trending today'
};

const styles = StyleSheet.create({
  fill: { flex: 1 },
  list: { paddingVertical: vs(8) }
});

export default HomeScreen;
