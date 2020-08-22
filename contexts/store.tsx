import React, {useState} from 'react';

import {Task} from '../common/types';

export type Store = {
  tasks: Task[];
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const StoreContext = React.createContext<Store>({tasks: []});

const defaultTasks: Task[] = [
  {id: '1', content: 'Email John', createdAt: '', done: false, doneAt: ''},
];

export const StoreProvider: React.FC = ({children}) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  return (
    <StoreContext.Provider value={{tasks, setTasks: setTasks}}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
