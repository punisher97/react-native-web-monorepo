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

const About = () => (
  <Text style={styles.baseText}>
    <Text style={styles.titleText}>About</Text>
  </Text>
);

export default About;
