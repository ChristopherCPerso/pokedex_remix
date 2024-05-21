import { useEffect, useState, useCallback, useRef } from "react";

interface State {
  inView: boolean;
  entry: IntersectionObserverEntry | null;
  observer: IntersectionObserver | null;
}

export interface Options extends IntersectionObserverInit {
  unobserveOnEnter?: boolean;
  /**
   * @deprecated Use setRef callback.
   */
  target?: React.RefObject<Element | null>;
  /**
   * @deprecated Use hook `useInViewEffect` to access observer callback.
   */
  onEnter?: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => void;
  /**
   * @deprecated Use hook `useInViewEffect` to access observer callback.
   */
  onLeave?: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => void;
  /**
   * Default `inView` state
   */
  defaultInView?: boolean;
}

interface UseInView {
  (
    options?: Options,
    externalState?: React.ComponentState[],
  ): [
    (node: Element | null) => void,
    State["inView"],
    State["entry"],
    State["observer"],
  ];
}

interface UseObserver {
  (
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
    externalState?: React.ComponentState[],
  ): (node: Element | null) => void;
}

/**
 * useObserver
 * @param callback IntersectionObserverCallback
 * @param options IntersectionObserverInit
 * @param externalState React.ComponentState[]
 */
export const useObserver: UseObserver = (
  callback,
  { root, rootMargin, threshold } = {},
  externalState = [],
) => {
  const target = useRef<Element | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const setTarget = useCallback(
    (node: Element | null) => {
      if (target.current && observer.current) {
        observer.current.unobserve(target.current);
        observer.current.disconnect();
        observer.current = null;
      }

      if (node) {
        observer.current = new IntersectionObserver(callback, {
          root,
          rootMargin,
          threshold,
        });
        observer.current.observe(node);
        target.current = node;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [target, root, rootMargin, JSON.stringify(threshold), ...externalState],
  );

  return setTarget;
};

/**
 * useInView
 * @param options IntersectionObserverInit
 * @param externalState React.ComponentState[]
 */
const useInView: UseInView = (
  {
    root,
    rootMargin,
    threshold,
    unobserveOnEnter,
    target,
    onEnter,
    onLeave,
    defaultInView,
  } = {},
  externalState = [],
) => {
  const [state, setState] = useState<State>({
    inView: defaultInView || false,
    entry: null,
    observer: null,
  });

  const callback = useCallback<IntersectionObserverCallback>(
    ([entry], observer) => {
      const inThreshold = observer.thresholds.some(
        (t) => entry.intersectionRatio >= t,
      );
      const inView = inThreshold && entry.isIntersecting;

      setState({
        inView,
        entry,
        observer,
      });

      // unobserveOnEnter
      if (inView && unobserveOnEnter) {
        observer.unobserve(entry.target);
        observer.disconnect();
      }

      // Legacy callbacks
      if (inView) {
        onEnter?.(entry, observer);
      } else {
        onLeave?.(entry, observer);
      }
    },
    [onEnter, onLeave, unobserveOnEnter],
  );

  const setTarget = useObserver(callback, { root, rootMargin, threshold }, [
    unobserveOnEnter,
    ...externalState,
  ]);

  // Legacy 'target' option
  useEffect(() => {
    if (target?.current) setTarget(target.current);
  }, [target, setTarget]);

  return [setTarget, state.inView, state.entry, state.observer];
};

export default useInView;
