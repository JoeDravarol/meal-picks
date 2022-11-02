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

  // Extract the value from the object
  const getValue = () => {
    return fields.map(obj => obj.value);
  };

  return {
    fields,
    handleChange,
    addField,
    removeField,
    getValue,
  };
};

export default useMultiInputField;
