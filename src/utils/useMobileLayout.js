import { useState, useEffect } from 'react';

const useMobileLayout = () => {
  const [mobileLayout, setMobileLayout] = useState(window.innerWidth <= 375);

  useEffect(() => {
    const handleReSize = () => {
      setMobileLayout(window.innerWidth <= 375);
    };

    window.addEventListener('resize', handleReSize);

    return () => {
      window.removeEventListener('resize', handleReSize);
    };
  }, []);

  return mobileLayout;
};

export default useMobileLayout;
