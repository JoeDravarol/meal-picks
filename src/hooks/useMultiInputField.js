import { useState } from 'react';

const useMultiInputField = () => {
  const [fields, setFields] = useState([{ value: '' }]);

  const handleChange = (i, e) => {
    const newFields = [...fields];
    newFields[i].value = e.target.value;
    setFields(newFields);
  };

  const addField = () => {
    setFields([...fields, { value: '' }]);
  };

  const removeField = i => {
    const newFields = [...fields];
    newFields.splice(i, 1);
    setFields(newFields);
  };

  return {
    fields,
    handleChange,
    addField,
    removeField,
  };
};

export default useMultiInputField;
