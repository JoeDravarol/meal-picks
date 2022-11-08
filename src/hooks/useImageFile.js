import { useState } from 'react';

const useImageFile = (initialValue = null) => {
  const [file, setFile] = useState(initialValue);
  const [imgUrl, setImgUrl] = useState();

  const upload = e => {
    const file = e.target.files[0];
    setFile(file);
    setImgUrl(URL.createObjectURL(file));
  };

  const remove = () => {
    setFile(null);
    setImgUrl(null);
  };

  const initValue = imgUrl => setImgUrl(imgUrl);

  return {
    file,
    url: imgUrl,
    upload,
    remove,
    initValue,
  };
};

export default useImageFile;
