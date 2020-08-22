import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Button,
  Icon,
  Divider,
  TopNavigation,
  Layout,
  Text,
  Card,
} from '@ui-kitten/components';

const Home: React.FC = () => {
  const PlusIcon = (props: any) => (
    <Icon {...props} style={[props.style, styles.addIcon]} name="plus" />
  );
  return (
    <Layout style={styles.layout}>
      <TopNavigation title="Eva Application" />
      <Divider />
      <View style={styles.content}>
        <Card style={styles.card}>
          <Text category="h3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          </Text>
        </Card>
        <Button style={styles.addButton} accessoryLeft={PlusIcon} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    width: '100%',
    minHeight: 340,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    height: 32,
    width: 32,
  },
  addButton: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
});

export default Home;
