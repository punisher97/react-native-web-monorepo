import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const NotFoundPage = () => (
  <Text style={styles.baseText}>
    <Text style={styles.titleText}>
      NOT FOUND{'\n'}
      {'\n'}
    </Text>
    <Text numberOfLines={5}>You just hit a route that doesn&#39;t exist... the sadness.</Text>
  </Text>
);

export default NotFoundPage;
