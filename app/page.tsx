'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import * as motion from "motion/react-client"
import { Typewriter } from '@/components/custom/typewriter'
import { AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'
import { useTransitionContext } from '@/components/custom/path-provider'
import { useTransitionState } from 'next-transition-router'

export default function Home() {
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
        <motion.div key='main' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.5 }}} transition={{ duration: 0.5, delay: 1 }} className="h-full w-full flex flex-col items-center justify-center">
          <h1 className="dark:text-white text-black font-raleway font-bold text-4xl md:text-5xl">Stijn Nijhuis</h1>
          <Typewriter />
          <Link href="/about">
              <Button className="mt-4">Learn more</Button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
