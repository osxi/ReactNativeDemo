'use strict';

const CommentsList = require('./comments-list');
const React = require('react-native');

const {
  View,
  ScrollView,
  Text,
  StyleSheet,
  WebView
} = React;

const DetailPage = React.createClass({
  goToLink() {
    let { url } = this.props.listing;

    this.props.navigator.push({
      title: url,
      component: WebView,
      passProps: {url},
    });
  },

  render() {
    let { listing } = this.props;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title} onPress={this.goToLink}>
          {listing.title}
        </Text>

        <Text style={styles.selfText}>{listing.selftext}</Text>

        <CommentsList listing={listing} />
      </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF'
  },

  selfText: {
    padding: 10
  },

  title: {
    padding: 10,
    fontSize: 24
  }
});

module.exports = DetailPage;
