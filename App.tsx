import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {StoreProvider} from './contexts/store';

import Home from './screens/Home';

export default function App(): JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <IconRegistry icons={EvaIconsPack} />
      <SafeAreaView style={styles.safeAreaTop} />
      <StoreProvider>
        <ApplicationProvider {...eva} theme={eva.light}>
          <Layout style={styles.layout}>
            <SafeAreaView style={styles.safeAreaBottom}>
              <Home />
            </SafeAreaView>
          </Layout>
        </ApplicationProvider>
      </StoreProvider>
    </>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  safeAreaTop: {
    flex: 0,
  },
  safeAreaBottom: {
    backgroundColor: '#bfc3e0',
  },
});
