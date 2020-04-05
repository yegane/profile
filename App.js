/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './src/reducers';
import Navigator from './src/navigation/navigator';
import ReduxThunk from 'redux-thunk';
import {SafeAreaProvider} from 'react-native-safe-area-context';
class App extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <Provider
          store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
          <View style={styles.container}>
            <Navigator />
          </View>
        </Provider>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
