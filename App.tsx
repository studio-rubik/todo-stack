import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import Home from './screens/Home';

export default function App(): JSX.Element {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={styles.layout}>
          <SafeAreaView>
            <Home />
          </SafeAreaView>
        </Layout>
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
});
