'use client'

import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'
import { useEffect, useState } from 'react'
import { useTransitionContext } from './path-provider'
import { useTransitionState } from 'next-transition-router'

const DivFrame = ({ reverse }: { reverse?: boolean }) => {
  const { to } = useTransitionContext()
  const [transitioning, setTransitioning] = useState(false)
  const { stage } = useTransitionState()

  useEffect(() => {
    if (stage === 'leaving') {
      setTransitioning(true)
    } else {
      setTransitioning(false)
    }
  }, [to, stage])

  return (
    <AnimatePresence>
      {transitioning ? null : (
        <>
          <motion.div key='frame-left-height' initial={{ height: 0 }} animate={{ height: '25%' }} transition={{ duration: 0.5}} exit={{ height: 0, transition: { duration: 0.5, delay: 0.5 }}} className={`absolute ${reverse ? 'top-0' : 'bottom-0'} left-0 h-1/4 w-[0.5px] bg-black dark:bg-white`}/>
          <motion.div key='frame-left-width' initial={{ width: 0 }} animate={{ width: '25%' }} transition={{ duration: 0.5 }} exit={{ width: 0, transition: { duration: 0.5, delay: 0.5 }}} className={`absolute ${reverse ? 'top-0' : 'bottom-0'} left-0 w-1/4 h-[0.5px] bg-black dark:bg-white`}/>
          <motion.div key='frame-right-height' initial={{ height: 0 }} animate={{ height: '25%' }} transition={{ duration: 0.5 }} exit={{ height: 0, transition: { duration: 0.5, delay: 0.5 }}} className={`absolute ${reverse ? 'bottom-0' : 'top-0'} right-0 h-1/4 w-[0.5px] bg-black dark:bg-white`}/>
          <motion.div key='frame-right-width' initial={{ width: 0 }} animate={{ width: '25%' }} transition={{ duration: 0.5 }} exit={{ width: 0, transition: { duration: 0.5, delay: 0.5 }}} className={`absolute ${reverse ? 'bottom-0' : 'top-0 '} right-0 w-1/4 h-[0.5px] bg-black dark:bg-white`}/>
        </>
      )}
    </AnimatePresence>
  )
}

export { DivFrame }