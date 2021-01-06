import { useCallback, useState } from 'react';

const useToggle = (defaultValue: boolean) => {
  const [value, setValue] = useState(defaultValue);

  const onToggle = useCallback(() => {
    setValue(!value);
  }, [value]);

  return [value, onToggle] as [boolean, typeof onToggle];
};

export default useToggle;
