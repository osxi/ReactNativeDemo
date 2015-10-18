'use strict';

const React = require('react-native');

const {
  AppRegistry,
  Image,
  ListView,
  NavigatorIOS,
  StyleSheet,
  Text,
  View,
} = React;

let API_URL = 'https://api.reddit.com/r/reactjs/hot';

let ReactNativeDemo = React.createClass({
  render() {
    return (
      <NavigatorIOS style={styles.navigator} initialRoute={{
                      title: "/r/reactjs",
                      component: IndexPage
                    }} />
    );
  }
});

let IndexPage = React.createClass({
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

    console.log('listing: ', listing);

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
      <View style={styles.container}>
        <ListView dataSource={this.state.dataSource}
                  renderRow={this.renderRow}
                  style={styles.listView} />
      </View>
    );
  }
});

let styles = StyleSheet.create({
  navigator: {
    flex: 1
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },

  rightContainer: {
    flex: 1
  },

  listView: {
    paddingTop: 64,
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