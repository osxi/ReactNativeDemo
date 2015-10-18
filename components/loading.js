'use strict';

const React = require('react-native');

const {
  StyleSheet,
  Text,
  View
} = React;

const Loading = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    backgroundColor: '#F5FCFF'
  }
});

module.exports = Loading;
