import { useState } from 'react';

// options object should be the form props pass to MUI TextField
// e.g: isRequired, autoFocus, multiline
const useField = (label, type = 'text', options) => {
  const [value, setValue] = useState('');

  const onChange = e => {
    setValue(e.target.value);
  };

  const initValue = val => setValue(val);

  return {
    label,
    type,
    value,
    options,
    onChange,
    initValue,
  };
};

export default useField;
