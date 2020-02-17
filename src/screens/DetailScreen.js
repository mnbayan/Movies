import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Config from 'react-native-config';
import { s, vs, ms } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';
import { Overlay, GenreList, Divider, Container, Error } from 'components';
import { ROUTES, COLORS } from 'constants';
import { AccountContext } from 'contexts';
import { updateWatchList, getDetails } from 'services';
import { formatDate, parseToDate } from 'utils';

class DetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: null,
      error: null
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('movie_id');

    getDetails(id)
      .then((response) => {
        this.setState(() => ({ details: response }));
      })
      .catch((error) => this.setState(() => ({ error })));
  }

  onBookmarkTapped = async (id, watchlist) => {
    const {
      state: { accountId }
    } = this.context;

    updateWatchList(accountId, id, watchlist)
      .then(() => {
        const { details } = this.state;

        this.setState(() => ({ details: { ...details, watchlist } }));

        Toast.show('Successfully updated your WatchList');
      })
      .catch(() => Toast.show('An error occurred. Please try again.'));
  };

  renderCover({
    title,
    original_title,
    backdrop_path,
    release_date,
    id,
    watchlist,
    poster_path
  }) {
    const date = parseToDate(release_date);
    const year = formatDate(date, 'yyyy');

    return (
      <View style={styles.container}>
        <>
          <FastImage
            style={styles.cover}
            source={{ uri: `${Config.IMAGE_URL}/w500/${backdrop_path}` }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Overlay color={COLORS.overlay}>
            <FastImage
              style={styles.poster}
              source={{
                uri: `${Config.IMAGE_URL}/w300/${poster_path}`
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{`${title} (${year})`}</Text>
              {title !== original_title ? (
                <Text
                  style={styles.originalTitle}
                >{`${original_title} (original title)`}</Text>
              ) : null}
            </View>
          </Overlay>
        </>

        <Icon
          style={styles.watchlistIcon}
          name="bookmark"
          size={40}
          color={watchlist ? COLORS.watchlist : 'white'}
          onPress={() => this.onBookmarkTapped(id, !watchlist)}
        />
      </View>
    );
  }

  renderRatings({ vote_average, id, rated }) {
    return (
      <View style={styles.ratingsContainer}>
        <View style={styles.iconContainer}>
          <Icon
            style={styles.icon}
            name="rate-review"
            size={30}
            color={COLORS.icon}
            onPress={() => {
              const { navigation } = this.props;

              navigation.navigate(ROUTES.reviews, { movie_id: id });
            }}
          />
          <Text>{`${vote_average}/10 votes`}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon
            style={styles.icon}
            name={rated ? 'star' : 'star-border'}
            size={30}
            color={COLORS.icon}
            onPress={() => Toast.show('Rate feature coming soon!')}
          />
          <Text>{rated ? 'Rated' : 'Rate this'}</Text>
        </View>
      </View>
    );
  }

  renderOverview = ({ overview, genres }) => {
    return (
      <View style={styles.overviewContainer}>
        <View style={styles.genreContainer}>
          <Text style={[styles.label, { paddingRight: s(8) }]}>Genres:</Text>
          <GenreList data={genres} />
        </View>
        <Text style={styles.label}>Overview</Text>
        <Text style={{ fontSize: ms(14) }}>{overview}</Text>
      </View>
    );
  };

  renderContent(details) {
    if (details !== null) {
      return (
        <ScrollView style={{ flex: 1 }}>
          {this.renderCover(details)}
          {this.renderRatings(details)}
          <Divider />
          {this.renderOverview(details)}
        </ScrollView>
      );
    }

    return null;
  }

  render() {
    const { details, error } = this.state;

    return (
      <Container>
        {error !== null ? <Error /> : this.renderContent(details)}
      </Container>
    );
  }
}

DetailScreen.contextType = AccountContext;

const styles = StyleSheet.create({
  container: { height: vs(250) },
  cover: {
    flex: 1
  },
  poster: {
    position: 'absolute',
    bottom: ms(14),
    left: s(8),
    height: vs(120),
    width: s(80),
    alignSelf: 'center'
  },
  titleContainer: {
    position: 'absolute',
    bottom: vs(16),
    right: s(8),
    left: s(100)
  },
  title: {
    color: 'white',
    fontSize: ms(18)
  },
  originalTitle: {
    color: 'white',
    fontSize: ms(14)
  },
  watchlistIcon: { position: 'absolute', right: 0, top: 0 },
  ratingsContainer: {
    flexDirection: 'row',
    height: vs(60)
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: ms(8)
  },
  overviewContainer: {
    flex: 1,
    paddingHorizontal: s(8),
    paddingVertical: vs(16)
  },
  overview: { flex: 1 },
  genreContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: vs(30),
    marginBottom: vs(10)
  },
  label: {
    fontSize: ms(16),
    fontWeight: 'bold'
  }
});

export default DetailScreen;
