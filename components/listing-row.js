'use strict';

const DetailPage = require('./detail-page');
const React = require('react-native');

const {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

const Loading = React.createClass({
  onPressHandler(listing) {
    this.props.navigator.push({
      title: listing.title,
      component: DetailPage,
      passProps: {listing},
    });
  },

  render() {
    let { listing } = this.props;
    let { thumbnail } = listing;

    if (thumbnail === 'self' || thumbnail === 'default') {
      thumbnail = 'https://www.reddit.com/static/self_default2.png';
    }

    return (
      <TouchableHighlight onPress={this.onPressHandler.bind(this, listing)}>
        <View style={styles.container}>
          <Image style={styles.thumbnail}
                 source={{uri: thumbnail}} />

          <View style={styles.rightContainer}>
            <Text style={styles.title}>{listing.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },

  rightContainer: {
    flex: 1
  },

  thumbnail: {
    width: 53,
    height: 81,
  },

  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  }
});

module.exports = Loading;
