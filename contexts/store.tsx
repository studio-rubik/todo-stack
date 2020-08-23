import React, {useState, useEffect} from 'react';

import {Task} from '../common/types';
import {getTasks} from '../db/device';

export type Store = {
  loading: boolean;
  tasks: Task[];
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const StoreContext = React.createContext<Store>({
  loading: true,
  tasks: [],
});

export const StoreProvider: React.FC = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks()
      .then((tasks) => {
        setTasks(tasks);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <StoreContext.Provider value={{loading, tasks, setTasks: setTasks}}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
