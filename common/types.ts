import uuid from 'react-native-uuid';

export type Task = {
  id: string;
  done: boolean;
  content: string;
  createdAt: number;
  doneAt?: number;
};

export function newTask(content: string): Task {
  return {
    id: uuid.v4(),
    done: false,
    createdAt: Date.now(),
    content,
  };
}
