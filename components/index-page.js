'use strict';

const config = require('./../config');
const ListingRow = require('./listing-row');
const Loading = require('./loading');
const React = require('react-native');

const {
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

const API_URL = `${config.API_ROOT_URL}/r/reactjs/hot`;

const IndexPage = React.createClass({
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

  renderRow(listing) {
    let { navigator } = this.props;

    return (<ListingRow listing={listing.data} navigator={navigator}/>);
  },

  render() {
    if (!this.state.loaded) {
      return (<Loading />);
    }

    let { navigator } = this.props;

    return (
      <View style={styles.container}>
        <ListView dataSource={this.state.dataSource}
                  renderRow={this.renderRow}
                  style={styles.listView} />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },

  listView: {
    paddingTop: 64,
    backgroundColor: '#F5FCFF',
  }
});

module.exports = IndexPage;
