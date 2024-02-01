import { useState, useEffect } from 'react';

const useTabletLayout = () => {
  const [isTableteSize, setIsTabletSize] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletSize(window.innerWidth <= 865);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isTableteSize;
};

export default useTabletLayout;
