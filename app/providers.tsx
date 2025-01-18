'use client';

import { TransitionRouter } from 'next-transition-router';
import { useAnimate } from "motion/react"

export default function Providers({ children }: { children: React.ReactNode }) {
  const [scope, animate] = useAnimate();

  // Use stage to trigger exit animation if it does not happen manually

  return (
    <TransitionRouter
      auto
      leave={(next, from, to) => {
        animate(
          scope.current,
          { opacity: [1, 0.999] },
          { duration: 1, onComplete: next }
        );
      }}
      enter={(next) => {
        // next()
        animate(
          scope.current,
          { opacity: [0.999, 1] },
          { duration: 1, onComplete: next }
        );
      }}
    >
      <div className='h-full w-full' ref={scope}>{children}</div>
    </TransitionRouter>
  );
}