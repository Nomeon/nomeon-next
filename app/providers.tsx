'use client'

import { TransitionContext } from '@/components/custom/path-provider';
import { TransitionRouter } from 'next-transition-router';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [transitionPaths, setTransitionPaths] = useState({ from: '', to: '' })

  return (
    <TransitionRouter
      auto
      leave={(next, from, to) => {
        if (from === to) return next()
        if (from && to) {
          setTransitionPaths({ from, to })
        }
        setTimeout(function() {
          next()
        }, 1000)
      }}
      enter={(next) => {
        setTimeout(function() {
          next()
        }, 1000)
      }}
    >
      <TransitionContext.Provider value={transitionPaths}>
        <div className='h-full w-full'>{children}</div>
      </TransitionContext.Provider>
    </TransitionRouter>
  );
}