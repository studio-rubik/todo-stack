import React, {useState, useMemo, useCallback} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
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
  const {tasks, setTasks} = useStore();
  const [editorShown, setEditorShown] = useState(false);

  const PlusIcon = useCallback(
    (props: any) => (
      <Icon {...props} style={[props.style, styles.addIcon]} name="plus" />
    ),
    [],
  );

  const handleNewButtonPress = useCallback(() => {
    setEditorShown(true);
  }, [setEditorShown]);

  const dismissEditor = useCallback(() => {
    setEditorShown(false);
  }, [setEditorShown]);

  const handleEditorSubmit = useCallback(() => {
    setEditorShown(false);
  }, [setEditorShown]);

  const handleDonePress = useCallback(() => {
    if (setTasks == null) return;
    Alert.alert(
      '🎉 Well Done!',
      '',
      [
        {
          text: 'Revert',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setTasks((prev) => prev.filter((t, i) => i < prev.length - 1));
          },
        },
      ],
      {cancelable: false},
    );
  }, []);

  const CardFooter = useCallback((props: any) => {
    return (
      <View {...props} style={{...props.style, ...styles.cardFooter}}>
        <Button onPress={handleDonePress}>Done</Button>
      </View>
    );
  }, []);

  const topTask = useMemo(() => tasks[tasks.length - 1], [tasks]);

  return (
    <>
      <Layout style={styles.layout}>
        <TopNavigation title="Eva Application" />
        <Divider />
        <View style={styles.content}>
          {topTask ? (
            <Card style={styles.card} footer={CardFooter}>
              <View style={styles.cardContent}>
                <Text category="h3">{topTask?.content}</Text>
              </View>
            </Card>
          ) : (
            <View style={styles.cardBlank}>
              <Text category="h3">All tasks done!</Text>
            </View>
          )}
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
      >
        <NewTask onSubmit={handleEditorSubmit} dismiss={dismissEditor} />
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
  },
  cardContent: {
    minHeight: 340,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 14,
  },
  cardBlank: {
    height: 340,
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
