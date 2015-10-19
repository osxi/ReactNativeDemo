'use strict';

const CommentsList = require('./comments-list');
const React = require('react-native');

const {
  View,
  ScrollView,
  Text,
  StyleSheet
} = React;

const DetailPage = React.createClass({
  render() {
    let { listing } = this.props;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{listing.title}</Text>

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
