'use client'

import { createContext, useContext } from "react"

interface TransitionContextValue {
  from: string;
  to: string;
}

export const TransitionContext = createContext<TransitionContextValue>({
  from: '',
  to: ''
})

export function useTransitionContext() {
  return useContext(TransitionContext)
}