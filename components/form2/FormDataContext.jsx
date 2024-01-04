import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const FormDataContext = createContext();

const defaultFormData = {
    unit: "mi",
    radius: "1",
}

export const FormDataProvider = ({ children }) => {
    const [formData, setFormData] = useState(defaultFormData);

    const updateFormData = (newData) => {
        if(typeof newData.radius !== 'number')
        setFormData(prevData => ({ ...prevData, ...newData }));
    };

    return (
        <FormDataContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormDataContext.Provider>
    );
};

export const useFormData = () => useContext(FormDataContext);
FormDataProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };