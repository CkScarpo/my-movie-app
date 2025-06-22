import { useEffect, useRef, useCallback } from "react";

interface InfiniteScrollOptions {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
}

export function useInfiniteScroll({
  loading,
  hasMore,
  onLoadMore,
  rootMargin = "100px",
}: InfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading && hasMore) {
        onLoadMore();
      }
    },
    [loading, hasMore, onLoadMore]
  );

  useEffect(() => {
    observer.current?.disconnect();

    observer.current = new IntersectionObserver(handleIntersect, {
      rootMargin,
    });

    const el = sentinelRef.current;
    if (el) observer.current.observe(el);

    return () => {
      observer.current?.disconnect();
    };
  }, [handleIntersect, rootMargin]);

  return sentinelRef;
}
