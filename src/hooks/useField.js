import { useState } from 'react';

// options object should be the form props pass to MUI TextField
// e.g: isRequired, autoFocus, multiline
const useField = (label, type = 'text', options, initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  };

  return {
    label,
    type,
    value,
    onChange,
    options,
  };
};

export default useField;
