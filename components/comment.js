'use strict';

const React = require('react-native');

const {
  View,
  Text,
  StyleSheet
} = React;

const Comment = React.createClass({
  renderChildren() {
    let { comment, depth } = this.props;

    if (!!!comment.replies) {
      return;
    }

    return comment.replies.data.children.map(child => {
      return (
        <Comment key={child.data.name} comment={child.data}
                 depth={depth + 1} />
      );
    });
  },

  render() {
    let { comment } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.author}>
          {comment.author} ({comment.score})
        </Text>

        <Text style={styles.body}>{comment.body}</Text>

        {this.renderChildren()}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    paddingLeft: 10
  },

  author: {
    fontWeight: 'bold'
  },

  body: {
    paddingBottom: 10
  }
});

module.exports = Comment;
