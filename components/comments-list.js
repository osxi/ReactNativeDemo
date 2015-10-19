'use strict';

const config = require('../config');
const Comment = require('./comment');
const Loading = require('./loading');
const React = require('react-native');

const {
  View,
  Text,
  StyleSheet
} = React;

const CommentsList = React.createClass({
  getInitialState() {
    return {
      data: null,
      loaded: false
    }
  },

  componentDidMount() {
    this.fetchData();
  },

  fetchData() {
    let { permalink } = this.props.listing;

    fetch(`${config.API_ROOT_URL}${permalink}`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          data: responseData[1].data.children,
          loaded: true
        });
      }).done();
  },

  comments() {
    let { data } = this.state;

    if (data.length === 0) {
      return (<Text>No comments yet.</Text>);
    }

    return data.map(comment => {
      let { data } = comment;
      return (
        <Comment key={data.name} comment={data} depth={1} />
      );
    });
  },

  render() {
    if (!this.state.loaded) {
      return (<Loading />);
    }

    let { listing } = this.props;

    return (
      <View style={styles.container}>
        {this.comments()}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF'
  }
});

module.exports = CommentsList;
