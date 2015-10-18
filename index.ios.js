'use strict';

const React = require('react-native');

const {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

let API_URL = 'https://api.reddit.com/r/reactjs/hot';

var ReactNativeDemo = React.createClass({
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount() {
    this.fetchData();
  },

  fetchData() {
    fetch(API_URL)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.data.children),
          loaded: true,
        });
      }).done();
  },

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  },

  renderRow(listingData) {
    let { data: listing } = listingData;
    let { thumbnail } = listing;

    if (thumbnail === 'self' || thumbnail === 'default') {
      thumbnail = 'https://www.reddit.com/static/self_default2.png';
    }

    return (
      <View style={styles.container}>
        <Image style={styles.thumbnail}
               source={{uri: thumbnail}} />

        <View style={styles.rightContainer}>
          <Text style={styles.title}>{listing.title}</Text>
        </View>
      </View>
    );
  },

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        style={styles.listView} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  rightContainer: {
    flex: 1
  },

  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
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

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);
