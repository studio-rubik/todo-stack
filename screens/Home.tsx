import React, {useState, useCallback} from 'react';
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
import Modal from 'react-native-modal';

import useStore from '../hooks/useStore';
import NewTask from './NewTask';

const Home: React.FC = () => {
  const {tasks} = useStore();
  const [editorShown, setEditorShown] = useState(false);

  const PlusIcon = useCallback(
    (props: any) => (
      <Icon {...props} style={[props.style, styles.addIcon]} name="plus" />
    ),
    [],
  );

  const handleNewButtonPress = useCallback(() => {
    setEditorShown(true);
  }, []);

  const handleBackdropPress = useCallback(() => {
    setEditorShown(false);
  }, []);

  return (
    <>
      <Layout style={styles.layout}>
        <TopNavigation title="Eva Application" />
        <Divider />
        <View style={styles.content}>
          <Card style={styles.card}>
            <Text category="h3">{tasks[tasks.length - 1]?.content}</Text>
          </Card>
          <Button
            onPress={handleNewButtonPress}
            style={styles.addButton}
            accessoryLeft={PlusIcon}
          />
        </View>
      </Layout>
      <Modal
        style={styles.taskEditor}
        isVisible={editorShown}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={handleBackdropPress}
      >
        <NewTask />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  layout: {
    position: 'relative',
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
  taskEditor: {
    position: 'relative',
  },
});

export default Home;
