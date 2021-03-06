import React, {useCallback, useState, useRef, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Button, Input, Card, Radio} from '@ui-kitten/components';

import * as types from '../common/types';
import * as deviceDb from '../db/device';
import useStore from '../hooks/useStore';

type Props = {
  onSubmit: () => void;
  dismiss: () => void;
};

enum InsertType {
  top,
  bottom,
  random,
}

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function validateValue(val: string) {
  return 0 < val.length && val.length <= 100;
}

const NewTask: React.FC<Props> = ({onSubmit, dismiss}) => {
  const [value, setValue] = useState('');
  const [insertType, setInsertType] = useState<InsertType>(InsertType.top);
  const {setTasks} = useStore();
  const inputRef = useRef<Input | null>(null);

  const handleChange = useCallback(
    (text: string) => {
      setValue(text);
    },
    [setValue],
  );

  const handleSubmitPress = useCallback(() => {
    if (setTasks == null || !validateValue(value)) return;
    const newTask = types.newTask(value);
    let index = -1;
    switch (insertType) {
      case InsertType.top:
        setTasks((prev) => {
          index = prev.length;
          return [...prev, newTask];
        });
        break;
      case InsertType.bottom:
        setTasks((prev) => [newTask, ...prev]);
        index = 0;
        break;
      case InsertType.random:
        setTasks((prev) => {
          index = random(0, prev.length);
          prev.splice(index, 0, newTask);
          // Create new array.
          return [...prev];
        });
        break;
      default:
        break;
    }
    if (index !== -1) {
      deviceDb.saveTask(newTask, index);
    }
    inputRef.current?.blur();
    onSubmit();
  }, [value, insertType]);

  const handleCancelPress = useCallback(() => {
    inputRef.current?.blur();
    dismiss();
  }, []);

  useEffect(() => {
    return () => {
      inputRef.current?.blur();
    };
  }, []);

  const CardFooter = useCallback(
    (props: any) => {
      return (
        <View {...props} style={{...props.style, ...styles.cardFooter}}>
          <View style={styles.radios}>
            <Radio
              checked={insertType === InsertType.top}
              onChange={() => setInsertType(InsertType.top)}
            >
              Top
            </Radio>
            <Radio
              checked={insertType === InsertType.bottom}
              onChange={() => setInsertType(InsertType.bottom)}
            >
              Bottom
            </Radio>
            <Radio
              checked={insertType === InsertType.random}
              onChange={() => setInsertType(InsertType.random)}
            >
              Random
            </Radio>
          </View>
          <View style={styles.buttons}>
            <Button
              onPressOut={handleCancelPress}
              style={styles.addButton}
              status="danger"
              appearance="outline"
            >
              Cancel
            </Button>
            <Button onPressOut={handleSubmitPress} style={styles.addButton}>
              Add
            </Button>
          </View>
        </View>
      );
    },
    [insertType, handleSubmitPress],
  );

  return (
    <SafeAreaView style={styles.layout}>
      <Card style={styles.card} footer={CardFooter}>
        <View style={styles.cardContent}>
          <Input
            ref={inputRef}
            multiline
            autoFocus
            textStyle={styles.input}
            placeholder="What to do?"
            value={value}
            onChangeText={handleChange}
          />
        </View>
      </Card>
      <View style={styles.buttons}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  card: {
    width: '100%',
  },
  cardContent: {
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardFooter: {
    width: '100%',
    padding: 14,
  },
  input: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    width: 100,
  },
  submitIcon: {
    height: 24,
    width: 24,
  },
  radios: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttons: {
    paddingTop: 20,
    paddingBottom: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default NewTask;
