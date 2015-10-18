'use strict';

const IndexPage = require('./components/index-page');
const React = require('react-native');

const {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} = React;

const ReactNativeDemo = React.createClass({
  render() {
    return (
      <NavigatorIOS style={styles.navigator} initialRoute={{
                      title: "/r/reactjs",
                      component: IndexPage
                    }} />
    );
  }
});

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);