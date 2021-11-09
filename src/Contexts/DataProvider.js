import React, { createContext } from 'react';
import useApi from '../Hooks/useApi';

export const DataContext = createContext();

const DataProvider = ({ children }) => {
    const dataContext = useApi();
    return (
        <DataContext.Provider value={dataContext}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;