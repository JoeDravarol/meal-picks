import { useState } from 'react';

const useImageFile = (initialValue = null) => {
  const [file, setFile] = useState(initialValue);

  const upload = e => {
    const file = e.target.files[0];
    setFile(file);
  };

  const remove = () => {
    setFile(null);
  };

  return {
    file,
    upload,
    remove,
  };
};

export default useImageFile;
