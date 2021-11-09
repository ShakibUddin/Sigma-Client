
import { useContext } from 'react';
import { DataContext } from '../Contexts/DataProvider';

const useData = () => {
    return useContext(DataContext);
}

export default useData;