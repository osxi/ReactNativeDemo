'use strict';

const React = require('react-native');

const {
  View,
  Text,
  StyleSheet
} = React;

const DetailPage = React.createClass({
  render() {
    let { listing } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{listing.title}</Text>

        <Text>{listing.selftext}</Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    backgroundColor: '#F5FCFF'
  },

  title: {
    fontSize: 24
  }
});

module.exports = DetailPage;
