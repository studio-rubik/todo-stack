import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

import {Task} from '../common/types';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync: {},
});

const TASKS = 'tasks';
const TASK_IDS = 'taskIds';

export async function getTasks(): Promise<Task[]> {
  let ids: string[] = [];
  try {
    ids = await storage.load({key: TASK_IDS});
  } catch (e) {
    if (e.name === 'NotFoundError') {
      return [];
    }
  }
  try {
    return storage.getBatchDataWithIds({
      key: 'tasks',
      ids,
    });
  } catch {
    return [];
  }
}

export async function saveTask(task: Task, index: number): Promise<void> {
  storage.save({key: TASKS, id: task.id, data: task});
  let ids: string[] = [];
  try {
    ids = await storage.load({key: TASK_IDS});
  } catch (e) {
    if (e.name === 'NotFoundError') {
      storage.save({key: TASK_IDS, data: []});
    }
  }
  ids.splice(index, 0, task.id);
  storage.save({key: TASK_IDS, data: ids});
}

export async function deleteTask(taskId: string): Promise<void> {
  storage.remove({key: TASKS, id: taskId});
  let ids: string[] = [];
  try {
    ids = await storage.load({key: TASK_IDS});
  } catch (e) {
    console.log(e);
    return;
  }
  storage.save({key: TASK_IDS, data: ids.filter((id) => id !== taskId)});
}
