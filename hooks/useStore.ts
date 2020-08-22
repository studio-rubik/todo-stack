import {useContext} from 'react';

import {StoreContext, Store} from '../contexts/store';

const useStore: () => Store = () => {
  return useContext(StoreContext);
};

export default useStore;
