import React from 'react';
import { Router, Switch, Route, useHistory } from './Router';
import { StyleSheet, Text, View, SafeAreaView, Alert, Platform } from 'react-native';
import { Backdrop, List, ListItem, Icon } from 'material-bread';

import Home from './screens/Home';
import About from './screens/About';
import NotFound from './screens/404';
import Child from './screens/Child';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
  },
  backdropHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backdropHeaderTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
    marginLeft: 72,
  },
});

const BackLayerRevealed = () => {
  const history = useHistory();
  return (
    <>
      <View style={{ flex: 1, width: '100%' }}>
        <View style={styles.backdropHeader}>
          <Text style={styles.backdropHeaderTitle}>Navigation</Text>
        </View>
        <List
          style={{
            width: '100%',
            backgroundColor: 'transparent',
          }}>
          <ListItem
            text={'Home'}
            textStyle={{ color: 'white' }}
            selected
            onPress={() => {
              history.push('/');
            }}
            style={{ backgroundColor: 'transparent' }}
            icon={<Icon name={'home'} size={24} color={'white'} />}
          />
          <ListItem
            text={'Music'}
            onPress={() => {
              history.push('/child/music');
            }}
            textStyle={{ color: 'white' }}
            style={{ backgroundColor: 'transparent' }}
            icon={<Icon name={'music-note'} size={24} color={'white'} />}
          />
          <ListItem
            text={'Favorites'}
            onPress={() => {
              history.push('/child/favorites');
            }}
            textStyle={{ color: 'white' }}
            style={{ backgroundColor: 'transparent' }}
            icon={<Icon name={'favorite'} size={24} color={'white'} />}
          />
          <ListItem
            text={'Settings'}
            onPress={() => {
              history.push('/child/settings');
            }}
            textStyle={{ color: 'white' }}
            style={{ backgroundColor: 'transparent' }}
            icon={<Icon name={'settings'} size={24} color={'white'} />}
          />
          <ListItem
            text={'About'}
            onPress={() => {
              if (Platform.OS === 'web') {
                if (confirm('You sure navigate about?')) {
                  history.push('/about');
                }
              } else {
                Alert.alert(
                  'Go to about',
                  'You sure navigate about?',
                  [
                    { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    { text: 'OK', onPress: () => history.push('/about') },
                  ],
                  { cancelable: false },
                );
              }
            }}
            textStyle={{ color: 'white' }}
            style={{ backgroundColor: 'transparent' }}
            icon={<Icon name={'error'} size={24} color={'white'} />}
          />
        </List>
      </View>
    </>
  );
};

function Root() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Router>
        <View
          style={{
            flex: 1,
            width: '100%',
          }}>
          <Backdrop
            backLayerConcealed={
              <View style={styles.backdropHeader}>
                <Text style={styles.backdropHeaderTitle}>App</Text>
              </View>
            }
            backLayerRevealed={<BackLayerRevealed />}
            offset={300}>
            <View style={styles.container}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/child/:id" component={Child} />
                {Platform.OS === 'web' && <Route component={NotFound} />}
              </Switch>
            </View>
          </Backdrop>
        </View>
      </Router>
    </SafeAreaView>
  );
}

export default Root;
