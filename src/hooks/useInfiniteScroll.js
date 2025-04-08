import { useEffect, useRef, useState } from 'react';

export default function useInfiniteScroll({ fetchMore, hasMore }) {
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsLoading(true);
          fetchMore().finally(() => setIsLoading(false));
        }
      },
      { threshold: 1 },
    );

    const { current } = ref;
    if (current) observer.observe(current);

    // eslint-disable-next-line consistent-return
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [fetchMore, hasMore]);

  return { ref, isLoading };
}
