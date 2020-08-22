import React, {useCallback, useState, useRef} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Button, Icon, Input} from '@ui-kitten/components';

import * as types from '../common/types';
import useStore from '../hooks/useStore';

const NewTask: React.FC = () => {
  const [value, setValue] = useState('');
  const {setTasks} = useStore();
  const inputRef = useRef<Input | null>(null);

  const SubmitIcon = useCallback(
    (props: any) => (
      <Icon
        {...props}
        style={[props.style, styles.submitIcon]}
        name="checkmark"
      />
    ),
    [],
  );

  const handleChange = useCallback(
    (text: string) => {
      setValue(text);
    },
    [setValue],
  );

  const handleSubmitPress = useCallback(() => {
    if (setTasks == null) return;
    setTasks((prev) => [...prev, types.newTask(value)]);
    inputRef.current?.clear();
    inputRef.current?.blur();
  }, [value]);

  return (
    <SafeAreaView style={styles.layout}>
      <Input
        ref={inputRef}
        multiline
        autoFocus
        textStyle={{minHeight: 300}}
        placeholder="Multiline"
        value={value}
        onChangeText={handleChange}
      />
      <View style={styles.buttons}>
        <Button
          onPressOut={handleSubmitPress}
          style={styles.addButton}
          accessoryLeft={SubmitIcon}
        ></Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  buttons: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  addButton: {
    width: 100,
  },
  submitIcon: {
    height: 24,
    width: 24,
  },
});

export default NewTask;
